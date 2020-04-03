import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ApplicationpanierTestModule } from '../../../test.module';
import { TopbarUpdateComponent } from 'app/entities/topbar/topbar-update.component';
import { TopbarService } from 'app/entities/topbar/topbar.service';
import { Topbar } from 'app/shared/model/topbar.model';

describe('Component Tests', () => {
  describe('Topbar Management Update Component', () => {
    let comp: TopbarUpdateComponent;
    let fixture: ComponentFixture<TopbarUpdateComponent>;
    let service: TopbarService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ApplicationpanierTestModule],
        declarations: [TopbarUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TopbarUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TopbarUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TopbarService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Topbar('123');
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
        const entity = new Topbar();
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
