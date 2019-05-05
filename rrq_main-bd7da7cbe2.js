var w = window,
d = document,
e = d.documentElement,
g = d.getElementsByTagName('body')[0],
widthviewport = w.innerWidth || e.clientWidth || g.clientWidth,
heightviewport = w.innerHeight || e.clientHeight || g.clientHeight;

// adds mobile browser class to html tag. Special thanks to @ctcherry on github!
(function(){
    var ua = navigator.userAgent.toLowerCase().replace(/\s+/,'');

    var matchers = {
        ios: /(iphone|ipod|ipad)/,
        ipad: /ipad/,
        iphone: /(iphone|ipod)/,
        android: 'android',
        android2: 'android2',
        android4: 'android4',
        windowsphone: 'windows phone'
    }

    var h = $('html');

    for (i in matchers) {
        var m = matchers[i];
        if ((typeof(m) == "string" && ua.indexOf(m) > -1) || (typeof(m) == "object" && ua.match(m))) {
            h.addClass(i)
        }
    }

})();

$(document).ready(function(){

    $('.navbar__mobile--logo').on('click', function(){
        $('.navbar__mobile').toggleClass('is-active');
        $('.navbar__li').removeClass('is-active');
    });

    $('.navbar__mobile--dropdown .has-child').on('click', function(){
        $(this).parent().toggleClass('is-active');
    });

});


$('#sponsor-carousel').slick({
    dots: false,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    speed: 500,
    autoplaySpeed: 3000,
    pauseOnFocus: false,
    fade: true,
    cssEase: 'linear'
});

$('#sponsor-carousel-mobile').slick({
    dots: false,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    speed: 500,
    autoplaySpeed: 3000,
    pauseOnFocus: false,
    fade: true,
    cssEase: 'linear'
});

$('#division-slider').slick({
    infinite: false,
    dots: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
    {
        breakpoint: 1600,
        settings: {
            slidesToShow: 4
        }
    },
    {
        breakpoint: 1080,
        settings: {
            slidesToShow: 3
        }
    }
    ]
});

// DIVISION SECTION
$(function(){    
    initScrollMagic();
});
function initScrollMagic() {
    var animationFactory = new AnimationFactory();
    var id = 'division-section';

    $("#" + id).removeClass('notvisible');

    if(widthviewport > 1024){
        if ($("#" + id).length > 0)
            animationFactory.staggerElements(id);
    }

}
function AnimationFactory() {
    this.controller = new ScrollMagic.Controller();
    this.scenes = [];
}
AnimationFactory.prototype = {
    controller: null,
    scenes: null,
    constructor: AnimationFactory,

    staggerElements: function (element) {
        element = typeof element === "string" ? document.getElementById(element) : element;

        var targetDivs = $(element).find('.logo');
        var targetDivisionList = $(element).find('.division__list--item');
        var targetText1 = $(element).find('.division__text .text-1');
        var targetText2 = $(element).find('.division__text .text-2');

        var tweenMain = TweenMax.staggerFrom(targetDivisionList, 1.3, {
            y: 300,
            x: -28,
            opacity: 0,
            delay: 0.18,
            ease: Power4.easeOut
        }, 0.15);
        var tweenText1 = TweenMax.from(targetText1, 1.3, {x: -19, opacity:0, ease: Power3.easeOut})
        var tweenText2 = TweenMax.from(targetText2, 1.3, {x: 237, opacity:0, ease: Power3.easeOut})

        var timeline = new TimelineMax();
        timeline.add([tweenText1, tweenText2, tweenMain], 0, "normal", 0.5);

        scene = new ScrollMagic.Scene({
            triggerElement: element,
            triggerHook: "onCenter",
            reverse: false,
        });
        scene.setTween(timeline);
        scene.addTo(this.controller);

        this.scenes.push(scene);

        return this;
    }

};


(function(){
    $('.match-ticker--tab li').on('click', function(){
        var tabTarget = $(this).data('tab-target');

        $('.match-detail .tab-content').not(tabTarget).hide();
        $('.match-ticker--tab li').removeClass('active');

        $(this).addClass('active');
        $(tabTarget).fadeIn(400);
    });

    $(document).ready(function(){
        $('.match-ticker--tab li:first-child').trigger('click');
    });
})();

