import { WorkoutDay} from './WorkoutDay';
import { Bean } from './interfaces';

export class WorkoutBase implements Bean {
    public id: string;
    public name: string;
    public description: string;
    constructor(options: {
        id: string,
        name: string,
        description: string}) {
        this.id = options.id;
        this.name = options.name;
        this.description = options.description;
    }
}
export class Workout extends WorkoutBase {
    public days?: WorkoutDay[];
    constructor(options: {
        id: string,
        name: string,
        description: string,
        days: WorkoutDay[]}) {
        super(options);
        this.days = options.days;
    }
    static toBean(workout: Workout): WorkoutBean {
        return {
            ...workout,
            days: workout.days.map(d => d.id),
        };
    }
}
export class WorkoutBean extends WorkoutBase {
    public days?: string[];
    selectedWorkoutDayId?: string;
    constructor(options: {
        id: string,
        name: string,
        description: string,
        days: string[]}) {
        super(options);
        this.days = options.days;
    }

    static create(options: {id: string, dayId: string}) {
        return new WorkoutBean({
            id: options.id,
            name: 'new workout',
            description: 'describe the workout',
            days: [ options.dayId ]
        });
    }
}
