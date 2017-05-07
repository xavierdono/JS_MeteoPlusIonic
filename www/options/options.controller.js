(function () {
    'use strict';

    angular
        .module('starter.options', ['starter.storage'])
        .controller('OptionsCtrl', OptionsCtrl);

    OptionsCtrl.inject = ['Storage'];

    function OptionsCtrl(Storage) {
        var vm = this;
        vm.ville = {};
        vm.ville.nom = '';
        vm.ville.location = null;
        vm.addTown = addTown;
        vm.searchTown = searchTown;
        vm.map = null;
        vm.error = false;
        vm.message = null;

        var geocoder = new google.maps.Geocoder();

        ////////////////

        function addTown(location) {
            Storage.add(location);
            vm.ville = {};
        }

        function searchTown(town) {
            if(window.cordova) {
                cordova.plugins.Keyboard.close();
            }
            
            vm.error = false;            
            geocodeAddress(geocoder, map);
        }

        function geocodeAddress(geocoder, resultsMap) {
            geocoder.geocode({ 'address': vm.ville.nom }, function (results, status) {
                if (status === 'OK') {
                    vm.ville.location = results[0].formatted_address;

                    vm.map = new google.maps.Map(document.getElementById('map'), {
                        center: results[0].geometry.location,
                        zoom: 12,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    });

                    var marker = new google.maps.Marker({
                        position: results[0].geometry.location,
                        title: results[0].formatted_address
                    });

                    marker.setMap(vm.map);
                } else {
                    vm.error = true;
                    vm.message = 'Impossible de trouver votre ville, erreur : ' + status;
                }
            });
        }
    }
})();