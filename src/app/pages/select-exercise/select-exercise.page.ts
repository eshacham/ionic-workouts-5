import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Store } from '@ngrx/store';
import { ExerciseMediaBean } from 'src/app/models/ExerciseMedia';
import { ExerciseSetBean } from 'src/app/models/ExerciseSet';
import { ExerciseBean } from 'src/app/models/Exercise';
import { Muscles } from 'src/app/models/enums';
import { MuscleFilterFor } from '../select-muscle/select-muscle.page';
import { IAppState } from '../../store/state/app.state';
import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { getHasDataBeenReset } from 'src/app/store/selectors/data.selectors';
import { getLibraryMusclesFilter } from 'src/app/store/selectors/musclesFilter.selectors';
import { getCurrentWorkout } from 'src/app/store/selectors/workouts.selectors';
import { Guid } from 'guid-typescript';
import { AddExerciseSets } from 'src/app/store/actions/exerciseSets.actions';
import { getExercisesMedias } from 'src/app/store/selectors/ExercisesMedia.selectors';
import { Logger, LoggingService } from 'ionic-logging-service';
import { DataServiceProvider } from 'src/app/providers/data-service/data-service';
import { AlertController } from '@ionic/angular';

interface SelectedExerciseMedia {
  isSelected: boolean;
  media: ExerciseMediaBean;
}

@Component({
  selector: 'app-select-exercise',
  templateUrl: './select-exercise.page.html',
  styleUrls: ['./select-exercise.page.scss'],
})
export class SelectExercisePage implements OnInit, OnDestroy {
  private logger: Logger;

  workoutId?: string;
  isSet = false;
  haveWorkoutsBeenReset = false;
  lastSelectedWorkoutDayId?: string;
  private musclesFilter: Muscles[];
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    loggingService: LoggingService,
    private router: Router,
    private dataService: DataServiceProvider,
    private route: ActivatedRoute,
    private store: Store<IAppState>,
    private alertController: AlertController,

    ) {
    this.logger = loggingService.getLogger('App.SelectExercisePage');
    this.selectedExerciseMedia = [];
  }

  selectedExerciseMedia: SelectedExerciseMedia[];
  get images(): SelectedExerciseMedia[] {
    return this.selectedExerciseMedia;
  }
  set images(images: SelectedExerciseMedia[]) {
    this.selectedExerciseMedia = images;
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

  get selectedImages(): SelectedExerciseMedia[] {
    return this.selectedExerciseMedia.filter(i => i.isSelected);
  }

  get hasSelecteion(): boolean {
    return this.selectedImages.length > 0;
  }

  get isAddExerciseDisabled(): boolean {
    return !this.hasSelecteion;
  }

  async ngOnInit() {
    this.store.select(getExercisesMedias)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(media => {
        this.images = media.images.map((image: ExerciseMediaBean) => {
          return {
            isSelected: false,
            media: ExerciseMediaBean
            .create(image.id, image.name, new Set(image.muscles), image.isDefault),
          };
        });
      });

    this.store.select(getHasDataBeenReset)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(reset => {
        this.logger.debug('ngOnInit', 'getHasDataBeenReset', reset);
        this.haveWorkoutsBeenReset = reset;
      });

    this.store.select(getLibraryMusclesFilter)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(async (filter) => {
        this.logger.debug('ngOnInit', 'getLibraryMusclesFilter', filter);
        this.musclesFilter = filter;
      });

    this.store.select(getCurrentWorkout)
      .pipe(take(1))
      .subscribe(async (currentWorkout) => {
        if (currentWorkout && currentWorkout.workout) {
          this.workoutId = currentWorkout.workout.id;
          const dayId = currentWorkout.selectedDayId;
          this.lastSelectedWorkoutDayId = dayId;
          this.logger.debug('ngOnInit', 'getCurrentWorkout', dayId);
        }
      });
  }

  ngOnDestroy() {
    this.logger.debug('ngOnDestroy');
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  get filteredImages(): SelectedExerciseMedia[] {
    if (!this.useFilter) {
      return this.images;
    }
    if (this.filteredMusclesCount === 0) {
      return [];
    }
    const images = this.selectedExerciseMedia.filter((image) => {
      const intersection =
        image.media.muscles.filter(imageMuscle => this.musclesFilter.includes(imageMuscle));
      return (intersection.length > 0);
    });
    return images;
  }

  setImageName(value: string, image: SelectedExerciseMedia) {
    image.media.name = value;
  }

  safeImage(media: ExerciseMediaBean): any {
    return this.dataService.safeImage(media);
  }
  addExercise() {
    const { sets, exes } = this.getNewSets();
    this.store.dispatch(new AddExerciseSets({
      dayId: this.lastSelectedWorkoutDayId,
      sets,
      exes
    }));
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  goBack() {
    this.logger.warn('go to home page', 'Workouts have been reset! Can\'t update it now');
    this.router.navigate(['']);
  }

  getNewSets(): { sets: ExerciseSetBean[], exes: ExerciseBean[] } {
    let newSets: ExerciseSetBean[];
    let newExercises: ExerciseBean[];
    let setIds: string[];

    if (this.isSet) {
      setIds = [Guid.raw()];
      newExercises = this.makeNewExercises(setIds);
      newSets = [this.makeNewSet(newExercises, this.workoutId, this.lastSelectedWorkoutDayId, setIds[0])];
    } else {
      setIds = this.selectedImages.map(_ => Guid.raw());
      newExercises = this.makeNewExercises(setIds);
      newSets = newExercises.map((exe, index) => {
        return this.makeNewSet([exe], this.workoutId, this.lastSelectedWorkoutDayId, setIds[index]);
      });
    }
    return { sets: newSets, exes: newExercises };
  }

  private makeNewExercises(setIds: string[]) {
    const newExercises = this.selectedImages
      .map((image, index) => {
        return ExerciseBean.create(
          Guid.raw(),
          this.isSet ? setIds[0] : setIds[index],
          this.lastSelectedWorkoutDayId,
          this.workoutId,
          image.media.id,
          image.media.name);
      });
    return newExercises;
  }

  private makeNewSet(
    newExercises: ExerciseBean[],
    workoutId: string,
    dayId: string,
    id: string): ExerciseSetBean {
    return ExerciseSetBean.create({
      id,
      workoutId,
      exercises: newExercises,
      dayId,
    });
  }

  async selectMuscle() {
    const extra: NavigationExtras = {
      relativeTo: this.route,
      state: {
        muscleFilterUsage: {
          for: MuscleFilterFor.SelectExercise
        }
      }
    };
    this.router.navigate(['select-muscle'], extra);
  }

  editImageName(event: any, img: SelectedExerciseMedia) {
    event.stopPropagation();
    this.presentAlertPrompt(img);
  }

  async presentAlertPrompt(img: SelectedExerciseMedia) {
    const alert = await this.alertController.create({
      header: 'Edit Name',
      inputs: [{
        name: 'text',
        id: 'text',
        type: 'textarea',
        value: img.media.name,
        placeholder: 'Enter exercise name here...'
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
            this.setImageName(data.text, img);
          } else {
            return false;
          }
        }
      }
      ]
    });

    alert.present();
  }

}
