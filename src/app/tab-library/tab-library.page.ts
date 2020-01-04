import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import { FilePath } from '@ionic-native/file-path/ngx';
import { DataServiceProvider } from '../providers/data-service/data-service';
import { ExerciseMediaBean } from '../models/ExerciseMedia';
import { ToastService } from '../providers/toast-service/toast-service';
import { Muscles } from '../models/enums';
import { MuscleFilterFor } from '../pages/select-muscle/select-muscle.page';
import { IAppState } from '../store/state/app.state';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { getLibraryMusclesFilter } from '../store/selectors/musclesFilter.selectors';
import { getExercisesMedias } from '../store/selectors/ExercisesMedia.selectors';
import { UpdateExerciseMedia, AddExerciseMedia, DeleteExerciseMedia } from '../store/actions/exercisesMedia.actions';
import { Logger, LoggingService } from 'ionic-logging-service';

interface ExerciseMediaWithUsage {
  media: ExerciseMediaBean;
  usage: { workoutId: string, dayId: string }[];
  open: boolean;
}

@Component({
  selector: 'app-tab-library',
  templateUrl: 'tab-library.page.html',
  styleUrls: ['tab-library.page.scss']
})
export class TabLibraryPage implements OnInit, OnDestroy {
  private logger: Logger;
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
          open: false
        }));
      });

    this.store.select(getLibraryMusclesFilter)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((filter) => {
        this.logger.debug('ngOnInit', 'getLibraryMusclesFilter', filter);
        this.musclesFilter = filter;
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private presentToast(text: string) {
    this.toastService.presentToast(text);
  }

  async selectImage() {
    const options = {
      header: 'Select Image source',
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      }, {
        text: 'Use Camera',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.CAMERA);
        }
      }]
    };

    const actionSheet = await this.actionSheetController.create(options);
    this.logger.debug('selectImage', 'presenting action sheet!');
    await actionSheet.present();
  }

  private async takePicture(sourceType: PictureSourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
    const imagePath = await this.camera.getPicture(options);
    this.logger.debug('takePicture', 'took picture as: ', imagePath);
    let imageName: string;
    let ImagePath: string;

    if (this.dataService.isAndriod && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
      imageName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
      const tempPath = await this.filePath.resolveNativePath(imagePath);
      ImagePath = tempPath.substr(0, tempPath.lastIndexOf('/') + 1);
    } else {
      imageName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      ImagePath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
    }
    const newImageName = `${new Date().getTime()}.jpg`;
    this.addNewImage(ImagePath, imageName, newImageName);
  }

  private addNewImage(imagePath: string, imageName: string, newImageName: string) {
    this.store.dispatch(new AddExerciseMedia({
      origPath: imagePath,
      origName: imageName,
      newName: newImageName
    }));
  }

  async deleteImage(imgEntry: ExerciseMediaBean) {
    this.store.dispatch(new DeleteExerciseMedia({ image: imgEntry }));
    this.presentToast('File removed.');
  }

  updateImage(value: string, image: ExerciseMediaBean) {
    this.logger.debug('updateImage', `updating image name to ${value}`);
    this.store.dispatch(new UpdateExerciseMedia({ id: image.id, name: value }));
    this.presentToast('File updated.');
  }

  safeImage(media: ExerciseMediaBean): any {
    return this.dataService.safeImage(media);
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

  getFilteredImages(): ExerciseMediaWithUsage[] {
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

}
