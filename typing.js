//必要なHTML要素の取得
const wrap =  document.getElementById('wrap');
const  start = document.getElementById('start');

//複数のテキストを格納する配列
const textLists = [
  'Hello World','This is my App','How are you?',
  'Today is sunny','I love JavaScript!','Good morning',
  'I am Japanese','Let it be','Samurai',
  'Typing Game','Information Technology',
  'I want to be a programmer','What day is today?',
  'I want to build a web app','Nice to meet you',
  'Chrome Firefox Edge Safari','machine learning',
  'Brendan Eich','John Resig','React Vue Angular',
  'Netscape Communications','undefined null NaN',
  'Thank you very much','Google Apple Facebook Amazon',
  'ECMAScript','console.log','for while if switch',
  'var let const','Windows Mac Linux iOS Android',
  'programming'
];   

let checkTexts = [];

//ランダムなテキストを画面に表示する
const createText = () =>  {
    const p = document.getElementById('text');
    const rnd = Math.floor(Math.random() * textLists.length);   //配列のインデックス数からランダムな数値を生成する

    p.textContent = '';    //p要素の中身を空にする

   //テキストを１文字ずつに分割してp要素に挿入する
    checkTexts = textLists[rnd].split('').map(value => {
        const span = document.createElement('span');

        span.textContent = value;
        p.appendChild(span);

        return span;    //１文字ずつcheckTextsに格納していく
   });
};   

let score = 0;

//キーイベント＆入力判定処理
const keyDown = e =>  {
    if(e.key === checkTexts[0].textContent){
        checkTexts[0].className = 'add-color';  //add-colorクラスを付与

        checkTexts.shift(); //配列から１文字を削除する

        score++;    //正しい入力の時だけスコアを加算する

        if(!checkTexts.length) createText();    //最後まで入力したら新しいテキストを用意
    //Shiftキーを押したときは色が変わらない
    }else if(e.key === 'Shift'){
        wrap.style.backgroundColor = '#666';
    //タイプミスした時だけ背景色を赤にする
    }else{
        wrap.style.backgroundColor = 'red';
    }
}   

//ランク判定とメッセージ生成処理
const  rankCheck = score =>  {
    let text = '';  //テキストを格納する

    if(score < 100){
        text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です`;
    }else if(score < 200){
        text = `あなたのランクはBです。\nAランクまであと${100 - score}文字です`;
    }else if(score < 300){
        text = `あなたのランクはAです。\nSランクまであと${100 - score}文字です`;
    }else if(score >= 300){
        text = `あなたのランクはSです。\nおめでとうございます！`;
    }
    
    return `${score}文字打てました！\n${text}\n【OK】リトライ／【キャンセル】終了`;
}; 

//ゲームの終了処理
const gameOver = id => {
    clearInterval(id);

    const result = confirm(rankCheck(score));   //スコアの値をrankCheck()に渡してダイアログで結果を表示する

    //OKボタンをクリックされたらリロードする
    if(result) window.location.reload();
};  

//タイマー処理
const timer = () => {
    let time = 60;
    const count = document.getElementById('count');

    const id = setInterval(() => {
        //カウントが０になったらタイマーのIDをgameOver()に渡す
        if(time <= 0) gameOver(id);

        count.textContent = time--;
    }, 1000);
};

//ゲームスタート時の処理
start.addEventListener('click', () => {
    timer();
    createText();

    //スタートボタンを非表示にする処理を表記
    start.style.display = 'none';

    //キーボードのイベント処理
    document.addEventListener('keydown', keyDown);
});  