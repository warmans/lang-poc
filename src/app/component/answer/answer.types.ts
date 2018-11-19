import {TokenConfig} from "../../module/format-input/src/component/format-input/format-input.component";

export class Answer {

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
