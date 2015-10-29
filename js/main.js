$(function() {
    var EST = {
        init: function() {
            this.bind();
            this.loading();
        },
        bind: function() {
            var self = this;

            $('.head a, .footer a').smoothScroll();
            $('.dimmable.image').dimmer({on: 'hover'});
            if (typeof window.orientation !== 'undefined') self.headroom();
            $('.dimmer.c-mask').on('touchmove', function(e) { e.preventDefault(); });

            new WOW({
                mobile: false,
                callback: function(box) {
                    if ($(box).is('.logo')) {
                        self.headroom();
                    }
                }
            }).init();

            $('[data-wow-infinite]').hover(
                function() {
                    $(this).addClass('infinite');
                },
                function() {
                    $(this).removeClass('infinite');
                }
            );
        },
        loading: function() {
            var arr = [],
                num = 0,
                path = location.href.split('page/')[0].split('#')[0] + 'img/',
                imgs = ['bg.jpg', 'avatar/lgl.png', 'avatar/lxx.png', 'avatar/pym.png', 'avatar/zh.png', 'avatar/zjh.png', 'avatar/zxx.png'];

            for (var i = 0, len = imgs.length; i < len; i++) {
                arr[i] = new Image();
                arr[i].onload = function() {
                    num++;
                    if (num === len) $('.dimmer.c-mask').fadeOut();
                }
                arr[i].src = path + imgs[i];
            };

        },
        headroom: function() {
            new Headroom($('.headroom').get(0), {
                offset: 68,
                classes: {
                    initial: 'animated',
                    pinned: 'fadeInDown',
                    unpinned: 'fadeOutUp'
                }
            }).init();
        }
    };

    EST.init();
});