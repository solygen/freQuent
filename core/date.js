define([],function() {

	'use strict'

	return {

			getDate: function (daykey) {
				return new Date(daykey);
			},

			getWeekday: function (date) {
				date = $.type(date) === 'string' ? this.getDate(date) : date ;
				switch(date.getDay()) {
					case 0:
						return 'Sunday'
				  	break;
				 	case 1:
				  		return 'Monday'
				 	break;
					case 2:
						return 'Thursday'
				  	break;
				 	case 3:
				  		return 'Wednesday'
				 	break;				 
					case 4:
						return 'Thursday'
				  	break;
				 	case 5:
				  		return 'Friday'
				 	break;
					case 6:
						return 'Saturday'
				  	break;
				}
			},

			getPayingDate: function (date) {
				date = $.type(date) === 'string' ? this.getDate(date) : date ;
				if (this.getWeekday(date) === 'Saturday') 
					date.setDate(date.getDate() + 2);
				else if (this.getWeekday(date) === 'Sunday')
				 date.setDate(date.getDate() + 1);
				
				return date
			},

			getMonth: function (date) {
				date = $.type(date) === 'string' ? this.getDate(date) : date ;
				switch(date.getUTCMonth()) {
					case 0:
						return 'January'
				  	break;
				 	case 1:
				  		return 'Feburary'
				 	break;
					case 2:
						return 'March'
				  	break;
				 	case 3:
				  		return 'April'
				 	break;				 
					case 4:
						return 'May'
				  	break;
				 	case 5:
				  		return 'June'
				 	break;
					case 6:
						return 'July'
				  	break;
				 	case 7:
				  		return 'August'
				 	break;		
					case 8:
						return 'September'
				  	break;
				 	case 9:
				  		return 'October'
				 	break;
					case 10:
						return 'November'
				  	break;
				 	case 11:
				  		return 'December'
				 	break;
				}
			},

			getIso: function (day) {
				var	dd = day.getDate(),
					mm = day.getMonth()+1,
					yyyy = day.getFullYear();
				//prefix
				dd = dd<10 ? '0'+dd : dd;
				mm = mm<10 ? '0'+mm : mm;
				return yyyy+'-'+mm+'-'+dd;
			},

			//returns yyyy-mm-dd from date
			getDateKey: function (day) {
				var dmy = day.split("."),
					daykey  = new Date().getFullYear() + '-' + dmy[1] + '-' +  dmy[0],
					pdate = this.getPayingDate(daykey),
					iso = this.getIso(pdate);

				return iso;
			},

			//return yyyy-mm-dd
			getRetroKey: function () {
				var today = new Date();

				today.setDate(today.getDate() - 21);
				var	dd = today.getDate(),
					mm = today.getMonth()+1,
					yyyy = today.getFullYear();
				//prefix
				dd = dd<10 ? '0'+dd : dd;
				mm = mm<10 ? '0'+mm : mm;
				return yyyy+'-'+mm+'-'+dd;
			},

			//return yyyy-mm-dd
			getNowKey: function (day) {
				var today = new Date(),
					dd = today.getDate(),
					mm = today.getMonth()+1,
					yyyy = today.getFullYear();
				//prefix
				dd = dd<10 ? '0'+dd : dd;
				mm = mm<10 ? '0'+mm : mm;
				return yyyy+'-'+mm+'-'+dd;
			}
		}
	}
)
