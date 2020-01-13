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

    constructor(options: {
        id: string,
        name: string,
        exerciseSets: ExerciseSet[]
    }) {
        super(options);
        this.exerciseSets = options.exerciseSets;
    }
    static toBean(day: WorkoutDay, workoutId: string): WorkoutDayBean {
        return {
            ...day,
            exerciseSets: day.exerciseSets.map(s => s.id),
            workoutId,
            displayMode: DisplayMode.Display,
            runningState: RunningState.NA
        };
    }
}

export class WorkoutDayBean extends WorkoutDayBase {
    public exerciseSets: string[];
    runningExerciseSetIndex?: number;
    displayMode: DisplayMode;
    runningState: RunningState;
    workoutId?: string;
    scrollToExerciseSetIndex?: number;

    constructor(options: {
        id: string,
        name: string,
        exerciseSets: string[],
        runningExerciseSetIndex?: number,
        displayMode?: DisplayMode,
        runningState?: RunningState,
        workoutId?: string,
        scrollToExerciseSetIndex?: number
    }) {
        super(options);
        if (options.exerciseSets) {
            this.exerciseSets = options.exerciseSets;
        }
        this.runningExerciseSetIndex = options.runningExerciseSetIndex;
        this.scrollToExerciseSetIndex = options.scrollToExerciseSetIndex;
        this.displayMode = options.displayMode || DisplayMode.Display;
        this.runningState = options.runningState || RunningState.NA;
        if (options.workoutId) {
            this.workoutId = options.workoutId;
        }
    }

    static create(options: {
        id: string
        workoutId: string
    }) {
        return new WorkoutDayBean({
            id: options.id,
            name: 'new workout day',
            exerciseSets: [],
            workoutId: options.workoutId
        });
    }
}
