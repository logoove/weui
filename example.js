/*swiper*/
;function Swiper(n,t){"use strict";function e(){w=x.children,m=w.length,w.length<2&&(t.continuous=!1),f.transitions&&t.continuous&&w.length<3&&(x.appendChild(w[0].cloneNode(!0)),x.appendChild(x.children[1].cloneNode(!0)),w=x.children),p=new Array(w.length),E=n.getBoundingClientRect().width||n.offsetWidth,x.style.width=w.length*E+"px";for(var e=w.length;e--;){var i=w[e];i.style.width=E+"px",i.setAttribute("data-index",e),f.transitions&&(i.style.left=e*-E+"px",a(e,b>e?-E:e>b?E:0,0))}t.continuous&&f.transitions&&(a(s(b-1),-E,0),a(s(b+1),E,0)),f.transitions||(x.style.left=b*-E+"px"),n.style.visibility="visible"}function i(){t.continuous?r(b-1):b&&r(b-1)}function o(){t.continuous?r(b+1):b<w.length-1&&r(b+1)}function s(n){return(w.length+n%w.length)%w.length}function r(n,e){if(b!=n){if(f.transitions){var i=Math.abs(b-n)/(b-n);if(t.continuous){var o=i;i=-p[s(n)]/E,i!==o&&(n=-i*w.length+n)}for(var r=Math.abs(b-n)-1;r--;)a(s((n>b?n:b)-r-1),E*i,0);n=s(n),a(b,E*i,e||g),a(n,0,e||g),t.continuous&&a(s(n-i),-(E*i),0)}else n=s(n),c(b*-E,n*-E,e||g);b=n,h(t.callback&&t.callback(b,w[b]))}}function a(n,t,e){u(n,t,e),p[n]=t}function u(n,t,e){var i=w[n],o=i&&i.style;o&&(o.webkitTransitionDuration=o.MozTransitionDuration=o.msTransitionDuration=o.OTransitionDuration=o.transitionDuration=e+"ms",o.webkitTransform="translate("+t+"px,0)"+"translateZ(0)",o.msTransform=o.MozTransform=o.OTransform="translateX("+t+"px)")}function c(n,e,i){if(!i)return x.style.left=e+"px",void 0;var o=+new Date,s=setInterval(function(){var r=+new Date-o;return r>i?(x.style.left=e+"px",L&&d(),t.transitionEnd&&t.transitionEnd.call(event,b,w[b]),clearInterval(s),void 0):(x.style.left=(e-n)*(Math.floor(100*(r/i))/100)+n+"px",void 0)},4)}function d(){T=setTimeout(o,L)}function l(){L=0,clearTimeout(T)}var v=function(){},h=function(n){setTimeout(n||v,0)},f={addEventListener:!!window.addEventListener,touch:"ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch,transitions:function(n){var t=["transitionProperty","WebkitTransition","MozTransition","OTransition","msTransition"];for(var e in t)if(void 0!==n.style[t[e]])return!0;return!1}(document.createElement("swiper"))};if(n){var w,p,E,m,x=n.children[0];t=t||{};var b=parseInt(t.startSlide,10)||0,g=t.speed||300;t.continuous=void 0!==t.continuous?t.continuous:!0;var T,y,L=t.auto||0,k={},D={},M={handleEvent:function(n){switch(n.type){case"touchstart":this.start(n);break;case"touchmove":this.move(n);break;case"touchend":h(this.end(n));break;case"webkitTransitionEnd":case"msTransitionEnd":case"oTransitionEnd":case"otransitionend":case"transitionend":h(this.transitionEnd(n));break;case"resize":h(e)}t.stopPropagation&&n.stopPropagation()},start:function(n){var t=n.touches[0];k={x:t.pageX,y:t.pageY,time:+new Date},y=void 0,D={},x.addEventListener("touchmove",this,!1),x.addEventListener("touchend",this,!1)},move:function(n){if(!(n.touches.length>1||n.scale&&1!==n.scale)){t.disableScroll&&n.preventDefault();var e=n.touches[0];D={x:e.pageX-k.x,y:e.pageY-k.y},"undefined"==typeof y&&(y=!!(y||Math.abs(D.x)<Math.abs(D.y))),y||(n.preventDefault(),l(),t.continuous?(u(s(b-1),D.x+p[s(b-1)],0),u(b,D.x+p[b],0),u(s(b+1),D.x+p[s(b+1)],0)):(D.x=D.x/(!b&&D.x>0||b==w.length-1&&D.x<0?Math.abs(D.x)/E+1:1),u(b-1,D.x+p[b-1],0),u(b,D.x+p[b],0),u(b+1,D.x+p[b+1],0)))}},end:function(){var n=+new Date-k.time,e=Number(n)<250&&Math.abs(D.x)>20||Math.abs(D.x)>E/2,i=!b&&D.x>0||b==w.length-1&&D.x<0;t.continuous&&(i=!1);var o=D.x<0;y||(e&&!i?(o?(t.continuous?(a(s(b-1),-E,0),a(s(b+2),E,0)):a(b-1,-E,0),a(b,p[b]-E,g),a(s(b+1),p[s(b+1)]-E,g),b=s(b+1)):(t.continuous?(a(s(b+1),E,0),a(s(b-2),-E,0)):a(b+1,E,0),a(b,p[b]+E,g),a(s(b-1),p[s(b-1)]+E,g),b=s(b-1)),t.callback&&t.callback(b,w[b])):t.continuous?(a(s(b-1),-E,g),a(b,0,g),a(s(b+1),E,g)):(a(b-1,-E,g),a(b,0,g),a(b+1,E,g))),x.removeEventListener("touchmove",M,!1),x.removeEventListener("touchend",M,!1)},transitionEnd:function(n){parseInt(n.target.getAttribute("data-index"),10)==b&&(L&&d(),t.transitionEnd&&t.transitionEnd.call(n,b,w[b]))}};return e(),L&&d(),f.addEventListener?(f.touch&&x.addEventListener("touchstart",M,!1),f.transitions&&(x.addEventListener("webkitTransitionEnd",M,!1),x.addEventListener("msTransitionEnd",M,!1),x.addEventListener("oTransitionEnd",M,!1),x.addEventListener("otransitionend",M,!1),x.addEventListener("transitionend",M,!1)),window.addEventListener("resize",M,!1)):window.onresize=function(){e()},{setup:function(){e()},slide:function(n,t){l(),r(n,t)},prev:function(){l(),i()},next:function(){l(),o()},stop:function(){delay = options.auto > 0 ? options.auto : 0;
    clearTimeout(interval);},getPos:function(){return b},getNumSlides:function(){return m},kill:function(){l(),x.style.width="",x.style.left="";for(var n=w.length;n--;){var t=w[n];t.style.width="",t.style.left="",f.transitions&&u(n,0,0)}f.addEventListener?(x.removeEventListener("touchstart",M,!1),x.removeEventListener("webkitTransitionEnd",M,!1),x.removeEventListener("msTransitionEnd",M,!1),x.removeEventListener("oTransitionEnd",M,!1),x.removeEventListener("otransitionend",M,!1),x.removeEventListener("transitionend",M,!1),window.removeEventListener("resize",M,!1)):window.onresize=null}}}}(window.jQuery||window.Zepto)&&function(n){n.fn.Swiper=function(t){return this.each(function(){n(this).data("Swiper",new Swipe(n(this)[0],t))})}}(window.jQuery||window.Zepto);
