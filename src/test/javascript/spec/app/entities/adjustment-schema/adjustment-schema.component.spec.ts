/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ComeGoAppTestModule } from '../../../test.module';
import { AdjustmentSchemaComponent } from 'app/entities/adjustment-schema/adjustment-schema.component';
import { AdjustmentSchemaService } from 'app/entities/adjustment-schema/adjustment-schema.service';
import { AdjustmentSchema } from 'app/shared/model/adjustment-schema.model';

describe('Component Tests', () => {
    describe('AdjustmentSchema Management Component', () => {
        let comp: AdjustmentSchemaComponent;
        let fixture: ComponentFixture<AdjustmentSchemaComponent>;
        let service: AdjustmentSchemaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ComeGoAppTestModule],
                declarations: [AdjustmentSchemaComponent],
                providers: []
            })
                .overrideTemplate(AdjustmentSchemaComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AdjustmentSchemaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AdjustmentSchemaService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new AdjustmentSchema(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.adjustmentSchemas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
