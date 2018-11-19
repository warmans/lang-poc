import {Component, Input, OnInit} from '@angular/core';
import {TokenConfig} from "../../module/format-input/src/component/format-input/format-input.component";
import {Answer} from "./answer.types";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss'],
  animations: [
    trigger('openCloseTrigger', [
      transition(':enter', [style({opacity: 0}), animate('200ms', style({opacity: 1}))]),
      transition(':leave', [animate('100ms', style({opacity: 0}))]),
      //transition('open => closed', [animate('1s')]),
      //transition('closed => open', [animate('1s')])
    ])
  ]
})
export class AnswerComponent implements OnInit {

  @Input()
  question: TokenConfig;

  @Input()
  answer: Answer;

  constructor() { }

  ngOnInit() {
  }

}
