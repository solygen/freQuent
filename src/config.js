define(['prototype'], function (prototype) {

    'use strict';

    prototype.use();

    return {
        balance: {
            //day: '2013-04-01',
            day: (new Date()).toIso(),
            amount: 1856.43
        },
        puffer: 1000
    };
});
