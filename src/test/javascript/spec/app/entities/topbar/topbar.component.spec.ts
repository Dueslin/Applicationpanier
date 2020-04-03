import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ApplicationpanierTestModule } from '../../../test.module';
import { TopbarComponent } from 'app/entities/topbar/topbar.component';
import { TopbarService } from 'app/entities/topbar/topbar.service';
import { Topbar } from 'app/shared/model/topbar.model';

describe('Component Tests', () => {
  describe('Topbar Management Component', () => {
    let comp: TopbarComponent;
    let fixture: ComponentFixture<TopbarComponent>;
    let service: TopbarService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ApplicationpanierTestModule],
        declarations: [TopbarComponent],
        providers: []
      })
        .overrideTemplate(TopbarComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TopbarComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TopbarService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Topbar('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.topbars && comp.topbars[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
