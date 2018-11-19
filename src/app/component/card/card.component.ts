import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Format, TokenConfig} from "../../module/format-input/src/component/format-input/format-input.component";
import {Answer} from "../answer/answer.types";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  _question: Format = null;

  @Input()
  set question(q: Format) {
    this._question = q;
    this.initialize();
  }

  get question(): Format {
    return this._question;
  }

  @Output()
  onNext: EventEmitter<null> = new EventEmitter<null>();

  answersRaw: { [index: string]: string } = {};

  answers: { [index: string]: Answer } = {};

  constructor() {
  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this._question.configs.forEach((c) => {
      this.answers[c.contextual] = new Answer(c, '');
    });
    this.answersRaw = {};
  }

  checkAllDone(): boolean {
    for (let k in this.answers) {
      if (this.answers.hasOwnProperty(k)) {
        if (!this.answers[k].check()) {
          return false;
        }
      }
    }
    return true;
  }

  answersUpdated(answers: { [index: string]: string }) {
    for (let k in answers) {
      if (answers.hasOwnProperty(k)) {
        this.answers[k].given = answers[k];
      }
    }
  }

  revealAnswers() {
    let raw: { [index: string]: string } = {};
    for (let k in this.answers) {
      if (this.answers.hasOwnProperty(k)) {
        this.answers[k].reveal();
        raw[k] = this.answers[k].given;
      }
    }
    this.answersRaw = raw;
  }

  tok(contextual: string): TokenConfig {
    let format: TokenConfig = null;
    this._question.configs.forEach((c) => {
      if (c.contextual === contextual) {
        format = c;
      }
    });
    return format;
  }

  next() {
    this.onNext.next();
  }
}

