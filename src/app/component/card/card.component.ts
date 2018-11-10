import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Format, TokenConfig} from "../../module/format-input/src/component/format-input/format-input.component";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
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

  answersRaw: {[index: string]: string} = {};

  answers: {[index: string]: Answer} = {};

  constructor() { }

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

  answersUpdated(answers: {[index: string]: string}) {
    for (let k in answers) {
      if (answers.hasOwnProperty(k)) {
        this.answers[k].given = answers[k];
      }
    }
  }

  revealAnswers() {
    let raw: {[index: string]: string} = {};
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

class Answer {

  case: string = '';

  infinitive: string = '';

  constructor(public tok: TokenConfig, public given: string) {
  }

  reveal() {
    this.given = this.tok.contextual;
    this.case = this.tok.case;
    this.infinitive = this.tok.infinitive;
  }

  check() {
    return this.checkContextual() && this.checkCase() && this.checkInfinitive();
  }

  checkContextual(): boolean {
    return this.matchAnswer(this.tok.contextual, this.given)
  }

  checkCase(): boolean {
    return this.case === this.tok.case;
  }

  checkInfinitive(): boolean {
    return this.infinitive === this.tok.infinitive;
  }

  matchAnswer(expected: string, actual: string): boolean {
    if (!expected || !actual) {
      return false;
    }
    return expected.toLowerCase() === actual.trim().toLowerCase()
  }
}

