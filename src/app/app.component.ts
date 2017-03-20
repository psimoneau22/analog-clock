import { Component, Directive, ElementRef, HostListener } from '@angular/core';
import { ClockValue, ClockState } from './clock/clock.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  val = { hours: 0, minutes: 0 }

  private onTimeSelect(event: ClockValue) {
    console.log(event);
  }
}
