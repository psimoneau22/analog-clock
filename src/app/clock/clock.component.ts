import { Component, OnInit, OnChanges, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MdSlideToggle } from '@angular/material';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnChanges {

  @Input()
  radius = 100;

  @Input()
  state: 'hours' | 'minutes' = 'hours';

  @Output()
  change = new EventEmitter<{
    state: 'hours' | 'minutes'
    hours: number,
    minutes: number
  }>();

  hours = 0;

  minutes = 0;

  private twenty4Hour = false;
  private segments: { value: number, path: string }[];
  private labels: {}[];

  constructor(
  ) { }

  ngOnChanges() {
    this.createClock();
  }

  private get selectedEndPoint(){
    const angle = this.state === 'hours' ? (30 * this.hours) : (this.minutes * 6);
    return this.getPoint(angle, this.radius, .85);
  }

  private get transform() {
    return `rotate(-90, ${this.radius}, ${this.radius})`;
  }

  private createClock() {
    this.segments = [];
    for (let i = 0; i < 12; i++) {
      let value = this.state === 'hours' ? i : i * 5;
      if (this.state === 'hours' && this.twenty4Hour) {
        value += 12;
      }
      this.segments.push({
        path: this.getSegmentPath(12, i),
        value
      });
    }

    this.labels = [];
    let step = 1;
    let start = 0;
    if (this.state === 'minutes') {
      step = 5;
    } else if (this.twenty4Hour) {
      start = 12;
    }
    for (let i = 0; i < 12; i++) {
      const angle = i * 30;
      const point = this.getPoint(angle, this.radius, .85);
      const value = i * step + start;
      this.labels.push({
        x: point.x,
        y: point.y,
        text: value.toString(),
        selected: value === (this.state === 'minutes' ? this.minutes : this.hours),
        transform: `${this.transform} rotate(90, ${point.x}, ${point.y}) translate(0, 5)`
      });
    }
  }

  private getSegmentPath(segmentCount: number, index: number) {
    const r = this.radius;
    const offset = 180 / segmentCount;
    const angle = index * 360 / segmentCount;

    const startAngle = angle - offset;
    const startPoint = this.getPoint(startAngle, this.radius);

    const endAngle = startAngle + 360 / segmentCount;
    const endPoint = this.getPoint(endAngle, this.radius);

    let path = `M ${r} ${r} `;
    path += `L ${startPoint.x} ${startPoint.y} `;
    path += `A ${r},${r} 0 0 1 ${endPoint.x} ${endPoint.y} `;
    path += `L ${r} ${r} Z`;

    return path;
  }

  private toggleHourSelect(twelveHour: boolean) {
    this.twenty4Hour = twelveHour;
    if (this.twenty4Hour && this.hours < 12) {
      this.hours = 12;
    } else if (!this.twenty4Hour && this.hours > 11) {
      this.hours = 0;
    }
    this.createClock();
  }

  private getPoint(angle: number, radius: number, multiplier = 1) {
    const rads = angle * Math.PI / 180;
    return {
      x: multiplier * radius * Math.cos(rads) + radius,
      y: multiplier * radius * Math.sin(rads) + radius
    };
  }

  private segmentClicked(segment: { value: number, path: string }) {
    if (this.state === 'minutes' && this.minutes !== segment.value) {
      this.minutes = segment.value;
    } else if (this.state === 'hours'  && this.hours !== segment.value) {
      this.hours = segment.value;
    }
    this.createClock();

    this.change.emit({
      state: this.state,
      hours: this.hours,
      minutes: this.minutes
    });
  }
}
