
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
	        submitBtn.attr({disabled: 'disabled'});

            $.ajax({
                type: "POST",
                url: "contact_form/contact_process.php",
                data: str                
            }).done(function(msg) {
                if(msg == 'OK') {
                    result = '<div class="bg-success">Спасибо за ваш заказ! Мы свяжемся с вами в течение 15 минут.</div>';
                    form.html(result);
                } else {
                    form.html(msg);
                }		
            }).always(function(){
            	submitBtn.removeAttr("disabled");
            })
		},

		validateForm: function (form){

			var inputs = form.find('textarea, input'),
				valid = true;
			
			inputs.tooltip('destroy');

			$.each(inputs, function(index, val) {
				var input = $(val),
					val = input.val(),
					formInput = $('.form-input'),
					formItem = input.parents('.form-item'),
					label = formItem.find('label').text().toLowerCase(),
					textError = 'Добавьте ' + label;

				if(val.length === 0){
					formInput.addClass('has-error').removeClass('has-success');	
					input.tooltip({
						trigger: 'manual',
						placement: 'left',
						title: textError
					}).tooltip('show');		
					valid = false;		
				}else{
					formInput.addClass('has-success').removeClass('has-error');
					input.tooltip('hide');
				}	
			});

			return valid;
			
		},

		removeError: function() {
			$(this).removeClass('has-error').find('input').tooltip('destroy');
		}
		
	}

	app.initialize();

}());