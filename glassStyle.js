// Remove old elements
elemToDel = document.querySelectorAll('header.fixed-top, nav.fixed-top');
for (let i = 0; i < elemToDel.length; i++) {
    elemToDel[i].remove();
}