import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { ActionSheetController, IonList, AlertController, PopoverController, ModalController } from '@ionic/angular';
import { FilePath } from '@ionic-native/file-path/ngx';
import { DataServiceProvider } from '../providers/data-service/data-service';
import { ExerciseMediaBean } from '../models/ExerciseMedia';
import { ToastService } from '../providers/toast-service/toast-service';
import { Muscles, MediaAction } from '../models/enums';
import { MuscleFilterFor } from '../pages/select-muscle/select-muscle.page';
import { IAppState } from '../store/state/app.state';
import { takeUntil, take } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { getLibraryMusclesFilter } from '../store/selectors/musclesFilter.selectors';
import { getExercisesMedias } from '../store/selectors/ExercisesMedia.selectors';
import {
  UpdateExerciseMedia,
  AddExerciseMedia,
  DeleteExerciseMedia,
  ResetScrollToExerciseMedia,
  InsertImageToExerciseMedia,
  RemoveImageFromExerciseMedia
} from '../store/actions/exercisesMedia.actions';
import { Logger, LoggingService } from 'ionic-logging-service';
import { getExerciseMediaUsage } from '../store/selectors/exercises.selectors';
import { SetExerciseSetInWorkoutDay, SelectWorkoutDay } from '../store/actions/workoutDays.actions';
import { ChooseMediaActionPopoverComponent } from '../components/choose-media-action-popover/choose-media-action-popover.component';
import { IAddImageOptions } from '../models/interfaces';
import { ExerciseDetailModalComponent } from '../components/exercise-detail-modal/exercise-detail-modal/exercise-detail-modal.component';
import { IonRouterOutlet } from '@ionic/angular';
import { getScrollToExerciseMediaId } from '../store/selectors/data.selectors';

export interface ExerciseMediaWithUsage {
  media: ExerciseMediaBean;
  usage: { workoutId: string, dayId: string }[];
  expanded: boolean;
}

@Component({
  selector: 'app-tab-library',
  templateUrl: 'tab-library.page.html',
  styleUrls: ['tab-library.page.scss']
})
export class TabLibraryPage implements OnInit, OnDestroy {
  private logger: Logger;
  @ViewChild(IonList, { static: true, read: ElementRef }) list: ElementRef;
  slideOpts = {
    slidesPerView: 3,
    zoom: false,
  };
  private musclesFilter: Muscles[];
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  exerciseMediaWithUsage: ExerciseMediaWithUsage[];
  get images(): ExerciseMediaWithUsage[] {
    return this.exerciseMediaWithUsage;
  }
  set images(images: ExerciseMediaWithUsage[]) {
    this.exerciseMediaWithUsage = images;
  }

  isUsingFilter = false;
  get useFilter(): boolean {
    return this.isUsingFilter;
  }
  set useFilter(use: boolean) {
    if (this.isUsingFilter !== use) {
      this.isUsingFilter = use;
    }
  }

  get filteredMusclesCount() {
    return this.musclesFilter.length;
  }

  isMobile = false;
  get IsMobile() {
    return this.isMobile;
  }

  constructor(
    loggingService: LoggingService,
    private camera: Camera,
    private actionSheetController: ActionSheetController,
    private toastService: ToastService,
    private filePath: FilePath,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataServiceProvider,
    private alertController: AlertController,
    private popoverCtrl: PopoverController,
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private store: Store<IAppState>) {
    this.exerciseMediaWithUsage = [];
    this.logger = loggingService.getLogger('App.TabLibraryPage');
  }

