import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ApplicationpanierTestModule } from '../../../test.module';
import { ProductlistDetailComponent } from 'app/entities/productlist/productlist-detail.component';
import { Productlist } from 'app/shared/model/productlist.model';

describe('Component Tests', () => {
  describe('Productlist Management Detail Component', () => {
    let comp: ProductlistDetailComponent;
    let fixture: ComponentFixture<ProductlistDetailComponent>;
    const route = ({ data: of({ productlist: new Productlist('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ApplicationpanierTestModule],
        declarations: [ProductlistDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ProductlistDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProductlistDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load productlist on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.productlist).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
