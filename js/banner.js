var Banner = (function() {
    var _count;
    var _screenLastIndex = 4;
    var _screenMaxTotIndex = 4;
    var _navStepHeight = 53;
    var _needarr = false;
    var _hideNav = 0;

    var initStyle = function() {
        var $light_a = $('#banner_main a');
        var $light_navs = $('#blist a');
        _count = $light_a.length;
        if (_count > 5) {
            _needarr = true;
        }

        $light_a.each(function(index) {
            $(this).attr('data-index', index);

            if (index !== 0) {
                $(this).hide();
                $(this).css('z-index', 1);
            } else {
                $(this).css('z-index', 2).addClass('cur');
            }
        });

        $light_navs.each(function(index) {
            $(this).attr('data-index', index);

            if (index === 0) {
                $(this).addClass('cur');
            }
        });

        if (_needarr) {
            $('#banner_bnav').on('mouseenter', function() {
                $(this).find('.banner_bnav_arr').show();
            }).on('mouseleave', function() {
                $(this).find('.banner_bnav_arr').hide();
            });

            $('#banner_bnav').on('click', '.banner_bnav_arrt', prevBanner);
            $('#banner_bnav').on('click', '.banner_bnav_arrt', nextBanner);
        }
    };

    var initClick = function() {
        $('#blist a').on('click', function() {
            if ($(this).hasClass('cur')) {
                return;
            }
            var $arrs = $('.banner_bnav_arr');
            $arrs.addClass('disable');

            var index = parseInt($(this).attr('data-index'), 10);
            // show
            $newBan = $('#banner_main a[data-index=' + index + ']');
            $oldBan = $('#banner_main .cur:eq(0)');

            initImg($newBan.find('img'));

            $newBan.css('z-index', 3).fadeIn(200, function() {
                $oldBan.removeClass('cur').css('z-index', 1).hide();
                $(this).addClass('cur').css('z-index', 2);


                $arrs.removeClass('disable');
            });
            // move nav
            if (index > _screenLastIndex) { // list move up
                var offset = index - _screenLastIndex;
                var $blist = $('#blist');
                var tmptop = parseInt($blist.css('top'), 10) - offset * _navStepHeight;
                $blist.animate({'top': tmptop}, 200);
                _screenLastIndex+=offset;
                _hideNav+=offset;
            } else if (index < (_screenLastIndex - _screenMaxTotIndex)) { // list move down
                var offset = (_screenLastIndex - _screenMaxTotIndex) - index;
                var $blist = $('#blist');
                var tmptop = parseInt($blist.css('top'), 10) + offset * _navStepHeight;
                $blist.animate({'top': tmptop}, 200);
                _screenLastIndex-=offset;
                _hideNav-=offset;
            }
            var navtop = (index - _hideNav) * _navStepHeight;
            $('.banner_bnav_curnav:eq(0)').animate({
                'top': navtop
            }, 200);
            // change cur
            $('#blist a').removeClass('cur');
            $(this).addClass('cur');

        });
    };

    var prevBanner = function() {
        if ($('.banner_bnav_arr:eq(0)').hasClass('disable')) {
            return;
        }
        $prev = $('#blist .cur').parent().prev();
        if ($prev.length === 0) {
            $('#blist a:last').click();
        } else {
            $prev.find('a:eq(0)').click();
        }
    };

    var nextBanner = function() {
        if ($('.banner_bnav_arr:eq(0)').hasClass('disable')) {
            return;
        }
        $next = $('#blist a.cur').parent().next();
        if ($next.length === 0) {
            $('#blist a:first').click();
        } else {
            $next.find('a:eq(0)').click();
        }
    };

    var initTimer = function() {
        var timer = 0;
        $('#banner').on('mouseenter', function() {
            clearInterval(timer);
        }).on('mouseleave', function() {
            clearInterval(timer);
            timer = setInterval(nextBanner, 5000);
        }).mouseleave();
    };

    var initImg = function($dom) {
        if ($dom.attr('data-img') !== '') {
            $dom.attr('src', $dom.attr('data-img'));
            $dom.attr('data-img', '');
        }
    };

    return {
        init: function() {
            initStyle();
        },
        start: function() {
            initClick();
            setTimeout(initTimer, 3000);
        }
    };
}());
