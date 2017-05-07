(function () {
    'use strict';

    angular
        .module('starter.options', [])
        .controller('OptionsCtrl', OptionsCtrl);

    //OptionsCtrl.inject = ['$scope'];

    function OptionsCtrl() {
        var vm = this;
        vm.ville = {};
        vm.ville.nom ='Jouarre';
        vm.ville.location = null;
        vm.addTown = addTown;
        vm.searchTown = searchTown;
        vm.map = null;

        var geocoder = new google.maps.Geocoder();

        ////////////////

        function addTown(location) {
            console.log(location);
        }

        function searchTown(town) {
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
                    console.log('Geocode was not successful for the following reason: ' + status);
                }
            });
        }
    }
})();