$(function() {
    var EST = {
        init: function() {
            if ($('.swiper-container').length) this.swipe(); // init swiper
            if ($('#i-wanna-say').length) this.play(); // init theater
            if ($('#tickets').length) this.bindForm(); // init hire us form
            this.toggle(); // init top menu
            this.show(); // init img modal
            this.animate(); // hover animation
            //this.beat(); // heart beat
            this.backToTop();
            this.fixedFooter();
            this.changeLanguage();
        },
        swipe: function() {
            var self = this;
            var swiper;
            var moving = false;
            var initialized = false;
            var href = location.href;
            var anchor = href.split('#');
            var index;
            var mobile = /iphone|ipod|android|windows phone/i.test(navigator.userAgent);

            if (anchor.length > 1) index = self.getMenuIndex(anchor[1]);
            if (mobile) $('.swiper-no-swiping').removeClass('swiper-no-swiping');

            self.swiper = new Swiper('.swiper-container.main', {
                initialSlide: index ? index : 0,
                pagination: '.main > .swiper-pagination',
                paginationClickable: true,
                direction: 'vertical',
                speed: 600,
                onInit: function() {
                    initialized = true;
                },
                onSlideChangeStart: function(obj) {
                    var head = $('#head');

                    if (obj.activeIndex == 0) {
                        head.removeClass('nf');
                    } else {
                        head.addClass('nf');
                    }

                    moving = true;
                },
                onSlideChangeEnd: function() {
                    moving = false;
                }
            });

            $('.swiper-container.main').on('mousewheel', function(event) {
                if (initialized && !moving && Math.abs(event.deltaY) > 50) {
                    if (event.deltaY < 0) {
                        self.swiper.slideNext();
                    } else {
                        self.swiper.slidePrev();
                    }
                }
            });

            new Swiper('.team .swiper-container', {
                pagination: '.team .swiper-pagination',
                effect: 'coverflow',
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: mobile ? 1 : 3,
                autoplay: 4000,
                loop: true,
                autoplayDisableOnInteraction: false,
                paginationClickable: true,
                nextButton: '.next',
                prevButton: '.prev',
                simulateTouch: true,
                noSwipingClass: 'nsp',
                coverflow: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false
                }
            });

            $('[data-swiper-class]').on('click', function() {
                self.swiper.slideTo(self.getMenuIndex($(this).data('swiper-class')));
            });
        },
        getMenuIndex: function(anchor) {
            var self = this;
            var index;

            switch (anchor) {
                case 'home':
                    index = 0;
                    break;
                case 'services':
                    index = 1;
                    break;
                case 'projects':
                    index = 2;
                    break;
                case 'team':
                    index = 3;
                    break;
                case 'contact':
                    index = 4;
                    break;
            }

            return index;
        },
        play: function() {
            var theater = new TheaterJS();

            theater.describe('iWannaSay', .8, '#i-wanna-say');
            theater
                .write('iWannaSay:We design and build: ', 800, 'Web Application', 200)
                .write(1000)
                .write(-15)
                .write('Mobile App')
                .write(1000)
                .write(-10)
                .write('Art ;-)')
                .write(1000)
                .write(-7)
                .write('Amazing Product')
                .write(1000)
                .write(-15)
                .write('the Future ;-)', 2000);

            $('#banner .next').on('click', function() {
                theater.play(true);
            });
        },
        toggle: function() {
            $('#nav-toggle').on('click', function() {
                var that = $(this);
                var active = that.is('.active');
                var nav = that.next('.nav');

                if (active) {
                    that.removeClass('active');
                    nav.removeClass('active');
                } else {
                    that.addClass('active');
                    nav.addClass('active');
                }
            });

            $('#head .nav a').on('click', function() {
                if ($(this).parent('.nav').is('.active')) $('#nav-toggle').trigger('click');
            });
        },
        show: function() {
            $('[data-modal-img]').on('click', function() {
                var imgViewer = $('#img-viewer');
                var src = $(this).data('src') ? $(this).data('src') : $(this).attr('src');
                var title = $(this).next('.title').html();

                title = title ? title : $(this).parent('.column').next('.column').find('.name span').html();

                imgViewer.find('img').attr('src', src);
                imgViewer.find('.title').html(title);

                imgViewer
                .modal('setting', 'transition', 'scale')
                .modal('show');
            });
        },
        animate: function() {
            $('#contact .email .icon').hover(
                function() {
                    $(this).addClass('tada');
                },
                function() {
                    $(this).removeClass('tada');
                }
            );
        },
        beat: function() {
            var quickMode = false;
            var heart = $('#copy .heart');

            setInterval(function(){
                if (quickMode) {
                    heart.removeClass('quick');
                    quickMode = false;
                } else {
                    heart.addClass('quick');
                    quickMode = true;
                }
            }, 1000);
        },
        backToTop: function() {
            $(window).on('scroll', function() {
                if ($(this).scrollTop() > 100) {
                    $('#backToTop').fadeIn();
                } else {
                    $('#backToTop').fadeOut();
                }
            });

            $('#backToTop').on('click', function(e) {
                $('html, body').animate({
                    scrollTop: 0
                }, 300);

                e.preventDefault();
            })
            .hover(
                function() {
                    $(this).find('i').addClass('fadeInUp');
                },
                function() {
                    $(this).find('i').removeClass('fadeInUp');
                }
            );
        },
        fixedFooter: function() {
            var footer = $('#copy');
            var top = footer.offset().top;
            var WH = $(window).height();

            if (top <= WH) footer.addClass('fixed');
        },
        bindForm: function() {
            $('#tickets form')
            .form({
                on: 'submit',
                inline: true,
                fields: {
                    email: {
                        identifier: 'email',
                        rules: [
                            {
                                type: 'empty',
                                prompt: $('[data-validate="email"]').data('msg-empty')
                            },
                            {
                                type: 'email',
                                prompt: $('[data-validate="email"]').data('msg-invalid')
                            },
                        ]
                    },
                    ot: {
                        identifier: 'other-contact',
                        rules: [{
                            type: 'empty',
                            prompt: $('[data-validate="other-contact"]').data('msg-empty')
                        }]
                    },
                    si: {
                        identifier: 'some-info',
                        rules: [{
                            type: 'empty',
                            prompt: $('[data-validate="some-info"]').data('msg-empty')
                        }]
                    },
                    pi: {
                        identifier: 'project-info',
                        rules: [{
                            type: 'empty',
                            prompt: $('[data-validate="project-info"]').data('msg-empty')
                        }]
                    },
                    party: {
                        identifier: 'party',
                        rules: [{
                            type: 'empty',
                            prompt: $('[data-validate="party"]').data('msg-empty')
                        }]
                    },
                    role: {
                        identifier: 'role',
                        rules: [{
                            type: 'empty',
                            prompt: $('[data-validate="role"]').data('msg-empty')
                        }]
                    },
                    invoice: {
                        identifier: 'invoice',
                        rules: [{
                            type: 'empty',
                            prompt: $('[data-validate="invoice"]').data('msg-empty')
                        }]
                    },
                    demand: {
                        identifier: 'demand',
                        rules: [{
                            type: 'empty',
                            prompt: $('[data-validate="demand"]').data('msg-empty')
                        }]
                    },
                    platform: {
                        identifier: 'platform',
                        rules: [{
                            type: 'empty',
                            prompt: $('[data-validate="platform"]').data('msg-empty')
                        }]
                    },
                    stage: {
                        identifier: 'stage',
                        rules: [{
                            type: 'empty',
                            prompt: $('[data-validate="stage"]').data('msg-empty')
                        }]
                    },
                    design: {
                        identifier: 'design',
                        rules: [{
                            type: 'empty',
                            prompt: $('[data-validate="design"]').data('msg-empty')
                        }]
                    },
                    operation: {
                        identifier: 'operation',
                        rules: [{
                            type: 'empty',
                            prompt: $('[data-validate="operation"]').data('msg-empty')
                        }]
                    },
                    period: {
                        identifier: 'period',
                        rules: [{
                            type: 'empty',
                            prompt: $('[data-validate="period"]').data('msg-empty')
                        }]
                    },
                    required: {
                        identifier: 'required',
                        rules: [{
                            type: 'empty',
                            prompt: $('[data-validate="required"]').data('msg-empty')
                        }]
                    }
                }
            })
            .on('reset', function() {
                $('#file-name').html('');
                $(this).form('clear');
            })
            .sisyphus();

            $('#file').on('change', function(e) {
                $('#file-name').html(this.value);
            });

            if (typeof Global === 'object' && Global.ticketsMsg) {
                if (Global.ticketsMsg === 'success') {
                    $('#tickets-msg').find('.circular').removeClass('remove').addClass('checkmark');
                    $('#tickets-msg').find('#tickets-msg-span').html($('#tickets-msg-span').data('success-msg'));
                } else if (Global.ticketsMsg === 'error') {
                    $('#tickets-msg').find('.circular').removeClass('checkmark').addClass('remove');
                    $('#tickets-msg').find('#tickets-msg-span').html($('#tickets-msg-span').data('error-msg'));
                }

                $('#tickets-msg')
                .modal('setting', 'transition', 'scale')
                .modal('show');
            }
        },
        changeLanguage: function() {
            var self = this;
            var locale = self.getCookie('locale');

            switch (locale) {
                case 'zh_cn':
                    locale = '简体中文';
                    break;
                case 'en':
                    locale = 'English';
                    break;
                default:
                    locale = '简体中文';
                    break;
            }
            
            $('#language').dropdown({
                onChange: function(text, value, $selectedItem) {
                    var language;

                    switch (value) {
                        case '简体中文':
                            language = 'zh_cn';
                            break;
                        case 'English':
                            language = 'en';
                            break;
                    }

                    self.setCookie('locale', language, 365);
                    location.reload();
                }
            })
            .dropdown('set text', locale);
        },
        getCookie: function(cname) {
            var name = cname + "=",
                ca = document.cookie.split(';'),
                c;

            for(var i = 0; i < ca.length; i++) {
                c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1);
                if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
            }

            return '';
        },
        setCookie: function(cname, cvalue, exdays, domain) {
            var d = new Date(),
                expires,
                domain;

            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            expires = "expires=" + d.toUTCString();
            domain = domain ? domain : location.host;
            document.cookie = cname + "=" + cvalue + "; " + expires + ';domain=' + domain + ';path=/';
        }
    };

    EST.init();
});