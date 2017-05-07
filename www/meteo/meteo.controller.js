(function () {
    'use strict';

    angular
        .module('starter.meteo', ['starter.weather'])
        .controller('MeteoCtrl', MeteoCtrl);

    MeteoCtrl.inject = ['Storage', 'Weather'];

    function MeteoCtrl(Storage, Weather) {
        var vm = this;
        vm.towns = null;
        vm.selectedTown = null;
        vm.getWeather = getWeather;

        activate();

        ////////////////

        function activate() {
            vm.towns = Storage.get();
        }

        function getWeather(town) {
            vm.selectedTown = null;

            Weather.getForecastWeather(town).then(function (data) {
                if (data.status === 200) {

                    vm.selectedTown = {};
                    vm.selectedTown.today = {};
                    vm.selectedTown.days = [];

                    var jours = [
                        'Dimanche',
                        'Lundi',
                        'Mardi',
                        'Mercredi',
                        'Jeudi',
                        'Vendredi',
                        'Samedi'
                    ];

                    var mois = [
                        'Janvier',
                        'Février',
                        'Mars',
                        'Avril',
                        'Mai',
                        'Juin',
                        'Juillet',
                        'Aout',
                        'Septembre',
                        'Octobre',
                        'Novembre',
                        'Décembre'
                    ];

                    var dtToday = new Date(parseInt(data.list[0].dt) * 1000);

                    // J
                    vm.selectedTown.today.day = jours[dtToday.getDay()] + ' (' + dtToday.getHours() + 'H)';
                    vm.selectedTown.today.date = dtToday.getDate() + ' ' + mois[dtToday.getMonth()];
                    vm.selectedTown.today.town = data.name;
                    vm.selectedTown.today.temp = Math.ceil(data.list[0].main.temp);
                    vm.selectedTown.today.humidity = data.list[0].main.humidity;
                    vm.selectedTown.today.wind = data.list[0].wind.speed;
                    vm.selectedTown.today.cloud = data.list[0].clouds.all;
                    vm.selectedTown.today.icon = data.list[0].weather[0].icon;

                    // J+1
                    // list[8]
                    var day = {};
                    var dt = new Date(parseInt(data.list[8].dt) * 1000);
                    day.day = jours[dt.getDay()];
                    day.icon = data.list[8].weather[0].icon;
                    day.temp = Math.ceil(data.list[8].main.temp);
                    day.humidity = data.list[8].main.humidity;
                    day.wind = data.list[8].wind.speed;
                    day.cloud = data.list[8].clouds.all;
                    vm.selectedTown.days.push(day);

                    // J+2
                    // list[16]
                    day = {};
                    dt = new Date(parseInt(data.list[16].dt) * 1000);
                    day.day = jours[dt.getDay()];
                    day.icon = data.list[16].weather[0].icon;
                    day.temp = Math.ceil(data.list[16].main.temp);
                    day.humidity = data.list[16].main.humidity;
                    day.wind = data.list[16].wind.speed;
                    day.cloud = data.list[16].clouds.all;
                    vm.selectedTown.days.push(day);

                    // J+3
                    // list[24]
                    day = {};
                    dt = new Date(parseInt(data.list[24].dt) * 1000);
                    day.day = jours[dt.getDay()];
                    day.icon = data.list[24].weather[0].icon;
                    day.temp = Math.ceil(data.list[24].main.temp);
                    day.humidity = data.list[24].main.humidity;
                    day.wind = data.list[24].wind.speed;
                    day.cloud = data.list[24].clouds.all;
                    vm.selectedTown.days.push(day);

                    // J+4
                    // list[32]
                    day = {};
                    dt = new Date(parseInt(data.list[32].dt) * 1000);
                    day.day = jours[dt.getDay()];
                    day.icon = data.list[32].weather[0].icon;
                    day.temp = Math.ceil(data.list[32].main.temp);
                    day.humidity = data.list[32].main.humidity;
                    day.wind = data.list[32].wind.speed;
                    day.cloud = data.list[32].clouds.all;
                    vm.selectedTown.days.push(day);

                } else {
                    console.log('ko', data);
                }
            }).catch(function (data) {
                console.log('error: ', data);
            });
        }
    }
})();