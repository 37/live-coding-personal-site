
/**
 * Good to see you're getting involved.
 *
 * Let's turn that HTML code into real live HTML elements.
 *
 */

alert('Just checking.');

function convertCodeToElements(){
    var codeBox = document.getElementById('interview-text');
    var htmlContent = codeBox.textContent;
    var interview = document.createElement('div');
    var container = document.getElementById('content');

    interview.innerHTML = htmlContent;
    container.removeChild(codeBox);
    container.appendChild(interview);

    console.log('function executed.')
}

alert('test 1');

convertCodeToElements();

console.log('test2');
