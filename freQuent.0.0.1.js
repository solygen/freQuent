require(['view-calendar', 'view-tags'], function (calendar, tags) {

    'use strict';

    /**
     * @exports app
     */

    // fake console
    if (typeof window.console === 'undefined') {
        window.console = { log: $.noop, debug: $.noop, error: $.noop, warn: $.noop };
    }

    //config require
    require.config({
        waitSeconds: 2
    });


    // Handle back button issues with Twitter Bootstrap's tab component.
    // Based on: http://stackoverflow.com/a/10120221/81769
    // It has been changed to avoid the following side effects:
    // - Switching tabs was being added to navigation history which is undesirable
    //   (Worked around this by using location.replace instead of setting the hash property)
    // - Browser scroll position was lost due to fragment navigation
    //   (Worked around this by converting #id values to #!id values before navigating.)
    $(document).ready(function () {

        var navigate = function () {
            if (location.hash.substr(0, 1) === '#') {
                if (location.hash === '#calendar')
                    calendar.render();
                else
                    tags.render();
            } else {
                calendar.render();
            }
        };
        window.onhashchange = navigate;
        navigate();
    });

});



define(['prototype'], function (prototype) {

    'use strict';

    prototype.use();

    return {
        balance: {
            //day: '2013-04-01',
            day: (new Date()).toIso(),
            amount: 3357
        },
        puffer: 1000
    };
});
define([], function () {

    'use strict';

    /**
     * @exports data
     */
    return [
        {
            id: 'a',
            icon: '',
            name: 'Income',
            amount: 2000,
            category: 'income',
            tags: [
                'income'
            ],
            targets: [
                '01.01.', '01.02.', '01.03.', '01.04.', '01.05.', '01.06.', '01.07.', '01.08.', '01.09.', '01.10.', '01.11.', '01.12.'
            ]
        },
        {
            id: 1,
            icon: 'icon-fire',
            name: '1 2 3 energie',
            amount: -150,
            category: 'consume',
            tags: [
                'gas'
            ],
            targets: [
                '16.01.', '16.02.', '16.03.', '16.04.', '16.05.', '16.06.', '16.07.', '16.08.', '16.09.', '16.10.', '16.11.', '16.12.'
            ]
        },
        {
            id: 2,
            icon: 'icon-bolt',
            name: 'eprimo',
            amount: -50,
            category: 'consume',
            tags: [
                'electricity'
            ],
            targets: [
                '01.01.', '01.02.', '01.03.', '01.04.', '01.05.', '01.06.', '01.07.', '01.08.', '01.09.', '01.10.', '01.11.', '01.12.'
            ]
        },

        {
            id: 6,
            icon: 'icon-home',
            name: 'bank',
            amount: -200,
            category: 'credit',
            tags: [
                'house'
            ],
            targets: [
                '01.01.', '01.04.', '01.07.', '01.10.'
            ]
        },

        {
            id: 34,
            icon: 'icon-beer',
            name: 'Club',
            amount: -25,
            category: 'club',
            tags: [
                'house'
            ],
            targets: [
                '25.03.'
            ]
        }
    ];
});
define([], function () {

    'use strict';

    /**
     * @exports date
     */
    var date = {

            /**
             * @param  {date} date
             * @return {string} weekday
             */
            getWeekday: function (date) {
                date = $.type(date) === 'string' ? this.getDate(date) : date;
                switch (date.getDay()) {
                case 0:
                    return 'Sunday';
                case 1:
                    return 'Monday';
                case 2:
                    return 'Thursday';
                case 3:
                    return 'Wednesday';
                case 4:
                    return 'Thursday';
                case 5:
                    return 'Friday';
                case 6:
                    return 'Saturday';
                }
            },

            /**
             * @param  {date} date
             * @return {string} month
             */
            getMonth: function (date) {
                date = $.type(date) === 'string' ? this.getDate(date) : date;
                switch (date.getUTCMonth()) {
                case 0:
                    return 'January';
                case 1:
                    return 'Feburary';
                case 2:
                    return 'March';
                case 3:
                    return 'April';
                case 4:
                    return 'May';
                case 5:
                    return 'June';
                case 6:
                    return 'July';
                case 7:
                    return 'August';
                case 8:
                    return 'September';
                case 9:
                    return 'October';
                case 10:
                    return 'November';
                case 11:
                    return 'December';
                }
            },

            /**
             * @param  {string} daykey
             * @return {date}
             */
            getDate: function (daykey) {
                return new Date(daykey);
            },

            /**
             * get next valid date for paying (mo-fr)
             * @param  {date} date
             * @return {date}
             */
            getPayingDate: function (date) {
                date = $.type(date) === 'string' ? this.getDate(date) : date;
                if (this.getWeekday(date) === 'Saturday')
                    date.setDate(date.getDate() + 2);
                else if (this.getWeekday(date) === 'Sunday')
                    date.setDate(date.getDate() + 1);
                return date;
            },

            /**
             * @param  {date} dayofyear (30.12.)
             * @return {string}
             */
            getDateKey: function (dayofyear) {
                var dmy = dayofyear.split('.'),
                    daykey  = new Date().getFullYear() + '-' + dmy[1] + '-' +  dmy[0],
                    pdate = this.getPayingDate(daykey);
                return pdate.toIso();
            },

            /**
             * @param  {date} day
             * @return {string}
             */
            getRetroKey: function (iso) {
                var today = new Date(iso);
                today.setDate(today.getDate() - 21);
                return today.toIso();
            },

            /**
             * @return {string}
             */
            getNowKey: function () {
                return (new Date()).toIso();
            }
        };

    return date;
});
define([], function () {

    'use strict';

    /**
     * @exports prototype
     */
    return {
        use: function () {

            /**
             * returns yyyy-mm-dd with leading zeros (ISO 8601)
             * @return {string}
             */
            Date.prototype.toIso = Date.prototype.toIso || function () {
                var dd = this.getDate(),
                    mm = this.getMonth() + 1,
                    yyyy = this.getFullYear();
                //leading zero
                dd = dd < 10 ? '0' + dd : dd;
                mm = mm < 10 ? '0' + mm : mm;
                return yyyy + '-' + mm + '-' + dd;
            };
        }
    };
});
define(['data', 'date', 'config'], function (data, date, config) {

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
                app.balancemin = typeof app.balancemin === 'undefined' || value < app.balancemin  ? value : app.balancemin;
            },

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
                            var service = app.getService(id);
                            return Math.abs(service.amount) * (-1);
                        });

                        //content
                        _.each(calendar[key], function (id) {
                            var service = app.getService(id);
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
                _.map(data, function (service) {
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
define(['data', 'date', 'config'], function (data, date, config) {

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
                app.balancemin = typeof app.balancemin === 'undefined' || value < app.balancemin  ? value : app.balancemin;
            },

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
                            var service = app.getService(id);
                            return Math.abs(service.amount) * (-1);
                        });

                        //content
                        _.each(calendar[key], function (id) {
                            var service = app.getService(id);
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

                var monthly = {
                    costs: 0,
                    income: 0
                };

                //adding to calendar
                _.map(data, function (service) {
                    //sum up
                    if (service.amount < 0)
                        monthly.costs = monthly.costs + (service.amount * service.targets.length / 12);
                    else
                        monthly.income = monthly.income + (service.amount * service.targets.length / 12);

                    //sorted
                    return app.addToCalendar(service);
                });

                //add content
                $($.find('#title')).text('Tags');

                $($.find('#content'))
                .html('');

                $($.find('#monthly'))
                .empty();

                //reset
                //TODO: keep data and only recalculate if data or config changed (via hash)
                app.calendar = {};
                app.current = {};

            }
        }, config);

    return app;
});