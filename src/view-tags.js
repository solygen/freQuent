define(['data', 'date', 'config'], function (data, date, config) {

    'use strict';

    /**
     * @exports view
     */
    var app = $.extend({

            /**
             * returns content
             * @return {object} jquery node
             */
            renderContent: function () {
                return $('<div>');
            },

            /**
             * render view
             * @return {undefined}
             */
            render: function () {
                var monthly = {
                        costs: 0,
                        income: 0
                    };

                //add content
                $($.find('#title')).text('Tags');

                $($.find('#content'))
                    .html('');

                $($.find('#monthly'))
                    .empty();
            }
        }, config);

    return app;
});
