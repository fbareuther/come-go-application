/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ComeGoAppTestModule } from '../../../test.module';
import { BadgeEventComponent } from 'app/entities/badge-event/badge-event.component';
import { BadgeEventService } from 'app/entities/badge-event/badge-event.service';
import { BadgeEvent } from 'app/shared/model/badge-event.model';

describe('Component Tests', () => {
    describe('BadgeEvent Management Component', () => {
        let comp: BadgeEventComponent;
        let fixture: ComponentFixture<BadgeEventComponent>;
        let service: BadgeEventService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ComeGoAppTestModule],
                declarations: [BadgeEventComponent],
                providers: []
            })
                .overrideTemplate(BadgeEventComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BadgeEventComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BadgeEventService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new BadgeEvent(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.badgeEvents[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
