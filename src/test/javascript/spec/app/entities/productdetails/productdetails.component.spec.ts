import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ApplicationpanierTestModule } from '../../../test.module';
import { ProductdetailsComponent } from 'app/entities/productdetails/productdetails.component';
import { ProductdetailsService } from 'app/entities/productdetails/productdetails.service';
import { Productdetails } from 'app/shared/model/productdetails.model';

describe('Component Tests', () => {
  describe('Productdetails Management Component', () => {
    let comp: ProductdetailsComponent;
    let fixture: ComponentFixture<ProductdetailsComponent>;
    let service: ProductdetailsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ApplicationpanierTestModule],
        declarations: [ProductdetailsComponent],
        providers: []
      })
        .overrideTemplate(ProductdetailsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductdetailsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductdetailsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Productdetails('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.productdetails && comp.productdetails[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