  ngOnInit() {
    this.isMobile = this.dataService.isMobile;

    this.store.select(getExercisesMedias)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(media => {
        this.images = media.map(m => ({
          media: m,
          usage: [],
          expanded: false,
          selectedIndex: 0,
        }));
        for (const img of this.images) {
          this.refreshImageUsage(img);
        }
      });

    this.store.select(getLibraryMusclesFilter)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((filter) => {
        this.logger.debug('ngOnInit', 'getLibraryMusclesFilter', filter);
        this.musclesFilter = filter;
      });
  }
  ionViewDidEnter() {
    this.logger.debug('ionViewDidEnter', 'getting getExercisesMedias');
    this.images.filter(i => i.expanded)
      .forEach(image => this.refreshImageUsage(image));

    this.store.select(getScrollToExerciseMediaId)
      .pipe(take(1))
      .subscribe(mediaId => {
        if (mediaId && this.images.length > 0) {
          const scrollTo = this.images.findIndex(i => i.media.id === mediaId)
          this.store.dispatch(new ResetScrollToExerciseMedia());
          this.logger.info('ionViewDidEnter', 'need to scroll to media', scrollTo);
          setTimeout(() => this.scrollTo(scrollTo), 1);
        }
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private presentToast(text: string) {
    this.toastService.presentToast(text);
  }

  async captureImage(media: ExerciseMediaBean = null) {
    const options = {
      header: 'Select Image source',
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY, media);
        }
      }, {
        text: 'Use Camera',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.CAMERA, media);
        }
      }]
    };

    const actionSheet = await this.actionSheetController.create(options);
    this.logger.debug('selectImage', 'presenting action sheet!');
    await actionSheet.present();
  }

  private async takePicture(sourceType: PictureSourceType, media: ExerciseMediaBean = null) {
    const options: CameraOptions = {
      quality: 100,
      sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
    const imagePath = await this.camera.getPicture(options);
    this.logger.debug('takePicture', 'took picture as: ', imagePath);
    let origImageName: string;
    let origImagePath: string;

    if (this.dataService.isAndriod && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
      origImageName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
      const tempPath = await this.filePath.resolveNativePath(imagePath);
      origImagePath = tempPath.substr(0, tempPath.lastIndexOf('/') + 1);
    } else {
      origImageName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      origImagePath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
    }
    const newImageName = `${new Date().getTime()}.jpg`;
    this.addNewImage({
      origImagePath,
      origImageName,
      newImageName,
      media,
    });
  }

  private addNewImage(options: IAddImageOptions) {
    if (options.media) {
      this.store.dispatch(new InsertImageToExerciseMedia(options));
      this.presentToast('Image inserted');
    } else {
      this.store.dispatch(new AddExerciseMedia(options));
      setTimeout(() => this.scrollTo(0), 1);
    }
  }

  private scrollTo(index: number) {
    this.useFilter = false;
    this.logger.info('scrollTo', `need to scroll to image ${index}`, this.images[index]);
    const items = this.list.nativeElement.children;
    const image = items[index];
    if (image) {
      if (this.dataService.isIos) {
        image.scrollIntoView(true);
      } else {
        image.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    }
  }

  async deleteImage(imgEntry: ExerciseMediaBean) {
    this.store.dispatch(new DeleteExerciseMedia({ image: imgEntry }));
    this.presentToast('Exercise deleted.');
  }

  selectMediaAction(media: ExerciseMediaWithUsage, event: any, selectedIndex: number) {
    event.stopPropagation();
    this.presentActionsPopover(event, media, selectedIndex);
  }
  async presentActionsPopover(
    event: Event,
    media: ExerciseMediaWithUsage,
    selectedIndex: number
  ) {
    const popover = await this.popoverCtrl.create({
      component: ChooseMediaActionPopoverComponent,
      event,
      componentProps: {
        media,
        selectedIndex,
      }
    });
    popover.present();
    popover.onDidDismiss()
      .then(result => {
        this.logger.info('onDidDismiss', result.data as MediaAction);
        switch (result.data) {
          case MediaAction.ShowUsage:
          case MediaAction.HideUsage:
            this.expandItem(media);
            break;
          case MediaAction.ViewLarge:
            this.viewLarge(media, selectedIndex);
            break;
          case MediaAction.InsertImage:
            this.insertImage(media);
            break;
          case MediaAction.DeleteImage:
            this.removeImage(media, selectedIndex);
            break;
          case MediaAction.MoveAhead:
            this.moveAhead(media, selectedIndex);
            break;
          default:
            break;
        }
      });
  }

  expandItem(item: ExerciseMediaWithUsage): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.refreshImageUsage(item);
      this.images.map(listItem => {
        if (item === listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }
  viewLarge(item: ExerciseMediaWithUsage, selectedIndex: number): void {
    this.logger.debug('viewLarge', item.media.name, selectedIndex);
    this.presentDetailModal(item.media, selectedIndex);
  }

  insertImage(item: ExerciseMediaWithUsage): void {
    this.logger.debug('insertImage', item.media.name);
    this.captureImage(item.media);
  }

  removeImage(item: ExerciseMediaWithUsage, selectedIndex: number): void {
    this.logger.debug('removeImage', item.media.name, selectedIndex);
    this.store.dispatch(new RemoveImageFromExerciseMedia({
      imageName: item.media.images[selectedIndex],
      media: item.media,
    }));
    this.presentToast('Image removed');
  }
  moveAhead(item: ExerciseMediaWithUsage, selectedIndex: number): void {
    this.logger.debug('moveAhead', item.media.name, selectedIndex);
    if (selectedIndex < item.media.images.length - 1) {
      const elements = [...item.media.images];
      [elements[selectedIndex], elements[selectedIndex + 1]] =
        [elements[selectedIndex + 1], elements[selectedIndex]];
      this.logger.debug('moveAhead', elements);
      this.updateImage(item.media, null, elements);
    }
  }

  refreshImageUsage(image: ExerciseMediaWithUsage) {
    this.store.select(getExerciseMediaUsage(image.media.id))
      .pipe(take(1))
      .subscribe(usage => {
        image.usage = usage;
      });
  }
  goToWorkoutDay(usage: { workoutId: string, dayId: string, setId: string }, event: any) {
    this.logger.info('goToWorkoutDay', `going to workout ${usage.workoutId}, day ${usage.dayId}`);
    this.store.dispatch(new SelectWorkoutDay(usage));
    setTimeout(() => {
      const payload = { ...usage };
      this.store.dispatch(new SetExerciseSetInWorkoutDay(payload));
      this.router.navigateByUrl('/tabs/tab-workouts/workout');
    }, 100);
    event.stopPropagation();
  }
  updateImage(image: ExerciseMediaBean, name?: string, images?: string[]) {
    this.logger.debug('updateImage', name, images);
    this.store.dispatch(new UpdateExerciseMedia({ id: image.id, name, images }));
    this.presentToast('Image updated.');
  }

  safeImage(media: ExerciseMediaBean, index: number): any {
    return this.dataService.safeImage(media, index);
  }

  async setMuscle(imgEntry: ExerciseMediaBean) {
    const extra: NavigationExtras = {
      relativeTo: this.route,
      state: {
        muscleFilterUsage: {
          for: MuscleFilterFor.SetExerciseMedia,
          mediaId: imgEntry.id
        }
      }
    };
    this.router.navigate(['select-muscle'], extra);
  }

  async selectMuscle() {
    const extra: NavigationExtras = {
      relativeTo: this.route,
      state: {
        muscleFilterUsage: {
          for: MuscleFilterFor.FilterLibraryImages
        }
      }
    };
    this.router.navigate(['select-muscle'], extra);
  }

  get filteredImages(): ExerciseMediaWithUsage[] {
    if (!this.useFilter) {
      return this.images;
    }
    if (this.filteredMusclesCount === 0) {
      return [];
    }
    const images = this.exerciseMediaWithUsage.filter((image) => {
      const intersection =
        image.media.muscles.filter(imageMuscle => this.musclesFilter.includes(imageMuscle));
      return (intersection.length > 0);
    });
    return images;
  }

  editImageName(event: any, img: ExerciseMediaWithUsage) {
    event.stopPropagation();
    this.presentAlertPrompt(img);
  }

  async presentAlertPrompt(img: ExerciseMediaWithUsage) {
    const alert = await this.alertController.create({
      header: 'Edit Name',
      inputs: [{
        name: 'text',
        id: 'text',
        type: 'textarea',
        value: img.media.name,
        placeholder: 'Enter media name here...'
      },
      ],
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          this.logger.debug('presentAlertPrompt', 'edit cancelled');
        }
      }, {
        text: 'Save',
        handler: (data) => {
          if (data.text) {
            this.logger.debug('presentAlertPrompt', 'saving text', data.text);
            this.updateImage(img.media, data.text);
          } else {
            return false;
          }
        }
      }
      ]
    });

    alert.present();
  }

  async presentDetailModal(media: ExerciseMediaBean, selectedIndex) {
    const modal = await this.modalController.create({
      component: ExerciseDetailModalComponent,
      componentProps: { media, selectedIndex },
      swipeToClose: true,
      // presentingElement: this.routerOutlet.nativeEl,
      cssClass: 'auto-height',
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    this.logger.info('presentDetailModal', 'onWillDismiss', data);
  }

}
