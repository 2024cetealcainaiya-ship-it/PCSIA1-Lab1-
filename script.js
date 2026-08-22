const welcomeBox =
    document.getElementById("welcomeBox");

const registerBtn =
    document.getElementById("RegisterBtn");

const loginBtn =
    document.getElementById("LoginBtn");




const registerForm =
    document.getElementById("registerForm");

const backFromRegisterBtn =
    document.getElementById(
        "BackFromRegisterBtn"
    );



const loginForm =
    document.getElementById("loginForm");

const backFromLoginBtn =
    document.getElementById(
        "BackFromLoginBtn"
    );

const loginMessage =
    document.getElementById(
        "loginMessage"
    );



const userMenu =
    document.getElementById("userMenu");

const userWelcome =
    document.getElementById(
        "userWelcome"
    );

const logoutBtn =
    document.getElementById("LogoutBtn");



const scheduleBtn =
    document.getElementById(
        "ScheduleBtn"
    );

const reportsBtn =
    document.getElementById(
        "ReportsBtn"
    );

const crewBtn =
    document.getElementById(
        "CrewBtn"
    );



const scheduleSection =
    document.getElementById(
        "scheduleSection"
    );

const reportsSection =
    document.getElementById(
        "reportsSection"
    );

const crewSection =
    document.getElementById(
        "crewSection"
    );




registerBtn.addEventListener(
    "click",
    () => {


        welcomeBox.classList.add(
            "hidden"
        );



        registerForm.classList.remove(
            "hidden"
        );

    }
);




backFromRegisterBtn.addEventListener(
    "click",
    () => {


        registerForm.classList.add(
            "hidden"
        );



        welcomeBox.classList.remove(
            "hidden"
        );

    }
);



registerForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();

        const firstName =
            document.getElementById(
                "firstName"
            ).value.trim();

        const email =
            document.getElementById(
                "registerEmail"
            ).value.trim();

        const password =
            document.getElementById(
                "registerPassword"
            ).value;



        if (
            firstName === "" ||
            email === "" ||
            password === ""
        ) {

            alert(
                "Please complete all required fields."
            );

            return;

        }



        localStorage.setItem(
            "swcrsEmail",
            email
        );

        localStorage.setItem(
            "swcrsPassword",
            password
        );

        localStorage.setItem(
            "swcrsFirstName",
            firstName
        );



        alert(
            "Registration successful! You can now login."
        );



        registerForm.classList.add(
            "hidden"
        );



        loginForm.classList.remove(
            "hidden"
        );



        document.getElementById(
            "loginEmail"
        ).value = email;

    }
);



loginBtn.addEventListener(
    "click",
    () => {

        welcomeBox.classList.add(
            "hidden"
        );



        loginForm.classList.remove(
            "hidden"
        );



        loginMessage.textContent = "";

    }
);



backFromLoginBtn.addEventListener(
    "click",
    () => {


        loginForm.classList.add(
            "hidden"
        );


        welcomeBox.classList.remove(
            "hidden"
        );



        loginMessage.textContent = "";

    }
);




loginForm.addEventListener(
    "submit",
    (event) => {


        event.preventDefault();



        const email =
            document.getElementById(
                "loginEmail"
            ).value.trim();

        const password =
            document.getElementById(
                "loginPassword"
            ).value;


        const savedEmail =
            localStorage.getItem(
                "swcrsEmail"
            );

        const savedPassword =
            localStorage.getItem(
                "swcrsPassword"
            );

        const savedFirstName =
            localStorage.getItem(
                "swcrsFirstName"
            );



        if (
            savedEmail === null ||
            savedPassword === null
        ) {

            loginMessage.textContent =
                "No account found. Please register first.";

            loginMessage.style.color =
                "#ffb3b3";

            return;

        }


        if (
            email === savedEmail &&
            password === savedPassword
        ) {


            loginMessage.textContent =
                "Login successful!";

            loginMessage.style.color =
                "#6ff0a7";



            setTimeout(
                () => {

                    showUserMenu(
                        savedFirstName
                    );

                },
                500
            );

        }

        else {


            loginMessage.textContent =
                "Incorrect email or password.";

            loginMessage.style.color =
                "#ffb3b3";

        }

    }
);



function showUserMenu(firstName) {


    loginForm.classList.add(
        "hidden"
    );



    userMenu.classList.remove(
        "hidden"
    );



    userWelcome.textContent =
        "Welcome, " +
        firstName +
        "! You are now logged in.";

}



scheduleBtn.addEventListener(
    "click",
    () => {


        userMenu.classList.add(
            "hidden"
        );



        scheduleSection.classList.remove(
            "hidden"
        );

    }
);




reportsBtn.addEventListener(
    "click",
    () => {


        userMenu.classList.add(
            "hidden"
        );



        reportsSection.classList.remove(
            "hidden"
        );

    }
);




crewBtn.addEventListener(
    "click",
    () => {


        userMenu.classList.add(
            "hidden"
        );



        crewSection.classList.remove(
            "hidden"
        );

    }
);


const backMenuButtons =
    document.querySelectorAll(
        "[data-back-menu]"
    );


backMenuButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {


                scheduleSection.classList.add(
                    "hidden"
                );

                reportsSection.classList.add(
                    "hidden"
                );

                crewSection.classList.add(
                    "hidden"
                );



                userMenu.classList.remove(
                    "hidden"
                );

            }
        );

    }
);



logoutBtn.addEventListener(
    "click",
    () => {


        userMenu.classList.add(
            "hidden"
        );



        scheduleSection.classList.add(
            "hidden"
        );

        reportsSection.classList.add(
            "hidden"
        );

        crewSection.classList.add(
            "hidden"
        );



        document.getElementById(
            "loginPassword"
        ).value = "";



        welcomeBox.classList.remove(
            "hidden"
        );


        alert(
            "You have been logged out."
        );

    }
);



const tableRows =
    document.querySelectorAll(
        ".styled-table tbody tr"
    );


tableRows.forEach(
    (row) => {

        row.addEventListener(
            "click",
            () => {

                row.classList.toggle(
                    "highlight"
                );

            }
        );

    }
);