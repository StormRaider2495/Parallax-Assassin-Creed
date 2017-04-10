(function() {

  init();
  render();
  eventBinding();

    (function(){
      function id(v){return document.getElementById(v); }
      function loadbar() {
        var prog = id("progress"),
            stat = id("progstat"),
            div = [],
            c = 0,
            tot;
            div = document.querySelectorAll("[load-type='bgImg']");
            tot = div.length;

        function imgLoaded(){
          c += 1;
          var perc = ((100/tot*c) << 0)+"%";
          prog.style.width = perc;
          stat.innerHTML = perc;
          if(c===tot) return doneLoading();
        }
        function doneLoading(){
          setTimeout(function(){
            init();
            $('.assassin-loader').css({'opacity':'0','display':'none'});
            $('body').css({'overflow-y':'auto'});
          }, 1200);
        }
        for(var i=0; i<tot; i++) {
          var tImg     = new Image(),
          bg = $('div').eq(i).css('background-image'),
          src = bg.replace(/(^url\()|(\)$|[\"\'])/g, '');
          tImg.src     = src;
          tImg.onload  = imgLoaded;
          tImg.onerror = imgLoaded;
        }
      }
      document.addEventListener('DOMContentLoaded', loadbar, false);
      }());

}).call(this);



// window.addEventListener('load',function(){
//
//     init();
//     $('.assassin-loader').css({'opacity':'0','display':'none'});
//     $('body').css({'overflow-y':'auto'});
// });


function init(){
    $(window).scrollTop(0);
};

function render(){
  if($(window).innerWidth() < 450){
    $('.mobile').css('width',($(window).innerWidth() * 2));
    $('.details').css('width',($(window).innerWidth() * 2));
  }
  else{
    $('.mobile').css('width',$(window).innerWidth());
  }
    // $('.mobile').css('height',$(window).innerHeight());
}

function eventBinding(){
    var click1 = $('#hero').offset().top,
        click2 = $('#assassins').offset().top,
        click3 = $('.content').eq(1).offset().top,
        click4 = $('.detail-10').offset().top;
    $("nav li").eq(0).click(function(){
        $('html,body').stop(true,false).animate({scrollTop: click1},2000);
    });
    $("nav li").eq(1).click(function(){
        $('html,body').stop(true,false).animate({scrollTop: click2},2000);
    });
    $("nav li").eq(2).click(function(){
        $('html,body').stop(true,false).animate({scrollTop: click3},3000);
    });
    $("nav li").eq(3).click(function(){
        $('html,body').stop(true,false).animate({scrollTop: click4},5000);
    });
    window.addEventListener('scroll', function(event) {
        heroIntro();
    });


    // if (window.addEventListener){
    // window.addEventListener('DOMMouseScroll', wheel, false);
    // }
    //
    // window.onmousewheel = document.onmousewheel = wheel;
    //
    // function wheel(event) {
    //     var delta = 0;
    //     if (event.wheelDelta) {
    //       delta = event.wheelDelta / 120;
    //     }
    //     else if (event.detail) {
    //       delta = -event.detail / 3;
    //     }
    //
    //     handle(delta);
    //     if (event.preventDefault) event.preventDefault();
    //     event.returnValue = false;
    // }
    //
    // function handle(delta) {
    //     var time = 1000;
    // 	  var distance = 250;
    //
    //     $('html, body').stop().animate({
    //         scrollTop: $(window).scrollTop() - (distance * delta)
    //     }, time );
    // }

  }//End of Event Binding


/* ****************** Animation for the first page id=hero ********************* */
function heroIntro(){
    var topDistance, layers, i, len, layer, depth, movement, translate3d, slides, goodbyeSlides, lastScrollTop=0, degree=0, speed=0, spin=0;

    topDistance = this.pageYOffset;

      if($(window).innerWidth > 800){ $('.header-logo').css('visibility','none');}

      if(topDistance > 50){logoAssassin();}

      logoAssassinSwitch(topDistance);


      if(topDistance > 800 && topDistance < 1400){
        showAssassins();
      }
      else{
        hideAssassins(topDistance);
      }

      $("div[data-type='parallaxAssassino']").on('click',function(){
        console.log($(this).span);
      })

      if(topDistance < $("body").innerHeight()){
          layers = document.querySelectorAll("[data-type='parallax']");
          for (i = 0, len = layers.length; i < len; i++) {
            layer = layers[i];
            depth = layer.getAttribute('data-depth');
            movement = -(topDistance * depth);
            translate3d = 'translate3d(0, ' + movement + 'px, 0)';
            layer.style.transform = translate3d;
          }
        }


          $('section[data-type="ac-details"]').each(function(){
              var acDetails = $(this);
              scrollStart = $(this).offset().top - $(window).innerHeight()*0.5;

               if( topDistance > scrollStart){
                // var yPos = -( (topDistance%scrollStart) * acDetails.data('speed') );
                var yPos = -( (topDistance%scrollStart) * acDetails.attr('data-speed') );
                 acDetails.css({'background-position':'center calc(1.0% + '+ yPos +'px)'});
               }
          });


        //   $('section[data-type="ac-details"]').filter(function() {
        // return $(this).offset().top < (topDistance + $(window).height()) &&
        //        $(this).offset().top + $(this).height() > topDistance;
        //      }).css({'background-position': '0px ' + parseInt(-topDistance / 6) + 'px'});

        // var detailHeight = $('.detail1').height();
        // if( topDistance > 2000 && topDistance < 4000){
        //   $('.detail1').css({'background-position':  '0px ' + (-(topDistance/15)) + 'px'});
        // }

        /* *********************************** blinder effect on the Goodbye Slides ************************************/
        /* ***********************************viewable from scrollTop 2396 to 3043 ************************************/
        goodbyeSlides = document.querySelectorAll('.goodbye-slides');
        lastScrollTop = $(document).height()-$(window).innerHeight();
        degree =(topDistance / (lastScrollTop / 540));
        for(i = 0, len = goodbyeSlides.length; i < len; i++) {
            spin = goodbyeSlides[i].getAttribute('spin-speed');
            speed = degree * spin;
            slide = goodbyeSlides[i];
            slide.style.transform = 'rotateY('+speed+'deg)';
        }

}

/* **************** To control the animation of the logo on the first page *************/
function logoAssassin(){
  $('.logo').css('display', 'block').animate({opacity: 1.0, top: '50%'}, 2000);
}

function logoAssassinSwitch(topDistance){
    if(topDistance < 750){
      $('.header-logo').css('display', 'none');
      logoAssassin();
    }
    else{
      $('.header-logo').css('display', 'inline-block').animate({opacity: 1.0, top: '0%'}, 2000);
      $('.logo').css('display', 'none');
    }
}

/* ************************* To show the slide-in effect on the Assassins ************************* */
function showAssassins(){
      $('.assassin-0').css({'opacity': 1.0, 'visibility': 'visible', 'left': '10.5%'},3000);
      $('.assassin-1').css({'opacity': 1.0, 'visibility': 'visible', 'left': '19.5%'},3000);
      $('.assassin-2').css({'opacity': 1.0, 'visibility': 'visible', 'left': '27.0%'}, 2500);
      $('.assassin-3').css({'opacity': 1.0, 'visibility': 'visible', 'left': '34.0%'}, 2000);

      $('.assassin-4').css({'opacity': 1.0, 'visibility': 'visible', 'top': '24.0%'}, 2000);

      $('.assassin-5').css({'opacity': 1.0, 'visibility': 'visible', 'right': '33.0%'}, 2000);
      $('.assassin-6').css({'opacity': 1.0, 'visibility': 'visible', 'right': '24.0%'}, 2000);
      $('.assassin-7').css({'opacity': 1.0, 'visibility': 'visible', 'right': '18.0%'}, 2000);
      $('.assassin-8').css({'opacity': 1.0, 'visibility': 'visible', 'right': '11.0%'}, 3000);

      $('.year-bar-left').css({'opacity': 1.0, 'visibility': 'visible', 'left': '0.0%'}, 2000);
      $('.year-bar-right').css({'opacity': 1.0, 'visibility': 'visible', 'right': '0.0%'}, 2000);
  }

/* ************************* To show the slide-out effect on the Assassins ************************* */
  function hideAssassins(){
      $('.assassin-0').css({'opacity': 1.0, 'visibility': 'hidden', 'left': '0%'},3000);
      $('.assassin-1').css({'opacity': 0.0, 'visibility': 'hidden', 'left': '3%'},2000);
      $('.assassin-2').css({'opacity': 0.0, 'visibility': 'hidden', 'left': '8.5%'},2500);
      $('.assassin-3').css({'opacity': 0.0, 'visibility': 'hidden', 'left': '15.5%'},3000);

      $('.assassin-4').css({'opacity': 0.0, 'visibility': 'hidden', 'top': '10%'},5000);

      $('.assassin-5').css({'opacity': 0.0, 'visibility': 'visible', 'right': '24.0%'}, 2000);
      $('.assassin-6').css({'opacity': 0.0, 'visibility': 'visible', 'right': '11.0%'}, 2000);
      $('.assassin-7').css({'opacity': 0.0, 'visibility': 'visible', 'right': '5.0%'}, 2000);
      $('.assassin-8').css({'opacity': 0.0, 'visibility': 'visible', 'right': '0.0%'}, 3000);

  }
