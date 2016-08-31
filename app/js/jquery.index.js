( function(){

    "use strict";

    $( function(){

        $.each( $( '.promo' ), function() {
            new Sliders ( $( this ) );
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

} )();