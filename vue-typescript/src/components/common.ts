//そういえばほとんどクラスのある処理を書いていなかったので練習で書いてみる
/**
 * 関数にそれぞれ引数を設定するんじゃなくって、Initiaizeするときに名前と文字長を入れちゃえばよくないか
 * これだとガチャガチャしてるな
 * CheckNameしてからCheckBodyしてRetunすんのわけわかんねえや
 * ついでにいうなら名前とBodyのチェックは分けるべきかと、全然担当範囲が違うやんけ
 *  と思ったら「名前が40字を超えてます」と「本文が3000字を超えてます」を繋げて出力したいんか、ちょっと考える
 * 最近覚えた単一責任の原則に従うなら分けるべきかなとも思ったんだけど、アラートの出力については同じ責任を持ってるんだよな
 */
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
