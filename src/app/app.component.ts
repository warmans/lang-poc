import {Component, OnInit} from '@angular/core';
import {Format} from "./module/format-input/src/component/format-input/format-input.component";
import {animate, group, query, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('slideAnimation', [
      transition('* => *', group([
        query(':enter', [
          style({
            transform: 'translateX(100%)'
          }),
          animate('5s ease-out')
        ]),
        query(':leave', [
          animate('5s ease-out', style({
            transform: 'translateX(-100%)'
          }))
        ], {optional: true})
      ]))
    ])
  ]
})
export class AppComponent implements OnInit {
  questions: Format[] = [{
    eng: "Do you see the big man? Next to him is my brother.",
    translated: "Siehst du den {grossen} Mann? Daneben steht mein {Bruder}.",
    configs: [{
      contextual: "grossen",
      eng: "big",
      infinitive: "Gross",
      case: "accusative",
      showPlaceholder: false,
    }, {
      contextual: "Bruder",
      eng: "brother",
      infinitive: "Der Bruder",
      case: "accusative",
      showPlaceholder: false,
      article: "masculine",
    }]
  }, {
    eng: "Tereza loves her animals very much.",
    translated: "Tereza liebt {ihre} {Tiere} sehr.",
    configs: [{
      contextual: "ihre",
      eng: "her",
      infinitive: "Ihr",
      case: "accusative",
      showPlaceholder: false,
    }, {
      contextual: "Tiere",
      eng: "animals",
      infinitive: "Die Tiere",
      case: "accusative",
      showPlaceholder: false,
      article: "plural",
    }]
  }];

  currentQuestionIndex: number = 0;


  score: number = 0;

  next() {
    if (this.currentQuestionIndex === this.questions.length - 1) {
      return;
    }
    this.currentQuestionIndex++;
    this.score++;
  }

  ngOnInit(): void {

  }
}
