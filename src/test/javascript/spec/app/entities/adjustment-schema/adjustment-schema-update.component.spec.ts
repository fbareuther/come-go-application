/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ComeGoAppTestModule } from '../../../test.module';
import { AdjustmentSchemaUpdateComponent } from 'app/entities/adjustment-schema/adjustment-schema-update.component';
import { AdjustmentSchemaService } from 'app/entities/adjustment-schema/adjustment-schema.service';
import { AdjustmentSchema } from 'app/shared/model/adjustment-schema.model';

describe('Component Tests', () => {
    describe('AdjustmentSchema Management Update Component', () => {
        let comp: AdjustmentSchemaUpdateComponent;
        let fixture: ComponentFixture<AdjustmentSchemaUpdateComponent>;
        let service: AdjustmentSchemaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ComeGoAppTestModule],
                declarations: [AdjustmentSchemaUpdateComponent]
            })
                .overrideTemplate(AdjustmentSchemaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AdjustmentSchemaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AdjustmentSchemaService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new AdjustmentSchema(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.adjustmentSchema = entity;
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
                    const entity = new AdjustmentSchema();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.adjustmentSchema = entity;
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
