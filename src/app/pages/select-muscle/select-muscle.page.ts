import { Subscription, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Muscles } from 'src/app/models/enums';
import { IAppState } from 'src/app/store/state/app.state';
import {
  SetExerciseMuscleFilter,
  AddLibraryMuscleFilter,
  AddExerciseMuscleFilter,
  DeleteLibraryMuscleFilter,
  DeleteExerciseMuscleFilter
} from '../../store/actions/musclesFilter.actions';
import { takeUntil, take } from 'rxjs/operators';
import { getLibraryMusclesFilter, getExerciseMusclesFilter } from 'src/app/store/selectors/musclesFilter.selectors';
import { getExerciseMedia } from 'src/app/store/selectors/ExercisesMedia.selectors';
import { Logger, LoggingService } from 'ionic-logging-service';

interface MuscleGroupPath {
  id: string;
  data: string;
  transform?: string;
  opacity?: number;
}
interface MuscleGroup {
  name: Muscles;
  isSelected: boolean;
  paths: MuscleGroupPath[];
}
interface MuscleFilterUsage {
  mediaId?: string;
  mediaName?: string;
  for: MuscleFilterFor;
}

export enum MuscleFilterFor {
  NoSet,
  FilterLibraryImages,
  SelectExercise,
  SetExerciseMedia,
}

@Component({
  selector: 'app-select-muscle',
  templateUrl: './select-muscle.page.html',
  styleUrls: ['./select-muscle.page.scss'],
})
export class SelectMusclePage implements OnInit, OnDestroy {
  private logger: Logger;
  subs: Subscription;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  muscleGroups: MuscleGroup[];
  muscleFilterUsage: MuscleFilterUsage = {
    for: MuscleFilterFor.NoSet
  };
  get isSettingMedia(): boolean {
    return this.muscleFilterUsage.for === MuscleFilterFor.SetExerciseMedia;
  }
  get mediaToSet(): string {
    return this.muscleFilterUsage.mediaName;
  }
  get isFilteringLibrary(): boolean {
    return (
      this.muscleFilterUsage.for === MuscleFilterFor.FilterLibraryImages ||
      this.muscleFilterUsage.for === MuscleFilterFor.SelectExercise);
  }

  get selectedPaths(): string[] {
    const paths: string[] = [];
    this.muscleGroups
      .filter(group => group.isSelected)
      .forEach(group => {
        group.paths.forEach(path => paths.push(path.id));
      });
    return paths;
  }

