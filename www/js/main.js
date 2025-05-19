
	//ウインドウサイズの横幅によって条件分岐

	var windowSize = window.innerWidth;
	var wrapperIdDiv = document.getElementById("wrapper");
	if (windowSize < 768) {
		// スマホ時の処理
		wrapperIdDiv.classList.add("is-smallScreen");
	} else {
		// スマホ以外の処理
		wrapperIdDiv.classList.add("is-wideScreen");
	}

	var timer = '';
	window.onresize = function () {
		  if (timer) {
		    	clearTimeout(timer);
		  }
		  timer = setTimeout(function(){
		    	var windowSize = window.innerWidth;
			var wrapperIdDiv = document.getElementById("wrapper");
		    	if (windowSize < 768) {
				// スマホ時の処理
		      		wrapperIdDiv.classList.remove("is-wideScreen");
		      		wrapperIdDiv.classList.add("is-smallScreen");
		    	} else {
				// スマホ以外の処理
		      		wrapperIdDiv.classList.add("is-wideScreen");
		      		wrapperIdDiv.classList.remove("is-smallScreen");
		    	}
		  }, 200);
	};


	//最上位置・スクロールで表示・変化させるボタンの処理

	//上部に移動するボタン
	const btnRise_btn = document.querySelector('#btnRise');
	//スマホ用画面固定ボタン
	const btnPageBottom_btn = document.querySelector('#btnPageBottom');
	//スティッキーヘッダー
	var sticky_head = document.querySelector('#pageTopFix');
	var sticky = false;

	//クリックイベントを追加
	btnRise_btn.addEventListener( 'click' , scroll_to_top );
	function scroll_to_top(){
		window.scroll({top: 0, behavior: 'smooth'});
	};

	//スクロール時のイベントを追加
	window.addEventListener( 'scroll' , scroll_event );

	function scroll_event(){
		if(window.pageYOffset > 100){
			btnRise_btn.classList.add("is-active");
			btnPageBottom_btn.classList.add("is-active");
			if ( sticky === false ){
				sticky_head.classList.add("is-scroll");
	                	sticky = true;
	           	}
		}else if(window.pageYOffset < 100){
			btnRise_btn.classList.remove("is-active");
			btnPageBottom_btn.classList.remove("is-active");
			if ( sticky === true ){
				sticky_head.classList.remove("is-scroll");
		                sticky = false;
			}
		}
	};



// jsへのリンクは、main.jsからの相対パスで記述。
// ファイルを呼び出す時は、拡張子[.js]を削除。

