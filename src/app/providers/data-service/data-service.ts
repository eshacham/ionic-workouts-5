import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { File as MobileFile, FileEntry } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Platform } from '@ionic/angular';
import { ExerciseMediaBean } from '../../models/ExerciseMedia';
import { Muscles } from '../../models/enums';
import { getDefaultWorkoutsMaps } from '../../constants/defaultWorkouts';
import { getDefaultImages } from '../../constants/defaultExerciseMedia';
import { AllDataMaps, WorkoutsDataMaps, MediaDataMaps } from 'src/app/models/interfaces';
import { IAppState } from '../../store/state/app.state';
import { DataReset, GetData } from 'src/app/store/actions/data.actions';
import { Guid } from 'guid-typescript';
import { HttpClient } from '@angular/common/http';
import * as JSZip from 'jszip';
import Auth from '@aws-amplify/auth';
import S3 from '@aws-amplify/storage';
import { Logger, LoggingService } from 'ionic-logging-service';


const WORKOUTS_STORAGE_KEY = 'my_workouts';
const IMAGES_STORAGE_KEY = 'my_images';

@Injectable()
export class DataServiceProvider {

  private exerciseMediaBeans: ExerciseMediaBean[];
  private logger: Logger;
  private credentials: any;

  constructor(
    loggingService: LoggingService,
    private platform: Platform,
    private mobileFile: MobileFile,
    private webview: WebView,
    private storage: Storage,
    private store: Store<IAppState>,
    private http: HttpClient,
  ) {
    this.logger = loggingService.getLogger('App.DataServiceProvider');
  }

  async getAllData(): Promise<AllDataMaps> {
    let data: AllDataMaps = {
      workouts: { byId: {} },
      days: { byId: {} },
      sets: { byId: {} },
      exercises: { byId: {} },
      media: { byId: {} }
    };

    let imagesData: MediaDataMaps;
    let workoutsData: WorkoutsDataMaps;

    await this.displayPlatform();
    await this.displayAuthCreds();

    imagesData = await this.getImagesData();
    workoutsData = await this.getWorkoutsData();
    if (!imagesData || !workoutsData) {
      workoutsData = await this.initDefaultWorkouts();
      imagesData = await this.initDefaultImages();
      this.store.dispatch(new DataReset());
    } else {
      if (this.isMobile) {
        this.assertImagesPath(imagesData);
      }
    }

    data = { ...workoutsData, ...imagesData };
    if (data.workouts && data.media) {
      this.logger.info('getAllData', 'loaded cached workouts', Object.keys(data.workouts.byId));
      this.logger.info('getAllData', 'loaded cached images', Object.keys(data.media.byId));
    }
    return data;
  }

  private async getImagesData(): Promise<MediaDataMaps> {
    await this.storage.ready();
    const data: MediaDataMaps = await this.storage.get(IMAGES_STORAGE_KEY);
    return data;
  }

  private async initDefaultImages(): Promise<MediaDataMaps> {
    const data: MediaDataMaps = getDefaultImages();
    this.logger.info('initDefaultImages',
      `initialized and saved ${Object.keys(data.media.byId).length} default images`, data.media.byId);
    await this.saveImages(data);
    return data;
  }

  private async getWorkoutsData(): Promise<WorkoutsDataMaps> {
    await this.storage.ready();
    const data: WorkoutsDataMaps = await this.storage.get(WORKOUTS_STORAGE_KEY);
    return data;
  }

  private async initDefaultWorkouts(): Promise<WorkoutsDataMaps> {
    const data = getDefaultWorkoutsMaps();
    this.logger.info('initDefaultWorkouts',
      `initialized and saved ${Object.keys(data.workouts.byId).length} default workouts`, data.workouts.byId);
    await this.saveWorkouts(data);
    return data;
  }

