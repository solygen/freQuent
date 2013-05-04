define(['data', 'date'], 
	function(data, date) {

	'use strict'

	var app = {
			calendar: {},
			level: 1000,
			levelmin: 2000,
			puffer: 500,
			current: {},

			setLevel: function(value) {
				app.level = value;
				app.levelmin = value < app.levelmin ? value : app.levelmin;
			},

			//get service object by id
			getService: function (id) {
				var obj =  _.filter(data, function (service) {
						return service.id === id;
					});
				return _.first(obj)
			},

			numberWithCommas: function (x) {
				return x.toLocaleString();
			    //return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			},

			getRow: function (level, amount, name, icon) {
				var $row = $('<div>').addClass('row-fluid'),
					$level = $('<div>').addClass('span2').text(app.numberWithCommas(Math.round(level)) || ''),
					$amount = $('<div>').addClass('span2').text(app.numberWithCommas(amount)),
					$name = $('<div>').addClass('span7').text(name),
					$icon = $('<div>').addClass('span1').append($('<i>').addClass(icon || '').addClass('iconx'));

				if (amount < 0) {
					$icon.css('background-color', '#FF3333'),
					$level.css('background-color', '#FF3333'),
					$amount.css('background-color', '#EE0000'),
					$name.css('background-color', '#FF3333')
				} else {
					$icon.css('background-color', '#CDE472'),
					$level.css('background-color', '#CDE472'),
					$amount.css('background-color', '#CECC15'),
					$name.css('background-color', '#CDE472')
				}
					
				return $row.append($icon,$level,$amount,$name)
			},

			insertMonth: function (key) {
				var month = date.getMonth(key),
					same = (app.current.month || '') === month;
				app.current.month = month;
				if (!same)
					return $('<h1>').text(month).css('padding-top', '48px');
				else
					return '';
			},


			//returns content
			renderContent: function () {
				var content = $('<div>'),
					calendar = app.calendar,
					keys = Object.keys(calendar).sort();

				_.each(keys, function (key) {
					if (date.getRetroKey() <= key) {
						//header
						content.append(app.insertMonth(key));
						content.append($('<h3>').text(
							date.getWeekday(key) + ', ' + date.getDate(key).getUTCDate() + '.'
							)
						);
						//content
						_.each(calendar[key], function (id) {
							var service = app.getService(id);
							if (date.getNowKey() <= key) {
								app.setLevel(app.level + service.amount);
								content.append($('<p>').append(app.getRow(app.level, service.amount, service.name, service.icon )));
							} else {
								content.append($('<p>').append(app.getRow(null, service.amount, service.name, service.icon)));
							}
						})
					}
				})
				return content;
			},

			//adding ids to the calendar days
			addToCalendar: function (service) {
				_.each(service.targets, function (day) {
					var key = date.getDateKey(day);
					var spending = app.calendar[key] = app.calendar[key] || [];
					spending.push(service.id);
				});

			},

			//render view
			render: function () {
				//add current
				$($.find('#current')).text('current: ' + Math.round(app.level));
				$($.find('#puffer')).text('puffer: ' + Math.round(app.puffer));

				//adding to calendar
				_.map(data, function (service) {
					return app.addToCalendar(service);
				})

				//add content
				var content = app.renderContent();
				$($.find('#content')).html(content);

				//min
				console.log(app.levelmin);

				$($.find('#min')).text('min: ' + Math.round(app.levelmin));


			}
		}


	return app;
	}
)
