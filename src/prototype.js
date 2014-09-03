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