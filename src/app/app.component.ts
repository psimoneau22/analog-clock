import { Component, Directive, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private state = 'hours';
  private onTimeSelect(event: {
      state: 'hours' | 'minutes'
      hours: number,
      minutes: number
    }) {

    setTimeout(() => {
      this.state = this.state === 'minutes' ? 'hours' : 'minutes';
    }, 500);

  }

}