  private assertImagesPath(mediaDataMaps: MediaDataMaps) {
    const imagesToUpdate = Object.values(mediaDataMaps.media.byId)
      .filter(i => !i.isDefault && i.nativePath.indexOf(this.mobileFile.dataDirectory) < 0);
    for (const image of imagesToUpdate) {
      const oldPath = image.nativePath;
      const name = image.nativePath.substr(image.nativePath.lastIndexOf('/') + 1);
      image.nativePath = this.mobileFile.dataDirectory + name;
      image.ionicPath = this.getIonicPath(image.nativePath);
      this.logger.info('assertImagesPath', `update images media path from ${oldPath} to ${image.nativePath}`);
    }
    if (imagesToUpdate.length) {
      this.saveImages(mediaDataMaps);
    }
  }

  async saveImages(images: MediaDataMaps) {
    await this.storage.ready();
    await this.storage.set(IMAGES_STORAGE_KEY, images);
    this.logger.info('saveImages', 'images have been saved');
  }

  async saveWorkouts(workoutsDataMaps: WorkoutsDataMaps) {
    await this.storage.ready();
    await this.storage.set(WORKOUTS_STORAGE_KEY, workoutsDataMaps);
    this.logger.info('saveWorkouts', 'workouts have been saved');
  }

  async resetData() {
    await this.storage.ready();
    await this.storage.remove(IMAGES_STORAGE_KEY);
    await this.storage.remove(WORKOUTS_STORAGE_KEY);
    this.store.dispatch(new GetData());
    this.logger.info('resetData', 'images and workouts have been reset');
  }

  getExerciseMusclesFilterFromImage(name: string): Muscles[] {
    const imageToSet = this.exerciseMediaBeans.filter(image => image.name === name)[0];
    if (imageToSet) {
      return imageToSet.muscles;
    }
  }

  async addImage(origImagePath: string, origImageName: string, newImageName: string):
    Promise<ExerciseMediaBean> {
    await this.mobileFile.copyFile(origImagePath, origImageName, this.mobileFile.dataDirectory, newImageName);
    const nativePath = this.mobileFile.dataDirectory + newImageName;
    this.logger.info('addImage', `new image ${origImagePath}/${origImageName} has been copied to ${nativePath}`);

    const newEntry: ExerciseMediaBean = new ExerciseMediaBean({
      id: Guid.raw(),
      name: newImageName,
      ionicPath: this.getIonicPath(nativePath),
      nativePath,
      isDefault: false,
      muscles: new Set(),
    });
    return newEntry;
  }

  async deleteImage(image: ExerciseMediaBean): Promise<string> {
    if (this.isMobile && !image.isDefault) {
      const path = image.nativePath.substr(0, image.nativePath.lastIndexOf('/') + 1);
      const name = image.nativePath.substr(image.nativePath.lastIndexOf('/') + 1);
      this.logger.info('deleteImage', `deleting image file ${path}/${name}`);
      await this.mobileFile.removeFile(path, name);
    }
    return image.id;
  }

  getIonicPath(img: string) {
    return (img === null) ? '' : this.webview.convertFileSrc(img);
  }

  get isAndriod(): boolean {
    return this.platform.is('android');
  }
  get isIos(): boolean {
    return this.platform.is('ios');
  }
  get isWebApp(): boolean {
    return !this.isMobile;
  }
  get isMobile() {
    return this.isIos || this.isAndriod;
  }
  async displayPlatform() {
    const platformSource = await this.platform.ready();
    this.logger.info('displayPlatform', `this app runs on ${platformSource}`);
  }
  async displayAuthCreds() {
    this.credentials = await Auth.currentCredentials();
    this.logger.info('displayAuthCreds', 'currentCredentials', this.credentials);
  }