require([
  "smoothScroll",			//スムーズスクロール用JS
  "micromodal.min",			//モーダルウィンドウJS
  "luminous.min",			//画像用モーダルウィンドウJS
],function(){ //[ , ]で区切ってfunction文を追記

	//micromodal.min モーダルウィンドウ用
	MicroModal.init({
	  disableScroll: true,
	  awaitOpenAnimation: true,
	  disableFocus: true,
	  awaitCloseAnimation: true
	});

	//スマートフォン用ボタン
	var globalNaviSmallIcon = document.querySelector('#globalNaviSmallIcon');
	globalNaviSmallIcon.addEventListener( 'click' , btn_is_open );
	
	function btn_is_open(){
		if( globalNaviSmallIcon.classList.contains("is-open") == true ){
			globalNaviSmallIcon.classList.remove("is-open");
			MicroModal.close('modal-globalNaviSmall', {
				awaitCloseAnimation: true
     			});
		} else {
			globalNaviSmallIcon.classList.add("is-open");
			MicroModal.show('modal-globalNaviSmall', {
			       disableScroll: true, // ページスクロールを無効に
			       awaitOpenAnimation: true, // 開閉時のアニメーションを可能に
			       awaitCloseAnimation: true
			});
	        }
	};

	//スマートフォン用ボタン ページ内リンクをクリックした時にモーダルウィンドウを外す
	var globalNaviSmallMenuMain = document.querySelector('.globalNaviSmall__menu__main');
	var globalNaviSmallIconPagelinks = [].slice.call(globalNaviSmallMenuMain.querySelectorAll('a[href^="#"]'));

	globalNaviSmallIconPagelinks.forEach(function (globalNaviSmallIconPagelink) {

		globalNaviSmallIconPagelink.addEventListener( 'click' , pagelink_btn_is_open );
		function pagelink_btn_is_open(){
			if( globalNaviSmallIcon.classList.contains("is-open") == true ){
				globalNaviSmallIcon.classList.remove("is-open");
				MicroModal.close('modal-globalNaviSmall', {
					awaitCloseAnimation: true
	     			});
			} else {
				globalNaviSmallIcon.classList.add("is-open");
				MicroModal.show('modal-globalNaviSmall', {
				       awaitOpenAnimation: true, // 開閉時のアニメーションを可能に
				       awaitCloseAnimation: true
				});
		        }
		};
	});

	//URLのパラメータからインラインのモーダルをページを訪れた際に自動に開くようにする
	// URLのパラメータを取得
	var urlParam = location.search.substring(1);
	
	// URLにパラメータが存在する場合
	if(urlParam) {
		// 「&」が含まれている場合は「&」で分割
		var param = urlParam.split('&');

		// パラメータを格納する用の配列を用意
		var paramArray = [];
		 
		// 用意した配列にパラメータを格納
		for (i = 0; i < param.length; i++) {
			var paramItem = param[i].split('=');
			paramArray[paramItem[0]] = paramItem[1];
		}

		// もしパラメータにmodalInlineContentがあれば
		if (paramArray.modalInlineContent) {
			var modalInlineContentName = paramArray.modalInlineContent;
			MicroModal.show( modalInlineContentName , {
				disableScroll: true,
				awaitOpenAnimation: true, // 開閉時のアニメーションを可能に
				awaitCloseAnimation: true
			});
		} 
	}

	//luminous.min用
	//単数用　.luminous
	var luminousOptions = {
		caption: function (trigger) {
	    		return trigger.getAttribute('title');
	  	},
	}
	var luminousTrigger = document.querySelectorAll('.luminous');
	for (var i = 0; i < luminousTrigger.length; i++) {
	  var elem = luminousTrigger[i];
	  new Luminous(elem, luminousOptions);
	}
	//複数用　.luminousGallery
	var luminousGalleryTrigger = document.querySelectorAll('.luminousGallery');
	var luminousGalleryOptions = {
		caption: function (trigger) {
	    		return trigger.getAttribute('title');
	  	},
	}
	if( luminousGalleryTrigger !== null ) {
		new LuminousGallery(luminousGalleryTrigger,{},luminousGalleryOptions);
	}

	
});//end function文 & require


