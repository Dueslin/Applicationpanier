import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProductdetails, Productdetails } from 'app/shared/model/productdetails.model';
import { ProductdetailsService } from './productdetails.service';

@Component({
  selector: 'jhi-productdetails-update',
  templateUrl: './productdetails-update.component.html'
})
export class ProductdetailsUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: []
  });

  constructor(protected productdetailsService: ProductdetailsService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productdetails }) => {
      this.updateForm(productdetails);
    });
  }

  updateForm(productdetails: IProductdetails): void {
    this.editForm.patchValue({
      id: productdetails.id
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const productdetails = this.createFromForm();
    if (productdetails.id !== undefined) {
      this.subscribeToSaveResponse(this.productdetailsService.update(productdetails));
    } else {
      this.subscribeToSaveResponse(this.productdetailsService.create(productdetails));
    }
  }

  private createFromForm(): IProductdetails {
    return {
      ...new Productdetails(),
      id: this.editForm.get(['id'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductdetails>>): void {
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
