
/**
 * Good to see you're getting involved.
 *
 * Let's turn that HTML code into real live HTML elements.
 *
 */
console.log('test1');

var codeBox = document.getElementById('interview-text');
var htmlContent = codeBox.textContent;
var interview = document.createElement('div');
var container = document.getElementById('container');

interview.innerHTML = htmlContent;
container.removeChild(codeBox);

container.appendChild(interview);

console.log('test2');
