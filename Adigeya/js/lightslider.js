$(document).ready(function() {
    $("#lightSlider").lightSlider({
        item:1,
       thumbItem:10,
        gallery: true,
        thumbMargin: 5,
        onSliderLoad: function(el) {
            el.lightGallery();
        }  
    }); 
onBeforeStart: function (el) {},
onSliderLoad: function (el) {},
onBeforeSlide: function (el) {},
onAfterSlide: function (el) {},
onBeforeNextSlide: function (el) {},
onBeforePrevSlide: function (el) {}
});