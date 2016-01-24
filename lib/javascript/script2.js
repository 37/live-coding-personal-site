
/* */

function loadFont() {
    var link = document.createElement("link");
    link.href =
    'https://fonts.googleapis.com/css?family=Open+Sans';
    script.type = 'text/css';
    document.getElementsByTagName("head")[0].appendChild(link);
}

loadFont();

/**
 * That's a start,
 * time to include a great little library called Masonry.js by
 * David DeSandro (http://desandro.com/faq.html).
 */


function loadMasonry() {
    var script = document.createElement("SCRIPT");
    script.src =
    'https://cdnjs.cloudflare.com/ajax/libs/masonry/3.3.2/masonry.pkgd.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName("head")[0].appendChild(script);
}

loadMasonry();

$('.grid').masonry({ itemSelector: '.grid-item', columnWidth: '33%'});
