/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ComeGoAppTestModule } from '../../../test.module';
import { AdjustmentSchemaDeleteDialogComponent } from 'app/entities/adjustment-schema/adjustment-schema-delete-dialog.component';
import { AdjustmentSchemaService } from 'app/entities/adjustment-schema/adjustment-schema.service';

describe('Component Tests', () => {
    describe('AdjustmentSchema Management Delete Component', () => {
        let comp: AdjustmentSchemaDeleteDialogComponent;
        let fixture: ComponentFixture<AdjustmentSchemaDeleteDialogComponent>;
        let service: AdjustmentSchemaService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ComeGoAppTestModule],
                declarations: [AdjustmentSchemaDeleteDialogComponent]
            })
                .overrideTemplate(AdjustmentSchemaDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AdjustmentSchemaDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AdjustmentSchemaService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