  async exportWorkout(workoutId: string): Promise<string> {
    try {
      const zip = new JSZip();
      const workoutsData = await this.getWorkoutsData();
      const imagesData = await this.getImagesData();
      workoutsData.workouts.byId = { [workoutId]: workoutsData.workouts.byId[workoutId] };
      const daysById = {};
      Object.keys(workoutsData.days.byId).forEach(dayId => {
        if (workoutsData.days.byId[dayId].workoutId === workoutId) {
          daysById[dayId] = workoutsData.days.byId[dayId];
        }
      });
      workoutsData.days.byId = daysById;
      const setsById = {};
      Object.keys(workoutsData.sets.byId).forEach(setId => {
        if (workoutsData.sets.byId[setId].workoutId === workoutId) {
          setsById[setId] = workoutsData.sets.byId[setId];
        }
      });
      workoutsData.sets.byId = setsById;
      const exercisesById = {};
      const imagesbyId = {};
      Object.keys(workoutsData.exercises.byId).forEach(exerciseId => {
        const exercise = workoutsData.exercises.byId[exerciseId];
        if (exercise.workoutId === workoutId) {
          exercisesById[exerciseId] = exercise;
          const imgEntry = imagesData.media.byId[exercise.mediaId];
          if (!imagesbyId[exercise.mediaId]) {
            imagesbyId[exercise.mediaId] = imgEntry;
          }
        }
      });
      const imagesFiles = await Promise.all(Object.keys(imagesbyId).map(async imageId => {
        const file = await this.getImageFile(imagesbyId[imageId]);
        return { name: imageId, file };
      }));
      const images = await Promise.all(imagesFiles.map(imageFile => {
        return this.readFileData(imageFile.name, imageFile.file);
      }));
      images.forEach(image => zip.file(`images/${image.name}`, image.data, { compression: 'STORE' }));
      workoutsData.exercises.byId = exercisesById;
      imagesData.media.byId = imagesbyId;
      zip.file(WORKOUTS_STORAGE_KEY, JSON.stringify(workoutsData), { binary: false });
      zip.file(IMAGES_STORAGE_KEY, JSON.stringify(imagesData), { binary: false });
      this.logger.info('exportWorkout', 'zip file', zip);
      const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 9 } });
      const putResult = await S3.put(workoutId, blob, { contentType: 'application/zip' });
      this.logger.info('exportWorkout', 'workout has been exported to s3', putResult);
      return workoutId;
    } catch (err) {
      this.logger.error('exportWorkout', 'reading or zipping file error', err);
    }
  }

  async importWorkout(workoutId: string): Promise<{ workoutsData: WorkoutsDataMaps, imagesData: MediaDataMaps }> {
    const getResult = await S3.get(workoutId, { download: true });
    const zip = new JSZip();
    // tslint:disable-next-line: no-string-literal
    await zip.loadAsync(getResult['Body']);
    this.logger.info('importWorkout', 'zip file', zip);
    const result = {
      workoutsData: (JSON.parse(await zip.file(WORKOUTS_STORAGE_KEY).async('text'))) as WorkoutsDataMaps,
      imagesData: (JSON.parse(await zip.file(IMAGES_STORAGE_KEY).async('text'))) as MediaDataMaps
    };
    if (this.isMobile) {
      await Promise.all(Object.keys(result.imagesData.media.byId).map(async (imageId) => {
        const image = result.imagesData.media.byId[imageId];
        const blob = await zip.file(`images/${imageId}`).async('blob');
        await this.updateAndCreateNewImage(image, blob);
      }));
    }
    this.logger.info('importWorkout', 'imported and updated result', result);
    return result;
  }
  async updateAndCreateNewImage(image: any, blob: any) {
    const file = await this.mobileFile.writeFile(this.mobileFile.dataDirectory, image.name, blob, { replace: true});
    image.nativePath = this.mobileFile.dataDirectory + image.name;
    image.ionicPath = this.getIonicPath(image.nativePath),
    this.logger.info('updateAndCreateNewImage', `image id ${image.id}, name ${image.name} imported`, blob, file);
  }

  private getImageFile(image: ExerciseMediaBean): any {
    return new Promise(async (resolve) => {
      if (!image.isDefault) {
        const mobileFileEntry = (await this.mobileFile.resolveLocalFilesystemUrl(image.nativePath)) as FileEntry;
        mobileFileEntry.file((data) => resolve(data));
      } else {
        this.http.get(image.nativePath, { responseType: 'blob' })
          .subscribe((data) => resolve(data));
      }
    });
  }

  private readFileData(fileName: string, file: Blob): Promise<{ name: string, data: any }> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve({ name: fileName, data: reader.result });
      };
      reader.readAsArrayBuffer(file);
    });
  }
}
