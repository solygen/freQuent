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


