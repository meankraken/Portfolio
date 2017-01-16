$(document).ready(function () {
    if ($(window).height() > 750) {
        $('#intro,#about,#projects,#contact').css('height', $(window).height());
    }

    var timer;

    //main menu animations
    $('.linkBox').hover(function () {
        $(this).find('.bar').css('width', '100%');
        $(this).find('.linkHolder').css('left', '43%');
        timer = setTimeout(function () {
            $(this).find('.bar:nth-child(1)').css('margin-bottom', '10px');
            $(this).find('.bar:nth-child(3)').css('margin-top', '10px');
            $(this).find('a').css('border-top', '1px solid grey').css('border-bottom', '1px solid grey');
        }.bind(this), 500);
    }, function () {
        clearTimeout(timer);
        $(this).find('.bar').css('width', '').css('margin-top', '').css('margin-bottom', '');
        $(this).find('.linkHolder').css('left', '');
        $(this).find('a').css('border-top', '').css('border-bottom', '');
    });

    //links 

    $('#aboutBox').on('click', function () {
        $('html, body').animate({
            scrollTop: $('#about').offset().top
        }, 500);
    });
    $('#projectsBox').on('click', function () {
        $('html,body').animate({
            scrollTop: $('#projects').offset().top
        }, 500);
    });
    $('#contactBox').on('click', function () {
        $('html,body').animate({
            scrollTop: $('#contact').offset().top
        }, 500);
    });

    $('#emailBadge').on('click', function () {
        window.location.href = 'mailto:contactfengjeff@gmail.com';
    });
    $('#gitBadge').on('click', function () {
        window.open('https://github.com/meankraken', '_blank');
    });
    $('#codepenBadge').on('click', function () {
        window.open('http://codepen.io/meankraken/#', '_blank');
    });

});