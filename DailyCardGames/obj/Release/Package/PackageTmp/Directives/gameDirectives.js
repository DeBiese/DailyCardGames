﻿'use strict';

angular.module('Home')
    /*
.directive('toggleClass', function() {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            
            element.bind('click', function() {
                if (element.attr("class") == "btn btn-default input-block-level form-control") {
                    element.removeClass("btn btn-default input-block-level form-control");
                    element.addClass(attrs.toggleClass);
                } else {
                    element.removeClass("btn btn-primary input-block-level form-control");
                    element.addClass("btn btn-default input-block-level form-control");
                }
            });
        }
    };
});*/
    .constant('keyCodes', {
        esc: 27,
        //space: 32,
        enter: 13,
        //tab: 9,
        //backspace: 8,
        //shift: 16,
        //ctrl: 17,
        //alt: 18,
        //capslock: 20,
        //numlock: 144
    })

     .directive('bootstrapSwitch', [
        function() {
            return {
                restrict: 'A',
                require: '?ngModel',
                link: function(scope, element, attrs, ngModel) {
                    element.bootstrapSwitch();
 
                    element.on('switchChange.bootstrapSwitch', function(event, state) {
                        if (ngModel) {
                            scope.$apply(function() {
                                ngModel.$setViewValue(state);
                            });
                        }
                    });
 
                    scope.$watch(attrs.ngModel, function(newValue, oldValue) {
                        if (newValue) {
                            element.bootstrapSwitch('state', true, true);
                        } else {
                            element.bootstrapSwitch('state', false, true);
                        }
                    });
                }
            };
        }
     ])

        .directive('maxRowValue', [
        function () {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function (scope, element, attrs, ngModel) {
                    scope.$watch(function () {
                        return ngModel.$modelValue;
                    }, function (newValue) {

                        var totalRow = 0;
                        var goOn = true;
                        for (var i = 0 ; i < 4; i++) {
                            if (!isNaN(parseInt(scope.$root.game.scores[attrs.rowNumber][i]))) {
                                totalRow += parseInt(scope.$root.game.scores[attrs.rowNumber][i]);
                            }
                            else {
                                console.log('Nan value inserted');
                                goOn = false;
                                break;
                            }
                        }

                        if (goOn == true && totalRow < attrs.rowValue)
                        {
                            //element.css('border-bottom', '3px outset white');
                            element.css('border-left', '10px white');
                            element.css('border-right', '10px white');
                        }
                        else if (goOn == true && totalRow == attrs.rowValue)
                        {
                           // element.css('border-bottom', '3px outset green');
                            element.css('border-left', '10px outset green');
                            element.css('border-right', '10px outset green');
                        }
                        else
                        {
                            //element.css('border-bottom', '3px outset red');
                            element.css('border-left', '10px outset red');
                            element.css('border-right', '10px outset red');
                        }
                    });
                }
            }
        }
        ])

        .directive('valueColor', [
        function () {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function (scope, element, attrs) {

                    scope.$watch(attrs.ngModel, function (newValue)
                    {
                        console.log(newValue);
                        var test = parseInt(newValue);

                        if (test > 0) {
                            element.css('color', 'green');
                        }
                        else if (test < 0) {
                            element.css('color', 'red');
                        }
                        else if (test == 0) {
                            element.css('color', 'black');
                        }
                        else { console.log('Nan value: ',test);}
                    });
                }
            }
        }
        ])

    .directive('selectOnClick', ['$window', function ($window) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.on('click', function () {
                    if (!$window.getSelection().toString()) {
                        // Required for mobile Safari
                        this.setSelectionRange(0, this.value.length)
                    }
                });
            }
        };
    }])

   .directive('keyBind', ['keyCodes', function (keyCodes) {
        function map(obj) {
            var mapped = {};
            for (var key in obj) {
                var action = obj[key];
                if (keyCodes.hasOwnProperty(key)) {
                    mapped[keyCodes[key]] = action;
                }
            }
            return mapped;
        }

        return function (scope, element, attrs) {
            var bindings = map(scope.$eval(attrs.keyBind));
            element.bind("keypress", function (event) {
                if (bindings.hasOwnProperty(event.which)) {
                    scope.$apply(function ()
                    {
                        console.log(event);
                        scope.$eval(bindings[event.which]);
                    });
                }
            });
        };
    }]);