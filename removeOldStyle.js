// Remove old elements
elemToDel = document.querySelectorAll('header.fixed-top, nav.fixed-top');
for (let i = 0; i < elemToDel.length; i++) {
    elemToDel[i].remove();
}

// Firefox hide scrollbar
document.querySelector("#page").style.scrollbarWidth = 'none' 

// Change margin for Page element
pageElem = document.querySelector('#page');
pageElem.style.marginTop = '0';
pageElem.style.height = '100vh';
pageElem.style.paddingLeft = '0';
pageElem.style.paddingRight = '0';

// Change top and height position for .drawer
document.querySelectorAll('.drawer').forEach(function (elem) { 
    elem.style.top = '0'; 
    elem.style.height = '100vh';
} );

// Change top position for .drawer-toggler
document.querySelectorAll('.drawer-toggler').forEach(function (elem) { 
    elem.style.top = '20px'; 
    elem.style.marginRight = '0';

} );