(function(){
    $('.tab-button li').on('click', function(){
        var tabTarget = $(this).data('tab-target');

        $(this).parents('.tab--container').find('.tab-content').not(tabTarget).hide();
        $(this).siblings().removeClass('active');

        // $('.match-detail .tab-content').not(tabTarget).hide();
        // $('.match-ticker--tab li').removeClass('active');

        $(this).addClass('active');
        $(tabTarget).fadeIn(400);
    });

    $(document).ready(function(){
        $('.tab-button li:first-child').trigger('click');
    });
})();

(function(){
    var idSelect = $('.select__dropdown-menu-mobile');
    var closeSelect = $('.close-popup')

    idSelect.on('click', function(){
        var $this = $(this);
        if($this.hasClass('active')){
            $this.removeClass('active');
            $('body').removeClass('show-select-dropdown');
        }
        else{
            $this.addClass('active');
            $('body').addClass('show-select-dropdown');
        }
    });

    closeSelect.on('click', function(){
        $('body').removeClass('show-select-dropdown')
        idSelect.removeClass('active');
    });    
})();


// MENU SELECTED PER PAGE
(function(){
    var id = $('#menu-header');
    var parent = id.attr('data-selected-menu');
    var child = id.find('li');
    var item = [];

    for(var i = 0, l = child.length;i < l; i++){
        item = $(child[i]);
        if(parent == item.attr('data-value')){
            item.addClass('active');
        }
    }
})();


// SCrOLL INSIDE POPUP
(function(){
    $('.slimscroll').slimScroll({
        railVisible: false,
        alwaysVisible: false,
        railOpacity: 1,
        size: '4px',
        color: '#585858',
        railColor: '#fff'
    });
})();

(function($){
    "use strict";

    var defaults = {};

    function Plugins(element, options){
        this.element = element;
        this.$element = $(element);
        this.options = $.extend({}, defaults, options);
        this.popupElement = $('.gallery--popup');

        this.init();
    }

    Plugins.prototype = {
        init: function(){
            console.log('initialization');
            this.initPopup();
        },
        initPopup: function(){
            var $this = this;
            var img = $this.$element.find('.img');

            img.on('click', function(){
                $('html').addClass('show_popup');
                var portrait = $(this).data('img-portrait');
                var landscape = $(this).data('img-landscape');

                $this.initPopupTab(portrait, landscape);
            });

            $(document).on('click', '[data-popup="close"]', function(){
                $('html').removeClass('show_popup')
            });
        },
        initPopupTab: function(portrait, landscape){
            var $this = this;
            var gallery_tab = $this.popupElement.find('.tab-item');
            var gallery_tab_container = $this.popupElement.find('#img-container');

            this.fetchImgTab(portrait, landscape);
             
            gallery_tab.on('click', function(){
                var src = $(this).find('img');
                var img = src.attr('src');

                gallery_tab.removeClass('active');

                $(this).addClass('active');
                gallery_tab_container.attr('src', img);
            });

            $(document).ready(function(){
                gallery_tab.first().trigger('click');
            });
        },
        fetchImgTab: function(portrait, landscape){
            var $this = this;
            var imgPortraitContainer = $this.popupElement.find('.img-portrait');
            var imgLandscapeContainer = $this.popupElement.find('.img-landscape');

            imgPortraitContainer.attr('src', portrait);
            imgLandscapeContainer.attr('src', landscape);
        }
    }

    $.fn.galleryPopup = function(options){
        return this.each(function(){
            (new Plugins(this, options));
        })
    }

})(jQuery);
$(document).ready(function(){
    $('#gallery-popup').galleryPopup();
});

(function(){
    var buttonCollapse = $('.btn--table-collapse');
    buttonCollapse.on('click', function(){

        var ths = $(this);
        var content = ths.parents('.table-team').find('.table-team--body');
        if(!ths.hasClass('collapse')){
            console.log('tutup');
            content.slideUp(400);
            ths.addClass('collapse');
        }
        else{
            console.log('buka');
            content.slideDown(400);
            ths.removeClass('collapse');
        }
    })
})();

(function(){
    $('.open-popup').on('click', function(){
        $('html').addClass('show_popup')
    });

    $('.close-popup').on('click', function(){
        $('html').removeClass('show_popup')
    });    
})();


