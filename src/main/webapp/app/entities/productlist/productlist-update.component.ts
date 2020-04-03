import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProductlist, Productlist } from 'app/shared/model/productlist.model';
import { ProductlistService } from './productlist.service';

@Component({
  selector: 'jhi-productlist-update',
  templateUrl: './productlist-update.component.html'
})
export class ProductlistUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: []
  });

  constructor(protected productlistService: ProductlistService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productlist }) => {
      this.updateForm(productlist);
    });
  }

  updateForm(productlist: IProductlist): void {
    this.editForm.patchValue({
      id: productlist.id
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const productlist = this.createFromForm();
    if (productlist.id !== undefined) {
      this.subscribeToSaveResponse(this.productlistService.update(productlist));
    } else {
      this.subscribeToSaveResponse(this.productlistService.create(productlist));
    }
  }

  private createFromForm(): IProductlist {
    return {
      ...new Productlist(),
      id: this.editForm.get(['id'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductlist>>): void {
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
