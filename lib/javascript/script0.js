/*MMMMMM""M                           oo          dP
MMMMMMMM  M                                       88
MMMMMMMM  M,  ,d8888b,,d8888b,88d888b,dP88d888b,d8888P
MMMMMMMM  M8  Y8ooooo,88'  `""88'  `888888'  `88  88
M, `MMM' ,M8        8888,  ,,,88      8888,  ,88  88
MM,     ,MM @`88888P'`88888P'dP      dP88Y888P'  dP
MMMMMMMMMMM                             88
MMMMMMMMMMM                             */


/**
 * Javascript will help with some of the more complex
 * logic and event handling.
 *
 * for example - here's a free pop-up (you're welcome).
 */

alert('I\'m still with you, let\'s go!');


/**
 * Good to see you're getting involved.
 * While we could definitely build this entire site with
 * plain vanilla Javascript, for the sake of me wanting
 * to keep my hair let's at least make use of jQuery.
 */

function loadJquery() {
    var script = document.createElement("SCRIPT");
    script.src = 'https://code.jquery.com/jquery-1.12.0.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName("head")[0].appendChild(script);
}

/**
 * Now to load it
 **/

loadJquery();

/**
 * Sorted!
 * Now writing out JS should be much simpler -
 * For the purpose of smoothly walking you through this site, lets load
 * jQuery.scrollTo by 'flesler'
 **/

 $('<script />', {
     src : '//cdn.jsdelivr.net/jquery.scrollto/2.1.2/jquery.scrollTo.min.js',
     type : 'text/javascript'
 }).prependTo('head');

/**
 * Now for some actual content:
 * Typing out 5,000 characters of HTML may take a while
 * so here's some I baked earlier!
 * Look left in 3.. 2.. 1..
 */
