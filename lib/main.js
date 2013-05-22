define(['data'], function (data) {

    'use strict';

    return {

        /**
         * get service object by id
         * @param  {string} id
         * @return {object} service
         */
        getService: function (id) {
            var obj =  _.filter(data, function (service) {
                    return service.id === id;
                });
            return _.first(obj);
        },

        /**
         * get services
         * @return {array} services
         */
        getServices: function  () {
            return data;
        }

    }

});