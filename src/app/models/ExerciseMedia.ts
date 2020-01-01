import { Muscles } from './enums';
import { Bean } from './interfaces';

export class ExerciseMediaBean implements Bean {

  public id: string;
  public name: string;
  public isDefault: boolean;
  public muscles: Array<Muscles>;
  public mediaUsageCounter: number;

  constructor(option: {
    id: string,
    name: string,
    isDefault: boolean,
    muscles: Set<Muscles>,
    mediaUsageCounter?: number
  }) {
    this.id = option.id;
    this.name = option.name;
    this.isDefault = option.isDefault;
    this.muscles = Array.from(option.muscles.values());
    this.mediaUsageCounter = this.mediaUsageCounter || 0;
  }

  static create(
    id: string,
    name: string,
    muscles: Set<Muscles>
  ): ExerciseMediaBean {
    return new ExerciseMediaBean({
      id,
      name,
      isDefault: true,
      muscles
    });
  }
}
