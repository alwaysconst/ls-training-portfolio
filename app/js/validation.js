
(function() {
  
	var app = {

		initialize : function () {	
			this.setUpListeners();
		},

		setUpListeners: function () {
			$('form').on('submit', app.submitForm);
			$('form').on('keydown', '.has-error', app.removeError);

		},

		submitForm: function (e) {
			e.preventDefault();

			var form = $(this),
				submitBtn = form.find('button[type="submit"]'); 

			// если валидация не проходит - то дальше не идём
			if ( app.validateForm(form) === false )	return false; 

			var str = form.serialize();   

			// против повторного нажатия
	        // submitBtn.attr({disabled: 'disabled'});
		},

		validateForm: function (form){

			var inputs = form.find('input , textarea'),
				valid = false;
			

			$.each(inputs, function(index, val) {
				var input = $(val),
					val = input.val(),
					formInput = $('.form-input'),
					textError = input.attr('data-error-message');

				if(val.length === 0){
					input.addClass('has-error').removeClass('has-success');	
					input.tooltip({
						trigger: 'hide',
						placement: input.attr('tooltip-position'),
						title: textError
					}).tooltip('show');		
					valid = false;		
				}else{
					input.removeClass('has-error').addClass('has-success');
					input.tooltip('destroy');
					valid = true;	
				}	
			});

			return valid;
			
		},

		removeError: function() {
			$(this).removeClass('has-error').find('input, span').tooltip('destroy'),
			$('.tooltip').remove();
		}
	}

	app.initialize();

}());