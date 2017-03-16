import { Component, Directive, ElementRef, HostListener } from '@angular/core';
import { ClockValue, ClockState } from './clock/clock.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

 

  private onTimeSelect(event: ClockValue) {
    console.log(event);
  }
}
