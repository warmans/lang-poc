import { Component } from '@angular/core';
import {Format} from "./module/format-input/src/component/format-input/format-input.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  questions: Format[] = [{
    eng: "Do you see the big man? Next to him is my brother.",
    translated: "Siehst du den {grossen} Mann? Daneben steht mein {Bruder}.",
    configs: [{
      contextual: "grossen",
      eng: "big",
      infinitive: "Gross",
      case: "accusative",
      showPlaceholder: false,
    },{
      contextual: "Bruder",
      eng: "brother",
      infinitive: "Der Bruder",
      case: "accusative",
      showPlaceholder: false,
      article: "masculine",
    }]
  },{
    eng: "Tereza loves her animals very much.",
    translated: "Tereza liebt {ihre} {Tiere} sehr.",
    configs: [{
      contextual: "ihre",
      eng: "her",
      infinitive: "Ihr",
      case: "accusative",
      showPlaceholder: false,
    },{
      contextual: "Tiere",
      eng: "animals",
      infinitive: "Die Tiere",
      case: "accusative",
      showPlaceholder: false,
    }]
  }];

  currentQuestionIndex = 0;

  currentQuestion: Format = this.questions[this.currentQuestionIndex];

  next() {

    if (this.currentQuestionIndex === this.questions.length-1) {
      return;
    }
    this.currentQuestionIndex++;
    this.currentQuestion = this.questions[this.currentQuestionIndex];
  }
}
