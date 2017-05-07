(function() {
'use strict';

    angular
        .module('starter.meteo', [])
        .controller('MeteoCtrl', MeteoCtrl);

    //MeteoCtrl.inject = ['dependency1'];

    function MeteoCtrl() {
        var vm = this;
        
// http://api.openweathermap.org/data/2.5/weather?q=77640%20Jouarre,%20France&units=metric&lang=fr&APPID=93b1ec8fed0953adfa835d355e0ec7df
        activate();

        ////////////////

        function activate() { }
    }
})();