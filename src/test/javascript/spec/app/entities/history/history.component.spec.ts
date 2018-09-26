/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ComeGoAppTestModule } from '../../../test.module';
import { HistoryComponent } from 'app/entities/history/history.component';
import { HistoryService } from 'app/entities/history/history.service';
import { History } from 'app/shared/model/history.model';

describe('Component Tests', () => {
    describe('History Management Component', () => {
        let comp: HistoryComponent;
        let fixture: ComponentFixture<HistoryComponent>;
        let service: HistoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ComeGoAppTestModule],
                declarations: [HistoryComponent],
                providers: []
            })
                .overrideTemplate(HistoryComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(HistoryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HistoryService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new History(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.histories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
