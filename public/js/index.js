$(document).ready(function () {
	var date_input = $('input[name="dob"]');
	var container = $('.bootstrap-iso form').length > 0 ? $('.bootstrap-iso form').parent() : 'body';
	var options = {
		format: 'yyyy-mm-dd',
		container: container,
		todayHighlight: false,
		autoclose: true
	};
	date_input.datepicker(options);

	function getNPreviousDates(startDate, n) {
		var dates = [];

		for (var i = 1; i <= n; i++) {
			dates.push(moment(startDate).subtract(i, 'day').format('DD/MM/YYYY'));
		}

		return dates;
	}

	var calendarDiv = document.querySelector('#my-calendar');

	if (calendarDiv) {
		jsCalendar.prototype.colorfulSelect = function (dates, color) {
			// If no arguments
			if (typeof dates === 'undefined') {
				// Return
				return this;
			}

			// If dates not array
			if (!(dates instanceof Array)) {
				// Lets make it an array
				dates = [dates];
			}

			// Save colors
			this._colorful_saveDates(dates, color);
			// Select dates
			this._selectDates(dates);

			if (!this._colorful_patched) {
				this._colorful_patched = this.refresh;
				this.refresh = function (date) {
					// Call original refresh
					this._colorful_patched(date);
					// Refresh select Colors
					this._colorful_update();
					// Return
					return this;
				};
			}
			// Refresh
			this.refresh();

			// Return
			return this;
		};

		// Save dates colors
		jsCalendar.prototype._colorful_saveDates = function (dates, color) {
			// Copy array instance
			dates = dates.slice();

			// Parse dates
			for (var i = 0; i < dates.length; i++) {
				dates[i] = jsCalendar.tools.parseDate(dates[i]);
				dates[i].setHours(0, 0, 0, 0);
				dates[i] = dates[i].getTime();
			}

			if (typeof this._colorful_colors == 'undefined') {
				this._colorful_colors = {};
			}

			// Save each date color
			for (i = dates.length - 1; i >= 0; i--) {
				this._colorful_colors[dates[i]] = color;
			}
		};

		// Refresh colors
		jsCalendar.prototype._colorful_update = function () {
			// Get month info
			var month = this._getVisibleMonth(this._date);

			// Check days
			var timestamp;
			for (var i = month.days.length - 1; i >= 0; i--) {
				// If date is selected
				timestamp = month.days[i].getTime();
				if (this._selected.indexOf(timestamp) >= 0 && this._colorful_colors.hasOwnProperty(timestamp)) {
					this._elements.bodyCols[i].className = 'jsCalendar-selected' + ' ' + this._colorful_colors[timestamp];
				}
			}
		};

		var myCalendar = jsCalendar.new(calendarDiv);
		var today = moment();
		var currentDates = getNPreviousDates(moment(today), 3);
		var lastMonthDates = getNPreviousDates(moment(today).subtract(28, 'day'), 5);
		var predictionDate = moment(today).add(28, 'day').format('DD/MM/YYYY');
		var selectedDate = null;

		myCalendar.colorfulSelect(currentDates, 'jsCalendar-colorful-red');
		myCalendar.colorfulSelect(lastMonthDates.slice(0, 3), 'jsCalendar-colorful-red');
		myCalendar.colorfulSelect(lastMonthDates.slice(3, 5), 'jsCalendar-colorful-orange');
		myCalendar.colorfulSelect(predictionDate, 'jsCalendar-colorful-yellow');

		myCalendar.onDateClick(function (event, date) {
			selectedDate = date;

			$('#periodModal').modal(options);
		});

		$('.flow-btn').click(function () {
			if (this.value === 'low') {
				myCalendar.colorfulSelect(selectedDate, 'jsCalendar-colorful-orange');
			} else {
				myCalendar.colorfulSelect(selectedDate, 'jsCalendar-colorful-red');
			}

			$('#periodModal').modal('toggle');
		});
		console.log($('#period-due-date'));
		$('#period-due-date').text(moment(today).add(28, 'day').format('LL'));
	}
});
