if (document.querySelector('#navBar')) {
    console.log('navBar already exists');
    document.querySelector('#navBar').remove();
}

// add navbar section
document.querySelector('#page-wrapper').insertAdjacentHTML(
    'afterbegin', 
    `<section id="navBar">
        <div id="bar">
            <div id="logoFrame">
                <a href="https://webcampus.unamur.be/my/">
                    <img id="logo" src="${browser.runtime.getURL("static/unamur_logo.png")}" alt="logo">
                </a>
            </div>
            <div id="action">
                <a href="https://bve.unamur.be/" target="_blank"><img src="${browser.runtime.getURL("static/BVE.png")}" alt="B"></a>
                <a href="https://webcampus.unamur.be/calendar/view.php?view=month"><img src="${browser.runtime.getURL("static/calendar.png")}" alt="C"></a>
                <a href="#"><img src="${browser.runtime.getURL("static/bell.png")}" alt="N"></a>
                <a href="#"><img src="${browser.runtime.getURL("static/message.png")}" alt="M"></a>
            </div>
        </div>
    </section>`
);

// add navbar style
document.querySelector("head").insertAdjacentHTML(
    "beforeend",
    `
    <style id="navBarStyle">
    /* ---------------------- */
    /* Navigation bar */
    /* ---------------------- */
    #navBar {
        position: fixed;
        z-index: 100;
    
        width: 100vw;
        height: 15vh;
    }
    
    #bar {
        width: 100%;
        height: 10.2vh;
        flex-shrink: 0;
    
        /* effect */
        background: linear-gradient(92deg, rgba(110, 199, 46, 0.69) 0.87%, rgba(108, 164, 66, 0.51) 7.83%, rgba(107, 138, 81, 0.38) 13.67%, rgba(106, 117, 93, 0.27) 24%, rgba(105, 103, 101, 0.20) 41.04%, rgba(105, 101, 102, 0.19) 100%);
    
        display: flex;
        justify-content: space-between;
    }
    
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
    
    /* action btn */
    #action {
        margin-right: 11.72vw;
        margin-top: 2.32vh;
    }
    
    #action a {
        width: 3.13vw;
        height: 3.13vw;
        flex-shrink: 0;
    
        display: inline-flex;
        justify-content: center;
        align-items: center;
    
        /* effect */
        transition: linear 300ms;
    
        text-decoration: none;
        color: #1E1E1E;
        font-size: 1.86vw;
        font-size: 1.5rem;
        border-radius: 14px;
    
        margin-left: 0.40vw;
    }
    
    #action a:hover {
        /* effect */
        background: linear-gradient(133deg, #FFF -7.1%, rgba(220, 220, 220, 0.00) 107.1%);
        backdrop-filter: blur(20px);
        box-shadow: 4px 6px 4px 0px rgba(0, 0, 0, 0.25);
        transition: linear 300ms;
        
    }
    
    #action a img {
        width: 2.16vw;
        height: auto;
        flex-shrink: 0;
    }</style>`
);