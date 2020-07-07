// Initialise FlexSlider for Carousels
$(window).load(function() {
    $('.flexslider').flexslider({
        animation: "fade",
        controlNav: false,
        directionNav: true,
        reverse: true,
        startAt: 0,
        pausePlay: true,               //Boolean: Create pause/play dynamic element
    });
});