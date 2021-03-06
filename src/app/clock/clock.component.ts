import { Component, OnInit, OnChanges, EventEmitter, Input, Output, } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MdSlideToggle } from '@angular/material';
import { ClockValue, ClockState } from './clock.models';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css'],
  providers: [
    { provide:  NG_VALUE_ACCESSOR, useExisting: ClockComponent, multi: true }
  ]
})
export class ClockComponent implements OnChanges, ControlValueAccessor {

  @Input()
  radius = 100;

  @Output()
  change = new EventEmitter<ClockValue>();

  state = ClockState.hours;
  hours = 0;
  minutes = 0;

  private twenty4Hour = false;
  private segments: { value: number, path: string }[];
  private labels: {}[];
  private ClockState = ClockState;
  private onModelChange: (value: ClockValue) => void = () => { };

  ngOnChanges() {
    this.createClock();
  }

  writeValue(value: ClockValue): void {
    if (value) {
      this.hours = value.hours;
      this.minutes = value.minutes;
    }
  }

  registerOnChange(fn: (value: ClockValue) => void): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void { }

  private setState(state: ClockState) {
    this.state = state;
    this.createClock();
  }

  private get displayHand(){
    return (this.state === ClockState.minutes) || (this.twenty4Hour && this.hours > 11) || (!this.twenty4Hour && this.hours <= 11);
  }

  private get selectedEndPoint(){
    const angle = this.state === ClockState.hours ? (30 * this.hours) : (this.minutes * 6);
    return this.getPoint(angle, this.radius, .85);
  }

  private get transform() {
    return `rotate(-90) translate(-${this.radius + 10}, ${this.radius + 10})`;
  }

  private createClock() {
    this.segments = [];
    this.labels = [];
    const step = this.state === ClockState.minutes ? 5 : 1;
    const start = this.state === ClockState.hours && this.twenty4Hour ? 12 : 0;
    for (let i = 0; i < 12; i++) {
      const angle = i * 30;
      const point = this.getPoint(angle, this.radius, .85);
      const value = i * step + start;

      this.segments.push({
        path: this.getSegmentPath(12, i),
        value
      });

      this.labels.push({
        x: point.x,
        y: point.y,
        text: value.toString(),
        selected: value === (this.state === ClockState.minutes ? this.minutes : this.hours),
        transform: `rotate(90, ${point.x}, ${point.y}) translate(0, 5)`
      });
    }
  }

  private getSegmentPath(segmentCount: number, index: number) {
    const offset = 180 / segmentCount;
    const startAngle = index * 360 / segmentCount - offset;
    const start = this.getPoint(startAngle, this.radius);
    const endAngle = startAngle + 360 / segmentCount;
    const end = this.getPoint(endAngle, this.radius);

    return `M 0 0 L ${start.x} ${start.y} A 0,0 0 0 1 ${end.x} ${end.y} L 0 0 Z`;
  }

  private toggleHourSelect(twelveHour: boolean) {
    this.twenty4Hour = twelveHour;
    this.createClock();
  }

  private getPoint(angle: number, radius: number, multiplier = 1) {
    const rads = angle * Math.PI / 180;
    return {
      x: multiplier * this.radius * Math.cos(rads),
      y: multiplier * this.radius * Math.sin(rads)
    };
  }

  private segmentClicked(segment: { value: number, path: string }) {
    if (this.state === ClockState.minutes && this.minutes !== segment.value) {
      this.minutes = segment.value;
    } else if (this.state === ClockState.hours  && this.hours !== segment.value) {
      this.hours = segment.value;
    }
    this.createClock();

    setTimeout(() => {
      this.state = this.state === ClockState.minutes ? ClockState.hours : ClockState.minutes;
      this.createClock();
    }, 500);

    const value = {
      hours: this.hours,
      minutes: this.minutes
    };
    this.onModelChange(value);
    this.change.emit(value);
  }
}
