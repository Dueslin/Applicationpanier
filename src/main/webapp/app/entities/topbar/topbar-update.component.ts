import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITopbar, Topbar } from 'app/shared/model/topbar.model';
import { TopbarService } from './topbar.service';

@Component({
  selector: 'jhi-topbar-update',
  templateUrl: './topbar-update.component.html'
})
export class TopbarUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: []
  });

  constructor(protected topbarService: TopbarService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ topbar }) => {
      this.updateForm(topbar);
    });
  }

  updateForm(topbar: ITopbar): void {
    this.editForm.patchValue({
      id: topbar.id
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const topbar = this.createFromForm();
    if (topbar.id !== undefined) {
      this.subscribeToSaveResponse(this.topbarService.update(topbar));
    } else {
      this.subscribeToSaveResponse(this.topbarService.create(topbar));
    }
  }

  private createFromForm(): ITopbar {
    return {
      ...new Topbar(),
      id: this.editForm.get(['id'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITopbar>>): void {
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
