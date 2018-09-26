import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBadge } from 'app/shared/model/badge.model';

@Component({
    selector: 'jhi-badge-detail',
    templateUrl: './badge-detail.component.html'
})
export class BadgeDetailComponent implements OnInit {
    badge: IBadge;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ badge }) => {
            this.badge = badge;
        });
    }

    previousState() {
        window.history.back();
    }
}
