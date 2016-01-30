


/**
 * Custom fonts and icons will make a nice touch
 **/

$('<link />', {
    type : 'text/css',
    href : 'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css',
    rel : 'stylesheet'
}).appendTo('head');

/**/

$('<script />', {
    src : 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js',
    type : 'text/javascript',
    async : 'true'
}).prependTo('head');

/* scroll */
$(window).scrollTo('#work', 700);
