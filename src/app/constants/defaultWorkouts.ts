import { Guid } from 'guid-typescript';
import { GripType, GripWidth, RepetitionSpeed, WeightType, WeightUnit } from '../models/enums';
import { WorkoutsDataMaps } from '../models/interfaces';
import { Workout } from '../models/Workout';
import { WorkoutDay } from '../models/WorkoutDay';
import { ExerciseSet } from '../models/ExerciseSet';
import { Exercise } from '../models/Exercise';
import { Grip } from '../models/Grip';
import { Rep } from '../models/Rep';
import { attachMedia2Exercise } from './defaultExerciseMedia';

const buildDefaultWorkouts = () => {
    return [
        new Workout({
            id: Guid.raw(),
            name: 'Workout Set No. 1',
            description: '2 days including upper, lower and core muscles',
            days: [
                new WorkoutDay({
                    id: Guid.raw(),
                    name: 'Upper Body and Core',
                    repeatsCount: 1,
                    exerciseSets: [
                        new ExerciseSet({
                            id: Guid.raw(),
                            exercises: [
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Elliptical Warmups',
                                    mediaId: attachMedia2Exercise('elliptical'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            seconds: 300
                                        }),
                                    ],
                                    restBetweenReps: 0,
                                    restAfterExercise: 10
                                })
                            ]
                        }),
                        new ExerciseSet({
                            id: Guid.raw(),
                            exercises: [
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Bent Dumbbells Lateral Raise',
                                    mediaId: attachMedia2Exercise('bent dumbbells lateral raise'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    typeOfWeight: WeightType.Dumbbell,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            weight: 10,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 10,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 10,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 10,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        })
                                    ],
                                    restBetweenReps: 30,
                                    restAfterExercise: 30,
                                })
                            ]
                        }),
                        new ExerciseSet({
                            id: Guid.raw(),
                            exercises: [
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Dumbbells Lateral Raises',
                                    mediaId: attachMedia2Exercise('lateral raises'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            weight: 10,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 10,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 10,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                    ],
                                    restBetweenReps: 30,
                                    restAfterExercise: 30
                                })
                            ]
                        }),
                        new ExerciseSet({
                            id: Guid.raw(),
                            exercises: [
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Bent Triceps Extensions',
                                    mediaId: attachMedia2Exercise('bent triceps extensions'),
                                    theGrip: new Grip(
                                        GripType.Overhand,
                                        GripWidth.Normal,
                                    ),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    typeOfWeight: WeightType.Dumbbell,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            weight: 15,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 15
                                        }),
                                        new Rep({
                                            weight: 15,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 15
                                        }),
                                        new Rep({
                                            weight: 15,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 15
                                        }),
                                    ],
                                    restBetweenReps: 20,
                                    restAfterExercise: 20
                                })
                            ]
                        }),
                        new ExerciseSet({
                            id: Guid.raw(),
                            exercises: [
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Cable Lat Pulldown',
                                    mediaId: attachMedia2Exercise('cable lat pulldown'),
                                    theGrip: new Grip(
                                        GripType.Overhand,
                                        GripWidth.Wide,
                                    ),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            weight: 70,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 70,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 70,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 70,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        })
                                    ],
                                    restBetweenReps: 20,
                                    restAfterExercise: 20
                                })
                            ]
                        }),
                        new ExerciseSet({
                            id: Guid.raw(),
                            exercises: [
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Dumbbells Upright Row',
                                    mediaId: attachMedia2Exercise('upright row'),
                                    theGrip: new Grip(
                                        GripType.Overhand,
                                    ),
                                    typeOfWeight: WeightType.Dumbbell,
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            weight: 15,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 15,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 15,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 15,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        })
                                    ],
                                    restBetweenReps: 20,
                                    restAfterExercise: 20
                                })
                            ]
                        }),
                        new ExerciseSet({
                            id: Guid.raw(),
                            exercises: [
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Seated Shoulder Press',
                                    mediaId: attachMedia2Exercise('seated shoulder press'),
                                    theGrip: new Grip(
                                        GripType.Overhand,
                                    ),
                                    typeOfWeight: WeightType.Dumbbell,
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            weight: 15,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 15,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 15,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 15,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        })
                                    ],
                                    restBetweenReps: 20,
                                    restAfterExercise: 20
                                })
                            ]
                        }),
                        new ExerciseSet({
                            id: Guid.raw(),
                            exercises: [
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Standing Triceps Extension',
                                    mediaId: attachMedia2Exercise('standing triceps extension'),
                                    theGrip: new Grip(
                                        GripType.Overhand,
                                    ),
                                    typeOfWeight: WeightType.Dumbbell,
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            weight: 15,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 15,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 15,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 15,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        })
                                    ],
                                    restBetweenReps: 30,
                                    restAfterExercise: 30
                                })
                            ]
                        }),
                        new ExerciseSet({
                            id: Guid.raw(),
                            exercises: [
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Fitball Crunches',
                                    mediaId: attachMedia2Exercise('fitball crunches'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            times: 15
                                        }),
                                        new Rep({
                                            times: 15
                                        }),
                                        new Rep({
                                            times: 15
                                        }),
                                        new Rep({
                                            times: 15
                                        })
                                    ],
                                    restBetweenReps: 20,
                                    restAfterExercise: 20
                                })
                            ]
                        }),
                        new ExerciseSet({
                            id: Guid.raw(),
                            exercises: [
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Russian Twist',
                                    mediaId: attachMedia2Exercise('russian twist'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            times: 15
                                        }),
                                        new Rep({
                                            times: 15
                                        }),
                                        new Rep({
                                            times: 15
                                        }),
                                        new Rep({
                                            times: 15
                                        })
                                    ],
                                    restBetweenReps: 20,
                                    restAfterExercise: 20
                                })
                            ]
                        }),
                    ],
                }),
                new WorkoutDay({
                    id: Guid.raw(),
                    name: 'Lower Body and Core',
                    repeatsCount: 1,
                    exerciseSets: [
                        new ExerciseSet({
                            id: Guid.raw(),
                            exercises: [
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Elliptical Warmups',
                                    mediaId: attachMedia2Exercise('elliptical'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            seconds: 300
                                        }),
                                    ],
                                    restBetweenReps: 0,
                                    restAfterExercise: 10
                                })
                            ]
                        }),
                        new ExerciseSet({
                            id: Guid.raw(),
                            exercises: [
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Braced Single Dumbbell Squats',
                                    mediaId: attachMedia2Exercise('braced squats'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    typeOfWeight: WeightType.Dumbbell,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            weight: 15,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 15,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 15,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 15,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        })
                                    ],
                                    restBetweenReps: 30,
                                    restAfterExercise: 30,
                                })
                            ]
                        }),
                        new ExerciseSet({
                            id: Guid.raw(),
                            exercises: [
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Cable Kickbacks',
                                    mediaId: attachMedia2Exercise('cable kickbacks'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            weight: 20,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 20,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 20,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                    ],
                                    restBetweenReps: 30,
                                    restAfterExercise: 30
                                })
                            ]
                        }),
                        new ExerciseSet({
                            id: Guid.raw(),
                            exercises: [
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Dumbbells Squat',
                                    mediaId: attachMedia2Exercise('squat'),
                                    theGrip: new Grip(
                                        GripType.Overhand,
                                        GripWidth.Normal,
                                    ),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    typeOfWeight: WeightType.Dumbbell,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            weight: 15,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 15
                                        }),
                                        new Rep({
                                            weight: 15,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 15
                                        }),
                                        new Rep({
                                            weight: 15,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 15
                                        }),
                                    ],
                                    restBetweenReps: 20,
                                    restAfterExercise: 20
                                })
                            ]
                        }),
                        new ExerciseSet({
                            id: Guid.raw(),
                            exercises: [
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'cable crossover',
                                    mediaId: attachMedia2Exercise('cable crossover'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            weight: 30,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 30,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 30,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 30,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        })
                                    ],
                                    restBetweenReps: 20,
                                    restAfterExercise: 20
                                })
                            ]
                        }),
                        new ExerciseSet({
                            id: Guid.raw(),
                            exercises: [
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Single Leg Squats',
                                    mediaId: attachMedia2Exercise('single leg squats'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            times: 8
                                        }),
                                        new Rep({
                                            times: 8
                                        }),
                                        new Rep({
                                            times: 8
                                        }),
                                        new Rep({
                                            times: 8
                                        }),
                                    ],
                                    restBetweenReps: 20,
                                    restAfterExercise: 20
                                })
                            ]
                        }),
                        new ExerciseSet({
                            id: Guid.raw(),
                            exercises: [
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Plank',
                                    mediaId: attachMedia2Exercise('plank'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            seconds: 60
                                        }),
                                        new Rep({
                                            seconds: 60
                                        }),
                                    ],
                                    restBetweenReps: 20,
                                    restAfterExercise: 20
                                })
                            ]
                        }),
                        new ExerciseSet({
                            id: Guid.raw(),
                            exercises: [
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Side Plank Hip Raise',
                                    mediaId: attachMedia2Exercise('side plank hip raise'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            times: 10
                                        }),
                                        new Rep({
                                            times: 10
                                        }),
                                        new Rep({
                                            times: 10
                                        }),
                                    ],
                                    restBetweenReps: 30,
                                    restAfterExercise: 30
                                })
                            ]
                        }),
                        new ExerciseSet({
                            id: Guid.raw(),
                            exercises: [
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'V Up',
                                    mediaId: attachMedia2Exercise('v up'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            times: 15
                                        }),
                                        new Rep({
                                            times: 15
                                        }),
                                        new Rep({
                                            times: 15
                                        }),
                                        new Rep({
                                            times: 15
                                        })
                                    ],
                                    restBetweenReps: 20,
                                    restAfterExercise: 20
                                })
                            ]
                        }),
                    ],
                }),
            ]
        }),
    ];
};

let defaultWorkouts: Workout[];
const getDefaultWorkouts = (): Workout[] => {
    if (!defaultWorkouts) {
        defaultWorkouts = buildDefaultWorkouts();
    }
    return defaultWorkouts;
};
export const getDefaultWorkoutsMaps = (): WorkoutsDataMaps => {
    const workoutsData: WorkoutsDataMaps = {
        workouts: { byId: {} },
        days: { byId: {} },
        sets: { byId: {} },
        exercises: { byId: {} },
    };
    for (const workout of getDefaultWorkouts()) {
        workoutsData.workouts.byId[`${workout.id}`] = Workout.toBean(workout);
        for (const day of workout.days) {
            workoutsData.days.byId[`${day.id}`] = WorkoutDay.toBean(day, workout.id);
            for (const set of day.exerciseSets) {
                workoutsData.sets.byId[`${set.id}`] = ExerciseSet.toBean(set, workout.id, day.id);
                for (const exe of set.exercises) {
                    workoutsData.exercises.byId[`${exe.id}`] = Exercise.toBean(exe, workout.id, day.id, set.id);
                }
            }
        }
    }
    return workoutsData;
};
