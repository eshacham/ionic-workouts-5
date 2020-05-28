import { Muscles } from './enums';
import { Bean } from './interfaces';
import { ISignedInUser } from '../store/state/data.state';

export class ExerciseMediaBean implements Bean {

  public id: string;
  public name: string;
  public description: string;
  public images: string[];
  public muscles: Array<Muscles>;
  public isDefault: boolean;
  public exportedBy?: ISignedInUser;

  constructor(options: {
    id: string,
    name: string,
    description: string,
    images: string[],
    muscles: Set<Muscles>,
    isDefault: boolean,
    exportedBy?: ISignedInUser,

  }) {
    this.id = options.id;
    this.name = options.name;
    this.description = options.description;
    this.images = options.images
    this.muscles = Array.from(options.muscles.values());
    this.isDefault = options.isDefault;
    this.exportedBy = options.exportedBy;
  }

  static copy(bean: ExerciseMediaBean): ExerciseMediaBean {
    return new ExerciseMediaBean({
      id: bean.id,
      name: bean.name,
      description: bean.description,
      images: [...bean.images],
      muscles: new Set(bean.muscles),
      isDefault: bean.isDefault,
      exportedBy: bean.exportedBy,
    });
  }
}
