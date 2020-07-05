import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { File as MobileFile, FileEntry } from '@ionic-native/File/ngx';
import { Platform } from '@ionic/angular';
import { ExerciseMediaBean } from '../../models/ExerciseMedia';
import { getDefaultWorkoutsMaps } from '../../constants/defaultWorkouts';
import { getDefaultImages } from '../../constants/defaultExerciseMedia';
import { AllDataMaps, WorkoutsDataMaps, MediaDataMaps, IAddImageOptions, IRemoveImageOptions } from 'src/app/models/interfaces';
import { IAppState } from '../../store/state/app.state';
import { LoadData, SetTheme, LoadReleaseNotesAndTermsOfUse, AppOffline, AppOnline, TermsNotAccpeted } from 'src/app/store/actions/data.actions';
import { Guid } from 'guid-typescript';
import { HttpClient } from '@angular/common/http';
import S3 from '@aws-amplify/storage';
import { Logger, LoggingService } from 'ionic-logging-service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser/';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ThemeServiceProvider } from '../theme-service/theme-service';
import { ISignedInUser } from 'src/app/store/state/data.state';
import { Subscription, fromEvent } from 'rxjs';
import { Version } from 'src/app/models/Version';
import { Feature } from 'src/app/models/Feature';
import { getIsOnline } from 'src/app/store/selectors/data.selectors';
import { take } from 'rxjs/operators';
import { TermsOfUse } from 'src/app/models/TermsOfUse';
import releaseNotesJson from '../../../assets/release-notes.json'
import { APIServiceExtended } from 'src/app/API.service.extended';

const WORKOUTS_STORAGE_KEY = 'my_workouts';
const IMAGES_STORAGE_KEY = 'my_images';
const THEME_STORAGE_KEY = 'my_theme';
const TERMS_STORAGE_KEY = 'my_terms';
const IMAGES_EXERCISES_PATH = 'images/exercises/';
const IMAGES_USERGUIDE_PATH = 'images/user-guide/';
const AWS_REGION = 'us-east-1'

@Injectable()
export class DataServiceProvider {
  private logger: Logger;
  subsOnline: Subscription;
  subsOffline: Subscription;

  constructor(
    loggingService: LoggingService,
    private domSanitizer: DomSanitizer,
    private platform: Platform,
    private webview: WebView,
    private mobileFile: MobileFile,
    private storage: Storage,
    private store: Store<IAppState>,
    private http: HttpClient,
    private apiService: APIServiceExtended
  ) {
    this.logger = loggingService.getLogger('App.DataServiceProvider');
    this.init();
  }

  async init() {
    this.setupNetworkWatcher();
    await this.displayPlatform();

    this.store.select(getIsOnline)
      .pipe(take(1))
      .subscribe((isOnline) => {
        if (isOnline && navigator.onLine) {
          this.store.dispatch(new LoadReleaseNotesAndTermsOfUse());
        }
      });
  }

  async displayPlatform() {
    const platformSource = await this.platform.ready();
    this.logger.info('displayPlatform', `this app runs on ${platformSource}`);
  }

