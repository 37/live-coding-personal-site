require('classlist-polyfill');
let Promise = require('bluebird');
let md = require('markdown').markdown.toHTML;
let resumeText = require('raw!./lib/content/resume.txt');
let workText = require('raw!./lib/content/work.txt');
let pgpText = require('raw!./lib/content/pgp.txt');
let headerHTML = require('raw!./lib/content/header.html');
let styleText = [0, 1, 2, 3, 4, 5].map(function(i) { return require('raw!./lib/stylesheets/stage' + i + '.css'); });
let scriptText = [0, 1, 2].map(function(i) { return require('raw!./lib/javascript/script' + i + '.js'); });
let preStyles = require('raw!./lib/stylesheets/prestyles.css');
let replaceURLs = require('./lib/javascript/replaceURLs');
let writeChar = require('./lib/javascript/writeChar');

// Vars that will help us get er done
let isDev = window.location.hostname === 'localhost';
let speed = isDev ? 0 : 16;
let style, script, func, styleEl, scriptEl, interviewEl, workEl, pgpEl, skipAnimationEl, pauseEl;
let animationSkipped = false, done = false, paused = false;
let browserPrefix;

// Wait for load to get started.
document.addEventListener("DOMContentLoaded", function() {
    getBrowserPrefix();
    populateHeader();
    getEls();
    createEventHandlers();
    startAnimation();
});

async function startAnimation() {
    try {
        await writeTo(styleEl, styleText[0], 0, speed, 'style', 1);
        await writeTo(styleEl, styleText[1], 0, speed, 'style', 1);
        await writeTo(scriptEl, scriptText[0], 0, speed, 'script', 1);
        createInterviewBox();
        await writeTo(scriptEl, scriptText[1], 0, speed, 'script', 1);
        await Promise.delay(1000);
        await writeTo(styleEl, styleText[2], 0, speed, 'style', 1);
        await writeTo(scriptEl, scriptText[2], 0, speed, 'script', 1);
        await writeTo(styleEl, styleText[3], 0, speed, 'style', 1);
        await writeTo(styleEl, styleText[4], 0, speed, 'style', 1);
        // await writeTo(pgpEl, pgpText, 0, speed, false, 32);
    }
    // Flow control straight from the ghettos of Milwaukee
    catch(e) {
        if (e.message === "SKIP IT") {
            surprisinglyShortAttentionSpan();
        } else {
            throw e;
        }
    }
}

function fireScript() {
    let execute = document.getElementById('script-tag').textContent;
    console.log('Executing script.');
    eval(execute);
    document.getElementById('script-tag').innerHTML = '';
}

// Skips all the animations.
async function surprisinglyShortAttentionSpan() {
    if (done) return;
    done = true;
    pgpEl.innerHTML = pgpText;
    let txt = styleText.join('\n');

    // The work-text animations are rough
    style.textContent = "#work-text * { " + browserPrefix + "transition: none; }";
    style.textContent += txt;
    let styleHTML = "";
    for(let i = 0; i < txt.length; i++) {
         styleHTML = writeChar.handleChar(styleHTML, txt[i]);
    }
    styleEl.innerHTML = styleHTML;
    createInterviewBox();
    createJsBox();

    // There's a bit of a scroll problem with this thing
    let start = Date.now();
    while(Date.now() - 1000 > start) {
        workEl.scrollTop = Infinity;
        interviewEl.scrollTop = Infinity;
        styleEl.scrollTop = pgpEl.scrollTop = Infinity;
        await Promise.delay(16);
    }
}


/**
 * Helpersfunction-source
 */

let endOfSentence = /[\.\?\!]\s$/;
let comma = /\D[\,]\s$/;
let endOfBlock = /[^\/]\n\n$/;

