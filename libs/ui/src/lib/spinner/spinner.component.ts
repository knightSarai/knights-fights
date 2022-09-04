import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'knights-fights-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent implements OnInit {
  @Input() loading = false;
  constructor() {}

  ngOnInit(): void {}
}
