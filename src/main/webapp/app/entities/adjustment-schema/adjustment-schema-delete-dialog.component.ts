import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAdjustmentSchema } from 'app/shared/model/adjustment-schema.model';
import { AdjustmentSchemaService } from './adjustment-schema.service';

@Component({
    selector: 'jhi-adjustment-schema-delete-dialog',
    templateUrl: './adjustment-schema-delete-dialog.component.html'
})
export class AdjustmentSchemaDeleteDialogComponent {
    adjustmentSchema: IAdjustmentSchema;

    constructor(
        private adjustmentSchemaService: AdjustmentSchemaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.adjustmentSchemaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'adjustmentSchemaListModification',
                content: 'Deleted an adjustmentSchema'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-adjustment-schema-delete-popup',
    template: ''
})
export class AdjustmentSchemaDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ adjustmentSchema }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AdjustmentSchemaDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.adjustmentSchema = adjustmentSchema;
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
