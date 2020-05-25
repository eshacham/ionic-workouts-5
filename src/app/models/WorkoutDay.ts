import { ExerciseSet } from './ExerciseSet';
import { DisplayMode } from './enums';
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
        };
    }
}

export class WorkoutDayBean extends WorkoutDayBase {
    public exerciseSets: string[];
    repeatsCount?: number;
    displayMode: DisplayMode;
    workoutId?: string;

    constructor(options: {
        id: string,
        name: string,
        exerciseSets: string[],
        repeatsCount?: number,
        displayMode?: DisplayMode,
        workoutId?: string,
    }) {
        super(options);
        if (options.exerciseSets) {
            this.exerciseSets = options.exerciseSets;
        }
        this.repeatsCount = options.repeatsCount;
        this.displayMode = options.displayMode || DisplayMode.Display;
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
