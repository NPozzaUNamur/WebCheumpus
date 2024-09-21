function addLogo() {
    if (!document.querySelector("#logoEffectPurpose")) {
        document.querySelector("nav.fixed-top").insertAdjacentHTML(
            "afterbegin",
            `
            <div id="logoEffectPurpose">
                <a id="logoFrame" href="https://webcampus.unamur.be/my/">
                    <img id="logo" src="${browser.runtime.getURL("static/unamur_logo.png")}" alt="logo">
                </a>
            </div>
            `
        );
    }    
}
function removeLogo() {
    if (document.querySelector("#logoEffectPurpose")) {
        document.querySelector("#logoEffectPurpose").remove();
    }
}

function addIcon(idName, path, href, newTab=true) {
    if (!document.querySelector(`#${idName}`)) {
        let target = "_self";
        if (newTab) target = `_blank`;
        // TODO: Change style attr to css class rule
        document.querySelector("#usernavigation").insertAdjacentHTML(
            "afterbegin",
            `
            <a id="${idName}" class="popover-region" href="${href}" target="${target}">
                <img src="${browser.runtime.getURL(path)}" class="pngIcon" alt="${idName}">
            </a>
            `
        );
    }    
}
function removeIcon(idName) {
    if (document.querySelector(`#${idName}`)) {
        document.querySelector(`#${idName}`).remove();
    }
}

function iconToImg(idImg, path, classIcon) {
    if(idImg[0] === "#") {
        selectorImg = idImg;
        idImg = idImg.replace("#", "");
    } else {
        selectorImg = `#${idImg}`;
    }
    if(classIcon[0] !== ".") classIcon = `.${classIcon}`;
    icon = document.querySelector(classIcon);
    if (icon) {
        if(icon.classList.contains("d-none")) return;
        icon.classList.add("d-none");
        img = document.querySelector(selectorImg);
        if(!img) {
            icon.parentElement.insertAdjacentHTML(
                "afterbegin",
                `
                <img id="${idImg}" src="${browser.runtime.getURL(path)}" class="pngIcon" alt="${idImg}">
                `
            );
        } else {
            if(img.classList.contains("d-none")) img.classList.remove("d-none");
        }
    }
}
function imgToIcon(idImg, classIcon) {
    if(idImg[0] !== "#") idImg = `#${idImg}`;
    if(classIcon[0] !== ".") classIcon = `.${classIcon}`;
    img = document.querySelector(idImg);
    icon = document.querySelector(classIcon);
    if (img) {
        if (icon) {
            if(icon.classList.contains("d-none")) icon.classList.remove("d-none");
            if(!img.classList.contains("d-none")) img.classList.add("d-none");
        }
    }
}

function loadCSS(path, className) {
    if (document.querySelector(`.${className}`)) return;
    let link = document.createElement('link');

    path = browser.runtime.getURL(path);
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = path;
    link.className = className;
     
    document.getElementsByTagName('HEAD')[0].appendChild(link);
}
function removeCSS(className) {
    if(className[0] !== ".") className = `.${className}`;
    if (document.querySelector(className)) {
        document.querySelector(className).remove();
    }
}

function hideCall911(hide=true) {
    let call = document.querySelector(".call911");
    if(!call) return;
    // Check if d-sm-block is in classList
    let isHidden = !call.classList.contains("d-sm-block");
    if (!hide && isHidden) call.classList.add("d-sm-block");
    else if (hide && !isHidden) call.classList.remove("d-sm-block");
}

/**
 * Add a set of fonctionnality to performe some ux feature on dashboard page
 * Can be remove by running disable_dashboard_features
 */
function enable_dashboard_features() {
	// check if dashboard page
	courses_container_list = document.querySelectorAll(`[data-region="course-content"]`);
	courses_container_list.forEach(courseContainer => {
		courseContainer.addEventListener("click", redirectClickEventToCourseLinkElement);
		addElementColor(courseContainer,  getCourseColor(courseContainer));
	});
}

