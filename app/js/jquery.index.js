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

    } );

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

} )();