async function writeTo(el, message, index, interval, contentType, charsPerInterval){
    if (animationSkipped) {
        // Lol who needs proper flow control
        throw new Error('SKIP IT');
    }
    // Write a character or multiple characters to the buffer.
    let chars = message.slice(index, index + charsPerInterval);
    index += charsPerInterval;

    // Ensure we stay scrolled to the bottom.
    el.scrollTop = el.scrollHeight;

    // If this is going to <style> it's more complex; otherwise, just write.
    if (contentType) {
        switch (contentType) {
            case 'script':
                var type = 'script';
                var container = script;
                break;
            case 'style':
                var type = 'style';
                var container = style;
                break;
            default:
                console.log('!> invalid content type.');
                break;
        }
        writeChar(el, chars, type, container, func);
    } else {
        writeChar.simple(el, chars);
    }

    // Schedule another write.
    if (index < message.length) {
        let thisInterval = interval;
        let thisSlice = message.slice(index - 2, index + 1);
        if (comma.test(thisSlice)) thisInterval = interval * 30;
        if (endOfBlock.test(thisSlice)) thisInterval = interval * 50;
        if (endOfSentence.test(thisSlice)) thisInterval = interval * 70;

        do {
            await Promise.delay(thisInterval);
        } while(paused);

        return writeTo(el, message, index, interval, contentType, charsPerInterval);
    } else {
        writeChar.clear();
        if (contentType == 'script') {
            console.log('end of script file.')
        }
    }
}

//
// Older versions of major browsers (like Android) still use prefixes. So we figure out what that prefix is
// and use it.
//
function getBrowserPrefix() {
    // Ghetto per-browser prefixing
    browserPrefix = require('./lib/javascript/getPrefix')();
    if (browserPrefix) {
        styleText = styleText.map(function(text) {
            return text.replace(/-webkit-/g, browserPrefix);
        });
    }
}

//
// Put els into the module scope.
//
function getEls() {
    // We're cheating a bit on styles.
    let preStyleEl = document.createElement('style');
    preStyleEl.textContent = preStyles;
    document.head.insertBefore(preStyleEl, document.getElementsByTagName('style')[0]);

    // El refs
    style = document.getElementById('style-tag');
    styleEl = document.getElementById('style-text');
    script = document.getElementById('script-tag');
    scriptEl = document.getElementById('script-text');
    func = document.getElementById('script-function-tag');
    interviewEl = document.getElementById('interview-text');
    workEl = document.getElementById('work-text');
    pgpEl = document.getElementById('pgp-text');
    skipAnimationEl = document.getElementById('skip-animation');
    pauseEl = document.getElementById('pause-resume');
}

//
// Create links in header (now footer).
//
function populateHeader() {
    let header = document.getElementById('header');
    header.innerHTML = headerHTML;
}

//
// Create basic event handlers for user input.
//
function createEventHandlers() {
    // Mirror user edits back to the script element.
    scriptEl.addEventListener('keyup', function(e) {
        console.log('adding js');
        script.textContent = scriptEl.textContent;
        if (e.keyCode == 186) {
            console.log('triggered');
            fireScript();
        }
    });

    // Mirror user edits back to the style element.
    styleEl.addEventListener('input', function() {
        style.textContent = styleEl.textContent;
    });

    // Skip anim on click to skipAnimation
    skipAnimationEl.addEventListener('click', function(e) {
        e.preventDefault();
        animationSkipped = true;
    });

    pauseEl.addEventListener('click', function(e) {
        e.preventDefault();
        if (paused) {
            pauseEl.textContent = "Pause ||";
            paused = false;
        } else {
            pauseEl.textContent = "Resume >>";
            paused = true;
        }
    });
}

//
// Fire a listener when scrolling the 'work' box.
//


function createInterviewBox() {
    if (interviewEl.classList.contains('flipped')) return;
    interviewEl.innerHTML = md(resumeText);

    interviewEl.classList.add('flipped');
    interviewEl.scrollTop = 9999;

    // flippy floppy
    let flipping = 0;
    require('mouse-wheel')(interviewEl, async function(dx, dy) {
        if (flipping) return;
        let flipped = interviewEl.classList.contains('flipped');
        let half = (interviewEl.scrollHeight - interviewEl.clientHeight) / 2;
        let pastHalf = flipped ? interviewEl.scrollTop < half : interviewEl.scrollTop > half;

        // If we're past half, flip the el.
        if (pastHalf) {
            interviewEl.classList.toggle('flipped');
            flipping = true;
            await Promise.delay(500);
            interviewEl.scrollTop = flipped ? 0 : 9999;
            flipping = false;
        }

        // Scroll. If we've flipped, flip the scroll direction.
        interviewEl.scrollTop += (dy * (flipped ? -1 : 1));
    }, true);
}
