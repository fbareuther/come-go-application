import { Moment } from 'moment';
import { IBadge } from 'app/shared/model//badge.model';
import { IPerson } from 'app/shared/model//person.model';

export interface IHistory {
    id?: number;
    actualDate?: Moment;
    startEvent?: Moment;
    endEvent?: Moment;
    grossHours?: number;
    deductionHours?: number;
    additionHours?: number;
    netHours?: number;
    badge?: IBadge;
    person?: IPerson;
}

export class History implements IHistory {
    constructor(
        public id?: number,
        public actualDate?: Moment,
        public startEvent?: Moment,
        public endEvent?: Moment,
        public grossHours?: number,
        public deductionHours?: number,
        public additionHours?: number,
        public netHours?: number,
        public badge?: IBadge,
        public person?: IPerson
    ) {}
}
