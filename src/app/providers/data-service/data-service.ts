import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { File as MobileFile, FileEntry } from '@ionic-native/File/ngx';
import { Platform } from '@ionic/angular';
import { ExerciseMediaBean } from '../../models/ExerciseMedia';
import { Muscles } from '../../models/enums';
import { getDefaultWorkoutsMaps } from '../../constants/defaultWorkouts';
import { getDefaultImages } from '../../constants/defaultExerciseMedia';
import { AllDataMaps, WorkoutsDataMaps, MediaDataMaps } from 'src/app/models/interfaces';
import { IAppState } from '../../store/state/app.state';
import { LoadData, SetTheme } from 'src/app/store/actions/data.actions';
import { Guid } from 'guid-typescript';
import { HttpClient } from '@angular/common/http';
import * as JSZip from 'jszip';
import S3 from '@aws-amplify/storage';
import { Logger, LoggingService } from 'ionic-logging-service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser/';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ThemeServiceProvider } from '../theme-service/theme-service';
import { ISignedInUser } from 'src/app/store/state/data.state';

const WORKOUTS_STORAGE_KEY = 'my_workouts';
const IMAGES_STORAGE_KEY = 'my_images';
const THEME_STORAGE_KEY = 'my_theme';

@Injectable()
export class DataServiceProvider {
  private exerciseMediaBeans: ExerciseMediaBean[];
  private logger: Logger;
  private credentials: any;

  constructor(
    loggingService: LoggingService,
    private domSanitizer: DomSanitizer,
    private platform: Platform,
    private webview: WebView,
    private mobileFile: MobileFile,
    private storage: Storage,
    private store: Store<IAppState>,
    private http: HttpClient,
  ) {
    this.logger = loggingService.getLogger('App.DataServiceProvider');
  }

  async getThemeData(): Promise<string> {
    const theme = await this.getTheme();
    if (!theme) {
      this.store.dispatch(new SetTheme(ThemeServiceProvider.defaultTheme));
    }
    return theme;
  }

