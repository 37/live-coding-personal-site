
/**
 * Custom fonts and icons will make a nice touch
 **/

function loadFont() {
    var link = document.createElement("link");
    link.href =
    'https://fonts.googleapis.com/css?family=Open+Sans';
    link.type = 'text/css';
    document.getElementsByTagName("head")[0].appendChild(link);
}

alert('fonts');

function loadIcons() {
    var link = document.createElement("link");
    link.href = "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css";
    link.rel = 'stylesheet';
    document.getElementsByTagName("head")[0].appendChild(link);
}

alert('icons');
loadFont();
loadIcons();

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

alert('rip');

$('.grid').masonry({ columnWidth: 360, itemSelector: '.grid-item'});

/**
 * Great!
 **/
