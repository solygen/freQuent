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