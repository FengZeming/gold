//http://xahlee.info/js/js_shake_box.html
;(function ( w , d , udf ) {
    'use strict';

    var defaults = {};

    function shake ( option ) {

        var e = option.element ,
            time = option.time || 500 ,
            distance = option.distance || 5;

        var originalStyle = e.style.cssText;
        e.style.position = "relative";
        //开始时间
        var start = (new Date ()).getTime ();
        animate ();
        function animate () {
            var now = (new Date ()).getTime ();
            var elapsed = now - start;
            var fraction = elapsed / time;
            if ( fraction < 1 ) {
                var x = distance * Math.sin ( fraction * 15 * Math.PI );
                e.style.left = x + "px";
                setTimeout ( animate , Math.min ( 25 , time - elapsed ) );
            } else {
                e.style.cssText = originalStyle;
                option.afterBack && option.afterBack.call ( option.e );
            }
        }
    }

    var _before = function ( beforefn ) {
        var _self = this;
        return function () {
            if ( beforefn.apply ( this , arguments ) === false ) {
                return;
            }
            return _self.apply ( this , arguments );
        };
    };

    window.animate = {
        shake : function ( option ) {
            shake = _before.call ( shake , function () {
                return option.beforeBack.call ( option.element );
            } );
            shake ( option );
        }
    };

}) ( window , document );