// from http://docs.spmjs.io/anima-basescroller/latest/
//https://github.com/MoeKit/picker




/*微信相关*/
$(function () {
$("#showToast").click(function(){
                    var $toast = $('#toast');
                    if ($toast.css('display') != 'none') {
                        return;
                    }

                    $toast.show();
                    setTimeout(function () {
                        $toast.hide();
                    }, 2000);


});
$("#showLoadingToast").click(function(){
                    var $loadingToast = $('#loadingToast');
                    if ($loadingToast.css('display') != 'none') {
                        return;
                    }

                    $loadingToast.show();
                    setTimeout(function () {
                        $loadingToast.hide();
                    }, 2000);
});

$("#showDialog1").click(function(){
                    var $dialog = $('#dialog1');
                    $dialog.show();
                    $dialog.find('.weui_btn_dialog').one('click', function () {
                        $dialog.hide();
                    });
});
$("#showDialog2").click(function(){
                    var $dialog = $('#dialog2');
                    $dialog.show();
                    $dialog.find('.weui_btn_dialog').one('click', function () {
                        $dialog.hide();
                    });
});
//进度条
$("#btnStartProgress").click(function(){
                    if ($(this).hasClass('weui_btn_disabled')) {
                        return;
                    }

                    $(this).addClass('weui_btn_disabled');

                    var progress = 0;
                    var $progress = $('.js_progress');

                    function next() {
                        $progress.css({width: progress + '%'});
                        progress = ++progress % 100;
                        setTimeout(next, 30);
                    }

                    next();                   
});
//操作表
$("#showActionSheet").click(function(){
                    var mask = $('#mask');
                    var weuiActionsheet = $('#weui_actionsheet');
                    weuiActionsheet.addClass('weui_actionsheet_toggle');
                    mask.show().addClass('weui_fade_toggle').one('click', function () {
                        hideActionSheet(weuiActionsheet, mask);
                    });
                    $('#actionsheet_cancel').one('click', function () {
                        hideActionSheet(weuiActionsheet, mask);
                    });
                    weuiActionsheet.unbind('transitionend').unbind('webkitTransitionEnd');

                    function hideActionSheet(weuiActionsheet, mask) {
                        weuiActionsheet.removeClass('weui_actionsheet_toggle');
                        mask.removeClass('weui_fade_toggle');
                        weuiActionsheet.on('transitionend', function () {
                            mask.hide();
                        }).on('webkitTransitionEnd', function () {
                            mask.hide();
                        })
                    }
});
//tab
 $(".weui_tab .weui_navbar_item").click(function(){
        $(this).addClass("tab-green").siblings().removeClass('tab-green');
        });
 $(".weui_tab_red .weui_navbar_item").click(function(){
        $(this).addClass("tab-red").siblings().removeClass('tab-red');
        });
 $(".weui_tab_blue .weui_navbar_item").click(function(){
        $(this).addClass("tab-blue").siblings().removeClass('tab-blue');
        }); 

 //搜索
 $('#search_input').focus(function(){//获得焦点
 var $weuiSearchBar = $('#search_bar');
$weuiSearchBar.addClass('weui_search_focusing');
$('#search-fixed').addClass('search-fixed');
 });
 $('#search_input').blur(function(){//失去焦点
  var $weuiSearchBar = $('#search_bar');
                    $weuiSearchBar.removeClass('weui_search_focusing');
                    $('#search-fixed').removeClass('search-fixed');
                    if($(this).val()){
                        $('#search_text').hide();
                    }else{
                        $('#search_text').show();
                    }
 });
  $('#search_input').focus(function(){
 var $searchShow = $("#search_show");
                    if($(this).val()){
                        $searchShow.show();
                    }else{
                        $searchShow.hide();
                    }
 }); 
   $('#search_cancel').tap(function(){
   $("#search_show").hide();
                    $('#search_input').val('');
 }); 
  $('#search_clear').tap(function(){
$("#search_show").hide();
                    $('#search_input').val('');
 });  
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
                 
 });
 
 
