define([], function () {

    'use strict';

    /**
     * returns yyyy-mm-dd with leading zeros (ISO 8601)
     * @return {string}
     */
    Date.prototype.toIso = function () {
        var dd = this.getDate(),
            mm = this.getMonth() + 1,
            yyyy = this.getFullYear();
        //leading zero
        dd = dd < 10 ? '0' + dd : dd;
        mm = mm < 10 ? '0' + mm : mm;
        return yyyy + '-' + mm + '-' + dd;
    };

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
            getRetroKey: function () {
                var today = new Date();
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