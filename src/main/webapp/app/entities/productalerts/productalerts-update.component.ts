import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProductalerts, Productalerts } from 'app/shared/model/productalerts.model';
import { ProductalertsService } from './productalerts.service';

@Component({
  selector: 'jhi-productalerts-update',
  templateUrl: './productalerts-update.component.html'
})
export class ProductalertsUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: []
  });

  constructor(protected productalertsService: ProductalertsService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productalerts }) => {
      this.updateForm(productalerts);
    });
  }

  updateForm(productalerts: IProductalerts): void {
    this.editForm.patchValue({
      id: productalerts.id
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const productalerts = this.createFromForm();
    if (productalerts.id !== undefined) {
      this.subscribeToSaveResponse(this.productalertsService.update(productalerts));
    } else {
      this.subscribeToSaveResponse(this.productalertsService.create(productalerts));
    }
  }

  private createFromForm(): IProductalerts {
    return {
      ...new Productalerts(),
      id: this.editForm.get(['id'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductalerts>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
