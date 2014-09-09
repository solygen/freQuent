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
            getRow: function (balance, amount, name, icon, key) {
                var $row = $('<div style="padding: 2px">').addClass('row-fluid ' + key).hide(),
                    $balance = $('<div>').addClass('span2').text(app.numberFormat(Math.round(balance)) || ''),
                    $amount = $('<div>').addClass('span2').text(app.numberFormat(amount)),
                    $name = $('<div>').addClass('span7').text(name),
                    $icon = $('<div>').addClass('span1').append($('<i>').addClass(icon || '').addClass('iconx'));

                if (amount < 0) {
                    $icon.css('background-color', 'rgba(153, 153, 153, 0.08)');
                    $balance.css('background-color', 'rgba(153, 153, 153, 0.08)');
                    $amount.css('background-color', '#EE0000');
                    $name.css('background-color', 'rgba(153, 153, 153, 0.08)');
                } else {
                    $icon.css('background-color', 'rgba(153, 153, 153, 0.08)');
                    $balance.css('background-color', 'rgba(153, 153, 153, 0.08)');
                    $amount.css('background-color', '#CDE472');
                    $name.css('background-color', 'rgba(153, 153, 153, 0.08)');
                }

                //past
                if (!balance) {
                    $icon.css('background-color', 'rgba(153, 153, 153, 0.08)');
                    $balance.css('background-color', 'rgba(153, 153, 153, 0.08)');
                    $amount.css('background-color', 'rgba(153, 153, 153, 0.08)');
                    $name.css('background-color', 'rgba(153, 153, 153, 0.08)');
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
                    return $('<h1>').text(month).css('padding-top', '28px');
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
                        var before = app.balance.amount;

                        //header
                        content.append(app.insertMonth(key));
                        content.append(
                            $('<h3>').attr('id', key)
                            .text(date.getWeekday(key) + ', ' + date.getDate(key).getUTCDate() + '.')
                            .on('click', function () {
                                var expanded = $('.' + key).is(':visible');

                                $('.' + key).toggle();
                                $('.heading-' + key).toggle();
                                $('.icon-' + key)
                                    .addClass(expanded ? 'icon-chevron-right': 'icon-chevron-down')
                                    .removeClass(expanded ? 'icon-chevron-down': 'icon-chevron-right');
                            })
                        );

                        //sort
                        calendar[key] = _.sortBy(calendar[key], function (id) {
                            var service = main.getService(id);
                            return Math.abs(service.amount) * (-1);
                        });

                        //content
                        _.each(calendar[key], function (id) {
                            var service = main.getService(id),
                                is = app.balance.day <= key;
                            if (is)
                                app.setBalance(app.balance.amount + service.amount);

                            content.append(
                                app.getRow(is ? app.balance.amount : null, service.amount, service.name, service.icon, key)
                            );
                        });

                        content.find('#' + key)
                            .prepend(
                                $('<span style="display: inline-block; width: 24px">').append(
                                    $('<i class="icon-chevron-right" style="padding-right: 10px; font-size: 16px; vertical-align: middle">')
                                    .addClass('icon-' + key)
                                )
                            )
                            .append(
                                $('<span style="float: right">')
                                    .addClass('heading-' + key)
                                    .append(
                                        app.numberFormat(app.balance.amount - before)
                                    )
                            );

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
                var years = [new Date().getFullYear()];

                var today = new Date();
                today.setDate(today.getDate() + 365);
                years.push(today.getFullYear());


                _.each(service.targets, function (dayofyear) {
                    _.each(years, function (year) {
                        var key = date.getDateKey(dayofyear, year),
                            spending = app.calendar[key] = app.calendar[key] || [];
                        spending.push(service.id);
                    })
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
                    .append(
                        // headline
                        'monthly: ',

                        // income
                        $('<div>')
                            .append(
                                $('<i>')
                                    .addClass('icon-arrow-down')
                                    .css({
                                        'padding-right': 20,
                                        color: 'green'
                                    }),
                                    monthly.income
                            ),

                        // costs
                        $('<div>')
                            .append(
                                $('<i>')
                                    .addClass('icon-arrow-up')
                                    .css({
                                        'padding-right': 20,
                                        color: 'red'
                                    }),
                                monthly.costs * (-1)
                            ),

                       // sum
                        $('<div>')
                            .append(
                                $('<i>')
                                    .addClass('icon-chevron-right')
                                    .css({
                                        'padding-right': 20
                                    }),
                                monthly.income + monthly.costs
                            )
                    );

                //reset
                //TODO: keep data and only recalculate if data or config changed (via hash)
                app.calendar = {};
                app.current = {};

            }
        }, config);

    return app;
});
