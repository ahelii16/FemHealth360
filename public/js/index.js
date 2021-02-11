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
});
