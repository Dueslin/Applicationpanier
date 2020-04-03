import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ApplicationpanierTestModule } from '../../../test.module';
import { ProductdetailsDetailComponent } from 'app/entities/productdetails/productdetails-detail.component';
import { Productdetails } from 'app/shared/model/productdetails.model';

describe('Component Tests', () => {
  describe('Productdetails Management Detail Component', () => {
    let comp: ProductdetailsDetailComponent;
    let fixture: ComponentFixture<ProductdetailsDetailComponent>;
    const route = ({ data: of({ productdetails: new Productdetails('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ApplicationpanierTestModule],
        declarations: [ProductdetailsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ProductdetailsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProductdetailsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load productdetails on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.productdetails).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
