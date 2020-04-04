import { Bean } from './interfaces';
import { Feature } from './Feature';

export class Version implements Bean {
    constructor(
        public id: string,
        public name: string,
        public features: Feature[]) {}
}