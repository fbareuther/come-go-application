/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ComeGoAppTestModule } from '../../../test.module';
import { BadgeEventUpdateComponent } from 'app/entities/badge-event/badge-event-update.component';
import { BadgeEventService } from 'app/entities/badge-event/badge-event.service';
import { BadgeEvent } from 'app/shared/model/badge-event.model';

describe('Component Tests', () => {
    describe('BadgeEvent Management Update Component', () => {
        let comp: BadgeEventUpdateComponent;
        let fixture: ComponentFixture<BadgeEventUpdateComponent>;
        let service: BadgeEventService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ComeGoAppTestModule],
                declarations: [BadgeEventUpdateComponent]
            })
                .overrideTemplate(BadgeEventUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BadgeEventUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BadgeEventService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new BadgeEvent(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.badgeEvent = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new BadgeEvent();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.badgeEvent = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
