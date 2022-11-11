import { Component } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

@Component({
  selector: 'app-spinner',
  template: `<div class="overlay" *ngIf="isLoading$ | async"> <div class="lds-ripple"><div></div><div></div></div></div> `,
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
isLoading$ = this.spinnerSvc.isLoading$;
  constructor(private spinnerSvc: SpinnerService) { }

}
