/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ComeGoAppTestModule } from '../../../test.module';
import { AdjustmentSchemaDetailComponent } from 'app/entities/adjustment-schema/adjustment-schema-detail.component';
import { AdjustmentSchema } from 'app/shared/model/adjustment-schema.model';

describe('Component Tests', () => {
    describe('AdjustmentSchema Management Detail Component', () => {
        let comp: AdjustmentSchemaDetailComponent;
        let fixture: ComponentFixture<AdjustmentSchemaDetailComponent>;
        const route = ({ data: of({ adjustmentSchema: new AdjustmentSchema(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ComeGoAppTestModule],
                declarations: [AdjustmentSchemaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AdjustmentSchemaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AdjustmentSchemaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.adjustmentSchema).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
