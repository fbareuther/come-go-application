/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ComeGoAppTestModule } from '../../../test.module';
import { BadgeComponent } from 'app/entities/badge/badge.component';
import { BadgeService } from 'app/entities/badge/badge.service';
import { Badge } from 'app/shared/model/badge.model';

describe('Component Tests', () => {
    describe('Badge Management Component', () => {
        let comp: BadgeComponent;
        let fixture: ComponentFixture<BadgeComponent>;
        let service: BadgeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ComeGoAppTestModule],
                declarations: [BadgeComponent],
                providers: []
            })
                .overrideTemplate(BadgeComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BadgeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BadgeService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Badge(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.badges[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
