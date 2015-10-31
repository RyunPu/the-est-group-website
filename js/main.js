$(function() {
    var EST = {
        init: function() {
            this.bind();
            this.loading();
        },
        bind: function() {
            var self = this;

            $('.head a, .footer a').smoothScroll();
            //$('.dimmable.image').dimmer({on: 'hover'});
            if (typeof window.orientation !== 'undefined') self.headroom();
            $('.dimmer.c-mask').on('touchmove', function(e) { e.preventDefault(); });

            if ($('.cont').length) {
                self.stickfooter();
                $(window).scroll(self.stickfooter);
                $(window).resize(self.stickfooter);
            }

            new WOW({
                mobile: false,
                callback: function(box) {
                    if ($(box).is('.logo')) self.headroom();
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

            // Instantiation
            var theater = new TheaterJS();
            theater.describe("iWannaSay", .8, "#i-wanna-say");

            // Write the scenario
            theater
                .write("iWannaSay:We design and build: ", 800, "Web Application", 200)
                .write(1000)
                .write(-15)
                .write("Mobile App")
                .write(1000)
                .write(-10)
                .write("Art ;-)")
                .write(1000)
                .write(-7)
                .write("Amazing Product")
                .write(800)
                .write("...", 800)
                .write(1000)
                .write(-18)
                .write("the Future, Baby!", 2000);

        },
        loading: function() {
            var arr = [],
                num = 0,
                path = location.href.split('page/')[0].split('#')[0] + 'img/',
                imgs = ['bg.jpg', 'bg-team.jpg', 'avatar/lgl.png', 'avatar/lxx.png', 'avatar/pym.png', 'avatar/zh.png', 'avatar/zjh.png', 'avatar/zxx.png'];

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
        },
        stickfooter: function() {
            var footer = $('.footer'),
                content = $('.cont'),
                BH = $('body').height(),
                FH = footer.height(),
                CH = content.height() + content.offset().top;

            if (FH + CH < BH) {
                footer.css('position', 'fixed');
            } else {
                footer.css('position', 'static');
            }
        }
    };

    EST.init();
});