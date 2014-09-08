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

                var names = {
                        0: 'Sunday',
                        1: 'Monday',
                        2: 'Tuesday',
                        3: 'Wednesday',
                        4: 'Thursday',
                        5: 'Friday',
                        6: 'Saturday'
                    };
                return names[date.getDay()];
            },

            /**
             * @param  {date} date
             * @return {string} month
             */
            getMonth: function (date) {
                date = $.type(date) === 'string' ? this.getDate(date) : date;
                var names = {
                        0: 'January',
                        1: 'Feburary',
                        2: 'March',
                        3: 'April',
                        4: 'May',
                        5: 'June',
                        6: 'July',
                        7: 'August',
                        8: 'September',
                        9: 'October',
                        10: 'November',
                        11: 'December'
                    };
                return names[date.getUTCMonth()];
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