//画面スクロール・遷移でのアニメ用　ScrollMagic用
require([
  "ScrollMagic",			//特定の位置で発火させるJS
  "debug.addIndicators.min",		//デバッグ用JS
  "gsap.min",				//アニメーションJS
],function(){ //[ , ]で区切ってfunction文を追記

	var ScrollMagic = require('ScrollMagic');

	class ScrollFade {
		constructor() {
			this.ANIMATION_CLASS = 'active';

			let $section = document.querySelectorAll('.--typeScrollFadeIn:not(.active)');
			if ($section.length === null) {
				return;
			}
		    	let controller = new ScrollMagic.Controller();
		    	for (let i = 0; i < $section.length; i++) {
		      		let scene = new ScrollMagic.Scene({
		        		triggerElement: $section[i],
		        		triggerHook: 'onEnter',
		        		reverse: false,
		        		offset: 200,
		      		})
		        	.addIndicators()　//デバッグ用
		        	.addTo(controller);
			      	scene.on('enter', () => {
			        	$section[i].classList.toggle(this.ANIMATION_CLASS);
			      	});
		    	}
		}
	}

	new ScrollFade();

	class ScrollMainVisual {
		constructor() {
			this.ANIMATION_CLASS = 'active';

			let $section = document.querySelectorAll('.mainVisual:not(.active)');
			if ($section.length === null) {
				return;
			}
		    	let controller = new ScrollMagic.Controller();
		    	for (let i = 0; i < $section.length; i++) {
		      		let scene = new ScrollMagic.Scene({
		        		triggerElement: $section[i],		//どの位置で発火させるか
		        		triggerHook: 'onEnter',			//トリガーの位置 /onEnter/onLeave デフォルトはonCenter
		        		reverse: false,
		        		offset: 200,				//スタート位置はトリガーから200px
		      		})
		        	//.addIndicators()　//デバッグ用
		        	.addTo(controller);
			      	scene.on('enter', () => {
			        	$section[i].classList.toggle(this.ANIMATION_CLASS);
			      	});
		    	}
		}
	}

	new ScrollMainVisual();

	class ScrollSideLine {
		constructor() {
			this.ANIMATION_CLASS = 'active';

			let $section = document.querySelectorAll('.--typeScrollSideLine:not(.active)');
			if ($section.length === null) {
				return;
			}
		    	let controller = new ScrollMagic.Controller();
		    	for (let i = 0; i < $section.length; i++) {
				let height = $section[i].offsetHeight;		//要素の高さを出力
		      		let scene = new ScrollMagic.Scene({
		        		triggerElement: $section[i],		//どの位置で発火させるか
		        		triggerHook: 'onEnter',			//トリガーの位置 /onEnter/onLeave デフォルトはonCenter
		        		reverse: true,
		        		offset: 200,				//スタート位置はトリガーから200px
					duration: height,			//要素の高さから有効範囲を設定
		      		})
		        	//.addIndicators()　//デバッグ用
		        	.addTo(controller);
			      	scene.on('enter', () => {
			        	$section[i].classList.add(this.ANIMATION_CLASS);
			      	});
			      	scene.on('leave', () => {
			        	$section[i].classList.remove(this.ANIMATION_CLASS);
			      	});
		    	}
		}
	}

	new ScrollSideLine();

	
});//end function文 & require