(function(){
    var window_scroll = 0;
    var delta = 5;
    var element = document.querySelector('.header-mobile');
    var header_container = $('.header-mobile .header__container').height();

    var header = new Headroom(element, {
        tolerance: 0,
        offset : header_container
    });
    header.init();

    // function show_top_bar(value){
    //     TweenMax.to(value, 0.5, {y:0, ease: Sine.ease, 'force3D':true});
    // }
    // function hide_top_bar(value){
    //     TweenMax.to(value, 0.5, {y:-71, ease: Sine.ease, 'force3D':true});
    // }
    // function onScroll(){
    //     window.addEventListener('scroll', hasScrolled)
    // }
    // function hasScrolled(e) {
    //     e.preventDefault();
    //     var current_window_scroll = $(this).scrollTop();

    //     // Make sure they scroll more than delta
    //     if(Math.abs(window_scroll - current_window_scroll) <= delta)
    //         return;


    //     if (current_window_scroll > window_scroll){
    //         hide_top_bar(header);
    //     } else {
    //         show_top_bar(header);
    //     }
    //     window_scroll = current_window_scroll;

    //     console.log(window_scroll);
    //     console.log(current_window_scroll);

    // }

    // $(document).ready(function(){
    //     onScroll();
    //     console.log(window_scroll);
    // });

})();


(function(){
    var list = $('#data-achievement');
    var img = $('.achievement--img');
    var data = list.find('table tr');
    var trophy = img.find('img');
    var datalength = data.length;

    function showHideTrophy(){
        if(datalength <= 3){
            trophy.hide();
        }
        else{
            trophy.show();
        }
    }

    $(document).ready(function(){
        showHideTrophy();
    })
    // document.onreadystatechange = () => {
    //     if(document.readyState == 'complete'){
    //         showHideTrophy()
    //     }
    // }
})();

/*
DiagonalSlider.js
jQuery plugin to create diagonal slider
(c) Innvenio 2015 (@innvenio)
*/
// COSTUMIZED
function loadSlider(slider){
    var w;
    var width = 0;
    var image_width = slider.find('li .img').width();
    var image_height = slider.find('li .img').height();
    var out = true;
    var valor = 0;    
    var timeout;
    var length_gallery_item = slider.find('li').length;

    valor = length_gallery_item * 25;
    w = $(window).width() + 73;

    width = w / 3;
    slider.width(w);
    slider.height($(window).height());
    slider.find('li').width((w / length_gallery_item));
    if($(window).height()<image_height){            
        slider.find('li .img').css('top', ((image_height-$(window).height())/2)*-1);
    }
    var i = 1;
    slider.find('li').each(function(){
        $(this).attr('data-position', i);
        i++;
    });

    slider.find('li').unbind("hover");
    slider.find('li').hover(function(){
        var item = $(this);
        if (out){
            out = false;
            if (timeout){
                clearTimeout(timeout);    
            }

            timeout = setTimeout(function(){
                zoomIn(item, function(){ }); 
            }, 10);
        }

    }, function(){
        zoomOut(function(){
            out = true; 
        });
    });

    function zoomOut(callback){
        slider.find('li').each(function(){
            var x = w / length_gallery_item;
            $(this).css('width', x);
        });

        callback();
    }

    function zoomIn(item, callback){
        slider.find('li').each(function(){
            var x = (w / length_gallery_item) - (width / length_gallery_item - 1);
            if ($(this).attr('data-position') != item.attr('data-position')){
                $(this).css('width', x);
            }
            else
            {
                item.css('width', ((w / length_gallery_item) + width) - ((width / length_gallery_item) * 1));
            }
        });
        callback();
    }
}

(function($) {
    $.fn.diagonalAccordion = function() {
        var slider = $(this);
        var doit;

        setTimeout(function(){
            loadSlider(slider);
        }, 10);

        function resizedw(){
            loadSlider(slider);
        }

        window.onresize = function() {
            clearTimeout(doit);
            doit = setTimeout(function() {
                resizedw();
            }, 100);
        };

    }

    $('#teams-division').diagonalAccordion();
}(jQuery));


