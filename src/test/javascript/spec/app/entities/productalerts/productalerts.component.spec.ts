import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ApplicationpanierTestModule } from '../../../test.module';
import { ProductalertsComponent } from 'app/entities/productalerts/productalerts.component';
import { ProductalertsService } from 'app/entities/productalerts/productalerts.service';
import { Productalerts } from 'app/shared/model/productalerts.model';

describe('Component Tests', () => {
  describe('Productalerts Management Component', () => {
    let comp: ProductalertsComponent;
    let fixture: ComponentFixture<ProductalertsComponent>;
    let service: ProductalertsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ApplicationpanierTestModule],
        declarations: [ProductalertsComponent],
        providers: []
      })
        .overrideTemplate(ProductalertsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductalertsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductalertsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Productalerts('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.productalerts && comp.productalerts[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
