var appendStyle = (cssStyleCode, className) => {
    if(
        cssStyleCode == null || className == null
    ) {
        throw new Error("appendStyle: cssStyleCode or className is null");
    }
    if (document.getElementById(className)) {
        if(debug) console.info(`${className} already exists`);
        document.getElementById(className).remove();
    }
    document.querySelector("head").insertAdjacentHTML(
        "beforeend",
        `<style id="${className}">${cssStyleCode}</style>`
    );

}

if (document.querySelector("#logoStyle")) {
    document.querySelector("#logoStyle").remove();
}

if (document.querySelector("#logoFrame")) {
    document.querySelector("#logoFrame").remove();
}

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

// add navbar style
navbarStyle = `
/* logo */
#logoEffectPurpose {

    width: 7.14vw;
    height: 7.14vw;
    flex-shrink: 0;

    margin-left: 41px;
    margin-top: 1.5vh;
    
    /* effect */
    padding: 0;
    transition: padding-top 0.2s;
}

#logoFrame {

    width: 7.14vw;
    height: 7.14vw;
    flex-shrink: 0;

    line-height: 0;

    /* effect */
    background: linear-gradient(133deg, #FFF -7.1%, rgba(220, 220, 220, 0.00) 107.1%);
    backdrop-filter: blur(20px);
    box-shadow: 8px 6px 4px 0px rgba(0, 0, 0, 0.25);
    border-radius: 14px;

    display: flex;
    justify-content: center;
    align-items: center;
}

#logoEffectPurpose:hover {
    padding-top: 3px;
    transition: padding-top 0.2s;
}

#logo {
    width: 5.16vw;
    height: auto;
    flex-shrink: 0;
}

#logo:focus {
    outline: none !important;
}
`;

appendStyle(navbarStyle, "logoStyleTest");