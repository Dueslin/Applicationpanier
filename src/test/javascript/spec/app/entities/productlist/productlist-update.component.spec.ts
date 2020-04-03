import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ApplicationpanierTestModule } from '../../../test.module';
import { ProductlistUpdateComponent } from 'app/entities/productlist/productlist-update.component';
import { ProductlistService } from 'app/entities/productlist/productlist.service';
import { Productlist } from 'app/shared/model/productlist.model';

describe('Component Tests', () => {
  describe('Productlist Management Update Component', () => {
    let comp: ProductlistUpdateComponent;
    let fixture: ComponentFixture<ProductlistUpdateComponent>;
    let service: ProductlistService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ApplicationpanierTestModule],
        declarations: [ProductlistUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ProductlistUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductlistUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductlistService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Productlist('123');
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
        const entity = new Productlist();
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