//メインイメージスライダー　Swiper用
require([
  "swiper-bundle.min",			//スライダーJS
],function(){ //[ , ]で区切ってfunction文を追記

	var Swiper = require('swiper-bundle.min');

	

	let mySwiperTypeMainVisual_thumb;

  const mySwiperTypeMainVisual_main = new Swiper('.sliderBox--typeMainVisual .swiper', {
    loop: true,
    loopAdditionalSlides: 6,
    speed: 1000,
    freeMode:false,
    autoplay: {
	    delay: 4000, //4秒後に次のスライドへ
      disableOnInteraction: false,
      waitForTransition: false,
    },
    followFinger: false,
    observeParents: true,
    allowTouchMove: false,
  });

	//メインビジュアルのスライダー　サムネイル
	mySwiperTypeMainVisual_thumb = new Swiper('.swiper-thumb', {
		loopAdditionalSlides: 6,　//複製するスライド数を指定
	  	effect: 'fade', //フェードの指定
	  	fadeEffect: {
	    		crossFade: true,// クロスフェードを有効にする（フェードモードの場合 true 推奨）
	  	},
	  	loop: true, // ループの指定
	  	speed: 1000, //1秒かけてフェードで切り替わる
    freeMode:false,
		clickable: true, //クリックでのスライド切り替えを有効
	  	autoplay: {
	    		delay: 4000, //4秒後に次のスライドへ
	    		disableOnInteraction: false, //ユーザー側で操作してもスライドを止めない
	    		waitForTransition: false, //スライド切り替え中にも自動再生が止まらない
	  	},
	      breakpoints: {
	        1280: {// 画面幅1280px以上で適用
	        }
	      },
	  	thumbs: {
	    		swiper: mySwiperTypeMainVisual_main,
	  	},

		  //ナビゲーションボタン（矢印）表示設定
		  navigation: {
		    nextEl: '.mainSlidebuttonNext', //「次へボタン」要素指定
		    prevEl: '.mainSlidebuttonBack', //「前へボタン」要素指定
		  },
	});




// id="mainSlidebuttonBack"の要素をシングル/ダブルクリックしたときのイベント
	let mainSlidebuttonBack = document.getElementById("mainSlidebuttonBack");
	if (mainSlidebuttonBack !== null){
		let clickedBack = false;    // クリック状態を保持するフラグ
		mainSlidebuttonBack.onclick = function (evt) {
		    // クリックフラグが立っている状態でのクリック
		    //     -> ダブルクリック
		    if (clickedBack) {
		        clickedBack = false;
		        return;
		    }

		    // シングルクリックを受理、300ms間だけダブルクリック判定を残す
		    clickedBack = true;
		    setTimeout(function () {
		        // ダブルクリックによりclickedフラグがリセットされていない
		        //     -> シングルクリックだった
		        if (clickedBack) {
		           mySwiperTypeMainVisual_thumb.slideToLoop(mySwiperTypeMainVisual_main.realIndex - 1);
		        }
		        clickedBack = false;
		    }, 300);
		};
	}

// id="mainSlidebuttonNext"の要素をシングル/ダブルクリックしたときのイベント

	let mainSlidebuttonNext = document.getElementById("mainSlidebuttonNext");
	if (mainSlidebuttonNext !== null){
		let clickedNext = false;    // クリック状態を保持するフラグ
		mainSlidebuttonNext.onclick = function (evt) {
		    // クリックフラグが立っている状態でのクリック
		    //     -> ダブルクリック
		    if (clickedNext) {
		        clickedNext = false;
		        return;
		    }

		    // シングルクリックを受理、300ms間だけダブルクリック判定を残す
		    clickedNext = true;
		    setTimeout(function () {
		        // ダブルクリックによりclickedフラグがリセットされていない
		        //     -> シングルクリックだった
		        if (clickedNext) {
		           mySwiperTypeMainVisual_thumb.slideToLoop(mySwiperTypeMainVisual_main.realIndex + 1);
		        }
		        clickedNext = false;
		    }, 300);
		};
	}

	
	//ページ内のスライダーパーツ用(車のスライダー　スズキ新車販売)
	const mySwiperTypeBasic = new Swiper('.sliderBox--typeBasic .swiper', {
    		loop: true,
		slidesPerView: 1,
		spaceBetween: 24,
		grabCursor: true,
		pagination: {
			el: '.sliderBox--typeBasic .swiper-pagination',
			clickable: true,
		},
	    	navigation: {
	      		nextEl: '.sliderBox--typeBasic .swiper-button-next',
	      		prevEl: '.sliderBox--typeBasic .swiper-button-prev',
	    	},
	    	breakpoints: {
	      		600: {
	        		slidesPerView: 1,
	      		},
	      		1025: {
	        		slidesPerView: 1,
	        		spaceBetween: 32,
	      		}
	    	}
	});



	//コンテンツのスライダー
	  let mySwiperTypeChangeSlide = null;
	  const mediaQuery = window.matchMedia('(max-width: 768px)');

	  const checkBreakpoint = (e) => {
	    if (e.matches) {
	      initSwiperTypeChangeSlide();
	    } else if (mySwiperTypeChangeSlide) {
	      mySwiperTypeChangeSlide.destroy(false, true);
	    }
	  }

	  const initSwiperTypeChangeSlide = () => {
	    mySwiperTypeChangeSlide = new Swiper('.sliderBox--typeChangeSlide .swiper', {
	      slidesPerView: 1,
	      spaceBetween: 16,
	      loop: true,
	      loopAdditionalSlides: 1,
	      speed: 1000,
	      grabCursor: true,
	      pagination: {
	        el: '.sliderBox--typeChangeSlide .swiper-pagination', // ページネーション要素のクラス
	        clickable: true, //クリックを有効化する
	      },
	      navigation: {
	        nextEl: '.sliderBox--typeChangeSlide .swiper-button-next',
	        prevEl: '.sliderBox--typeChangeSlide .swiper-button-prev',
	      },
	      breakpoints: {
	        600: {// 画面幅600px以上で適用
	          slidesPerView: 3,
	        }
	      },
	    });
	  };

	  mediaQuery.addListener(checkBreakpoint);
	  checkBreakpoint(mediaQuery);
	
});//end function文 & require







