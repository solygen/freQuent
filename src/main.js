define(['data'], function (data) {

    'use strict';

    return {

        /**
         * get service object by id
         * @param  {string} id
         * @return {object} service
         */
        getService: function (id) {
            return _.find(data, function (service) {
                    return service.id === id;
                });
        },

        /**
         * get services
         * @return {array} services
         */
        getServices: function  () {
            return data;
        }

    };

});