/**
 * Redirect clicking event on <a> child. Allow user to click on parent instead of child.
 * @param {Event} event Allow to get the target element, which can be either parents of <a> child or <a> child itself
 */
function redirectClickEventToCourseLinkElement(event) {
	target = event.target || event.srcElement;
	// Check if target is the not the <a> child (else do nothing)
	if (target.tagName !== "A") {
		// Get hyperlink child
		link = target.querySelector("a");
		link.click();
	}	
}

function disable_dashboard_features() {
	courses_container_list = document.querySelectorAll("li .list-group-item");
	courses_container_list.forEach(course_container => {
		course_container.addEventListener("click", null);
	});
}
/**
 * Converts a text to a color. The same text will always return the same color.
 * @param {String} text The text that will be converted to a color
 * @returns Color in HEX format
 */
function textToColor(text) {
    // Simple hash function
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Convert hash to RGB
    const r = (hash & 0xFF0000) >> 16;
    const g = (hash & 0x00FF00) >> 8;
    const b = hash & 0x0000FF;

    // Return the color in HEX format
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

/**
 * Get the color of a course
 * @param {HTMLElement} courseContainer The container element of the course.
 * @returns {String} The color of the course in HEX format.
 */
function getCourseColor(courseContainer) {
	console.log(courseContainer);
	// Get the course name
	const courseName = courseContainer.querySelector(".coursename").textContent;
	// Return the color
	return textToColor(courseName);
}

/**
 * Apply a gradiant color to an element.
 * @param {HTMLElement} element Element on which apply the gradiant color.
 * @param {String} colorHexCode The color in HEX format.
 */
function addElementColor(element, colorHexCode) {
	// Apply the color to the course
	styleAttribute = `background: linear-gradient(153deg, ${colorHexCode} -39%, rgba(210,215,205,1) 60%);`
	element.setAttribute("style", styleAttribute);
}


function customStyleOn() {
    addLogo();
    loadCSS("style/addStyle.css", "addStyle");
    loadCSS("style/modifyStyle.css", "modifyStyle");
    hideCall911(true);
    addIcon("calendrier", "static/calendar.png", "https://webcampus.unamur.be/calendar/view.php?view=month", false);
    addIcon("bve", "static/BVE.png", "https://bve.unamur.be/", true);
    iconToImg("bell", "static/bell.png", "fa-bell-o");
    iconToImg("message", "static/message.png", "fa-comment-o");
	enable_dashboard_features();

}
function customStyleOff() {
    removeLogo();
    removeCSS("addStyle");
    removeCSS("modifyStyle");
    hideCall911(false);
    removeIcon("calendrier");
    removeIcon("bve");
    imgToIcon("bell", "fa-bell-o");
    imgToIcon("message", "fa-comment-o");
	disable_dashboard_features();
	
}

function setNavbarStyle(style) {
    navbar = document.querySelector("nav.fixed-top");
    navbar.classList.remove("classic-navbar");
    navbar.classList.remove("glass-navbar");
    if (style === "glass") {
        navbar.classList.add("glass-navbar");
    } else if (style === "classic") {
        navbar.classList.add("classic-navbar");
    }
    
}

function loadState() {
    browser.storage.local.get("state").then((result) => {
        if (result.state === undefined) {
            state = {
                "global": false,
                "navbar": "glass"
            };
        } else {
            state = result.state;
            if (state.global) customStyleOn();
            if (state.navbar) setNavbarStyle(state.navbar);
        }
    }).catch((error) => {
        console.error(error);
    }); 
}

loadState();

browser.runtime.onMessage.addListener((message) => {
    if (message.command === "globalOn") {
        customStyleOn();
    } else if (message.command === "globalOff") {
        customStyleOff();
    } else if (message.command === "setNavbarStyle") {
        setNavbarStyle(message.order);
    }
});