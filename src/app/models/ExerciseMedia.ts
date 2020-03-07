import { Muscles } from './enums';
import { Bean } from './interfaces';
import { ISignedInUser } from '../store/state/data.state';

export class ExerciseMediaBean implements Bean {

  public id: string;
  public name: string;
  public isDefault: boolean;
  public muscles: Array<Muscles>;
  public exportedBy?: ISignedInUser;

  constructor(options: {
    id: string,
    name: string,
    isDefault: boolean,
    muscles: Set<Muscles>,
    exportedBy?: ISignedInUser,
  }) {
    this.id = options.id;
    this.name = options.name;
    this.isDefault = options.isDefault;
    this.muscles = Array.from(options.muscles.values());
    this.exportedBy = options.exportedBy;
  }

  static create(
    id: string,
    name: string,
    muscles: Set<Muscles>,
    isDefault: boolean = true,
    exportedBy: ISignedInUser = null,

  ): ExerciseMediaBean {
    return new ExerciseMediaBean({
      id,
      name,
      isDefault,
      muscles,
      exportedBy
    });
  }
}
