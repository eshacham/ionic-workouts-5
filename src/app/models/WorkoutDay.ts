import { ExerciseSet } from './ExerciseSet';
import { DisplayMode, RunningState } from './enums';
import { Bean } from './interfaces';

export class WorkoutDayBase implements Bean {
    public id: string;
    public name: string;

    constructor(options: {
        id: string,
        name: string
    }) {
        this.id = options.id;
        if (options.name) {
            this.name = options.name;
        }
    }
}
export class WorkoutDay extends WorkoutDayBase {
    public exerciseSets: ExerciseSet[];
    public repeatsCount: number;

    constructor(options: {
        id: string,
        name: string,
        exerciseSets: ExerciseSet[],
        repeatsCount?: number;

    }) {
        super(options);
        this.exerciseSets = options.exerciseSets;
        this.repeatsCount = options.repeatsCount || 1;
    }
    static toBean(day: WorkoutDay, workoutId: string): WorkoutDayBean {
        return {
            ...day,
            exerciseSets: day.exerciseSets.map(s => s.id),
            workoutId,
            displayMode: DisplayMode.Display,
            // runningState: RunningState.NA,
        };
    }
}

export class WorkoutDayBean extends WorkoutDayBase {
    public exerciseSets: string[];
    // runningExerciseSetIndex?: number;
    repeatsCount?: number;
    // repeatsCompleted?: number;
    displayMode: DisplayMode;
    // runningState: RunningState;
    workoutId?: string;
    // scrollToExerciseSetIndex?: number;
    // scrollToExerciseSetId?: string;
    // scrollToExerciseSet?: boolean;

    constructor(options: {
        id: string,
        name: string,
        exerciseSets: string[],
        // runningExerciseSetIndex?: number,
        repeatsCount?: number,
        // repeatsCompleted?: number,
        displayMode?: DisplayMode,
        // runningState?: RunningState,
        workoutId?: string,
        // scrollToExerciseSetIndex?: number
        // scrollToExerciseSetId?: string
        // scrollToExerciseSet?: boolean
    }) {
        super(options);
        if (options.exerciseSets) {
            this.exerciseSets = options.exerciseSets;
        }
        this.repeatsCount = options.repeatsCount;
        // this.repeatsCompleted = options.repeatsCompleted;
        // this.runningExerciseSetIndex = options.runningExerciseSetIndex;
        // this.scrollToExerciseSetIndex = options.scrollToExerciseSetIndex;
        // this.scrollToExerciseSetId = options.scrollToExerciseSetId;
        // this.scrollToExerciseSet = options.scrollToExerciseSet || false;
        this.displayMode = options.displayMode || DisplayMode.Display;
        // this.runningState = options.runningState || RunningState.NA;
        if (options.workoutId) {
            this.workoutId = options.workoutId;
        }
    }

    static create(options: {
        id: string
        workoutId: string
    }): WorkoutDayBean {
        return new WorkoutDayBean({
            id: options.id,
            name: 'new workout day',
            exerciseSets: [],
            repeatsCount: 0,
            workoutId: options.workoutId,
        });
    }
}
