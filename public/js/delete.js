/**
 * Created with JetBrains WebStorm.
 * User: jhudiel
 * Date: 7/2/13
 * Time: 7:41 PM
 * To change this template use File | Settings | File Templates.
 */


$(document).ready(function() {

     $('a#delete').click(function() {
        var self= this,
            id = $(self).prev("input").val();

        console.log('Delete clicked!');
        $.ajax({
            type: 'DELETE',
            url: '/v1/movies',
            data: {id: id},
            beforeSend: function() {

            },
            success: function(result) {
                location.reload(true);
            },
            error: function(error) {
                location.reload(true);
            }
        });
    });

});