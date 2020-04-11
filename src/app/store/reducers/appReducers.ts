import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { dataReducers } from './data.reducer';
import { musclesFilterReducers } from './musclesFilter.reducer';
import { workoutsReducers } from './workouts.reducer';
import { workoutDaysReducers } from './workoutDays.reducer';
import { exerciseSetsReducers } from './exerciseSets.reducer';
import { exercisesReducers } from './exercises.reducer';
import { exercisesMediaReducers } from './exerciseMedia.reducer';
import { environment } from '../../../environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const appReducers: ActionReducerMap<IAppState, any> = {
    data: dataReducers,
    musclesFilter: musclesFilterReducers,
    workouts: workoutsReducers,
    days: workoutDaysReducers,
    sets: exerciseSetsReducers,
    exercises: exercisesReducers,
    media: exercisesMediaReducers,
};

export const metaReducers: MetaReducer<IAppState>[] = !environment.production
? [storeFreeze]
: [];

export const storeDevtoolsModule = StoreDevtoolsModule.instrument({
    name: 'ionic-workouts-5',
    maxAge: 50,
    logOnly: environment.production
  });
