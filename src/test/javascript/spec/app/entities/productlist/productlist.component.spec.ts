import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ApplicationpanierTestModule } from '../../../test.module';
import { ProductlistComponent } from 'app/entities/productlist/productlist.component';
import { ProductlistService } from 'app/entities/productlist/productlist.service';
import { Productlist } from 'app/shared/model/productlist.model';

describe('Component Tests', () => {
  describe('Productlist Management Component', () => {
    let comp: ProductlistComponent;
    let fixture: ComponentFixture<ProductlistComponent>;
    let service: ProductlistService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ApplicationpanierTestModule],
        declarations: [ProductlistComponent],
        providers: []
      })
        .overrideTemplate(ProductlistComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductlistComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductlistService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Productlist('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.productlists && comp.productlists[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
