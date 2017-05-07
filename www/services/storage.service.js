(function () {
    'use strict';

    angular
        .module('starter.storage', [])
        .factory('Storage', Storage);

    function Storage() {

        var datas;
        var DATA_STORAGE_KEY = 'datas';

        var service = {
            add: addToStorage,
            get: getDataFromStorage,
            del: removeDataFromStorage
        };

        return service;

        ////////////////

        function getDataFromStorage() {
            var data = window.localStorage.getItem(DATA_STORAGE_KEY);

            if (data) {
                datas = JSON.parse(data);
            } else {
                datas = [];
            }
            
            return datas;
        }

        function addToStorage(data) {
            datas.push(data);
            window.localStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(datas));
        }
        
        function removeDataFromStorage(index) {
            datas.splice(index, 1);
            window.localStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(datas));
        }        
    }
})();