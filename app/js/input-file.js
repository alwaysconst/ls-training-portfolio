(function($){

/* Обновляем label текст */
$('.input-file__input').on('change', function() {
    var $input = $(this);
    $input.siblings('.input-file__text').text($input.val().replace(/([^\\]*\\)*/,''))

});

}(jQuery));