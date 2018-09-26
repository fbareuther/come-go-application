import { Moment } from 'moment';
import { IPerson } from 'app/shared/model//person.model';

export interface IAdjustmentSchema {
    id?: number;
    name?: string;
    key?: string;
    validFrom?: Moment;
    active?: boolean;
    person?: IPerson;
}

export class AdjustmentSchema implements IAdjustmentSchema {
    constructor(
        public id?: number,
        public name?: string,
        public key?: string,
        public validFrom?: Moment,
        public active?: boolean,
        public person?: IPerson
    ) {
        this.active = this.active || false;
    }
}
