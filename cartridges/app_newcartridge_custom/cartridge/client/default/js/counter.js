$("#comments").keyup(function () {
    $("#comments-counter").text("Characters Left: " + (150 - $(this).val().length));
});
