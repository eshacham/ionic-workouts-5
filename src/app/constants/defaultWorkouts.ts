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
                                    mediaId: attachMedia2Exercise('BenchPressWideGrip.jpeg'),
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
                                    mediaId: attachMedia2Exercise('SeatedRopeCableRow.png'),
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
                                    mediaId: attachMedia2Exercise('DumbbellWristCurl.png'),
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
                                    mediaId: attachMedia2Exercise('CableTricepsPushdownOverheadGrip.png'),
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
                                    mediaId: attachMedia2Exercise('CableBicepsCurlUnderhandGrip.png'),
                                    theGrip: new Grip(
                                        GripType.Underhand
                                    ),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,
                                    reps: [
                                        new Rep({
                                            'weight': 50,
                                            'weightUnit': WeightUnit.Lbs,
                                            'times': 12
                                        }),
                                        new Rep({
                                            'weight': 50,
                                            'weightUnit': WeightUnit.Lbs,
                                            'times': 12
                                        }),
                                        new Rep({
                                            'weight': 50,
                                            'weightUnit': WeightUnit.Lbs,
                                            'times': 12
                                        }),
                                        new Rep({
                                            'weight': 50,
                                            'weightUnit': WeightUnit.Lbs,
                                            'times': 12
                                        })
                                    ],
                                    'restBetweenReps': 20,
                                    'restAfterExercise': 20
                                })
                            ]
                        }),
                        new ExerciseSet({
                            id: Guid.raw(),
                            exercises: [
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Leg Raise Machine',
                                    mediaId: attachMedia2Exercise('LegRaiseMachine.png'),
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
                                    mediaId: attachMedia2Exercise('CableLegCurl.png'),
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
                                    mediaId: attachMedia2Exercise('CrossfitSitup.png'),
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
                                    mediaId: attachMedia2Exercise('CrossBodyCrunch.png'),
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
                                    mediaId: attachMedia2Exercise('BenchPressNarrowGrip.png'),
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
                                    mediaId: attachMedia2Exercise('DumbbellBenshPressRotatingGrip.png'),
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
                                    mediaId: attachMedia2Exercise('DumbbellBenshPressRotatingGrip.png'),
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
                                    mediaId: attachMedia2Exercise('CableFly.png'),
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
                                    mediaId: attachMedia2Exercise('DumbbellFly.png'),
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
                                    mediaId: attachMedia2Exercise('DumbbellHorizontalRowInclineProne.png'),
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
                                    mediaId: attachMedia2Exercise('DumbbellTricepsExtensionSeated.png'),
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
                                    mediaId: attachMedia2Exercise('InclinePushupNarrowGrip.jpg'),
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
                                    mediaId: attachMedia2Exercise('ReverseCableFlyOnFlatBench.png'),
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
                                    mediaId: attachMedia2Exercise('Situps.png'),
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
                                    mediaId: attachMedia2Exercise('SitupsWithWeightAboveHead.png'),
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
                                    mediaId: attachMedia2Exercise('RussianTwist.png'),
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
                                    mediaId: attachMedia2Exercise('CabelLatPulldownBehindNeckWideGrip.png'),
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
                                    mediaId: attachMedia2Exercise('DeclineDumbbellPullover.png'),
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
                                    mediaId: attachMedia2Exercise('DumbbellArmCircles.png'),
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
                                    mediaId: attachMedia2Exercise('MachineRowMediumGrip.png'),
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
                                    mediaId: attachMedia2Exercise('DummbellBicepsCurlStandingUnderhandGrip.png'),
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
                                    mediaId: attachMedia2Exercise('CableShrug.png'),
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
                                    mediaId: attachMedia2Exercise('DragonFlags.png'),
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
                                    mediaId: attachMedia2Exercise('DeclineSitups.png'),
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
                                    mediaId: attachMedia2Exercise('CrossBodyCrunch.png'),
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
                                    mediaId: attachMedia2Exercise('LyingScissorsKicks.png'),
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
                                    mediaId: attachMedia2Exercise('WalkingLungeWithSideWeights.png'),
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
                                    mediaId: attachMedia2Exercise('CableAbduction.png'),
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
                                    mediaId: attachMedia2Exercise('CableAdduction.png'),
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
                                    mediaId: attachMedia2Exercise('CableLegCurl.png'),
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
                                    mediaId: attachMedia2Exercise('CableCalfRaise.png'),
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
                                    mediaId: attachMedia2Exercise('BodyweightFlutterKicks.png'),
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
                                    mediaId: attachMedia2Exercise('WeightedSitups.png'),
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
                                    mediaId: attachMedia2Exercise('Plank.png'),
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
                                    mediaId: attachMedia2Exercise('Twist.png'),
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
                                    mediaId: attachMedia2Exercise('BenchPressWideGrip.jpeg'),
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
                                    mediaId: attachMedia2Exercise('SeatedRopeCableRow.png'),
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
                                    mediaId: attachMedia2Exercise('DumbbellWristCurl.png'),
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
                                    mediaId: attachMedia2Exercise('CableTricepsPushdownOverheadGrip.png'),
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
                                    mediaId: attachMedia2Exercise('CableBicepsCurlUnderhandGrip.png'),
                                    theGrip: new Grip(
                                        GripType.Underhand
                                    ),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            'weight': 50,
                                            'weightUnit': WeightUnit.Lbs,
                                            'times': 12
                                        }),
                                        new Rep({
                                            'weight': 50,
                                            'weightUnit': WeightUnit.Lbs,
                                            'times': 12
                                        }),
                                        new Rep({
                                            'weight': 50,
                                            'weightUnit': WeightUnit.Lbs,
                                            'times': 12
                                        }),
                                        new Rep({
                                            'weight': 50,
                                            'weightUnit': WeightUnit.Lbs,
                                            'times': 12
                                        })
                                    ],
                                    'restBetweenReps': 20,
                                    'restAfterExercise': 20
                                })
                            ]
                        }),
                        new ExerciseSet({
                            id: Guid.raw(),
                            exercises: [
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Leg Raise Machine',
                                    mediaId: attachMedia2Exercise('LegRaiseMachine.png'),
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
                                    mediaId: attachMedia2Exercise('CableLegCurl.png'),
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
                                    mediaId: attachMedia2Exercise('CrossfitSitup.png'),
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
                                    mediaId: attachMedia2Exercise('CrossBodyCrunch.png'),
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
                                    mediaId: attachMedia2Exercise('BenchPressNarrowGrip.png'),
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
                                    mediaId: attachMedia2Exercise('DumbbellBenshPressRotatingGrip.png'),
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
                                    mediaId: attachMedia2Exercise('DumbbellBenshPressRotatingGrip.png'),
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
                                    mediaId: attachMedia2Exercise('CableFly.png'),
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
                                    mediaId: attachMedia2Exercise('DumbbellFly.png'),
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
                                    mediaId: attachMedia2Exercise('DumbbellHorizontalRowInclineProne.png'),
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
                                    mediaId: attachMedia2Exercise('DumbbellTricepsExtensionSeated.png'),
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
                                    mediaId: attachMedia2Exercise('InclinePushupNarrowGrip.jpg'),
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
                                    mediaId: attachMedia2Exercise('ReverseCableFlyOnFlatBench.png'),
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
                                    mediaId: attachMedia2Exercise('Situps.png'),
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
                                    mediaId: attachMedia2Exercise('SitupsWithWeightAboveHead.png'),
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
                                    mediaId: attachMedia2Exercise('RussianTwist.png'),
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
                                    mediaId: attachMedia2Exercise('CabelLatPulldownBehindNeckWideGrip.png'),
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
                                    mediaId: attachMedia2Exercise('DeclineDumbbellPullover.png'),
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
                                    mediaId: attachMedia2Exercise('DumbbellArmCircles.png'),
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
                                    mediaId: attachMedia2Exercise('MachineRowMediumGrip.png'),
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
                                    mediaId: attachMedia2Exercise('DummbellBicepsCurlStandingUnderhandGrip.png'),
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
                                    mediaId: attachMedia2Exercise('CableShrug.png'),
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
                                    mediaId: attachMedia2Exercise('DragonFlags.png'),
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
                                    mediaId: attachMedia2Exercise('DeclineSitups.png'),
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
                                    mediaId: attachMedia2Exercise('CrossBodyCrunch.png'),
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
                                    mediaId: attachMedia2Exercise('LyingScissorsKicks.png'),
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
                                    mediaId: attachMedia2Exercise('WalkingLungeWithSideWeights.png'),
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
                                    mediaId: attachMedia2Exercise('CableAbduction.png'),
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
                                    mediaId: attachMedia2Exercise('CableAdduction.png'),
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
                                    mediaId: attachMedia2Exercise('CableLegCurl.png'),
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
                                    mediaId: attachMedia2Exercise('CableCalfRaise.png'),
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
                                    mediaId: attachMedia2Exercise('BodyweightFlutterKicks.png'),
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
                                    mediaId: attachMedia2Exercise('WeightedSitups.png'),
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
                                    mediaId: attachMedia2Exercise('Plank.png'),
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
                                    mediaId: attachMedia2Exercise('Twist.png'),
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
                                    mediaId: attachMedia2Exercise('BenchPressWideGrip.jpeg'),
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
                                    mediaId: attachMedia2Exercise('SeatedRopeCableRow.png'),
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
                                    mediaId: attachMedia2Exercise('DumbbellWristCurl.png'),
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
                                    mediaId: attachMedia2Exercise('CableTricepsPushdownOverheadGrip.png'),
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
                                    mediaId: attachMedia2Exercise('CableBicepsCurlUnderhandGrip.png'),
                                    theGrip: new Grip(
                                        GripType.Underhand
                                    ),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            'weight': 50,
                                            'weightUnit': WeightUnit.Lbs,
                                            'times': 12
                                        }),
                                        new Rep({
                                            'weight': 50,
                                            'weightUnit': WeightUnit.Lbs,
                                            'times': 12
                                        }),
                                        new Rep({
                                            'weight': 50,
                                            'weightUnit': WeightUnit.Lbs,
                                            'times': 12
                                        }),
                                        new Rep({
                                            'weight': 50,
                                            'weightUnit': WeightUnit.Lbs,
                                            'times': 12
                                        })
                                    ],
                                    'restBetweenReps': 20,
                                    'restAfterExercise': 20
                                })
                            ]
                        }),
                        new ExerciseSet({
                            id: Guid.raw(),
                            exercises: [
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Leg Raise Machine',
                                    mediaId: attachMedia2Exercise('LegRaiseMachine.png'),
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
                                    mediaId: attachMedia2Exercise('CableLegCurl.png'),
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
                                    mediaId: attachMedia2Exercise('CrossfitSitup.png'),
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
                                    mediaId: attachMedia2Exercise('CrossBodyCrunch.png'),
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
                                    mediaId: attachMedia2Exercise('BenchPressNarrowGrip.png'),
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
                                    mediaId: attachMedia2Exercise('DumbbellBenshPressRotatingGrip.png'),
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
                                    mediaId: attachMedia2Exercise('DumbbellBenshPressRotatingGrip.png'),
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
                                    mediaId: attachMedia2Exercise('CableFly.png'),
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
                                    mediaId: attachMedia2Exercise('DumbbellFly.png'),
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
                                    mediaId: attachMedia2Exercise('DumbbellHorizontalRowInclineProne.png'),
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
                                    mediaId: attachMedia2Exercise('DumbbellTricepsExtensionSeated.png'),
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
                                    mediaId: attachMedia2Exercise('InclinePushupNarrowGrip.jpg'),
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
                                    mediaId: attachMedia2Exercise('ReverseCableFlyOnFlatBench.png'),
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
                                    mediaId: attachMedia2Exercise('Situps.png'),
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
                                    mediaId: attachMedia2Exercise('SitupsWithWeightAboveHead.png'),
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
                                    mediaId: attachMedia2Exercise('RussianTwist.png'),
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
                                    mediaId: attachMedia2Exercise('CabelLatPulldownBehindNeckWideGrip.png'),
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
                                    mediaId: attachMedia2Exercise('DeclineDumbbellPullover.png'),
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
                                    mediaId: attachMedia2Exercise('DumbbellArmCircles.png'),
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
                                    mediaId: attachMedia2Exercise('MachineRowMediumGrip.png'),
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
                                    mediaId: attachMedia2Exercise('DummbellBicepsCurlStandingUnderhandGrip.png'),
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
                                    mediaId: attachMedia2Exercise('CableShrug.png'),
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
                                    mediaId: attachMedia2Exercise('DragonFlags.png'),
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
                                    mediaId: attachMedia2Exercise('DeclineSitups.png'),
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
                                    mediaId: attachMedia2Exercise('CrossBodyCrunch.png'),
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
                                    mediaId: attachMedia2Exercise('LyingScissorsKicks.png'),
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
                                    mediaId: attachMedia2Exercise('WalkingLungeWithSideWeights.png'),
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
                                    mediaId: attachMedia2Exercise('CableAbduction.png'),
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
                                    mediaId: attachMedia2Exercise('CableAdduction.png'),
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
                                    mediaId: attachMedia2Exercise('CableLegCurl.png'),
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
                                    mediaId: attachMedia2Exercise('CableCalfRaise.png'),
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
                                    mediaId: attachMedia2Exercise('BodyweightFlutterKicks.png'),
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
                                    mediaId: attachMedia2Exercise('WeightedSitups.png'),
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
                                    mediaId: attachMedia2Exercise('Plank.png'),
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
                                    mediaId: attachMedia2Exercise('Twist.png'),
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
                                    mediaId: attachMedia2Exercise('BenchPressWideGrip.jpeg'),
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
                                    mediaId: attachMedia2Exercise('SeatedRopeCableRow.png'),
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
                                    mediaId: attachMedia2Exercise('DumbbellWristCurl.png'),
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
                                    mediaId: attachMedia2Exercise('CableTricepsPushdownOverheadGrip.png'),
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
                                    mediaId: attachMedia2Exercise('CableBicepsCurlUnderhandGrip.png'),
                                    theGrip: new Grip(
                                        GripType.Underhand
                                    ),
                                    repSpeed: RepetitionSpeed.OneOne,
                                    isFavorite: false,

                                    reps: [
                                        new Rep({
                                            'weight': 50,
                                            'weightUnit': WeightUnit.Lbs,
                                            'times': 12
                                        }),
                                        new Rep({
                                            'weight': 50,
                                            'weightUnit': WeightUnit.Lbs,
                                            'times': 12
                                        }),
                                        new Rep({
                                            'weight': 50,
                                            'weightUnit': WeightUnit.Lbs,
                                            'times': 12
                                        }),
                                        new Rep({
                                            'weight': 50,
                                            'weightUnit': WeightUnit.Lbs,
                                            'times': 12
                                        })
                                    ],
                                    'restBetweenReps': 20,
                                    'restAfterExercise': 20
                                })
                            ]
                        }),
                        new ExerciseSet({
                            id: Guid.raw(),
                            exercises: [
                                new Exercise({
                                    id: Guid.raw(),
                                    name: 'Leg Raise Machine',
                                    mediaId: attachMedia2Exercise('LegRaiseMachine.png'),
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
                                    mediaId: attachMedia2Exercise('CableLegCurl.png'),
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
                                    mediaId: attachMedia2Exercise('CrossfitSitup.png'),
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
                                    mediaId: attachMedia2Exercise('CrossBodyCrunch.png'),
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
                                    mediaId: attachMedia2Exercise('BenchPressNarrowGrip.png'),
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
                                    mediaId: attachMedia2Exercise('DumbbellBenshPressRotatingGrip.png'),
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
                                    mediaId: attachMedia2Exercise('DumbbellBenshPressRotatingGrip.png'),
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
                                    mediaId: attachMedia2Exercise('CableFly.png'),
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
                                    mediaId: attachMedia2Exercise('DumbbellFly.png'),
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
                                    mediaId: attachMedia2Exercise('DumbbellHorizontalRowInclineProne.png'),
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
                                    mediaId: attachMedia2Exercise('DumbbellTricepsExtensionSeated.png'),
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
                                    mediaId: attachMedia2Exercise('InclinePushupNarrowGrip.jpg'),
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
                                    mediaId: attachMedia2Exercise('ReverseCableFlyOnFlatBench.png'),
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
                                    mediaId: attachMedia2Exercise('Situps.png'),
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
                                    mediaId: attachMedia2Exercise('SitupsWithWeightAboveHead.png'),
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
                                    mediaId: attachMedia2Exercise('RussianTwist.png'),
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
                                    mediaId: attachMedia2Exercise('CabelLatPulldownBehindNeckWideGrip.png'),
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
                                    mediaId: attachMedia2Exercise('DeclineDumbbellPullover.png'),
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
                                    mediaId: attachMedia2Exercise('DumbbellArmCircles.png'),
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
                                    mediaId: attachMedia2Exercise('MachineRowMediumGrip.png'),
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
                                    mediaId: attachMedia2Exercise('DummbellBicepsCurlStandingUnderhandGrip.png'),
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
                                    mediaId: attachMedia2Exercise('CableShrug.png'),
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
                                    mediaId: attachMedia2Exercise('DragonFlags.png'),
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
                                    mediaId: attachMedia2Exercise('DeclineSitups.png'),
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
                                    mediaId: attachMedia2Exercise('CrossBodyCrunch.png'),
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
                                    mediaId: attachMedia2Exercise('LyingScissorsKicks.png'),
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
                                    mediaId: attachMedia2Exercise('WalkingLungeWithSideWeights.png'),
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
                                    mediaId: attachMedia2Exercise('CableAbduction.png'),
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
                                    mediaId: attachMedia2Exercise('CableAdduction.png'),
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
                                    mediaId: attachMedia2Exercise('CableLegCurl.png'),
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
                                    mediaId: attachMedia2Exercise('CableCalfRaise.png'),
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
                                    mediaId: attachMedia2Exercise('BodyweightFlutterKicks.png'),
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
                                    mediaId: attachMedia2Exercise('WeightedSitups.png'),
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
                                    mediaId: attachMedia2Exercise('Plank.png'),
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
                                    mediaId: attachMedia2Exercise('Twist.png'),
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

let _defaultWorkouts: Workout[];
const getDefaultWorkouts = (): Workout[] => {
    if (!_defaultWorkouts) {
        _defaultWorkouts = buildDefaultWorkouts();
    }
    return _defaultWorkouts;
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
