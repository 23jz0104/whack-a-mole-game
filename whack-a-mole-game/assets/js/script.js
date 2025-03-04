(function () {
  'use strict';

  // HTML要素の取得
  const elScores = document.querySelectorAll('.score');   // 点数エリア全部
  const elMoles = document.querySelectorAll('.box');      // モグラ表示エリア内のモグラ
  const btnPlay = document.querySelector('#play');        // スタート・ストップボタン
  const elDialog = document.querySelector('#dialog');     // ダイアログ
  const btnClose = document.querySelector('#dlg-close');  // ダイアログの閉じるボタン

  let timerId = null;
  let clock = 0;      // ゲーム内の30秒カウンタ
  let score = 0;      // ゲーム得点

  // モグラにクリックイベントをセット
  elMoles.forEach(element => {
    element.addEventListener('click', (e) => {
      moleClicked(e);
      // console.log(element);
    })
  });

  // スタートボタンにクリックイベントをセット
  btnPlay.addEventListener('click', () => {
    clock = 30;
    score = 0;
    btnPlay.disabled = true;
    timerId = setInterval(clockEvent, 1000);

  })

  // ダイアログの閉じるボタンイベントセット
  btnClose.addEventListener('click', () => {
    closeDialog();
  })

  /// event functions /////////////////////////////////////////
  /**
   * 0.5秒ごとのイベント
   */
  function clockEvent() {
    if (clock <= 0) {
      // 時間になってたら終了
      elMoles.forEach(element => {
        if(element.classList.contains('active')) {
          element.classList.remove('active');
        }
      });
      clearInterval(timerId);
      clearTimeout(timerId);
      elScores[1].textContent = `${score}`;
      elDialog.classList.add('active');


    } else {

      elMoles.forEach(element => {
        if (!element.querySelector('img').classList.contains('attacked')) {
          element.classList.remove('active');
        }
        if (Math.random() * 10 >= 8) {
          const img = element.querySelector('img');
          img.src = 'assets/img/mole.png';
          element.classList.add('active');
        }
      });
      clock -= 1;    // clock を0.5秒減らす
    }
  }

  /**
   * 画像がクリックされたときの処理
   */
  function moleClicked(e) {
    const mole = e.target;
    // console.log(e.target);
    if (!mole.classList.contains('attacked') && (mole.parentElement.classList.contains('active'))) {
      // まだ叩かれてなければ叩いた処理
      mole.classList.add('attacked');
      mole.src = 'assets/img/mole_attacked.png';


      // スコアを画面に反映
      score++;
      elScores[0].textContent = `${score}`;

      // 0.5秒後に消去
      setTimeout(() => {
        mole.parentElement.classList.remove('active');
        mole.classList.remove('attacked')
      }, 500)
    }
  }

  /**
   * ダイアログの閉じるボタンクリック時のイベント
   */
  function closeDialog() {
    btnPlay.disabled = false;
    elDialog.classList.remove('active');
    elMoles.forEach(element => {
      element.classList.remove('active');
    });
    score = 0;
    elScores[0].textContent = `${score}`;
  }
})();
