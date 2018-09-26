import { Moment } from 'moment';
import { IBadge } from 'app/shared/model//badge.model';

export interface IBadgeEvent {
    id?: number;
    occurance?: Moment;
    badge?: IBadge;
}

export class BadgeEvent implements IBadgeEvent {
    constructor(public id?: number, public occurance?: Moment, public badge?: IBadge) {}
}
