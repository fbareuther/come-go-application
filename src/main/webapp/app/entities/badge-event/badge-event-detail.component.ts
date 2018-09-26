import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBadgeEvent } from 'app/shared/model/badge-event.model';

@Component({
    selector: 'jhi-badge-event-detail',
    templateUrl: './badge-event-detail.component.html'
})
export class BadgeEventDetailComponent implements OnInit {
    badgeEvent: IBadgeEvent;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ badgeEvent }) => {
            this.badgeEvent = badgeEvent;
        });
    }

    previousState() {
        window.history.back();
    }
}
