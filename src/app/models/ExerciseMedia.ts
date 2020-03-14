import { Muscles } from './enums';
import { Bean } from './interfaces';
import { ISignedInUser } from '../store/state/data.state';

export class ExerciseMediaBean implements Bean {

  public id: string;
  public name: string;
  public images: string[];
  public muscles: Array<Muscles>;
  public isDefault: boolean;
  public exportedBy?: ISignedInUser;

  constructor(options: {
    id: string,
    name: string,
    images: string[],
    muscles: Set<Muscles>,
    isDefault: boolean,
    exportedBy?: ISignedInUser,

  }) {
    this.id = options.id;
    this.name = options.name;
    this.images = options.images
    this.muscles = Array.from(options.muscles.values());
    this.isDefault = options.isDefault;
    this.exportedBy = options.exportedBy;
  }

  static create(
    id: string,
    name: string,
    images: string[],
    muscles: Set<Muscles>,
    isDefault: boolean = true,
    exportedBy: ISignedInUser = null,
  ): ExerciseMediaBean {
    return new ExerciseMediaBean({
      id,
      name,
      images,
      muscles,
      isDefault,
      exportedBy,
    });
  }
}
