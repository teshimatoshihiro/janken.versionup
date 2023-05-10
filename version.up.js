let canvas;
let context;
let haikei;
let bg;
let pingpong;
let boo;
let ques;
let str_gameover;
let gamemode;
let nanmonme;

let quiz = [
  ["バカチンガーのTV局は？", "FBS", "KBC", "RKB", "TNC"],
  ["右心房に注がないものはどれか?", "どれも注ぐ", "上大静脈", "下大静脈", "冠静脈洞"],
  ["ファロー四徴症の所見ではないのはどれか？", "心室中隔欠損", "大動脈騎乗", "肺動脈狭窄", "右室拡大"],
  ["超音波の減衰と無関係なものを答えよ", "振動", "屈折", "吸収", "散乱"],
  ["ジーズアカデミーの創設者の名前は？", "児玉浩康", "小玉浩康", "稲盛和夫", "孫正義",],
  ["児玉先生お気に入りの衣料品店は？", "CUNE", "CONE", "CooN", "Coke",],
  ["Taro先生の格言は？", "Code is 量", "Coke is 量", "Code is 畳", "Cobe is 量",],
  ["虚血性心疾患のNon Risk facker", "癌", "糖尿病", "高血圧", "喫煙",],
  ["Engineer cafeの終了時刻", "22時", "24時", "21時", "23時",],
  ["肝血管腫のUS特徴は？", "marginal_strongecho", "halo", "bascketpattern", "strongecho_sign",]
]

// マウスやタッチのイベントをcanvasにくっつけてる
function initw() {
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');
  canvas.addEventListener('mousemove', mouseMove, false);
  canvas.addEventListener('click', mouseClick, false);
  canvas.addEventListener('touchmove', touchMove);
  canvas.addEventListener("touchend", touchd, false);

  // 背景画像の読み込み
  haikei = new Image();

  // haikei.src = "img/bakachingarough.jpg";
  haikei.src = "img/sad2.jpg";

  haikei.src = "img/kekkangeka_01.jpg";
  haikei.src = "img/yua.jpg"
  haikei.src = "img/G's academy shot.jpg";
  // haikei.src = "CUNE.jpg"

  // 登録した関数をディスプレイの書き換えに合わせてくれるやつ*requestAnimationFrame*
  haikei.onload = function () {
    requestAnimationFrame(Onanime);
    requestbackgroundsound(Onanime);

  }


  // 正解とか不正解の音を読込む
  backgroundsound = new Audio('sound/Hope_Springs_Eternal.mp3')
  pingpong = new Audio('sound/きらきら輝く4.mp3');
  boo = new Audio('sound/ショック3.mp3');
  // ques = new Audio('sound/爆発1.mp3');
  bakachin = new Audio('sound/bakachingaa.mp3');

  // 音は静かめの0.3
  backgroundsound.volume = 0.5;
  pingpong.volume = 0.5;
  boo.volume = 0.5;
  // ques.volume = 0.5;
  bakachin.volume = 0.5


  // 正解の個数
  atari = 0;
  buttonStart_click();
}

