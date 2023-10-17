if (document.querySelector("#logoStyle")) {
    document.querySelector("#logoStyle").remove();
}

if (document.querySelector("#logoFrame")) {
    document.querySelector("#logoFrame").remove();
}

document.querySelector("nav.fixed-top").insertAdjacentHTML(
    "afterbegin",
    `
    <div id="logoFrame">
        <a href="https://webcampus.unamur.be/my/">
            <img id="logo" src="${browser.runtime.getURL("static/unamur_logo.png")}" alt="logo">
        </a>
    </div>
    `
);

// add navbar style
navbarStyle = `
/* logo */
#logoFrame {

    width: 7.14vw;
    height: 7.14vw;
    flex-shrink: 0;

    margin-left: 41px;
    margin-top: 1.5vh;

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

#logo {
    width: 5.16vw;
    height: auto;
    flex-shrink: 0;
}
`;

document.querySelector("head").insertAdjacentHTML(
    "beforeend",
    `<style id="logoStyle">${navbarStyle}</style>`
);