  async getAllData(): Promise<AllDataMaps> {
    let data: AllDataMaps = {
      workouts: { byId: {} },
      days: { byId: {} },
      sets: { byId: {} },
      exercises: { byId: {} },
      media: { byId: {} },
    };

    let imagesData: MediaDataMaps;
    let workoutsData: WorkoutsDataMaps;

    await this.displayPlatform();

    imagesData = await this.getImagesData();
    workoutsData = await this.getWorkoutsData();
    if (!imagesData || !workoutsData) {
      workoutsData = await this.initDefaultWorkouts();
      imagesData = await this.initDefaultImages();
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
    if (!data) return null;
    Object.keys(data.media.byId).map(mediaId => {
      const media = data.media.byId[mediaId];
      if (!media.images || media.images.length === 0) {
        media.images = [mediaId];
      }
    });

    return Object.keys(data.media.byId).length > 0 ? data : null;
  }
  private async getTheme(): Promise<string> {
    await this.storage.ready();
    const theme: string = await this.storage.get(THEME_STORAGE_KEY);
    return theme;
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

  async saveImages(images: MediaDataMaps) {
    await this.storage.ready();
    await this.storage.set(IMAGES_STORAGE_KEY, images);
    this.logger.info('saveImages', 'images have been saved');
  }
  async saveTheme(theme: string) {
    await this.storage.ready();
    await this.storage.set(THEME_STORAGE_KEY, theme);
    this.logger.info('saveTheme', 'theme have been saved');
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
    this.store.dispatch(new LoadData());
    this.logger.info('resetData', 'images and workouts have been reset');
  }

  getExerciseMusclesFilterFromImage(name: string): Muscles[] {
    const imageToSet = this.exerciseMediaBeans.filter(image => image.name === name)[0];
    if (imageToSet) {
      return imageToSet.muscles;
    }
  }

  async addImage(origImagePath: string, origImageName: string, newImageName: string): Promise<ExerciseMediaBean> {
    const newImageId = Guid.raw();
    await this.mobileFile.copyFile(origImagePath, origImageName, this.mobileFile.dataDirectory, newImageId);
    this.logger.info('addImage', `new image ${newImageName} copied`);

    const newEntry: ExerciseMediaBean = new ExerciseMediaBean({
      id: newImageId,
      name: newImageName,
      images: [newImageId],
      isDefault: false,
      muscles: new Set(),
    });
    return newEntry;
  }

  async deleteMedia(media: ExerciseMediaBean): Promise<string> {
    await Promise.all(media.images.map((image, index) => {
      return this.deleteImage(media, index)
    }));
    return media.id;
  }
  async deleteImage(image: ExerciseMediaBean, index: number): Promise<void> {
    if (this.isMobile && !image.isDefault) {
      const path = this.mobileFile.dataDirectory;
      const name = image.images[index];
      this.logger.info('deleteImage', `deleting image file ${path}/${name}`);
      await this.mobileFile.removeFile(path, name);
    }
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


  async exportWorkout(workoutId: string, sinedInUser: ISignedInUser): Promise<string> {
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
          if (!imgEntry.isDefault) {
            imgEntry.exportedBy = imgEntry.exportedBy || sinedInUser;
          }
          if (!imagesbyId[exercise.mediaId]) {
            imagesbyId[exercise.mediaId] = imgEntry;
          }
        }
      });
      const imagesFiles = await Promise.all(Object.keys(imagesbyId).map(async mediaId => {
        const files = await this.getImageFiles(imagesbyId[mediaId]);
        return { names: imagesbyId[mediaId].images, files };
      }));
      const medias = await Promise.all(imagesFiles.map(mediaId => {
        return this.readFilesData(mediaId.names, mediaId.files);
      }));
      medias.forEach(media => zip.file(`images/${media.name}`, media.data, { compression: 'STORE' }));
      workoutsData.exercises.byId = exercisesById;
      imagesData.media.byId = imagesbyId;
      zip.file(WORKOUTS_STORAGE_KEY, JSON.stringify(workoutsData), { binary: false });
      zip.file(IMAGES_STORAGE_KEY, JSON.stringify(imagesData), { binary: false });
      this.logger.info('exportWorkout', 'zip file', zip);
      const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 9 } });
      const putResult = await S3.put(workoutId, blob, { contentType: 'application/zip', level: 'protected' });
      this.logger.info('exportWorkout', 'workout has been exported to s3', putResult);
      return workoutId;
    } catch (err) {
      this.logger.error('exportWorkout', 'reading or zipping file error', err);
    }
  }

  async importWorkout(workoutId: string, workoutOwnerId: string):
    Promise<{ workoutsData: WorkoutsDataMaps, imagesData: MediaDataMaps }> {
    // this import can only get its own workouts
    // const getResult = await S3.get(workoutId, { download: true , level: 'protected' });
    const getResult = await S3.get(workoutId, { download: true, identityId: workoutOwnerId, level: 'protected' });
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
        await this.updateAndCreateNewImage(image, zip);
      }));
    }
    this.logger.info('importWorkout', 'imported and updated result', result);
    return result;
  }
  async updateAndCreateNewImage(image: ExerciseMediaBean, zip: JSZip) {
    await Promise.all(image.images.map(async (imageId) => {
      const blob = await zip.file(`images/${imageId}`).async('blob');
      const file = await this.mobileFile.writeFile(this.mobileFile.dataDirectory, imageId, blob, { replace: true });
      this.logger.info('updateAndCreateNewImage', `image ${imageId} imported`, blob, file);
    }));
  }

  private getImageFiles(image: ExerciseMediaBean): any {
    return Promise.all(image.images.map(imageId => {
      return new Promise(async (resolve) => {
        let imageName: string;
        if (!image.isDefault) {
          imageName = this.getImageNativePath(imageId);
          const mobileFileEntry = (await this.mobileFile.resolveLocalFilesystemUrl(imageName)) as FileEntry;
          mobileFileEntry.file((data) => resolve(data));
        } else {
          imageName = this.getImageDefaultPath(imageId);
          this.http.get(imageName, { responseType: 'blob' })
            .subscribe((data) => resolve(data));
        }
      });
    }));

  }

  private getImageNativePath(imageName: string): string {
    return `${this.mobileFile.dataDirectory}${imageName}`;
  }
  private getImageDefaultPath(imageName: string): string {
    return `assets/images/${imageName}`;
  }
  private getMobilePath(url: string) {
    return this.webview.convertFileSrc(url);
  }
  safeImage(media: ExerciseMediaBean, index: number): SafeUrl {
    const imagePath = media.isDefault
      ? this.getImageDefaultPath(media.images[index])
      : this.getMobilePath(this.getImageNativePath(media.images[index]));

    const url = this.domSanitizer.bypassSecurityTrustUrl(imagePath);
    return url;
  }

  private readFilesData(fileNames: string[], files: Blob[]): any {
    return Promise.all(files.map((file: Blob, index: number) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({ name: fileNames[index], data: reader.result });
        };
        reader.readAsArrayBuffer(file);
      });
    }));
  }
}
