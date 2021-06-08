//そういえばほとんどクラスのある処理を書いていなかったので練習で書いてみる
export class inputCheck {
  private isError: boolean = false;
  private Message: string = '';
  checkName(name: string) {
    const maxlength = 30;
    this.isError = [...name].length > maxlength;
    this.Message += '名前が30字を超えています。';
  }
  checkBody(body: string) {
    const maxlength = 3000;
    if ([...body].length > maxlength) {
      this.isError = true;
      this.Message += '本文が3000字を超えています。';
    } else if (body === '') {
      this.isError = true;
      this.Message += '本文が空欄です。';
    }
  }
  getError() {
    return this.isError;
  }
  getMessage() {
    return this.Message;
  }
}
