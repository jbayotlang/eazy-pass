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

    function filterPath(string) {
        return string
            .replace(/^\//,'')
            .replace(/(index|default).[a-zA-Z]{3,4}$/,'')
            .replace(/\/$/,'');
    }
    var locationPath = filterPath(location.pathname);
    var scrollElem = scrollableElement('html', 'body');

    $('a[href*=#]').each(function() {
        var thisPath = filterPath(this.pathname) || locationPath;
        if (  locationPath == thisPath
            && (location.hostname == this.hostname || !this.hostname)
            && this.hash.replace(/#/,'') ) {
            var $target = $(this.hash), target = this.hash;
            if (target) {
                var targetOffset = $target.offset().top;
                $(this).click(function(event) {
                    event.preventDefault();
                    $(scrollElem).animate({scrollTop: targetOffset}, 400, function() {
                        location.hash = target;
                    });
                });
            }
        }
    });

    // use the first element that is "scrollable"
    function scrollableElement(els) {
        for (var i = 0, argLength = arguments.length; i <argLength; i++) {
            var el = arguments[i],
                $scrollElement = $(el);
            if ($scrollElement.scrollTop()> 0) {
                return el;
            } else {
                $scrollElement.scrollTop(1);
                var isScrollable = $scrollElement.scrollTop()> 0;
                $scrollElement.scrollTop(0);
                if (isScrollable) {
                    return el;
                }
            }
        }
        return [];
    }

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