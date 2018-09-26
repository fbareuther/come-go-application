/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ComeGoAppTestModule } from '../../../test.module';
import { BadgeEventDeleteDialogComponent } from 'app/entities/badge-event/badge-event-delete-dialog.component';
import { BadgeEventService } from 'app/entities/badge-event/badge-event.service';

describe('Component Tests', () => {
    describe('BadgeEvent Management Delete Component', () => {
        let comp: BadgeEventDeleteDialogComponent;
        let fixture: ComponentFixture<BadgeEventDeleteDialogComponent>;
        let service: BadgeEventService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ComeGoAppTestModule],
                declarations: [BadgeEventDeleteDialogComponent]
            })
                .overrideTemplate(BadgeEventDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BadgeEventDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BadgeEventService);
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
