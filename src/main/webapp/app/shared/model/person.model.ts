import { IAdjustmentSchema } from 'app/shared/model//adjustment-schema.model';
import { IBadge } from 'app/shared/model//badge.model';
import { IHistory } from 'app/shared/model//history.model';

export interface IPerson {
    id?: number;
    userName?: string;
    email?: string;
    adjustmentSchema?: IAdjustmentSchema;
    badges?: IBadge[];
    histories?: IHistory[];
}

export class Person implements IPerson {
    constructor(
        public id?: number,
        public userName?: string,
        public email?: string,
        public adjustmentSchema?: IAdjustmentSchema,
        public badges?: IBadge[],
        public histories?: IHistory[]
    ) {}
}
