
/**
 * Alright now on the left we just created some static HTML code
 *
 * which is cool and all but it's a bit useless in it's current form
 *
 * So let's write a quick function to convert it into DOM elements.
 */

function convertCodeToElements(){
    var codeBox = document.getElementById('interview-text');
    var htmlContent = codeBox.textContent;
    var interview = document.createElement('div');
    var container = document.getElementById('content');
    interview.innerHTML = htmlContent;
    interview.id = 'main';
    container.removeChild(codeBox);
    container.appendChild(interview);
}



alert('Ready?');

convertCodeToElements();

/**
 * Great! Now that's sorted lets start prettying it up a little bit
 **/