  setupNetworkWatcher() {
    if (navigator.onLine) {
      this.store.dispatch(new AppOnline());
    }
    this.subsOffline = fromEvent(window, 'offline').subscribe(() => {
      this.logger.info('window.offline');
      this.store.dispatch(new AppOffline());
    });
    this.subsOnline = fromEvent(window, 'online').subscribe(() => {
      this.logger.info('window.online');
      this.store.dispatch(new AppOnline());
    });
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

  private async getTerms(): Promise<TermsOfUse> {
    await this.storage.ready();
    const terms: TermsOfUse = await this.storage.get(TERMS_STORAGE_KEY);
    return terms;
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
  async saveTerms(terms: TermsOfUse) {
    await this.storage.ready();
    await this.storage.set(TERMS_STORAGE_KEY, terms);
    this.logger.info('saveTerms', 'terms have been saved');
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

  async addImage(options: IAddImageOptions): Promise<ExerciseMediaBean> {
    const newImageId = Guid.raw();
    await this.mobileFile.copyFile(options.origImagePath, options.origImageName, this.mobileFile.dataDirectory, newImageId);
    this.logger.info('addImage', `new image ${options.newImageName} copied`);
    let newEntry: ExerciseMediaBean;
    if (options.media) {
      newEntry = ExerciseMediaBean.copy(options.media);
      newEntry.images.push(newImageId);
    } else {
      newEntry = new ExerciseMediaBean({
        id: newImageId,
        name: options.newImageName,
        description: options.description,
        images: [newImageId],
        isDefault: false,
        muscles: new Set(),
      })
    };
    return newEntry;
  }

  async removeImage(options: IRemoveImageOptions): Promise<ExerciseMediaBean> {
    const index = options.media.images.indexOf(options.imageName);
    this.logger.info('removeImage', `old image ${options.imageName} to be deleted`);
    await this.deleteImage(options.media, index)
    const newEntry = ExerciseMediaBean.copy(options.media);
    newEntry.images.splice(index, 1);
    return newEntry;
  }

  async deleteMedia(media: ExerciseMediaBean): Promise<string> {
    await Promise.all(media.images.map((image, index) => {
      this.deleteImage(media, index)
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

  async exportWorkout(workoutId: string, sinedInUser: ISignedInUser): Promise<string> {
    try {
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
      const flattenImages = [].concat(...medias);
      this.logger.debug('exportWorkout', flattenImages);
      await Promise.all(flattenImages.map(image => {
        const parts = image.name.split('.');
        const ext = parts[parts.length-1];
        S3.put(`${workoutId}/${IMAGES_EXERCISES_PATH}${image.name}`, image.data, { contentType: `application/${ext}`, level: 'protected' });
      }));
      workoutsData.exercises.byId = exercisesById;
      imagesData.media.byId = imagesbyId;
      await S3.put(`${workoutId}/${WORKOUTS_STORAGE_KEY}`, JSON.stringify(workoutsData),
        { contentType: `application/json`, level: 'protected' });
      await S3.put(`${workoutId}/${IMAGES_STORAGE_KEY}`, JSON.stringify(imagesData),
        { contentType: `application/json`, level: 'protected' });
      this.logger.info('exportWorkout', 'workout has been exported to s3');
      return workoutId;
    } catch (err) {
      this.logger.error('exportWorkout', 'uploadin files to s3 error', err);
    }
  }

  async importWorkout(workoutId: string, workoutOwnerId: string):
    Promise<{ workoutsData: WorkoutsDataMaps, imagesData: MediaDataMaps }> {
    const myWorkoutGetResult: { Body: any } = await this.getProtectedS3File(
      `${workoutId}/${WORKOUTS_STORAGE_KEY}`, workoutOwnerId) as { Body: any };
    const myImagesGetResult: { Body: any } = await this.getProtectedS3File(
      `${workoutId}/${IMAGES_STORAGE_KEY}`, workoutOwnerId) as { Body: any };
    const result = {
      workoutsData: myWorkoutGetResult.Body as WorkoutsDataMaps,
      imagesData: myImagesGetResult.Body as MediaDataMaps,
    };

    if (this.isMobile) {
      await Promise.all(Object.keys(result.imagesData.media.byId).map(async (imageId) => {
        const image = result.imagesData.media.byId[imageId];
        this.updateAndCreateNewImage(image, workoutId, workoutOwnerId);
      }));
    }
    this.logger.info('importWorkout', 'imported and updated result', result);
    return result;
  }
  async updateAndCreateNewImage(image: ExerciseMediaBean, workoutId: string, workoutOwnerId: string) {
    await Promise.all(image.images.map(async (imageId) => {
      const getResult: { Body: any } = await this.getProtectedS3File(
        `${workoutId}/${IMAGES_EXERCISES_PATH}${imageId}`, workoutOwnerId) as { Body: any };
      const blob = getResult.Body;
      const file = await this.mobileFile.writeFile(this.mobileFile.dataDirectory, imageId, blob, { replace: true });
      this.logger.debug('updateAndCreateNewImage', `image ${imageId} imported`, file);
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
    return `assets/${IMAGES_EXERCISES_PATH}${imageName}`;
  }
  private getUserGuideImagePath(imageName: string): string {
    return `assets/${IMAGES_USERGUIDE_PATH}${imageName}`;
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

  safeUserGuideImage(imageName: string) {
    const imagePath = this.getUserGuideImagePath(imageName);
    const url = this.domSanitizer.bypassSecurityTrustUrl(imagePath);
    return url;
  }

  private readFilesData(fileNames: string[], files: Blob[]): Promise<{name: string, data: string|ArrayBuffer}[]> {
    return Promise.all(files.map((file: Blob, index: number) => {
      return this.readFileData(fileNames[index], file);
    }));
  }

  private readFileData(fileName: string, blob: Blob): Promise<{name: string, data: string|ArrayBuffer}> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve({ name: fileName, data: reader.result });
      };
      reader.readAsArrayBuffer(blob);
    });
  }
  private getS3File(path: string, options: object): Promise<{ Body: any }> { return S3.get(path, options) as Promise<{ Body: any }>; }
  private getProtectedS3File(path: string, identityId: string): Promise<{ Body: any }> {
    return S3.get(path, { identityId: `${AWS_REGION}:${identityId}`, download: true, level: 'protected' }) as Promise<{ Body: any }>;
  }

  async getReleaseNotesAndTermsOfUseFromS3(): Promise<{releaseNotes: Record<string, Version>, termsOfUse: TermsOfUse}> {
    const rn = await this.apiService.ListReleasesFull();
    this.logger.debug(`getReleaseNotesFromDynamo`, rn);
    const RN = 'release-notes.txt';
    const TOU = 'terms-of-use.txt';
    const PP = 'privacy-policy.txt';
    const files = { [RN]: null, [TOU]: null, [PP]: null };
    await Promise.all(Object.keys(files).map(async item => {
      const file = await this.getS3File(item, { download: true, level: 'public' });
      this.logger.debug(`getReleaseNotesAndTermsOfUseFromS3: ${item}`, file.Body);
      files[item] = file;
  }));
    const releaseNotesFile = releaseNotesJson;// files[RN];
    const releaseNotes: Record<string, Version> = {};
    Object.keys(releaseNotesFile).forEach(key => {
      const rnVersion = releaseNotesFile[key];
      const features = rnVersion.features.map(f => new Feature(f.name, f.description, f.on));
      releaseNotes[key] = new Version(key, rnVersion.name, features);
    });
    const conditions: string = files[TOU].Body;
    const privacyPolicy: string = files[PP].Body;
    let termsOfUse: TermsOfUse = await this.getTerms();
    if (!termsOfUse || termsOfUse.conditions !== conditions || termsOfUse.privacyPolicy !== privacyPolicy) {
      termsOfUse = { conditions, privacyPolicy, isAccepted: false };
      this.store.dispatch(new TermsNotAccpeted(termsOfUse));
    }
    return { releaseNotes, termsOfUse }
  }

  scrollToItem(items: any[], index: number) {
    const item = items[index];
      if (item) {
        item.scrollIntoView(this.isIos ? true : { behavior: 'smooth', block: 'start' });
      }
  }

}
