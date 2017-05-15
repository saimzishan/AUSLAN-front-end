$(function(){
    /* Swipe handler for jobs */
    var jobs = $(".jobs:not(.simple) li > div > button");

    jobs.click(function(){
        $(this).parents("li").next("li.edit").toggleClass("visible");
    });

    /* Jobs scrollTo handler */
    var scrollToElement = function( link, el ){
        var delay = 500;
        $(window).scrollTo( "#"+el, delay, { 'offset' : -80 } );
        setTimeout(function(){
            link.addClass("active").siblings().removeClass("active");
        },delay + 100);
    };

    $("#upcoming").click(function(){ scrollToElement( $(this), 'upcoming-jobs' ); });
    $("#invites").click(function(){ scrollToElement( $(this), 'invites-jobs' ); });
    $("#past").click(function(){ scrollToElement( $(this), 'past-jobs' ); });

    $(document).scroll(function(){
        var scrolled = $(document).scrollTop();
        $(".scroller").each(function(){
            var from = $(this).offset().top,
                to = from + $(this).height();

            if ( scrolled >= from && scrolled <= to  )
                $("#"+$(this).attr("id").replace("-jobs","")).addClass("active").siblings().removeClass("active");
        });
    });
});