// 開始
let atari;
function buttonStart_click() {
  // gamemodeで動作を切り分けている
  gamemode = "start";
  str_gameover = " ";
  time = 0;
  nanmonme = 0;
  backgroundsound.play()
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
let px; let py;
function touchMove(e) {
  e.preventDefault();  // 画面スクロールをさせない
  var rect = e.target.getBoundingClientRect();
  if (e.changedTouches.length == 1) {
    var touchObject = e.changedTouches[0];
    var touchX = touchObject.pageX;
    var touchY = touchObject.pageY;
    px = touchX - rect.left;
    py = touchY - rect.top;
  }
}
// スマホのタッチイベントでどこがタッチされたかみてる
function touchd(e) {
  e.preventDefault();  // 画面スクロールをさせない
  let rect = e.target.getBoundingClientRect();
  if (e.changedTouches.length == 1) {
    let touchObject = e.changedTouches[0];
    let touchX = touchObject.pageX;
    let touchY = touchObject.pageY;
    px = touchX - rect.left;
    py = touchY - rect.top;
    chkanser();
  }
}
// マウスの座標をキャンバスの座標に変えてpx,pyにしまってるところ
function mouseMove(e) {
  let rect = e.target.getBoundingClientRect();
  px = e.clientX - rect.left;
  py = e.clientY - rect.top;
}
// クリックの場合にはcheckanser(chkanser)読んでる
function mouseClick(e) {
  let rect = e.target.getBoundingClientRect();
  px = e.clientX - rect.left;
  py = e.clientY - rect.top;
  chkanser();
}

// チェックアンサーの中身
function chkanser() {
  let ans = -1;
  // タイマーバーをゼロにリセットしてる
  time = 0;
  // 座標で選択肢のどれをクリックしたか見てる(50ではじまり範囲100)
  if (150 < py && py < 250) ans = 0;
  if (250 < py && py < 350) ans = 1;
  if (350 < py && py < 450) ans = 2;
  if (450 < py && py < 550) ans = 3;
  if (py == -1) {
    ans = 0; num[ans] = 0;//強制エラー（タイムアウトの時にpyをマイナス１にして間違いにしてる）
  }

  if (ans == -1) return;
  gamemode = "marubatu";
  if (num[ans] == 1) {
    pingpong.play();
    marubatu_str = "〇";
    atari++;
    document.body.style.backgroundImage = "url('img/yua2.jpg')";
    setTimeout(function () {
      document.body.style.backgroundImage = "url('img/G's academy shot.jpg')";
    }, 500);
  } else {
    marubatu_str = "×";
    boo.play();
    document.body.style.backgroundImage = "url('img/sad2.jpg')";
    setTimeout(function () {
      document.body.style.backgroundImage = "url('img/G's academy shot.jpg')";
    }, 500);
  }
}

// -------------------------------------------------------------------
// ディスプレイの書き換え時に呼ばれるやつ（最後に自分をもう一度登録しなおしてる）
let time;
function Onanime() {
  draw();
  if (gamemode != "stop") time++; //バーの動き
  requestAnimationFrame(Onanime);
  // document.body.style.backgroundImage = "url('img/bakachingarough.jpg')";
  // bakachin.play();

}

//d4text関数は、quizという2次元配列に格納されたクイズの問題と選択肢を表示処理
function d4text() {

  // 文字列は、context.font、context.fillStyle、context.fillText等
  // のCanvas APIを用いて描画。
  context.font = '30px serif';
  context.fillStyle = 'black';
  //context.fillRect(20, 50, 800, 45);
  // 文字列の影を付けるために、同じ文字列を少しずつずらして重ねて表示
  //  quiz[nanmonme][0]には問題文
  context.fillText(quiz[nanmonme][0], 219, 99);
  context.fillText(quiz[nanmonme][0], 219, 101);
  context.fillText(quiz[nanmonme][0], 221, 99);
  context.fillText(quiz[nanmonme][0], 221, 101);
  context.fillStyle = 'yellow';
  context.fillText(quiz[nanmonme][0], 220, 100);

  context.font = '30px serif';
  context.fillStyle = 'black';
  //context.fillRect(20, 150, 800, 90);
  // quiz[nanmonme][num[0]]とquiz[nanmonme][num[1]]には選択肢の内容が格納
  context.fillText("①" + quiz[nanmonme][num[0]], 219, 199);
  context.fillText("①" + quiz[nanmonme][num[0]], 219, 199);
  context.fillText("①" + quiz[nanmonme][num[0]], 221, 201);
  context.fillText("①" + quiz[nanmonme][num[0]], 221, 201);
  context.fillStyle = 'yellow';
  context.fillText("①" + quiz[nanmonme][num[0]], 220, 200);

  context.fillStyle = 'black';
  //context.fillRect(20, 250, 800, 90);
  context.fillText("②" + quiz[nanmonme][num[1]], 219, 299);
  context.fillText("②" + quiz[nanmonme][num[1]], 219, 299);
  context.fillText("②" + quiz[nanmonme][num[1]], 221, 301);
  context.fillText("②" + quiz[nanmonme][num[1]], 221, 301);
  context.fillStyle = 'yellow';
  context.fillText("②" + quiz[nanmonme][num[1]], 220, 300);

  context.fillStyle = 'black';
  //context.fillRect(20, 350, 800, 90);

  context.fillText("③" + quiz[nanmonme][num[2]], 219, 399);
  context.fillText("③" + quiz[nanmonme][num[2]], 219, 399);
  context.fillText("③" + quiz[nanmonme][num[2]], 221, 401);
  context.fillText("③" + quiz[nanmonme][num[2]], 221, 401);
  context.fillStyle = 'yellow';
  context.fillText("③" + quiz[nanmonme][num[2]], 220, 400);
  context.fillStyle = 'black';
  //context.fillRect(20, 350, 800, 90);

  context.fillText("④" + quiz[nanmonme][num[3]], 219, 499);
  context.fillText("④" + quiz[nanmonme][num[3]], 219, 499);
  context.fillText("④" + quiz[nanmonme][num[3]], 221, 501);
  context.fillText("④" + quiz[nanmonme][num[3]], 221, 501);
  context.fillStyle = 'yellow';
  context.fillText("④" + quiz[nanmonme][num[3]], 220, 500);

}
let marubatu_str = "";
function marubatu() {
  context.font = '500px serif';
  context.fillStyle = 'red';
  context.fillText(marubatu_str, 100, 500);
}
function tensu() {
  context.font = '40px fo';
  context.fillStyle = 'white';
  context.fillText("正解数" + atari + "/" + quiz.length, 150, 580);//正解数の表示
  context.fillText("正解率" + atari / quiz.length * 100 + "%", 450, 580);//正解率の表示

}
let n1;
let n2;
let num;
let n;
function draw() {
  // 背景（白で埋めて絵を表示して、あとは何をしてるかで内容変える）
  context.fillStyle = 'white';
  context.fillRect(0, 0, 800, 600);
  context.drawImage(haikei, 0, 0, 800, 600);
  if (gamemode == "start") {
    num = [1, 2, 3, 4];
    n1 = getRandomInt(4);
    n2 = getRandomInt(4);
    n = num[n1];
    num[n1] = num[n2];
    num[n2] = n;
    gamemode = "question"; //ここで変える
    // ques.play();

  }
  if (gamemode == "question") {   //クイズ表示されてるモード
    d4text();
    context.fillStyle = 'red';
    context.strokeStyle = 'red';
    // strokeRectは矩形の輪郭線を描画するメソッド
    // 座標(48, 498)を左上隅とし、横幅702、高さ34ピクセルの矩形
    context.strokeRect(44, 20, 702, 50);
    context.fillRect(45, 20, time, 50);

    if (time > 700) {
      py = -1;     //強制的に間違えにしてる（座標で-1は無いのでchkanserではじかれる）
      chkanser();
      nanmonme++;
      if (nanmonme > quiz.length - 1) gamemode = "stop";//クイズ全部出したらstopへ移行
      // backgroundsound.pause();
      // time = 1000;
    }
  }
  if (gamemode == "marubatu") {
    marubatu();
    if (time > 5) {
      gamemode = "start";
      nanmonme++;
      if (nanmonme > quiz.length - 1) gamemode = "stop";
      // time = 0;

    }
  }
  tensu(); //最後に何問出来たか

}
