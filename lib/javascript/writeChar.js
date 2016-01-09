var stringBuffer = '';
var fullTextStorage = {};
var isFunction = false;
var bracketCount = 0;
var functionCount = 0;

module.exports = function writeChar(el, char, type, container, func) {

    // Grab text. We buffer it in storage so we don't have to read from the DOM every iteration.
    var fullText = fullTextStorage[el.id];
    if (!fullText) fullText = fullTextStorage[el.id] = el.innerHTML;

    fullText = module.exports.handleChar(fullText, char);
    // But we still write to the DOM every iteration, which can be pretty slow.
    el.innerHTML = fullTextStorage[el.id] = fullText;

    // Buffer writes to the <style> element so we don't have to paint quite so much.
    stringBuffer += char;

    // Check if function has been opened in the case of javascript.
    if (type == 'script') {
        console.log('is function: ' + isFunction);
        if (isFunction == false) {
            if (stringBuffer.indexOf('function') >= 0 && (stringBuffer.indexOf(')') >= 0 || stringBuffer.indexOf(')') >= 0)) {
                isFunction = true;
                console.log('function opened.');
            }
        } else {
            if (char === '{'){ bracketCount ++; }
            if (char === '}'){ bracketCount --; }
            if (char === '{' || char === '}') { console.log('brackets: ' + bracketCount); }
        }
    }

    if ((char === ';' || char === '}') && isFunction == false) {
        container.textContent += stringBuffer;
        if (type == 'script') module.exports.firescript(isFunction);
        module.exports.clear();
    } else if (isFunction == true && char === '}' && bracketCount == 0) {
        func.textContent += stringBuffer;
        module.exports.firescript(isFunction);
        module.exports.clear();
        console.log('setting function status to false. Status : ' + isFunction);
    }
};

module.exports.firescript = function (isFunction) {
    var execute, clear;
    switch (isFunction) {
        case true:
            //code
            clear = 'script-function-tag';
            execute = module.exports.buildScript(clear);
            break;
        case false:
            //code
            clear = 'script-tag';
            execute = 'script-tag';
            break;
    }
    eval(document.getElementById(execute).textContent);
    document.getElementById(clear).textContent = '';
    console.log('success!');
}

module.exports.clear = function () {
    stringBuffer = '';
    isFunction = false;
};

module.exports.buildScript = function (id) {
    // This is used for anti-caching purposes as certain browsers won't properly
    // eval the same script tag multiple times via the one code mechanism.
    // I've reported it to Chrome but until they can get around to a fix, this will do.
    // Dynamic script tags yay!
    var temporary = document.getElementById(id);
    var head= document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type= 'text/javascript';
    script.textContent = temporary.textContent;
    script.id = temporary.id + '-' + functionCount;
    functionCount++;
    head.appendChild(script);
    // reset temporary script tag
    temporary.textContent = '';
    // return id for eval
    return script.id;
};

module.exports.simple = function writeSimpleChar(el, char) {
    el.innerHTML += char;
};

let openComment = false;
let commentRegex = /(\/\*(?:[^](?!\/\*))*\*)$/;
let keyRegex = /([a-zA-Z- ^\n]*)$/;
let valueRegex = /([^:]*)$/;
let selectorRegex = /(.*)$/;
let pxRegex = /\dp/;
let pxRegex2 = /p$/;

module.exports.handleChar = function handleChar(fullText, char) {
  if (openComment && char !== '/') {
    // Short-circuit during a comment so we don't highlight inside it.
    fullText += char;
  } else if (char === '/' && openComment === false) {
    openComment = true;
    fullText += char;
  } else if (char === '/' && fullText.slice(-1) === '*' && openComment === true) {
    openComment = false;
    // Unfortunately we can't just open a span and close it, because the browser will helpfully
    // 'fix' it for us, and we'll end up with a single-character span and an empty closing tag.
    fullText = fullText.replace(commentRegex, '<span class="comment">$1/</span>');
  } else if (char === ':') {
    fullText = fullText.replace(keyRegex, '<span class="key">$1</span>:');
  } else if (char === ';') {
    fullText = fullText.replace(valueRegex, '<span class="value">$1</span>;');
  } else if (char === '{') {
    fullText = fullText.replace(selectorRegex, '<span class="selector">$1</span>{');
  } else if (char === 'x' && pxRegex.test(fullText.slice(-2))) {
    fullText = fullText.replace(pxRegex2, '<span class="value px">px</span>');
  } else {
    fullText += char;
  }
  return fullText;
}
