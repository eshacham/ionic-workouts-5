import { Exercise, ExerciseBean } from './Exercise';
import { Bean } from './interfaces';

export class ExerciseSetBase implements Bean {
    public id: string;

    constructor(options: { id: string }) {
        this.id = options.id;
    }
}
export class ExerciseSet extends ExerciseSetBase {
    public exercises: Exercise[];
    public restBetweenSets: number;
    public restAfterExercise: number;

    constructor(options: {
        id: string,
        exercises: Exercise[],
        restBetweenSets: number,
        restAfterExercise: number,
    }) {
        super(options);
        this.exercises = options.exercises;
        this.restBetweenSets = options.restBetweenSets;
        this.restAfterExercise = options.restAfterExercise;
    }
    static toBean(set: ExerciseSet, workoutId: string, dayId: string): ExerciseSetBean {
        return {
            ...set,
            exercises: set.exercises.map(e => e.id),
            workoutId,
            dayId
        };
    }
}
export class ExerciseSetBean extends ExerciseSetBase {
    public exercises: string[];
    public workoutId: string;
    public dayId: string;
    public restBetweenSets: number;
    public restAfterExercise: number;

    constructor(options: {
        id: string,
        exercises: string[],
        workoutId: string,
        dayId: string,
        restBetweenSets: number,
        restAfterExercise: number
    }) {
        super(options);
        this.dayId = options.dayId;
        this.workoutId = options.workoutId;
        this.exercises = options.exercises;
        this.restAfterExercise = options.restAfterExercise;
        this.restBetweenSets = options.restBetweenSets;
    }
    static create(options: {
        id: string,
        workoutId: string,
        dayId: string,
        exercises: ExerciseBean[]
    }) {
        return new ExerciseSetBean({
            id: options.id,
            workoutId: options.workoutId,
            dayId: options.dayId,
            exercises: options.exercises.map(exe => exe.id),
            restBetweenSets: 20,
            restAfterExercise: 20,
        });
    }
    static copy(bean: ExerciseSetBean, options?: {
        restBetweenSets?: number,
        restAfterExercise?: number,
    }): ExerciseSetBean {
        return new ExerciseSetBean({
            ...bean,
            ...options,
        });
    }
}
