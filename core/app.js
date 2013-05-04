require([
		 'view'], function(view) {

	"use strict"

	// fake console
	if (typeof window.console === 'undefined') {
	    window.console = { log: $.noop, debug: $.noop, error: $.noop, warn: $.noop };
	}

	//config require
	require.config({
	    waitSeconds: 2
	});

	view.render();
});


