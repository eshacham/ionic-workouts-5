
import { RepetitionSpeed, WeightType } from './enums';
import { Grip } from './Grip';
import { Set } from './Set';
import { ExerciseMediaBean } from './ExerciseMedia';
import { Bean } from './interfaces';

export class Exercise implements Bean {
    public id: string;
    public name: string;
    public mediaId: string;
    public theGrip: Grip;
    public repSpeed: RepetitionSpeed;
    public typeOfWeight: WeightType;
    public isFavorite: boolean;
    public sets: Set[];
    public restBetweenSets: number;
    public restAfterExercise: number;

    constructor(options: {
        id: string,
        name: string,
        mediaId: string,
        theGrip?: Grip,
        repSpeed: RepetitionSpeed,
        typeOfWeight?: WeightType,
        isFavorite: boolean,
        sets: Set[],
        restBetweenSets: number,
        restAfterExercise: number,
    }) {
        this.id = options.id;
        this.name = options.name;
        this.mediaId = options.mediaId;
        this.theGrip = options.theGrip || new Grip();
        this.repSpeed = options.repSpeed;
        this.typeOfWeight = options.typeOfWeight || WeightType.NoWeight;

        this.isFavorite = options.isFavorite;
        this.sets = options.sets;
        this.restBetweenSets = options.restBetweenSets;
        this.restAfterExercise = options.restAfterExercise;
    }

    static toBean(exe: Exercise, workoutId: string, dayId: string, setId: string)
        : ExerciseBean {
        return {
            ...exe,
            workoutId,
            dayId,
            setId
        };
    }
}
export class ExerciseBean extends Exercise {

    public workoutId: string;
    public dayId: string;
    public setId: string;

    constructor(options: {
        id: string,
        workoutId: string;
        dayId: string;
        setId: string;
        name: string,
        mediaId: string,
        theGrip?: Grip,
        repSpeed: RepetitionSpeed,
        typeOfWeight?: WeightType,
        isFavorite: boolean,
        sets: Set[],
        restBetweenSets: number,
        restAfterExercise: number
    }
    ) {
        super(options);
        this.workoutId = options.workoutId;
        this.dayId = options.dayId;
        this.setId = options.setId;
    }

    static create(
        id: string,
        setId: string,
        dayId: string,
        workoutId: string,
        mediaId: string,
        name: string
    ): ExerciseBean {
        return new ExerciseBean({
            id,
            setId,
            dayId,
            workoutId,
            name,
            mediaId,
            sets: [new Set({
                reps: 10
            })],
            repSpeed: RepetitionSpeed.Medium,
            isFavorite: false,
            restBetweenSets: 20,
            restAfterExercise: 20,
        });
    }

    static copy(bean: ExerciseBean, options?: {
        name?: string,
        media?: ExerciseMediaBean,
        theGrip?: Grip,
        repSpeed?: RepetitionSpeed,
        typeOfWeight?: WeightType,
        isFavorite?: boolean,
        restBetweenSets?: number,
        restAfterExercise?: number
    }): ExerciseBean {
        const newGrip = {...bean.theGrip};
        return new ExerciseBean({
            ...bean,
            ...options,
            theGrip: newGrip
        });
    }
}
