import { Component, Directive, ElementRef, HostListener } from '@angular/core';
import { ClockValue, ClockState } from './clock/clock.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private state = ClockState.hours;
  private onTimeSelect(event: ClockValue) {
    setTimeout(() => {
      this.state = this.state === ClockState.minutes ? ClockState.hours : ClockState.minutes;
    }, 500);
  }
}
