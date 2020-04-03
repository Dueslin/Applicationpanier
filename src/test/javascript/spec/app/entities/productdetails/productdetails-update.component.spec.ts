import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ApplicationpanierTestModule } from '../../../test.module';
import { ProductdetailsUpdateComponent } from 'app/entities/productdetails/productdetails-update.component';
import { ProductdetailsService } from 'app/entities/productdetails/productdetails.service';
import { Productdetails } from 'app/shared/model/productdetails.model';

describe('Component Tests', () => {
  describe('Productdetails Management Update Component', () => {
    let comp: ProductdetailsUpdateComponent;
    let fixture: ComponentFixture<ProductdetailsUpdateComponent>;
    let service: ProductdetailsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ApplicationpanierTestModule],
        declarations: [ProductdetailsUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ProductdetailsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductdetailsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductdetailsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Productdetails('123');
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
        const entity = new Productdetails();
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
