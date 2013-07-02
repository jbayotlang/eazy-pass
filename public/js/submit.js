/**
 * Created with JetBrains WebStorm.
 * User: jhudiel
 * Date: 7/2/13
 * Time: 3:34 PM
 * To change this template use File | Settings | File Templates.
 */


$(document).ready(function() {
    $('.progress').hide();
    $('#notif').hide();

    $('form').submit(function(e) {
        e.preventDefault();

        var movie = { },
            name =  $("input[name='name']").val(),
            date =  $("input[name='date']").val(),
            poster =  $("input[name='poster']").val(),
            trailer =  $("input[name='trailer']").val(),
            director =  $("input[name='director']").val(),
            cast =  $("input[name='cast']").val(),
            genre =  $("input[name='genre']").val(),
            synopsis =  $("#ep-synopsis").val(),
            gallery = $("input[name='gallery[]']")
                .map(function(){return $(this).val();}).get(),
            bar = $('.progress.bar');




        movie['name'] = name;
        movie['date'] = date;
        movie['poster'] = poster;
        movie['trailer'] = trailer;
        movie['director'] = director;
        movie['cast'] = cast;
        movie['genre'] = genre;
        movie['synopsis'] = synopsis;
        movie['gallery'] = gallery;

        console.log(movie);

        $.ajax({
           type: 'POST',
            url: '/v1/movies',
           data: movie,
            beforeSend: function() {
                $('.progress').show();

                for (var c = 0; c < 100; c++) {

                bar.attr('style', 'width: ' + c + '%');

                }
            },
            success: function(result) {
                $('#notif').show();
                $('.progress').hide();
            },
            error: function(error) {

            }
        });
    })

})