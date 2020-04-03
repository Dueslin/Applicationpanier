import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ApplicationpanierTestModule } from '../../../test.module';
import { ProductalertsUpdateComponent } from 'app/entities/productalerts/productalerts-update.component';
import { ProductalertsService } from 'app/entities/productalerts/productalerts.service';
import { Productalerts } from 'app/shared/model/productalerts.model';

describe('Component Tests', () => {
  describe('Productalerts Management Update Component', () => {
    let comp: ProductalertsUpdateComponent;
    let fixture: ComponentFixture<ProductalertsUpdateComponent>;
    let service: ProductalertsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ApplicationpanierTestModule],
        declarations: [ProductalertsUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ProductalertsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductalertsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductalertsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Productalerts('123');
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Productalerts();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
