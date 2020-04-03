import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ApplicationpanierTestModule } from '../../../test.module';
import { TopbarDetailComponent } from 'app/entities/topbar/topbar-detail.component';
import { Topbar } from 'app/shared/model/topbar.model';

describe('Component Tests', () => {
  describe('Topbar Management Detail Component', () => {
    let comp: TopbarDetailComponent;
    let fixture: ComponentFixture<TopbarDetailComponent>;
    const route = ({ data: of({ topbar: new Topbar('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ApplicationpanierTestModule],
        declarations: [TopbarDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TopbarDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TopbarDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load topbar on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.topbar).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
