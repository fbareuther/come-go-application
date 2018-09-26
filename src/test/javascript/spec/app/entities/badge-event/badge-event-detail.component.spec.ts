/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ComeGoAppTestModule } from '../../../test.module';
import { BadgeEventDetailComponent } from 'app/entities/badge-event/badge-event-detail.component';
import { BadgeEvent } from 'app/shared/model/badge-event.model';

describe('Component Tests', () => {
    describe('BadgeEvent Management Detail Component', () => {
        let comp: BadgeEventDetailComponent;
        let fixture: ComponentFixture<BadgeEventDetailComponent>;
        const route = ({ data: of({ badgeEvent: new BadgeEvent(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ComeGoAppTestModule],
                declarations: [BadgeEventDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(BadgeEventDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BadgeEventDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.badgeEvent).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
