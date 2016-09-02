( function(){

    "use strict";

    $( function(){

        $.each( $( '.promo' ), function() {
            new Sliders ( $( this ) );
        } );

        $.each( $( '.swiper-container' ), function() {
            Slider ( $( this ) );
        } );

        $.each( $( '.menu-btn' ), function() {
            new Menu ( $( this ) );
        } );

        $.each( $( '#map' ), function() {
            new Map ( $( this ) );
        } );

        $.each($('.tabs'), function () {
            new Tabs( $( this ) );
        });

        $( '.cafe-menu' ).each( function() {
            Accordion( $( this ) );
        });

        $.each( $( '.person__item' ), function () {
            new Person( $( this ) );
        });

    } );

    var Accordion = function(obj) {

        //private properties
        var _obj = $(this),
            _items=$('.cafe-menu>li');

        //private methods
        var _addEvents = function() {

                _items.on( {
                    click: function() {
                        var curElem = $( this ),
                            curMenu= curElem.find( 'ul' );

                        if( curMenu.is( ':visible' ) ) {
                            curMenu.slideUp( 300 );
                            curElem.removeClass( 'open' );
                        }
                        else{
                            curMenu.slideDown( 300 );
                            curElem.addClass( 'open' );
                        }
                        if ( event.stopPropagation ) {
                            event.stopPropagation();
                        } else {
                            event.cancelBubble = true;
                        }
                    }
                });

                /*$('body').on( {

                    click: function(e) {

                        var elem=$(e.target);

                        var curElem = $( '.cafe-menu>li' ),
                            curMenu= curElem.find( 'ul' );

                        if( curMenu.is( ':visible' ) ) {
                            curMenu.slideUp( 300 );
                            curElem.removeClass( 'open' );
                        }
                    }
                });*/

            },
            _init = function() {


                _addEvents();
            };

        //public properties

        //public methods

        _init();
    };

    var Map = function (obj) {

        //private properties
        var _obj = obj,
            _mapData = _obj.data('map'),
            _myMap, _myPlacemark;

        //private methods
        var _onEvent = function(){

                _initMap();
                _initPlaces();

            },
            _initMap = function(){

                _myMap = new ymaps.Map('map', {
                    center: _mapData.center,
                    zoom: _mapData.zoom,
                    controls: ['smallMapDefaultSet']
                }, {
                    searchControlProvider: 'yandex#search'
                });

            },
            _initPlaces = function(){

                _myPlacemark = new ymaps.Placemark( _mapData.place, {
                    iconCaption: _mapData.balloon
                }, {
                    preset: 'islands#blueCircleDotIconWithCaption'
                });

                _myMap.geoObjects.add(_myPlacemark);

            },
            _init = function() {
                ymaps.ready(_onEvent);
            };

        //public properties

        //public methods


        _init();
    };

    var Person = function (obj) {

        //private properties
        var _obj = obj,
            _name = _obj.find( '.person__name'),
            _list = _obj.find( '.person__list'),
            _body = $( 'body');

        //private methods
        var _onEvent = function(){

                _body.on({
                    'click': function() {
                        _list.removeClass( 'active' )
                    }
                })

                _list.on({
                    'click': function( e ) {
                        e.stopPropagation();
                    }
                })

                _name.on({
                    'click': function( e ) {
                        e.stopPropagation();

                        if ( _name.hasClass( 'active' ) ){
                            _name.removeClass( 'active' )
                        } else {
                            _name.addClass( 'active' )
                        }

                    }
                })

            },
            _init = function() {
                _onEvent();
            };

        //public properties

        //public methods


        _init();
    };

    var Menu = function( obj ) {

        //private properties
        var _obj = obj,
            _menu = $( '.menu' ),
            _window = $( window );


        //private methods
        var _initSlider = function() {

                _obj.on( {
                    'click': function() {

                        if ( _obj.hasClass( 'menu-btn_close' ) ) {

                            _obj.removeClass( 'menu-btn_close' );
                            _menu.removeClass( 'menu_visible' );

                        } else {

                            _obj.addClass( 'menu-btn_close' );
                            _menu.addClass( 'menu_visible' );

                            if ( _menu.height() - 10 > _window.height() ) {
                                _initContentScroll();
                                $( _menu ).getNiceScroll().show();
                            } else {
                                $( _menu ).getNiceScroll().hide();
                            }

                        }
                        return false;
                    }
                } ),
                    _window.on( {
                        'resize': function() {

                            if ( _menu.height() - 10 > _window.height() && _obj.hasClass( 'menu-btn_close' ) ) {
                                _initContentScroll();
                                $( _menu ).getNiceScroll().show();
                            } else {
                                $( _menu ).getNiceScroll().hide();
                            }

                        }
                    } )

            },
            _initContentScroll = function() {
                $( _menu ).niceScroll( {
                    autohidemode: 'false',
                    cursorborder: '',
                    cursorcolor: "#fff",
                    cursorwidth: "6px",
                    cursorborderradius: "0"
                } );
            },
            _init = function() {
                _initSlider();
            };

        //public properties

        //public methods

        _init();
    };

    var Sliders = function( obj ) {

        //private properties
        var _obj = obj,
            _promoSlider = _obj.find( '.promo__swiper'),
            _promo;


        //private methods
        var _initSlider = function() {

                _promo = new Swiper ( _promoSlider, {
                    autoplay: 4000,
                    speed: 500,
                    effect : 'fade',
                    loop: true
                } );

            },
            _init = function() {
                _initSlider();
            };

        //public properties

        //public methods

        _init();

    };

    var Slider = function (obj) {

        //private properties
        var _self = this,
            _obj = obj;

        //private methods
        var _addEvents = function () {

            },
            _init = function () {
                _addEvents();
            };

        if (_obj.hasClass('camp-slider__wrap')) {
            var _slider = new Swiper(_obj, {
                nextButton: '.camp-slider__next',
                prevButton: '.camp-slider__prev',
                paginationClickable: true,
                slidesPerView: 1,
                autoplay: 10000,
                speed: 2000,
                loop: true
            });

        }

        //public properties

        //public methods

        _init();
    };

    var Tabs = function (obj) {

        var _obj = obj,
            _window = $(window),
            _body = $("body"),
            _tabBtn = _obj.find('.tabs__controls-wrap > div'),
            _tabBtnInner = _tabBtn.find('> span'),
            _tabContent = _obj.find('.tabs__wrapper'),
            _controls = _obj.find('.tabs__controls-wrap'),
            _tabContentItem = _tabContent.find('> div');

        var _addEvents = function () {

                _window.on({
                    'load': function(){
                        _showContentWhenLoading();
                    }
                });

                _tabBtnInner.on({
                    mousedown: function(){
                        _tabContent.css({
                            'height': _tabContent.innerHeight()
                        }, 300);
                    },
                    mouseup: function(){
                        var curItem = $(this),
                            parent = curItem.parent(),
                            index = parent.index();
                        var activeContent = _tabContentItem.eq(index),
                            activeContentHeight = activeContent.innerHeight();
                        _tabContent.animate({
                            'height': activeContentHeight
                        }, 300);
                        setTimeout(function(){
                            _tabContent.css({
                                "height": ""
                            });
                        },400)
                    },
                    click: function(){
                        var curItem = $(this),
                            parent = curItem.parent(),
                            index = parent.index();
                        _tabBtn.removeClass("active");
                        _tabBtn.eq(index).addClass("active");
                        _showContent(index);
                        _controls.removeClass("active");
                    }
                });

                _body.on({
                    click: function(){
                        _controls.removeClass("active");
                    }
                });

            },
            _showContentWhenLoading = function(){
                var index = _tabBtn.filter('.active').index();
                if ( index == "-1" ){
                    index = 0;
                    _tabBtn.eq(index).addClass("active");
                }
                _showContent(index);
            },
            _showContent = function(i){
                var activeContent = _tabContentItem.eq(i);
                _tabContentItem.css({
                    "display": "none"
                });
                activeContent.css({
                    "display": "block"
                });
            },
            _init = function () {
                _addEvents();
            };

        _init();
    };

} )();