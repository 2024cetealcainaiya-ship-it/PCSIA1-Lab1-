/* Get the button */

const getStartedBtn =
    document.getElementById("getStartedBtn");


/* Check if button exists */

if (getStartedBtn) {

    getStartedBtn.addEventListener(
        "click",
        function () {

            /*
                When the user clicks
                Get Started, it will
                open dashboard.html.
            */

            window.location.href =
                "dashboard.html";

        }
    );

}