import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ApplicationpanierTestModule } from '../../../test.module';
import { ProductalertsDetailComponent } from 'app/entities/productalerts/productalerts-detail.component';
import { Productalerts } from 'app/shared/model/productalerts.model';

describe('Component Tests', () => {
  describe('Productalerts Management Detail Component', () => {
    let comp: ProductalertsDetailComponent;
    let fixture: ComponentFixture<ProductalertsDetailComponent>;
    const route = ({ data: of({ productalerts: new Productalerts('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ApplicationpanierTestModule],
        declarations: [ProductalertsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ProductalertsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProductalertsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load productalerts on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.productalerts).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
