define([], function () {

    'use strict';

    /**
     * returns yyyy-mm-dd
     * @private
     * @param  {date} dat
     * @return {string}
     */
    var dateToKey = function (dat) {
        var dd = dat.getDate(),
            mm = dat.getMonth() + 1,
            yyyy = dat.getFullYear();
        //prefix
        dd = dd < 10 ? '0' + dd : dd;
        mm = mm < 10 ? '0' + mm : mm;
        return yyyy + '-' + mm + '-' + dd;
    };

    var date = {

            getDate: function (daykey) {
                return new Date(daykey);
            },

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

            getPayingDate: function (date) {
                date = $.type(date) === 'string' ? this.getDate(date) : date;
                if (this.getWeekday(date) === 'Saturday')
                    date.setDate(date.getDate() + 2);
                else if (this.getWeekday(date) === 'Sunday')
                    date.setDate(date.getDate() + 1);
                return date;
            },

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

            //returns yyyy-mm-dd from date
            getDateKey: function (day) {
                var dmy = day.split("."),
                    daykey  = new Date().getFullYear() + '-' + dmy[1] + '-' +  dmy[0],
                    pdate = this.getPayingDate(daykey);
                return dateToKey(pdate);
            },

            //return yyyy-mm-dd
            getRetroKey: function () {
                var today = new Date();
                today.setDate(today.getDate() - 21);
                return dateToKey(today);
            },

            //return yyyy-mm-dd
            getNowKey: function (day) {
                return dateToKey(new Date());
            }
        };

    return date;
});
