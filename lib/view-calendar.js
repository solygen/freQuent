define(['main', 'date', 'config', 'calculation'], function (main, date, config, calculation) {

    'use strict';

    /**
     * @exports view
     */
    var app = $.extend({
            calendar: {},
            current: {},

            /**
             * sets current account balance and min account balance
             * @param {number} value
             */
            setBalance: function (value) {
                app.level = value;
                app.balance.amount = value;
                app.balancemin = typeof app.balancemin === 'undefined' || value < app.balancemin  ? value : app.balancemin;
            },

            /**
             * ensure format xxx.xxx,xx
             * @param  {number} x
             * @return {string}
             */
            numberFormat: function (x) {
                return x.toFixed(2)
                        .replace('.', ',')
                        .toLocaleString();
            },

            /**
             * returns row
             * @param  {number} balance
             * @param  {number} amount
             * @param  {string} name
             * @param  {string} icon
             * @return {object} jquery node (row)
             */
            getRow: function (balance, amount, name, icon) {
                var $row = $('<div>').addClass('row-fluid'),
                    $balance = $('<div>').addClass('span2').text(app.numberFormat(Math.round(balance)) || ''),
                    $amount = $('<div>').addClass('span2').text(app.numberFormat(amount)),
                    $name = $('<div>').addClass('span7').text(name),
                    $icon = $('<div>').addClass('span1').append($('<i>').addClass(icon || '').addClass('iconx'));

                if (amount < 0) {
                    $icon.css('background-color', '#FF3333');
                    $balance.css('background-color', '#FF3333');
                    $amount.css('background-color', '#EE0000');
                    $name.css('background-color', '#FF3333');
                } else {
                    $icon.css('background-color', '#CDE472');
                    $balance.css('background-color', '#CDE472');
                    $amount.css('background-color', '#CECC15');
                    $name.css('background-color', '#CDE472');
                }

                //past
                if (!balance) {
                    $icon.css('background-color', 'Snow');
                    $balance.css('background-color', 'Snow');
                    $amount.css('background-color', 'Snow');
                    $name.css('background-color', 'Snow');
                }

                return $row.append($icon, $balance, $amount, $name);
            },

            /**
             * returns month header if needed
             * @param  {string} key
             * @return {object|string} jquery or empty string
             */
            insertMonth: function (key) {
                var month = date.getMonth(key),
                    same = (app.current.month || '') === month;
                app.current.month = month;
                if (!same)
                    return $('<h1>').text(month).css('padding-top', '48px');
                else
                    return '';
            },


            /**
             * returns content
             * @return {object} jquery node
             */
            renderContent: function () {
                var content = $('<div>'),
                    calendar = app.calendar,
                    keys = Object.keys(calendar).sort();

                _.each(keys, function (key) {
                    //retrospective
                    if (date.getRetroKey(app.balance.day) <= key) {

                        //header
                        content.append(app.insertMonth(key));
                        content.append($('<h3>').text(
                            date.getWeekday(key) + ', ' + date.getDate(key).getUTCDate() + '.'
                            )
                        );

                        //sort
                        calendar[key] = _.sortBy(calendar[key], function (id) {
                            var service = main.getService(id);
                            return Math.abs(service.amount) * (-1);
                        });

                        //content
                        _.each(calendar[key], function (id) {
                            var service = main.getService(id);
                            if (app.balance.day <= key) {
                                app.setBalance(app.balance.amount + service.amount);
                                content.append($('<p>').append(app.getRow(app.balance.amount, service.amount, service.name, service.icon)));
                            } else {
                                content.append($('<p>').append(app.getRow(null, service.amount, service.name, service.icon)));
                            }
                        });
                    }
                });
                return content;
            },

            /**
             * adding ids to the calendar days
             * @param {object} service
             * @return {undefined}
             *
             */
            addToCalendar: function (service) {
                _.each(service.targets, function (dayofyear) {
                    var key = date.getDateKey(dayofyear),
                        spending = app.calendar[key] = app.calendar[key] || [];
                    spending.push(service.id);
                });

            },

            /**
             * render view
             * @return {undefined}
             */
            render: function () {
                //add current
                $($.find('#current')).text('current: ' + Math.round(app.balance.amount));
                $($.find('#puffer')).text('puffer: ' + Math.round(app.puffer));

                var monthly = {
                    costs: 0,
                    income: 0
                };

                //adding to calendar
                _.map(main.getServices(), function (service) {
                    //sum up
                    if (service.amount < 0)
                        monthly.costs = monthly.costs + (service.amount * service.targets.length / 12);
                    else
                        monthly.income = monthly.income + (service.amount * service.targets.length / 12);

                    //sorted
                    return app.addToCalendar(service);
                });

                $($.find('#title')).text('Calendar');

                //add content
                var content = app.renderContent();
                $($.find('#content'))
                .html(content);

                $($.find('#min')).text('min: ' + Math.round(app.balancemin || app.balance.amount));

                monthly.costs = Math.round(monthly.costs);
                monthly.income = Math.round(monthly.income);
                $($.find('#monthly'))
                .empty()
                .append('monthly: ')
                .append('<br>')
                .append($('<i>').addClass('icon-arrow-down').css('padding-right', 20))
                .append((monthly.costs * (-1)))
                .append('<br>')
                .append($('<i>').addClass('icon-arrow-up').css('padding-right', 20))
                .append(monthly.income)
                .append('<br>')
                .append($('<i>').addClass('icon-chevron-right').css('padding-right', 20))
                .append((monthly.income + monthly.costs));

                //reset
                //TODO: keep data and only recalculate if data or config changed (via hash)
                app.calendar = {};
                app.current = {};

            }
        }, config);

    return app;
});
