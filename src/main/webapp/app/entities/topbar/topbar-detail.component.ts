import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITopbar } from 'app/shared/model/topbar.model';

@Component({
  selector: 'jhi-topbar-detail',
  templateUrl: './topbar-detail.component.html'
})
export class TopbarDetailComponent implements OnInit {
  topbar: ITopbar | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ topbar }) => {
      this.topbar = topbar;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
