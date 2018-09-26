import { IBadgeEvent } from 'app/shared/model//badge-event.model';
import { IHistory } from 'app/shared/model//history.model';
import { IPerson } from 'app/shared/model//person.model';

export const enum IdentificationType {
    APP = 'APP',
    URL = 'URL',
    SYSTEM = 'SYSTEM'
}

export interface IBadge {
    id?: number;
    tag?: string;
    type?: IdentificationType;
    badgeEvents?: IBadgeEvent[];
    history?: IHistory;
    person?: IPerson;
}

export class Badge implements IBadge {
    constructor(
        public id?: number,
        public tag?: string,
        public type?: IdentificationType,
        public badgeEvents?: IBadgeEvent[],
        public history?: IHistory,
        public person?: IPerson
    ) {}
}
