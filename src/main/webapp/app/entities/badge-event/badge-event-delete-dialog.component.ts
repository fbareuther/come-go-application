import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBadgeEvent } from 'app/shared/model/badge-event.model';
import { BadgeEventService } from './badge-event.service';

@Component({
    selector: 'jhi-badge-event-delete-dialog',
    templateUrl: './badge-event-delete-dialog.component.html'
})
export class BadgeEventDeleteDialogComponent {
    badgeEvent: IBadgeEvent;

    constructor(private badgeEventService: BadgeEventService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.badgeEventService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'badgeEventListModification',
                content: 'Deleted an badgeEvent'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-badge-event-delete-popup',
    template: ''
})
export class BadgeEventDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ badgeEvent }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(BadgeEventDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.badgeEvent = badgeEvent;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
