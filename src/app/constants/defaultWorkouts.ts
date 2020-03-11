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
            description: '4 days including upper, lower and core muscles',
            days: [
                new WorkoutDay({
                    id: Guid.raw(),
                    name: 'Full Body',
                    exerciseSets: [
                        new ExerciseSet({
                            id: Guid.raw(),
                            exercises: [
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Bench Press, Wide Grip',
                                    mediaId: attachMedia2Exercise('BenchPressWideGrip'),
                                    theGrip: new Grip(
                                        GripType.Neutral,
                                        GripWidth.Wide,
                                    ),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    typeOfWeight: WeightType.Barbell,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            weight: 95,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 95,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 95,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 95,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        })
                                    ],
                                    restBetweenReps: 20,
                                    restAfterExercise: 20,
                                })
                            ]
                        }),
                        new ExerciseSet({
                            id: Guid.raw(),
                            exercises: [
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Seated Rope Cable Row',
                                    mediaId: attachMedia2Exercise('SeatedRopeCableRow'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            weight: 95,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 95,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 95,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
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
                                    name: 'Dumbbell Wrist Curl',
                                    mediaId: attachMedia2Exercise('DumbbellWristCurl'),
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
                                    name: 'Cable Triceps Pushdown, Overhand Grip',
                                    mediaId: attachMedia2Exercise('CableTricepsPushdownOverheadGrip'),
                                    theGrip: new Grip(
                                        GripType.Overhand
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
                                    name: 'Cable Biceps Curl, Underhand Grip',
                                    mediaId: attachMedia2Exercise('CableBicepsCurlUnderhandGrip'),
                                    theGrip: new Grip(
                                        GripType.Underhand
                                    ),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            weight: 50,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 50,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 50,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 50,
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
                                    name: 'Leg Raise Machine',
                                    mediaId: attachMedia2Exercise('LegRaiseMachine'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            weight: 80,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 80,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 80,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 80,
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
                                    name: 'Cable Leg Curl',
                                    mediaId: attachMedia2Exercise('CableLegCurl'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            weight: 60,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 60,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 60,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 60,
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
                                    name: 'Crossfit Situps',
                                    mediaId: attachMedia2Exercise('CrossfitSitup'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
                                            times: 12
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
                                    name: 'Cross Body Crunch',
                                    mediaId: attachMedia2Exercise('CrossBodyCrunch'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    typeOfWeight: WeightType.NoWeight,
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
                                    ],
                                    restBetweenReps: 20,
                                    restAfterExercise: 20
                                })
                            ]
                        })
                    ],
                }),
                new WorkoutDay({
                    id: Guid.raw(),
                    name: 'Upper Body 1',
                    exerciseSets: [
                        new ExerciseSet({
                            id: Guid.raw(),
                            exercises: [
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Bench Press, Narrow Grip',
                                    mediaId: attachMedia2Exercise('BenchPressNarrowGrip'),
                                    theGrip: new Grip(
                                        GripType.Overhand,
                                        GripWidth.Narrow
                                    ),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    typeOfWeight: WeightType.Barbell,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            weight: 85,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 85,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 85,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                    ],
                                    restBetweenReps: 20,
                                    restAfterExercise: 20
                                }),
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Dumbbell Bench Press, Rotating Grip',
                                    mediaId: attachMedia2Exercise('DumbbellBenshPressRotatingGrip'),
                                    theGrip: new Grip(
                                        GripType.Neutral,
                                        GripWidth.Normal
                                    ),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    typeOfWeight: WeightType.Dumbbell,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            weight: 90,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 10
                                        }),
                                        new Rep({
                                            weight: 90,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 10
                                        }),
                                        new Rep({
                                            weight: 90,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 10
                                        }),
                                    ],
                                    restBetweenReps: 20,
                                    restAfterExercise: 20
                                }),
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Dumbbell Bench Press, Rotating Grip',
                                    mediaId: attachMedia2Exercise('DumbbellBenshPressRotatingGrip'),
                                    theGrip: new Grip(
                                        GripType.Neutral,
                                        GripWidth.Normal,
                                    ),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    typeOfWeight: WeightType.Dumbbell,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            weight: 90,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 10
                                        }),
                                        new Rep({
                                            weight: 90,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 10
                                        }),
                                        new Rep({
                                            weight: 90,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 10
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
                                    name: 'Cable Fly',
                                    mediaId: attachMedia2Exercise('CableFly'),
                                    theGrip: new Grip(
                                        GripType.Underhand,
                                    ),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            weight: 60,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 60,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 60,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 60,
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
                                    name: 'Dumbbell Fly',
                                    mediaId: attachMedia2Exercise('DumbbellFly'),
                                    theGrip: new Grip(
                                        GripType.Neutral,
                                    ),
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
                                    name: 'Dumbbell Horizontal Row, Inclined Prone',
                                    mediaId: attachMedia2Exercise('DumbbellHorizontalRowInclineProne'),
                                    theGrip: new Grip(
                                        GripType.Overhand,
                                    ),
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
                                    name: 'Dumbbell Tricpes Extensions, Seated',
                                    mediaId: attachMedia2Exercise('DumbbellTricepsExtensionSeated'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    typeOfWeight: WeightType.Dumbbell,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 25,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 25,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 25,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
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
                                    name: 'Inclined Pushup, Narrow Grip',
                                    mediaId: attachMedia2Exercise('InclinePushupNarrowGrip'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    theGrip: new Grip(
                                        GripType.Neutral,
                                        GripWidth.Narrow,
                                    ),
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
                                    name: 'Reverse Cable Fly, On Flat Bench',
                                    mediaId: attachMedia2Exercise('ReverseCableFlyOnFlatBench'),
                                    theGrip: new Grip(
                                        GripType.Overhand,
                                    ),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 55,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 55,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 55,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
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
                                    name: 'Situps',
                                    mediaId: attachMedia2Exercise('Situps'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
                                            times: 12
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
                                    name: 'Situps with Weight Above Head',
                                    mediaId: attachMedia2Exercise('SitupsWithWeightAboveHead'),
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
                                    mediaId: attachMedia2Exercise('RussianTwist'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
                                            times: 12
                                        }),
                                    ],
                                    restBetweenReps: 20,
                                    restAfterExercise: 20
                                })
                            ]
                        })
                    ],
                }),
                new WorkoutDay({
                    id: Guid.raw(),
                    name: 'Upper Body 2',
                    exerciseSets: [
                        new ExerciseSet({
                            id: Guid.raw(),
                            exercises: [
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Cabel Lat Pulldown, Behind Neck Wide Grip',
                                    mediaId: attachMedia2Exercise('CabelLatPulldownBehindNeckWideGrip'),
                                    theGrip: new Grip(
                                        GripType.Overhand,
                                        GripWidth.Wide,
                                    ),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 90,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 90,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 90,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 90,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        })
                                    ],
                                    restBetweenReps: 20,
                                    restAfterExercise: 20
                                }),
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Decline Dumbbell Pullover',
                                    mediaId: attachMedia2Exercise('DeclineDumbbellPullover'),
                                    theGrip: new Grip(
                                        GripType.Overhand,
                                        GripWidth.Wide,
                                    ),
                                    typeOfWeight: WeightType.Dumbbell,
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 25,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 25,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 25,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 25,
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
                                    name: 'Dumbbell Arm Circles',
                                    mediaId: attachMedia2Exercise('DumbbellArmCircles'),
                                    theGrip: new Grip(
                                        GripType.Overhand,
                                    ),
                                    typeOfWeight: WeightType.Dumbbell,
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
                                    name: 'Machine Row Medium Grip',
                                    mediaId: attachMedia2Exercise('MachineRowMediumGrip'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 85,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 85,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 85,
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
                                    name: 'Dummbell Biceps Curl Standing Underhand Grip',
                                    mediaId: attachMedia2Exercise('DummbellBicepsCurlStandingUnderhandGrip'),
                                    theGrip: new Grip(
                                        GripType.Underhand,
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
                                    name: 'Cable Shrug',
                                    mediaId: attachMedia2Exercise('CableShrug'),
                                    theGrip: new Grip(
                                        GripType.Neutral,
                                        GripWidth.Normal,
                                    ),
                                    typeOfWeight: WeightType.Dumbbell,
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            weight: 95,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 95,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 95,
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
                                    name: 'Dragon Flags',
                                    mediaId: attachMedia2Exercise('DragonFlags'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
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
                                    name: 'Decline Situps',
                                    mediaId: attachMedia2Exercise('DeclineSitups'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    typeOfWeight: WeightType.NoWeight,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
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
                                    name: 'Cross Body Crunch',
                                    mediaId: attachMedia2Exercise('CrossBodyCrunch'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    typeOfWeight: WeightType.NoWeight,
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
                                    name: 'Lying Scissors Kicks',
                                    mediaId: attachMedia2Exercise('LyingScissorsKicks'),
                                    theGrip: new Grip(),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    typeOfWeight: WeightType.NoWeight,
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
                                        })
                                    ],
                                    restBetweenReps: 20,
                                    restAfterExercise: 20
                                })
                            ],
                        })
                    ]
                }),
                new WorkoutDay({
                    id: Guid.raw(),
                    name: 'Lower Body',
                    exerciseSets: [
                        new ExerciseSet({
                            id: Guid.raw(),
                            exercises: [
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Walking Lunge with Side Weights',
                                    mediaId: attachMedia2Exercise('WalkingLungeWithSideWeights'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    typeOfWeight: WeightType.Dumbbell,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 25,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 25,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 25,
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
                                    name: 'Cable Abduction',
                                    mediaId: attachMedia2Exercise('CableAbduction'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            weight: 50,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 50,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 50,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        })
                                    ],
                                    restBetweenReps: 20,
                                    restAfterExercise: 20
                                }),
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Cable Adduction',
                                    mediaId: attachMedia2Exercise('CableAdduction'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 50,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 50,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 50,
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
                                    name: 'Cable Leg Curl',
                                    mediaId: attachMedia2Exercise('CableLegCurl'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            weight: 50,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 50,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 50,
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
                                    name: 'Cable Calf Raise',
                                    mediaId: attachMedia2Exercise('CableCalfRaise'),
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
                                    name: 'Bodyweight Flutter Kicks',
                                    mediaId: attachMedia2Exercise('BodyweightFlutterKicks'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
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
                                    name: 'Weighted Situps',
                                    mediaId: attachMedia2Exercise('WeightedSitups'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            weight: 25,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 25,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 25,
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
                                    name: 'Plank',
                                    mediaId: attachMedia2Exercise('Plank'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            seconds: 10
                                        }),
                                        new Rep({
                                            seconds: 10
                                        }),
                                        new Rep({
                                            seconds: 10
                                        }),
                                    ],
                                    restBetweenReps: 5,
                                    restAfterExercise: 10
                                })
                            ]
                        }),
                        new ExerciseSet({
                            id: Guid.raw(),
                            exercises: [
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Twist',
                                    mediaId: attachMedia2Exercise('Twist'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
                                            times: 12
                                        })
                                    ],
                                    restBetweenReps: 20,
                                    restAfterExercise: 20
                                })
                            ]
                        })
                    ],
                })
            ]
        }),
        new Workout({
            id: Guid.raw(),
            name: 'Workout Set No. 2',
            description: '4 days including upper, lower and core muscles',
            days: [
                new WorkoutDay({
                    id: Guid.raw(),
                    name: 'Full Body',
                    exerciseSets: [
                        new ExerciseSet({
                            id: Guid.raw(),
                            exercises: [
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Bench Press, Wide Grip',
                                    mediaId: attachMedia2Exercise('BenchPressWideGrip'),
                                    theGrip: new Grip(
                                        GripType.Neutral,
                                        GripWidth.Wide,
                                    ),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    typeOfWeight: WeightType.Barbell,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 95,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 95,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 95,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 95,
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
                                    name: 'Seated Rope Cable Row',
                                    mediaId: attachMedia2Exercise('SeatedRopeCableRow'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 95,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 95,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 95,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
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
                                    name: 'Dumbbell Wrist Curl',
                                    mediaId: attachMedia2Exercise('DumbbellWristCurl'),
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
                                    name: 'Cable Triceps Pushdown, Overhand Grip',
                                    mediaId: attachMedia2Exercise('CableTricepsPushdownOverheadGrip'),
                                    theGrip: new Grip(
                                        GripType.Overhand
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
                                    name: 'Cable Biceps Curl, Underhand Grip',
                                    mediaId: attachMedia2Exercise('CableBicepsCurlUnderhandGrip'),
                                    theGrip: new Grip(
                                        GripType.Underhand
                                    ),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 50,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 50,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 50,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 50,
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
                                    name: 'Leg Raise Machine',
                                    mediaId: attachMedia2Exercise('LegRaiseMachine'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 80,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 80,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 80,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 80,
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
                                    name: 'Cable Leg Curl',
                                    mediaId: attachMedia2Exercise('CableLegCurl'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            weight: 60,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 60,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 60,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 60,
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
                                    name: 'Crossfit Situps',
                                    mediaId: attachMedia2Exercise('CrossfitSitup'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
                                            times: 12
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
                                    name: 'Cross Body Crunch',
                                    mediaId: attachMedia2Exercise('CrossBodyCrunch'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    typeOfWeight: WeightType.NoWeight,
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
                                    ],
                                    restBetweenReps: 20,
                                    restAfterExercise: 20
                                })
                            ]
                        })
                    ],
                }),
                new WorkoutDay({
                    id: Guid.raw(),
                    name: 'Upper Body 1',
                    exerciseSets: [
                        new ExerciseSet({
                            id: Guid.raw(),
                            exercises: [
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Bench Press, Narrow Grip',
                                    mediaId: attachMedia2Exercise('BenchPressNarrowGrip'),
                                    theGrip: new Grip(
                                        GripType.Overhand,
                                        GripWidth.Narrow
                                    ),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    typeOfWeight: WeightType.Barbell,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 85,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 85,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 85,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                    ],
                                    restBetweenReps: 20,
                                    restAfterExercise: 20
                                }),
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Dumbbell Bench Press, Rotating Grip',
                                    mediaId: attachMedia2Exercise('DumbbellBenshPressRotatingGrip'),
                                    theGrip: new Grip(
                                        GripType.Neutral,
                                        GripWidth.Normal
                                    ),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    typeOfWeight: WeightType.Dumbbell,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 90,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 10
                                        }),
                                        new Rep({
                                            weight: 90,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 10
                                        }),
                                        new Rep({
                                            weight: 90,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 10
                                        }),
                                    ],
                                    restBetweenReps: 20,
                                    restAfterExercise: 20
                                }),
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Dumbbell Bench Press, Rotating Grip',
                                    mediaId: attachMedia2Exercise('DumbbellBenshPressRotatingGrip'),
                                    theGrip: new Grip(
                                        GripType.Neutral,
                                        GripWidth.Normal,
                                    ),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    typeOfWeight: WeightType.Dumbbell,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 90,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 10
                                        }),
                                        new Rep({
                                            weight: 90,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 10
                                        }),
                                        new Rep({
                                            weight: 90,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 10
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
                                    name: 'Cable Fly',
                                    mediaId: attachMedia2Exercise('CableFly'),
                                    theGrip: new Grip(
                                        GripType.Underhand,
                                    ),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 60,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 60,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 60,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 60,
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
                                    name: 'Dumbbell Fly',
                                    mediaId: attachMedia2Exercise('DumbbellFly'),
                                    theGrip: new Grip(
                                        GripType.Neutral,
                                    ),
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
                                    name: 'Dumbbell Horizontal Row, Inclined Prone',
                                    mediaId: attachMedia2Exercise('DumbbellHorizontalRowInclineProne'),
                                    theGrip: new Grip(
                                        GripType.Overhand,
                                    ),
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
                                    name: 'Dumbbell Tricpes Extensions, Seated',
                                    mediaId: attachMedia2Exercise('DumbbellTricepsExtensionSeated'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    typeOfWeight: WeightType.Dumbbell,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 25,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 25,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 25,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
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
                                    name: 'Inclined Pushup, Narrow Grip',
                                    mediaId: attachMedia2Exercise('InclinePushupNarrowGrip'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    theGrip: new Grip(
                                        GripType.Neutral,
                                        GripWidth.Narrow,
                                    ),
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
                                    name: 'Reverse Cable Fly, On Flat Bench',
                                    mediaId: attachMedia2Exercise('ReverseCableFlyOnFlatBench'),
                                    theGrip: new Grip(
                                        GripType.Overhand,
                                    ),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 55,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 55,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 55,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
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
                                    name: 'Situps',
                                    mediaId: attachMedia2Exercise('Situps'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
                                            times: 12
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
                                    name: 'Situps with Weight Above Head',
                                    mediaId: attachMedia2Exercise('SitupsWithWeightAboveHead'),
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
                                    mediaId: attachMedia2Exercise('RussianTwist'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
                                            times: 12
                                        }),
                                    ],
                                    restBetweenReps: 20,
                                    restAfterExercise: 20
                                })
                            ]
                        })
                    ],
                }),
                new WorkoutDay({
                    id: Guid.raw(),
                    name: 'Upper Body 2',
                    exerciseSets: [
                        new ExerciseSet({
                            id: Guid.raw(),
                            exercises: [
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Cabel Lat Pulldown, Behind Neck Wide Grip',
                                    mediaId: attachMedia2Exercise('CabelLatPulldownBehindNeckWideGrip'),
                                    theGrip: new Grip(
                                        GripType.Overhand,
                                        GripWidth.Wide,
                                    ),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 90,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 90,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 90,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 90,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        })
                                    ],
                                    restBetweenReps: 20,
                                    restAfterExercise: 20
                                }),
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Decline Dumbbell Pullover',
                                    mediaId: attachMedia2Exercise('DeclineDumbbellPullover'),
                                    theGrip: new Grip(
                                        GripType.Overhand,
                                        GripWidth.Wide,
                                    ),
                                    typeOfWeight: WeightType.Dumbbell,
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 25,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 25,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 25,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 25,
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
                                    name: 'Dumbbell Arm Circles',
                                    mediaId: attachMedia2Exercise('DumbbellArmCircles'),
                                    theGrip: new Grip(
                                        GripType.Overhand,
                                    ),
                                    typeOfWeight: WeightType.Dumbbell,
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
                                    name: 'Machine Row Medium Grip',
                                    mediaId: attachMedia2Exercise('MachineRowMediumGrip'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 85,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 85,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 85,
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
                                    name: 'Dummbell Biceps Curl Standing Underhand Grip',
                                    mediaId: attachMedia2Exercise('DummbellBicepsCurlStandingUnderhandGrip'),
                                    theGrip: new Grip(
                                        GripType.Underhand,
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
                                    name: 'Cable Shrug',
                                    mediaId: attachMedia2Exercise('CableShrug'),
                                    theGrip: new Grip(
                                        GripType.Neutral,
                                        GripWidth.Normal,
                                    ),
                                    typeOfWeight: WeightType.Dumbbell,
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            weight: 95,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 95,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 95,
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
                                    name: 'Dragon Flags',
                                    mediaId: attachMedia2Exercise('DragonFlags'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
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
                                    name: 'Decline Situps',
                                    mediaId: attachMedia2Exercise('DeclineSitups'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    typeOfWeight: WeightType.NoWeight,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
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
                                    name: 'Cross Body Crunch',
                                    mediaId: attachMedia2Exercise('CrossBodyCrunch'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    typeOfWeight: WeightType.NoWeight,
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
                                    name: 'Lying Scissors Kicks',
                                    mediaId: attachMedia2Exercise('LyingScissorsKicks'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    typeOfWeight: WeightType.NoWeight,
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
                                        })
                                    ],
                                    restBetweenReps: 20,
                                    restAfterExercise: 20
                                })
                            ],
                        })
                    ]
                }),
                new WorkoutDay({
                    id: Guid.raw(),
                    name: 'Lower Body',
                    exerciseSets: [
                        new ExerciseSet({
                            id: Guid.raw(),
                            exercises: [
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Walking Lunge with Side Weights',
                                    mediaId: attachMedia2Exercise('WalkingLungeWithSideWeights'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    typeOfWeight: WeightType.Dumbbell,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 25,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 25,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 25,
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
                                    name: 'Cable Abduction',
                                    mediaId: attachMedia2Exercise('CableAbduction'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            weight: 50,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 50,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 50,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        })
                                    ],
                                    restBetweenReps: 20,
                                    restAfterExercise: 20
                                }),
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Cable Adduction',
                                    mediaId: attachMedia2Exercise('CableAdduction'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 50,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 50,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 50,
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
                                    name: 'Cable Leg Curl',
                                    mediaId: attachMedia2Exercise('CableLegCurl'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            weight: 50,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 50,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 50,
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
                                    name: 'Cable Calf Raise',
                                    mediaId: attachMedia2Exercise('CableCalfRaise'),
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
                                    name: 'Bodyweight Flutter Kicks',
                                    mediaId: attachMedia2Exercise('BodyweightFlutterKicks'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
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
                                    name: 'Weighted Situps',
                                    mediaId: attachMedia2Exercise('WeightedSitups'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            weight: 25,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 25,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 25,
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
                                    name: 'Plank',
                                    mediaId: attachMedia2Exercise('Plank'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            seconds: 10
                                        }),
                                        new Rep({
                                            seconds: 10
                                        }),
                                        new Rep({
                                            seconds: 10
                                        }),
                                    ],
                                    restBetweenReps: 5,
                                    restAfterExercise: 10
                                })
                            ]
                        }),
                        new ExerciseSet({
                            id: Guid.raw(),
                            exercises: [
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Twist',
                                    mediaId: attachMedia2Exercise('Twist'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
                                            times: 12
                                        })
                                    ],
                                    restBetweenReps: 20,
                                    restAfterExercise: 20
                                })
                            ]
                        })
                    ],
                })
            ]
        }),
        new Workout({
            id: Guid.raw(),
            name: 'Workout Set No. 3',
            description: '4 days including upper, lower and core muscles',
            days: [
                new WorkoutDay({
                    id: Guid.raw(),
                    name: 'Full Body',
                    exerciseSets: [
                        new ExerciseSet({
                            id: Guid.raw(),
                            exercises: [
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Bench Press, Wide Grip',
                                    mediaId: attachMedia2Exercise('BenchPressWideGrip'),
                                    theGrip: new Grip(
                                        GripType.Neutral,
                                        GripWidth.Wide,
                                    ),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    typeOfWeight: WeightType.Barbell,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 95,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 95,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 95,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 95,
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
                                    name: 'Seated Rope Cable Row',
                                    mediaId: attachMedia2Exercise('SeatedRopeCableRow'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 95,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 95,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 95,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
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
                                    name: 'Dumbbell Wrist Curl',
                                    mediaId: attachMedia2Exercise('DumbbellWristCurl'),
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
                                    name: 'Cable Triceps Pushdown, Overhand Grip',
                                    mediaId: attachMedia2Exercise('CableTricepsPushdownOverheadGrip'),
                                    theGrip: new Grip(
                                        GripType.Overhand
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
                                    name: 'Cable Biceps Curl, Underhand Grip',
                                    mediaId: attachMedia2Exercise('CableBicepsCurlUnderhandGrip'),
                                    theGrip: new Grip(
                                        GripType.Underhand
                                    ),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 50,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 50,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 50,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 50,
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
                                    name: 'Leg Raise Machine',
                                    mediaId: attachMedia2Exercise('LegRaiseMachine'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 80,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 80,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 80,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 80,
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
                                    name: 'Cable Leg Curl',
                                    mediaId: attachMedia2Exercise('CableLegCurl'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            weight: 60,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 60,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 60,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 60,
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
                                    name: 'Crossfit Situps',
                                    mediaId: attachMedia2Exercise('CrossfitSitup'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
                                            times: 12
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
                                    name: 'Cross Body Crunch',
                                    mediaId: attachMedia2Exercise('CrossBodyCrunch'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    typeOfWeight: WeightType.NoWeight,
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
                                    ],
                                    restBetweenReps: 20,
                                    restAfterExercise: 20
                                })
                            ]
                        })
                    ],
                }),
                new WorkoutDay({
                    id: Guid.raw(),
                    name: 'Upper Body 1',
                    exerciseSets: [
                        new ExerciseSet({
                            id: Guid.raw(),
                            exercises: [
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Bench Press, Narrow Grip',
                                    mediaId: attachMedia2Exercise('BenchPressNarrowGrip'),
                                    theGrip: new Grip(
                                        GripType.Overhand,
                                        GripWidth.Narrow
                                    ),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    typeOfWeight: WeightType.Barbell,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 85,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 85,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 85,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                    ],
                                    restBetweenReps: 20,
                                    restAfterExercise: 20
                                }),
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Dumbbell Bench Press, Rotating Grip',
                                    mediaId: attachMedia2Exercise('DumbbellBenshPressRotatingGrip'),
                                    theGrip: new Grip(
                                        GripType.Neutral,
                                        GripWidth.Normal
                                    ),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    typeOfWeight: WeightType.Dumbbell,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 90,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 10
                                        }),
                                        new Rep({
                                            weight: 90,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 10
                                        }),
                                        new Rep({
                                            weight: 90,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 10
                                        }),
                                    ],
                                    restBetweenReps: 20,
                                    restAfterExercise: 20
                                }),
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Dumbbell Bench Press, Rotating Grip',
                                    mediaId: attachMedia2Exercise('DumbbellBenshPressRotatingGrip'),
                                    theGrip: new Grip(
                                        GripType.Neutral,
                                        GripWidth.Normal,
                                    ),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    typeOfWeight: WeightType.Dumbbell,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 90,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 10
                                        }),
                                        new Rep({
                                            weight: 90,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 10
                                        }),
                                        new Rep({
                                            weight: 90,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 10
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
                                    name: 'Cable Fly',
                                    mediaId: attachMedia2Exercise('CableFly'),
                                    theGrip: new Grip(
                                        GripType.Underhand,
                                    ),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 60,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 60,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 60,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 60,
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
                                    name: 'Dumbbell Fly',
                                    mediaId: attachMedia2Exercise('DumbbellFly'),
                                    theGrip: new Grip(
                                        GripType.Neutral,
                                    ),
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
                                    name: 'Dumbbell Horizontal Row, Inclined Prone',
                                    mediaId: attachMedia2Exercise('DumbbellHorizontalRowInclineProne'),
                                    theGrip: new Grip(
                                        GripType.Overhand,
                                    ),
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
                                    name: 'Dumbbell Tricpes Extensions, Seated',
                                    mediaId: attachMedia2Exercise('DumbbellTricepsExtensionSeated'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    typeOfWeight: WeightType.Dumbbell,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 25,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 25,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 25,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
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
                                    name: 'Inclined Pushup, Narrow Grip',
                                    mediaId: attachMedia2Exercise('InclinePushupNarrowGrip'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    theGrip: new Grip(
                                        GripType.Neutral,
                                        GripWidth.Narrow,
                                    ),
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
                                    name: 'Reverse Cable Fly, On Flat Bench',
                                    mediaId: attachMedia2Exercise('ReverseCableFlyOnFlatBench'),
                                    theGrip: new Grip(
                                        GripType.Overhand,
                                    ),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 55,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 55,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 55,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
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
                                    name: 'Situps',
                                    mediaId: attachMedia2Exercise('Situps'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
                                            times: 12
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
                                    name: 'Situps with Weight Above Head',
                                    mediaId: attachMedia2Exercise('SitupsWithWeightAboveHead'),
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
                                    mediaId: attachMedia2Exercise('RussianTwist'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
                                            times: 12
                                        }),
                                    ],
                                    restBetweenReps: 20,
                                    restAfterExercise: 20
                                })
                            ]
                        })
                    ],
                }),
                new WorkoutDay({
                    id: Guid.raw(),
                    name: 'Upper Body 2',
                    exerciseSets: [
                        new ExerciseSet({
                            id: Guid.raw(),
                            exercises: [
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Cabel Lat Pulldown, Behind Neck Wide Grip',
                                    mediaId: attachMedia2Exercise('CabelLatPulldownBehindNeckWideGrip'),
                                    theGrip: new Grip(
                                        GripType.Overhand,
                                        GripWidth.Wide,
                                    ),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 90,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 90,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 90,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 90,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        })
                                    ],
                                    restBetweenReps: 20,
                                    restAfterExercise: 20
                                }),
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Decline Dumbbell Pullover',
                                    mediaId: attachMedia2Exercise('DeclineDumbbellPullover'),
                                    theGrip: new Grip(
                                        GripType.Overhand,
                                        GripWidth.Wide,
                                    ),
                                    typeOfWeight: WeightType.Dumbbell,
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 25,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 25,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 25,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 25,
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
                                    name: 'Dumbbell Arm Circles',
                                    mediaId: attachMedia2Exercise('DumbbellArmCircles'),
                                    theGrip: new Grip(
                                        GripType.Overhand,
                                    ),
                                    typeOfWeight: WeightType.Dumbbell,
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
                                    name: 'Machine Row Medium Grip',
                                    mediaId: attachMedia2Exercise('MachineRowMediumGrip'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 85,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 85,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 85,
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
                                    name: 'Dummbell Biceps Curl Standing Underhand Grip',
                                    mediaId: attachMedia2Exercise('DummbellBicepsCurlStandingUnderhandGrip'),
                                    theGrip: new Grip(
                                        GripType.Underhand,
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
                                    name: 'Cable Shrug',
                                    mediaId: attachMedia2Exercise('CableShrug'),
                                    theGrip: new Grip(
                                        GripType.Neutral,
                                        GripWidth.Normal,
                                    ),
                                    typeOfWeight: WeightType.Dumbbell,
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            weight: 95,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 95,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 95,
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
                                    name: 'Dragon Flags',
                                    mediaId: attachMedia2Exercise('DragonFlags'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
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
                                    name: 'Decline Situps',
                                    mediaId: attachMedia2Exercise('DeclineSitups'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    typeOfWeight: WeightType.NoWeight,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
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
                                    name: 'Cross Body Crunch',
                                    mediaId: attachMedia2Exercise('CrossBodyCrunch'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    typeOfWeight: WeightType.NoWeight,
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
                                    name: 'Lying Scissors Kicks',
                                    mediaId: attachMedia2Exercise('LyingScissorsKicks'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    typeOfWeight: WeightType.NoWeight,
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
                                        })
                                    ],
                                    restBetweenReps: 20,
                                    restAfterExercise: 20
                                })
                            ],
                        })
                    ]
                }),
                new WorkoutDay({
                    id: Guid.raw(),
                    name: 'Lower Body',
                    exerciseSets: [
                        new ExerciseSet({
                            id: Guid.raw(),
                            exercises: [
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Walking Lunge with Side Weights',
                                    mediaId: attachMedia2Exercise('WalkingLungeWithSideWeights'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    typeOfWeight: WeightType.Dumbbell,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 25,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 25,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 25,
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
                                    name: 'Cable Abduction',
                                    mediaId: attachMedia2Exercise('CableAbduction'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            weight: 50,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 50,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 50,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        })
                                    ],
                                    restBetweenReps: 20,
                                    restAfterExercise: 20
                                }),
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Cable Adduction',
                                    mediaId: attachMedia2Exercise('CableAdduction'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 50,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 50,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 50,
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
                                    name: 'Cable Leg Curl',
                                    mediaId: attachMedia2Exercise('CableLegCurl'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            weight: 50,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 50,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 50,
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
                                    name: 'Cable Calf Raise',
                                    mediaId: attachMedia2Exercise('CableCalfRaise'),
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
                                    name: 'Bodyweight Flutter Kicks',
                                    mediaId: attachMedia2Exercise('BodyweightFlutterKicks'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
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
                                    name: 'Weighted Situps',
                                    mediaId: attachMedia2Exercise('WeightedSitups'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            weight: 25,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 25,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 25,
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
                                    name: 'Plank',
                                    mediaId: attachMedia2Exercise('Plank'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            seconds: 10
                                        }),
                                        new Rep({
                                            seconds: 10
                                        }),
                                        new Rep({
                                            seconds: 10
                                        }),
                                    ],
                                    restBetweenReps: 5,
                                    restAfterExercise: 10
                                })
                            ]
                        }),
                        new ExerciseSet({
                            id: Guid.raw(),
                            exercises: [
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Twist',
                                    mediaId: attachMedia2Exercise('Twist'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
                                            times: 12
                                        })
                                    ],
                                    restBetweenReps: 20,
                                    restAfterExercise: 20
                                })
                            ]
                        })
                    ],
                })
            ]
        }),
        new Workout({
            id: Guid.raw(),
            name: 'Workout Set No. 4',
            description: '4 days including upper, lower and core muscles',
            days: [
                new WorkoutDay({
                    id: Guid.raw(),
                    name: 'Full Body',
                    exerciseSets: [
                        new ExerciseSet({
                            id: Guid.raw(),
                            exercises: [
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Bench Press, Wide Grip',
                                    mediaId: attachMedia2Exercise('BenchPressWideGrip'),
                                    theGrip: new Grip(
                                        GripType.Neutral,
                                        GripWidth.Wide,
                                    ),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    typeOfWeight: WeightType.Barbell,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 95,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 95,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 95,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 95,
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
                                    name: 'Seated Rope Cable Row',
                                    mediaId: attachMedia2Exercise('SeatedRopeCableRow'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 95,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 95,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 95,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
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
                                    name: 'Dumbbell Wrist Curl',
                                    mediaId: attachMedia2Exercise('DumbbellWristCurl'),
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
                                    name: 'Cable Triceps Pushdown, Overhand Grip',
                                    mediaId: attachMedia2Exercise('CableTricepsPushdownOverheadGrip'),
                                    theGrip: new Grip(
                                        GripType.Overhand
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
                                    name: 'Cable Biceps Curl, Underhand Grip',
                                    mediaId: attachMedia2Exercise('CableBicepsCurlUnderhandGrip'),
                                    theGrip: new Grip(
                                        GripType.Underhand
                                    ),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 50,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 50,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 50,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 50,
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
                                    name: 'Leg Raise Machine',
                                    mediaId: attachMedia2Exercise('LegRaiseMachine'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 80,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 80,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 80,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 80,
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
                                    name: 'Cable Leg Curl',
                                    mediaId: attachMedia2Exercise('CableLegCurl'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            weight: 60,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 60,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 60,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 60,
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
                                    name: 'Crossfit Situps',
                                    mediaId: attachMedia2Exercise('CrossfitSitup'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
                                            times: 12
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
                                    name: 'Cross Body Crunch',
                                    mediaId: attachMedia2Exercise('CrossBodyCrunch'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    typeOfWeight: WeightType.NoWeight,
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
                                    ],
                                    restBetweenReps: 20,
                                    restAfterExercise: 20
                                })
                            ]
                        })
                    ],
                }),
                new WorkoutDay({
                    id: Guid.raw(),
                    name: 'Upper Body 1',
                    exerciseSets: [
                        new ExerciseSet({
                            id: Guid.raw(),
                            exercises: [
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Bench Press, Narrow Grip',
                                    mediaId: attachMedia2Exercise('BenchPressNarrowGrip'),
                                    theGrip: new Grip(
                                        GripType.Overhand,
                                        GripWidth.Narrow
                                    ),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    typeOfWeight: WeightType.Barbell,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 85,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 85,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 85,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                    ],
                                    restBetweenReps: 20,
                                    restAfterExercise: 20
                                }),
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Dumbbell Bench Press, Rotating Grip',
                                    mediaId: attachMedia2Exercise('DumbbellBenshPressRotatingGrip'),
                                    theGrip: new Grip(
                                        GripType.Neutral,
                                        GripWidth.Normal
                                    ),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    typeOfWeight: WeightType.Dumbbell,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 90,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 10
                                        }),
                                        new Rep({
                                            weight: 90,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 10
                                        }),
                                        new Rep({
                                            weight: 90,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 10
                                        }),
                                    ],
                                    restBetweenReps: 20,
                                    restAfterExercise: 20
                                }),
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Dumbbell Bench Press, Rotating Grip',
                                    mediaId: attachMedia2Exercise('DumbbellBenshPressRotatingGrip'),
                                    theGrip: new Grip(
                                        GripType.Neutral,
                                        GripWidth.Normal,
                                    ),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    typeOfWeight: WeightType.Dumbbell,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 90,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 10
                                        }),
                                        new Rep({
                                            weight: 90,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 10
                                        }),
                                        new Rep({
                                            weight: 90,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 10
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
                                    name: 'Cable Fly',
                                    mediaId: attachMedia2Exercise('CableFly'),
                                    theGrip: new Grip(
                                        GripType.Underhand,
                                    ),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 60,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 60,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 60,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 60,
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
                                    name: 'Dumbbell Fly',
                                    mediaId: attachMedia2Exercise('DumbbellFly'),
                                    theGrip: new Grip(
                                        GripType.Neutral,
                                    ),
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
                                    name: 'Dumbbell Horizontal Row, Inclined Prone',
                                    mediaId: attachMedia2Exercise('DumbbellHorizontalRowInclineProne'),
                                    theGrip: new Grip(
                                        GripType.Overhand,
                                    ),
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
                                    name: 'Dumbbell Tricpes Extensions, Seated',
                                    mediaId: attachMedia2Exercise('DumbbellTricepsExtensionSeated'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    typeOfWeight: WeightType.Dumbbell,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 25,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 25,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 25,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
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
                                    name: 'Inclined Pushup, Narrow Grip',
                                    mediaId: attachMedia2Exercise('InclinePushupNarrowGrip'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    theGrip: new Grip(
                                        GripType.Neutral,
                                        GripWidth.Narrow,
                                    ),
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
                                    name: 'Reverse Cable Fly, On Flat Bench',
                                    mediaId: attachMedia2Exercise('ReverseCableFlyOnFlatBench'),
                                    theGrip: new Grip(
                                        GripType.Overhand,
                                    ),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 55,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 55,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 55,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
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
                                    name: 'Situps',
                                    mediaId: attachMedia2Exercise('Situps'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
                                            times: 12
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
                                    name: 'Situps with Weight Above Head',
                                    mediaId: attachMedia2Exercise('SitupsWithWeightAboveHead'),
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
                                    mediaId: attachMedia2Exercise('RussianTwist'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
                                            times: 12
                                        }),
                                    ],
                                    restBetweenReps: 20,
                                    restAfterExercise: 20
                                })
                            ]
                        })
                    ],
                }),
                new WorkoutDay({
                    id: Guid.raw(),
                    name: 'Upper Body 2',
                    exerciseSets: [
                        new ExerciseSet({
                            id: Guid.raw(),
                            exercises: [
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Cabel Lat Pulldown, Behind Neck Wide Grip',
                                    mediaId: attachMedia2Exercise('CabelLatPulldownBehindNeckWideGrip'),
                                    theGrip: new Grip(
                                        GripType.Overhand,
                                        GripWidth.Wide,
                                    ),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 90,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 90,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 90,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 90,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        })
                                    ],
                                    restBetweenReps: 20,
                                    restAfterExercise: 20
                                }),
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Decline Dumbbell Pullover',
                                    mediaId: attachMedia2Exercise('DeclineDumbbellPullover'),
                                    theGrip: new Grip(
                                        GripType.Overhand,
                                        GripWidth.Wide,
                                    ),
                                    typeOfWeight: WeightType.Dumbbell,
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 25,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 25,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 25,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 25,
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
                                    name: 'Dumbbell Arm Circles',
                                    mediaId: attachMedia2Exercise('DumbbellArmCircles'),
                                    theGrip: new Grip(
                                        GripType.Overhand,
                                    ),
                                    typeOfWeight: WeightType.Dumbbell,
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
                                    name: 'Machine Row Medium Grip',
                                    mediaId: attachMedia2Exercise('MachineRowMediumGrip'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 85,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 85,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 85,
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
                                    name: 'Dummbell Biceps Curl Standing Underhand Grip',
                                    mediaId: attachMedia2Exercise('DummbellBicepsCurlStandingUnderhandGrip'),
                                    theGrip: new Grip(
                                        GripType.Underhand,
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
                                    name: 'Cable Shrug',
                                    mediaId: attachMedia2Exercise('CableShrug'),
                                    theGrip: new Grip(
                                        GripType.Neutral,
                                        GripWidth.Normal,
                                    ),
                                    typeOfWeight: WeightType.Dumbbell,
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            weight: 95,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 95,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 95,
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
                                    name: 'Dragon Flags',
                                    mediaId: attachMedia2Exercise('DragonFlags'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
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
                                    name: 'Decline Situps',
                                    mediaId: attachMedia2Exercise('DeclineSitups'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    typeOfWeight: WeightType.NoWeight,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
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
                                    name: 'Cross Body Crunch',
                                    mediaId: attachMedia2Exercise('CrossBodyCrunch'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    typeOfWeight: WeightType.NoWeight,
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
                                    name: 'Lying Scissors Kicks',
                                    mediaId: attachMedia2Exercise('LyingScissorsKicks'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    typeOfWeight: WeightType.NoWeight,
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
                                        })
                                    ],
                                    restBetweenReps: 20,
                                    restAfterExercise: 20
                                })
                            ],
                        })
                    ]
                }),
                new WorkoutDay({
                    id: Guid.raw(),
                    name: 'Lower Body',
                    exerciseSets: [
                        new ExerciseSet({
                            id: Guid.raw(),
                            exercises: [
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Walking Lunge with Side Weights',
                                    mediaId: attachMedia2Exercise('WalkingLungeWithSideWeights'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    typeOfWeight: WeightType.Dumbbell,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 25,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 25,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 25,
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
                                    name: 'Cable Abduction',
                                    mediaId: attachMedia2Exercise('CableAbduction'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            weight: 50,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 50,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 50,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        })
                                    ],
                                    restBetweenReps: 20,
                                    restAfterExercise: 20
                                }),
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Cable Adduction',
                                    mediaId: attachMedia2Exercise('CableAdduction'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            weight: 50,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 50,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 50,
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
                                    name: 'Cable Leg Curl',
                                    mediaId: attachMedia2Exercise('CableLegCurl'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            weight: 50,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 50,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 50,
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
                                    name: 'Cable Calf Raise',
                                    mediaId: attachMedia2Exercise('CableCalfRaise'),
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
                                    name: 'Bodyweight Flutter Kicks',
                                    mediaId: attachMedia2Exercise('BodyweightFlutterKicks'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
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
                                    name: 'Weighted Situps',
                                    mediaId: attachMedia2Exercise('WeightedSitups'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            weight: 25,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 25,
                                            weightUnit: WeightUnit.Lbs,
                                            times: 12
                                        }),
                                        new Rep({
                                            weight: 25,
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
                                    name: 'Plank',
                                    mediaId: attachMedia2Exercise('Plank'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            seconds: 10
                                        }),
                                        new Rep({
                                            seconds: 10
                                        }),
                                        new Rep({
                                            seconds: 10
                                        }),
                                    ],
                                    restBetweenReps: 5,
                                    restAfterExercise: 10
                                })
                            ]
                        }),
                        new ExerciseSet({
                            id: Guid.raw(),
                            exercises: [
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Twist',
                                    mediaId: attachMedia2Exercise('Twist'),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
                                            times: 12
                                        }),
                                        new Rep({
                                            times: 12
                                        })
                                    ],
                                    restBetweenReps: 20,
                                    restAfterExercise: 20
                                })
                            ]
                        })
                    ],
                })
            ]
        })
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