  constructor(
    loggingService: LoggingService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<IAppState>) {
      this.logger = loggingService.getLogger('App.SelectMusclePage');
      this.initMuscleGroups();

      this.subs = this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.muscleFilterUsage = this.router.getCurrentNavigation().extras.state.muscleFilterUsage;
        if (this.isSettingMedia) {
          this.store.select(getExerciseMedia(this.muscleFilterUsage.mediaId))
            .pipe(take(1))
            .subscribe(image => {
              this.logger.debug('ctor', 'getExerciseMedia', image);
              this.muscleFilterUsage.mediaName = image.name;
              this.store.dispatch(new SetExerciseMuscleFilter(image.muscles));
            });
        }
      }
    });
  }

  ngOnInit() {
    /// todo: removing this empty method, messes up the sequence of events
    /// and the exercise media muscles are not shown initialy!
  }

  ionViewWillEnter() {
    if (this.isFilteringLibrary) {
      this.store.select(getLibraryMusclesFilter)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((filter) => {
          this.logger.debug('ionViewWillEnter', 'getLibraryMusclesFilter', filter);
          this.setMuscleGroupsSelection(filter);
        });
    } else {
      this.store.select(getExerciseMusclesFilter)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((filter) => {
          this.logger.debug('ionViewWillEnter', 'getExerciseMusclesFilter', filter);
          this.setMuscleGroupsSelection(filter);
        });
    }
  }

  ngOnDestroy() {
    this.logger.debug('ngOnDestroy');
    this.subs.unsubscribe();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private setMuscleGroupsSelection(muscles: Muscles[]): void {
    this.muscleGroups.forEach(group => {
      group.isSelected = muscles.includes(group.name);
    });
  }

  toggleMuscle(muscle: MuscleGroup) {
    muscle.isSelected = !muscle.isSelected;
    if (muscle.isSelected) {
        this.addMuscleToFilter(muscle.name);
    } else {
        this.deleteMuscleFromFilter(muscle.name);
    }
  }

  getAnimationHref(pathId: string): string {
    return `#${pathId}`;
  }

  addMuscleToFilter(muscle: Muscles) {
    if (this.isFilteringLibrary) {
      this.store.dispatch(new AddLibraryMuscleFilter(muscle));
    } else {
      this.logger.info('addMuscleToFilter', muscle);
      this.store.dispatch(new AddExerciseMuscleFilter({
        muscle, mediaId: this.muscleFilterUsage.mediaId
      }));
    }
  }
  deleteMuscleFromFilter(muscle: Muscles) {
    if (this.isFilteringLibrary) {
      this.store.dispatch(new DeleteLibraryMuscleFilter(muscle));
    } else {
      this.store.dispatch(new DeleteExerciseMuscleFilter({
        muscle, mediaId: this.muscleFilterUsage.mediaId
      }));
    }
  }

  getButtonFill(group: MuscleGroup): string {
    return group.isSelected ? 'outline' : 'clear';
  }

  private initMuscleGroups() {
    // tslint:disable: max-line-length
    this.muscleGroups = [
      {
        name: Muscles.Chest,
        isSelected: false,
        paths: [
          { id: 'checst1', data: 'M105.321,143.879 c-31.667,19.187-4.4,86.941,42.714,68.469C180.482,199.627,171.73,103.642,105.321,143.879z' },
          { id: 'checst2', data: 'M187.94,212.348 c47.115,18.472,74.381-49.283,42.714-68.469C164.246,103.642,155.494,199.627,187.94,212.348z' },
        ]
      },
      {
        name: Muscles.Abs,
        isSelected: false,
        paths: [
          { id: 'abs', data: 'M162.673,394.837 c-15.864-2.7-17.436-27.3-20.74-40.116c-4.812-18.664-7.426-35.261-7.466-54.592c-0.034-16.125-4.187-32.254-4.473-48.431 c-0.21-11.879-2.722-31.974,11.018-37.342c8.293-3.24,18.01-3.583,26.825-3.292c6.906,0.228,13.668,0.08,20.417,1.97 c15.421,4.32,14.734,21.916,14.369,35.217c-0.476,17.307-4.523,34.634-4.559,51.878c-0.042,19.989-2.816,33.448-10.447,51.783 C183.671,361.393,175.381,393.455,162.673,394.837z'}
        ]
      },
      {
        name: Muscles.Biceps,
        isSelected: false,
        paths: [
          { id: 'bicep1', data: 'M62.541,270.295 c15.092-7.451,23.222-33.982,26.27-43.311c3.19-9.767,5.692-20.13,5.527-30.468c-0.145-9.043-4.808-13.77-7.344-21.167 c-8.048,9.309-17.029,17.62-22.093,29.086C55.888,224.84,58.693,249.051,62.541,270.295L62.541,270.295z'},
          { id: 'bicep2', data: 'M257.578,269.332 c-12.031-8.116-21.989-32.808-24.087-42.433c-2.197-10.077-1.055-23.615,1.195-33.951c2.132-9.792,6.471-13.56,6.902-21.356 c-0.154,2.786,15.25,14.54,18.645,25.562C266.743,218.284,261.624,247.778,257.578,269.332L257.578,269.332z'}
        ]
      },
      {
        name: Muscles.Traps,
        isSelected: false,
        paths: [
          { id: 'traps1', data: 'M138.002,103.71 c-1.598,3.309,17.958,32.094,17.384,32.285c-0.574,0.191-25.161-10.889-57.884-10.889 C92.535,125.106,135.167,109.583,138.002,103.71z'},
          { id: 'traps2', data: 'M189.699,106.72 c1.525,3.079-17.149,29.858-16.602,30.035C175.75,141,198.25,122.5,229.5,122.5C234.244,122.5,192.406,112.184,189.699,106.72z'},
          { id: 'traps3', data: 'M385.5,239.25c10.75-64.5-2.75-107.5-12.25-120 c-5.944-7.822,13.99-12.928,13.25-37c-0.5-16.25-5.5-13.5-9-9c-2.064,2.655,5.5,31-47.25,45.75c0,0,23.375,13.375,26.375,18.375 S365.5,162.625,359,180c-9.5,16.5,14.75,49.25,14.25,47L385.5,239.25z'},
          { id: 'traps4', data: 'M399.5,240c-5.5-37.5,4.42-111.544,12.25-120 c6.25-6.75-13.99-12.928-13.25-37c0.5-16.25,5.5-13.5,9-9c2.064,2.655-10.25,33.25,42.5,48c0,0-19.25,5.75-25.25,16.875 c-4.223,7.83,4.75,21.375,4,41.625c3.875,21.25-17.5,49.5-17,47.25L399.5,240z'},
        ]
      },
      {
        name: Muscles.Shoulders,
        isSelected: false,
        paths: [
          { id: 'shoulders1', data: 'M91.75,124.75 c-38.433,3.328-42.583,49.926-30.5,80.25c10.235-12.758,21.333-26.654,27.125-42.049C95.258,144.657,106.27,132.42,127,131.25 C116.071,128.278,103.175,123.761,91.75,124.75C68.108,126.797,100.678,123.977,91.75,124.75z'},
          { id: 'shoulders2', data: 'M239.25,125c33.596,3.149,29.88,47.657,26.25,75 c-10.235-12.758-18.833-22.654-24.625-38.049c-6.883-18.294-17.895-30.531-38.625-31.701 C213.179,127.278,231.25,124.25,239.25,125z'},
          { id: 'shoulders3', data: 'M322,121c-52.409,6.62-34.355,65.447-34.5,62.75 c0,0,19.25-33.125,29.375-40.875c20.5-1.625,26.777-0.312,30-4.25C350.105,134.677,331.75,134,322,121z'},
          { id: 'shoulders4', data: 'M455.408,122.5c48.217,2.375,41.855,62.197,42,59.5 c0,0-15.658-31.875-28.408-36.25c-7.75-0.375-20.125-4.375-29.5-7C436.375,136.375,441.125,128.625,455.408,122.5z'}
        ]
      },
      {
        name: Muscles.Triceps,
        isSelected: false,
        paths: [
          { id: 'triceps1', data: 'M468.652,155.209 c23.708,9.763,32.072,39.548,34.954,62.156c1.382,10.846,4.354,27.293-1.44,37.302c-3.68,6.356-5.484-4.679-5.727-6.57 c-0.452-3.534-6.135-11.487-7.745-3.429c-0.804,4.016,1.918,7.697-2.303,10.877c-3.404,2.566-9.573,2.332-12.99-0.209 c-6.178-4.592-4.973-13.691-5.414-20.33c-0.46-6.913-4.108-12.975-5.199-19.809c-1.771-11.103,0.146-20.944,1.54-31.873 C465.593,173.414,463.835,164.289,468.652,155.209z'},
          { id: 'triceps2', data: 'M318.029,153.209 c-23.709,9.763-32.073,39.548-34.954,62.156c-1.382,10.846-4.354,27.293,1.44,37.302c3.68,6.356,5.483-4.679,5.727-6.57 c0.451-3.534,6.134-11.487,7.744-3.429c0.804,4.016-1.918,7.697,2.303,10.877c3.404,2.566,9.574,2.332,12.991-0.209 c6.177-4.592,4.972-13.691,5.414-20.33c0.46-6.913,4.107-12.975,5.198-19.809c1.771-11.103-0.146-20.944-1.54-31.873 C321.089,171.414,322.847,162.289,318.029,153.209z'},
          { id: 'triceps3', data: 'M54.813,196.839 c-1.509,9.517-4.678,4.292-4.981,32.689c-0.302,28.397,6.793,25.328,8.151,29.472c0,0-5.765-34.569,0.906-47.272 C61.305,207.128,54.813,196.839,54.813,196.839z'},
          { id: 'triceps4', data: 'M267.527,203.507 c0.945,9.018,3.733,4.179,3.076,30.971c-0.658,26.791-6.428,23.698-7.685,27.567c0,0,5.873-32.441,0.763-44.61 C261.83,213.03,267.527,203.507,267.527,203.507z'}
        ]
      },
      {
        name: Muscles.Lats,
        isSelected: false,
        paths: [
          { id: 'lats1', data: 'M439.5,199.5c-10.85-1.05-34.25,40.75-37,44.25 c0,0-2.25,9.75-1.5,16s22.75,19.5,24,42.5s10.25,17.5,10.75,17.5c0,0,8-25.75,10.5-43.5s11.75-40.5,11.75-40.5l1.25-3.25 c0,0,1-3.5,1.25-4.75s0.228-19.854-2-23.5C455.75,199.75,447.25,200.25,439.5,199.5z'},
          { id: 'lats2', data: 'M355.75,202 c13.168,14.9,20.091,31.644,28.031,41.75c0,0,2.25,9.75,1.5,16s-22.75,19.5-24,42.5s-10.25,17.5-10.75,17.5 c0,0-12.031-25-14.531-42.75s-7.719-41.25-7.719-41.25l-1.25-3.25c0,0-1-3.5-1.25-4.75s0.469-23.5,1.969-24.25 C328.216,203.267,352.59,198.423,355.75,202z'},
          { id: 'lats3', data: 'M 208 219 c 8.3 -2 19.5 -8.8 20.3 -9.5 s 3.3 16.5 1.3 24 L 228 240 L 208 219 z'},
          { id: 'lats4', data: 'M 125 218.3 c -8.3 -2 -25 -14.5 -25.8 -15.3 S 93 223.8 95 231.3 l 2.3 7.5 L 125 218.3 z'}
        ]
      },
      {
        name: Muscles.Obliques,
        isSelected: false,
        paths: [
          { id: 'obliques1', data: 'M346.5,320.75 c-2.056-11.336-8.909-30.065-10.28-32.529c-1.37-2.464-1.827-1.971-1.827-1.971l-1.143,31.79L346.5,320.75z'},
          { id: 'obliques2', data: 'M438.25,320.75c2.056-11.336,7.629-28.036,9-30.5 c1.37-2.464,1.25-5,1.25-5l3,30.039L438.25,320.75z'},
          { id: 'obliques3', data: 'M207.977,224c-0.899,4-6.066,117.5-4.269,119.75 c0,0,18.648-15.5,19.322-26.5c0.674-11-1.797-29-1.124-37c0.674-8,3.82-29.5,3.595-34.5S207.977,224,207.977,224z'},
          { id: 'obliques4', data: 'M125.5,223c1.01,4,4.271,119.25,2.25,121.5 c0,0-23.992-19-24.75-30s3.758-28.5,3-36.5c-0.757-8-6.03-30-5.777-35C100.475,238,125.5,223,125.5,223z'}
        ]
      },
      {
        name: Muscles.Back,
        isSelected: false,
        paths: [
          { id: 'back1', data: 'M328,144.75c-0.625,46.125,25.25,65.5,27.75,34.125 c0,0-5.516-40.353-7.125-38C345.375,145.625,328,144.75,328,144.75z'},
          { id: 'back2', data: 'M463.002,148.5c2.916,48.25-31.5,57.747-29.25,37.75 c2.25-34.336,3.248-45.375,4.623-45.875C443.375,141.125,463.002,148.5,463.002,148.5z'},
        ]
      },
      {
        name: Muscles.Forearms,
        isSelected: false,
        paths: [
          { id: 'forearms1', data: 'M232.75,245.5c0.5,27.25,2.25,49.25,5.75,59.5 s20.5,46.5,21.5,47.25s14,0.75,14,0.75s-11.25-30.75-12.25-33.75s-1.5-11-2-18s-2.5-16.25-3.5-19.5S232.75,245.5,232.75,245.5z'},
          { id: 'forearms2', data: 'M84.25,253.5c-0.5,27.25-5.75,43.5-9.25,53.75 s-25,47.5-26,48.25s-9.5-0.25-9.5-0.25s11.25-30.75,12.25-33.75s4.5-10.25,5-17.25S60,287,61,283.75S84.25,253.5,84.25,253.5z'},
          { id: 'forearms3', data: 'M47.25,249c-6,21-9.5,16.25-11.25,49.5 S28.75,347,29.25,350s6.25,4,6.25,4s13.429-36.643,14.5-39.5c1.5-4,13.75-33,11.5-38.75S47.25,249,47.25,249z'},
          { id: 'forearms4', data: 'M270.25,254.5c6,21,7,11.25,8.75,44.5 s1.25,49,0.75,52s-3.25,2.5-3.25,2.5s-7.179-32.393-8.25-35.25c-1.5-4-13.008-36.75-10.758-42.5S270.25,254.5,270.25,254.5z'},
          { id: 'forearms5', data: 'M281.75,255c5.75,7,15,6.5,17,19.5 S291,355.25,291,355.25l-6.5-0.75l-1.5-56c0,0-3.5-25-3.25-27.75S280,268,280,268L281.75,255z'},
          { id: 'forearms6', data: 'M506.5,255c-4.574,7.818-10.323,16.347-10.25,29.5 c0.074,13.153,15.75,75.75,15.75,75.75l12.25-2.75l-7.75-56.75c0,0-4.862-27.836-5.542-30.512 c-0.681-2.676-0.681-2.676-0.681-2.676L506.5,255z'},
          { id: 'forearms7', data: 'M317,253c-10,13-16.75,63.5-19,74.25 s-2.75,24.25-2.75,24.25S310.5,313,311.5,307s6.25-9,7.75-29.75S317,253,317,253z'},
          { id: 'forearms8', data: 'M472.75,258.5c17.75,8.25,26.25,60,28.5,70.75 s4.5,27.25,4.5,27.25S481.355,318,480.355,312s-6.25-9-7.75-29.75S472.75,258.5,472.75,258.5z'}
        ]
      },
      {
        name: Muscles.Glutes,
        isSelected: false,
        paths: [
          { id: 'glutes1', data: 'M333,363c13.334-15.167,22.667-26.833,24.667-27.5 S337,327,335.5,326.333S333,363,333,363z'},
          { id: 'glutes2', data: 'M459.126,358 c-13.334-15.167-22.667-26.833-24.667-27.5s16.541-10,18.041-10.667S459.126,358,459.126,358z'},
          { id: 'glutes3', data: 'M361.334,336.998 c17.666,6.833,34.666,21.5,34.833,41.667c0.167,20.166-2.167,27.834-6.667,32.333s-4.667,8.833-20.5,8.667s-27.834-2.834-32.5-17 c-4.666-14.167-4.167-27.833-2.667-33S361.334,336.998,361.334,336.998z'},
          { id: 'glutes4', data: 'M434.5,333.164 c-17.666,6.833-33.544,21.667-33.711,41.833s2.166,28.168,6.666,32.667s5.545,8.332,21.378,8.166s24.001-4.668,28.667-18.834 c4.666-14.167,3.167-29,1.667-34.167S434.5,333.164,434.5,333.164z'}
        ]
      },
      {
        name: Muscles.Fingers,
        isSelected: false,
        paths: [
          { id: 'fingers1', data: 'M27.501,359.992 c-4.5,8.833-11.167,12.667-11,19.833s2.667,10.001,2.667,12.667s17.333-11.667,18.5-14.5S27.501,359.992,27.501,359.992z'},
          { id: 'fingers2', data: 'M34.667,362.659c3.5,1.5,11,5.833,12.5,8.5 s4.333,8.333,3.5,14.833l-9.5-8.333L34.667,362.659z'},
          { id: 'fingers3', data: 'M284.648,362.992c4.5,8.833,11.353,9.5,11,19.833 c-0.244,7.164-2.666,10-2.666,12.667s-20.502-11.141-20.981-14.167C270.02,368.825,284.648,362.992,284.648,362.992z'},
          { id: 'fingers4', data: 'M271.501,363.992 c-3.284,1.928-10.513,7.666-11.667,10.5s-2.467,10.893-0.823,17.236l8.377-9.459L271.501,363.992z'},
          { id: 'fingers5', data: 'M506.834,373.325 c-2.5,11.333-4.167,20.501-1,24.667s22.334-0.334,24.667-0.667s8.166-5.167,9.833-7s2.167-8.5-3-13.333s-7-7.833-7-7.833 L506.834,373.325z'},
        ]
      },
      {
        name: Muscles.Adductors,
        isSelected: false,
        paths: [
          { id: 'adductors1', data: 'M117,344.25c8.25,27.5,16,50.75,21.25,64.25 s13.25,60.25,13.25,60.25s1.5-38.5-3.75-54.25s-15-45.5-18.25-50.25S117,344.25,117,344.25z'},
          { id: 'adductors2', data: 'M210,349.5c-8.25,27.5-19,46.75-24.25,60.25 s-15.552,61-15.552,61s-1.5-38.5,3.75-54.25s17.302-44.25,20.552-49S210,349.5,210,349.5z'},
          { id: 'adductors3', data: 'M139.25,381c-2.116-1.774,12,20.25,14.75,22.75 s6.25,3.5,10.5-2s17.5-22.5,19.25-24.75s-8,25.5-7,24.75s-10,19.75-10.25,55.25s-0.25,13.75-0.25,13.75l-4.75-64.5l-2-1l-3,1 c0,0,0.25,10.75,0.5,18.75c0.244,7.811-1.75,46-2,47.75s-0.25,1.75-0.25,1.75S147,387.5,139.25,381z'}
        ]
      },
      {
        name: Muscles.Quads,
        isSelected: false,
        paths: [
          { id: 'quads1', data: 'M109.25,332.5 c2.25,17.25-5.083,20.15-9.417,33.817C96.318,377.405,85.75,415.25,86.25,426.5s14.5,117.5,25.25,114s13.5-6.25,18.25-6 s8.25,4,11.25,4.25s9.75-0.25,11-26s-7.25-84-16-103S109.25,332.5,109.25,332.5z'},
          { id: 'quads2', data: 'M220.5,335.25c-2.25,17.25,3.104,42.75,8.604,53 s6.396,45,5.896,56.25s-11.25,97.5-22,94s-10.646-4.25-15.396-4s-8.25,4-11.25,4.25s-7.655,3.001-12.854-22.25 c-5.25-25.5,5.5-83.75,14.25-102.75S220.5,335.25,220.5,335.25z'},
          { id: 'quads3', data: 'M327.5,397.75c-5,26-5.5,62-4.75,68.5 s5.75,25.5,5.75,30.75s1.93-43.422,3.5-47.25C336,440,327.5,397.75,327.5,397.75z'},
          { id: 'quads4', data: 'M464.5,393c5,26,1.041,66.75,0.291,73.25 s-6.041,16.5-6.041,21.75s-2.858-34.127-3.209-38.25C454.5,437.5,464.5,393,464.5,393z'}
        ]
      },
      {
        name: Muscles.Hamstrings,
        isSelected: false,
        paths: [
          { id: 'hamstrings1', data: 'M343,426c5.222-6.248,35.75-5,41-2.75 s11.5,6.75,6.25,35.25s-6.75,50.25-6.25,58s-2,43.5-6.75,49.5s-10.75-8-10.75-8L349,529.25c0,0-12,24.5-12.75,29s-6.75-55-4.25-62 S331.601,439.64,343,426z'},
          { id: 'hamstrings2', data: 'M449.75,420.75c-5.222-6.248-36-5.25-41.25-3 s-14,4-8.75,32.5s5.379,53.5,4.879,61.25s-1.629,43.75,3.121,49.75s13-9.25,13-9.25l17.5-32.25c0,0,9.5,20.25,10.25,24.75 s8.75-46.25,6.25-53.25S461.149,434.39,449.75,420.75z'}
        ]
      },
      {
        name: Muscles.Longus,
        isSelected: false,
        paths: [
          { id: 'longus1', data: 'M111.25,556.5c-12.5,38.75-9.75,60-2.75,86.75 S126.021,699.653,124,697C116,686.5,112.383,552.987,111.25,556.5z'},
          { id: 'longus2', data: 'M216.566,564.5c12.5,38.75,11.934,60.75,4.934,87.5 s-14.277,53.374-11,52.75C215.75,703.75,215.433,560.987,216.566,564.5z'}
        ]
      },
      {
        name: Muscles.Calves,
        isSelected: false,
        paths: [
          { id: 'calves1', data: 'M146,588.75c-3,8-7.25,21.75-4,41.75 s1.75,26,4.25,40.75s4.5,8.75,4.25,10.75s0-33.5,1.25-37.75s2.25-25.5,1.25-31.5S146,588.75,146,588.75z'},
          { id: 'calves2', data: 'M181.75,594.5c3.854,7.625,11.55,15.766,10.5,36 c-1.05,20.235-1.873,32.565-2.75,47.5s-1.877,9.88-1.411,11.841c0.466,1.96-3.652-33.301-5.358-37.389s-5.017-25.104-4.677-31.176 C178.394,615.203,181.75,594.5,181.75,594.5z'},
          { id: 'calves3', data: 'M334,645.75c7.25,0.5,15,1.5,16.75-6.75 s1.25-11.75,2.25-14.25s0.25,0.75,2.75,8.25s3.25,14.5,8.5,17.75s6.25,3.75,6.25,3.75s6-3.5,5.75-15.5s1-13,1-13 s1.25-16.5-0.5-22.75s-3-19.25-4.25-27s-11.75-18.5-12.25-21s-5.75,4.5-5.75,4.5s-6.75-12.5-7.5-12.5s-7,7.25-10,15.5 s-3.75,28-4.75,30.25S328,612.5,329,621S334,645.75,334,645.75z'},
          { id: 'calves4', data: 'M443.5,641.75c0.75,0-9.5,3.25-11.25-5 S432,629.5,431,627s-2,0.25-2.75,2.25c-2.775,7.402-0.256,8.75-5.506,12S409,647.75,409,647.75s-4-6-4.25-17.5 c-0.041-1.903-0.25-15-0.25-15s1.5-15,3.25-21.25s2.25-19,6.744-27.25c3.755-6.894,11.75-18.5,12.25-21s5.75,4.5,5.75,4.5 s6.75-12.5,7.5-12.5s5.256,8.75,8.256,17s1.25,28,2.25,30.25s2.5,18,1.5,26.5S443.5,641.75,443.5,641.75z'},
        ]
      },
      {
        name: Muscles.Cardio,
        isSelected: false,
        paths: [
          { id: 'heart1', transform: 'rotate(225,150,121),translate(70,220)', opacity: 0.25, data: 'M0,50,v-50,h50,a25,25,22.5,0,1,0,50,a25,25,22.5,0,1,-50,0z'},
        ]
      }
    ];
    // tslint:enable: max-line-length
  }
}