var rrq = (function(){

    function filterCategory() {
        $('#filterCategoryMobile ul li', document).on('click', function(){
            var $this = $(this)
            var $parent = $this.closest('.montase-dropdown')
            var $filter = $parent.find('.text-filter')
            var text = $this.find('a').text()
            var $li = $parent.find('ul li')
            $li.removeClass('active')

            $this.addClass('active')
            $filter.text(text)

            toggleContent()

            function toggleContent() {
                var target = $this.attr('data-target')
                var $target = $(target)
                var $parent = $this.closest('#videoListMobile')
                var $items = $parent.find('.video-list__item')
                $items.removeClass('active')
                $target.addClass('active')
            }
        });
    }

    function scrollToElement (el, options) {
      var DEFAULTS = {
        offset: 0
    }

    options = $.extend(DEFAULTS, options)

    var offsetFromWindow = $(el).offset().top,
    offsetFromWindow = parseInt(offsetFromWindow) + parseInt(options.offset);

    $(window).scrollTop(offsetFromWindow)
}

return {
    filterCategory: filterCategory,
    scrollToElement: scrollToElement
}
})();


(function(){
  'use strict'

  var toggle = '[data-ui="montase-dropdown"]'

  var MontaseDropdown = function(element) {
    $(element).on('click.montase.dropdown', this.toggle)
  }

  MontaseDropdown.prototype.toggle = function(e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.montase.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown', relatedTarget)
    }

    return false
  }

  MontaseDropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if ((!isActive && e.which != 27) || (isActive && e.which == 27)) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' a'
    var $items = $parent.find('[role="menu"]' + desc + ', [role="listbox"]' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--                        // up
    if (e.which == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index = 0

    $items.eq(index).trigger('focus')
  }

  function clearMenus(e) {
    if (e && e.which === 3) return

    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      $parent.trigger(e = $.Event('hide.montase.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $parent.removeClass('open').trigger('hidden.montase.dropdown', relatedTarget)
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.closest('.montase-dropdown')
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('montase.dropdown')

      if (!data) $this.data('montase.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.montasedropdown             = Plugin
  $.fn.montasedropdown.Constructor = MontaseDropdown


  $(document)
    .on('click.montase.dropdown.data-api', clearMenus)
    .on('click.montase.dropdown.data-api', toggle, MontaseDropdown.prototype.toggle)
    .on('keydown.montase.dropdown.data-api', toggle, MontaseDropdown.prototype.keydown)
    .on('keydown.montase.dropdown.data-api', '[role="menu"]', MontaseDropdown.prototype.keydown)

})();
var news = (function(){

  'use strict'

  var $body = $('#body')
  var titleNewsClass = '.news-square__title'
  var shareMobile = '.share-mobile, .share-news-mobile-close'
  var $ctShareMobile = $('.ct-share-news-mobile')

  var animateHoverNewsTitle = function() {
    $(document).on('mouseover', titleNewsClass, _toggleAnimateNewsTitle)
    $(document).on('mouseleave', titleNewsClass, _toggleAnimateNewsTitle)
  }

  var animateShareMobile = function(settings) {

    var DEFAULTS = {
      slug: 'news'
    }

    settings = $.extend(DEFAULTS, settings);

    $(document).on('click', shareMobile, settings, _toggleShareMobile)
  }

  var _toggleAnimateNewsTitle = function() {
    var self = this
    var $parentNewsSquare = $(self).closest('.news-square')
    var isHover = $parentNewsSquare.hasClass('news-square-hover')

    if(isHover) {
      $parentNewsSquare.removeClass('news-square-hover')
      return $parentNewsSquare
    } 
    else {
      $parentNewsSquare.addClass('news-square-hover')
      return $parentNewsSquare
    }

    return false

  }

  var _toggleShareMobile = function(e) {
    console.log(e.data);
    var $this     = $(this),
        isActive  = $ctShareMobile.hasClass('active'),
        dataImage,
        dataTitle,
        dataUrl,
        shares = [{
            '$el': $('#shareOnFb')
          }, {
            '$el': $('#shareOnTwitter')
          }, {
            '$el': $('#shareOnCopyLink')
        }];

    if(e) e.preventDefault()
    
    // if in video page
    if(e.data.slug === 'video') {
      dataImage = $this.attr('data-share-image');
      dataTitle = $this.attr('data-share-title');
      dataUrl   = $this.attr('data-share-url');

      // inject data all element share
      $.each(shares, function(i, share){
        share.$el.attr('data-share-image', dataImage);
        share.$el.attr('data-share-title', dataTitle);
        share.$el.attr('data-share-url', dataUrl);
       });

    }

    if(isActive) {
      $body.removeClass('share-mobile-bg-active')
      $ctShareMobile.removeClass('active')
    } else {
      $body.addClass('share-mobile-bg-active')
      $ctShareMobile.addClass('active')
    }

  }

  var _toggleStickySharePosition = function() {
    var $window = $(window),
        scrollTop,
        $stickyShare = $('.sticky-share');

    $window.on('scroll', watchScrolling);

    $window.on('resize', watchScrolling);

    function watchScrolling() {
      if($window.width() > 768 && $window.height() < 768) {
        scrollTop = $window.scrollTop();
        
        if(scrollTop < 270) {
          $stickyShare.removeClass('stop');
        }

        if(scrollTop > 270) {
          $stickyShare.addClass('stop');
        }
      }
    }
  }

  return {
    init: function() {
      animateHoverNewsTitle()
    },
    initToggleShareMobile: function(settings) {
      animateShareMobile(settings)
    },
    toggleStickySharePosition: _toggleStickySharePosition
  }
})();
var contact = (function(){
  
  'use strict'

   var $container = $('.contact-response')

  var initChosen = function() {
    $(".chosen-select").chosen({
      disable_search_threshold: 10,
      placeholder_text_single: 'Choose option'
    });
    console.log('chosen selector .chosen-select')
  }

  var _addFormError = function(targetSelector, settings) {
    var openEl = '<p>',
        closeEl = '</p>'
    var DEFAULTS = {
      message: 'this field required.'
    }

    settings = $.extend(DEFAULTS, settings) 

    
    $(targetSelector)
        .addClass('form-error')
        .append(openEl + settings.message + closeEl);

  }

  var _deleteFormError = function(targetSelector) {
    $(targetSelector)
        .removeClass('form-error')
    $(targetSelector + ' p').remove()
  }

  var _setFormMessage = function(settings) {
   
    var isExist = $container.find('.alert').length === 0
    var $el;

    var DEFAULTS = {
      priority: 'success',
      title: 'MESSAGE SENT',
      message: 'Thank you. We will contact you back soon!'
    }

    settings = $.extend(DEFAULTS, settings) 

    var $alert      = $('<div class="alert alert-' + settings.priority + ' mb_46"></div>')
    var $alertImg   = $('<img src="/images/global/' + settings.priority + '-icon.png" class="alert__icon" />')
    var $alertBody  = $('<div class="alert__body text-left"></div>')
    var $alertTitle = $('<h4 class="alert__title barlow semibold ls_0 lh_22 size_18 mb_3">' + settings.title + '</h4>')     
    var $alertMsg   = $('<p class="alert__message barlow medium size_16 ls_0 lh_19">' + settings.message + '</p>')
    
    if(isExist) {
      $el = $alertBody
              .append($alertTitle)
              .append($alertMsg)
      $el = $alert.append($alertImg)
                  .append($el)

      $container.append($el)
      return $el
    }
        
  }

  var _clearFormMessage = function() {
    $container.empty()
  }

  return {
    init: function() {
      initChosen()
    },
    addFormError: function(targetSelector, settings){
     return  _addFormError(targetSelector, settings)
    },
    deleteFormError: function(targetSelector) {
      return _deleteFormError(targetSelector)
    },
    setFormMessage: function(settings) {
      return _setFormMessage(settings)
    },
    clearFormMessage: function() {
      return _clearFormMessage()
    }
  }
})();
var about = (function(){
  'use strict'
  var controller = new ScrollMagic.Controller();

  var _counterNumber = function(selector) {
    $(selector).each(function () {
        $(this).prop('Counter',0).animate({
            Counter: $(this).text()
        }, {
            duration: 2000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });
  }

  var triggerCounterNumber = function(selector) {
    var scene = new ScrollMagic.Scene({triggerElement: "#youTube"})
            // trigger animation by adding a css class
            .on('start', function(){
              if(!$(selector).hasClass('done')) {
                _counterNumber(selector)
                $(selector).addClass('done')
              }
              
            })
            .addTo(controller);
  }

  return {
    init: function(settings) {
      if(!!settings) {
        triggerCounterNumber(settings.selectorCounterNumber)
      }
      
    }
  }
})();
//# sourceMappingURL=rrq_main.js.map