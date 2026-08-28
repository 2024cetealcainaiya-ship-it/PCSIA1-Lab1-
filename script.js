const loginSection =
    document.getElementById("loginSection");

const registerSection =
    document.getElementById("registerSection");

const residentArea =
    document.getElementById("residentArea");

const adminArea =
    document.getElementById("adminArea");

const showRegister =
    document.getElementById("showRegister");

const showLogin =
    document.getElementById("showLogin");

const logoutResident =
    document.getElementById("logoutResident");

const logoutAdmin =
    document.getElementById("logoutAdmin");


let statsChartInstance = null;

showRegister.addEventListener(
    "click",
    function () {

        loginSection.classList.remove(
            "active"
        );

        registerSection.classList.add(
            "active"
        );

    }
);


showLogin.addEventListener(
    "click",
    function () {

        registerSection.classList.remove(
            "active"
        );

        loginSection.classList.add(
            "active"
        );

    }
);

document
    .getElementById("loginForm")
    .addEventListener(
        "submit",
        function (e) {

            e.preventDefault();


            // Get role

            const role =
                document.getElementById(
                    "loginRole"
                ).value;


            // Get username

            const username =
                document.getElementById(
                    "loginUser"
                ).value;


            // Display username

            document.getElementById(
                "residentDisplay"
            ).textContent =
                username;


            // Hide login

            loginSection.classList.remove(
                "active"
            );


            if (role === "resident") {

                residentArea.classList.add(
                    "active"
                );


                residentArea.classList.remove(
                    "interface-open"
                );


                hideAllInterfaces();


                updateNotificationCount();

            }


            else {

                adminArea.classList.add(
                    "active"
                );


                renderChart();

            }

        }
    );


document
    .getElementById("registerForm")
    .addEventListener(
        "submit",
        function (e) {

            e.preventDefault();


            alert(
                "Registration successful! Please login."
            );


            registerSection.classList.remove(
                "active"
            );


            loginSection.classList.add(
                "active"
            );

        }
    );

function openInterface(interfaceId) {


    // Find selected interface

    const selectedInterface =
        document.getElementById(
            interfaceId
        );


    // Check if interface exists

    if (!selectedInterface) {

        console.error(
            "Interface not found:",
            interfaceId
        );

        return;

    }


    // Hide all interfaces

    hideAllInterfaces();


    // Display selected interface

    selectedInterface.classList.add(
        "active"
    );


    // Hide dashboard menu

    residentArea.classList.add(
        "interface-open"
    );


    // If notifications are opened

    if (
        interfaceId ===
        "viewNotifications"
    ) {

        updateNotificationCount();

    }


    // Scroll to top

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


function hideAllInterfaces() {


    const interfaces =
        document.querySelectorAll(
            ".view-panel"
        );


    interfaces.forEach(
        function (panel) {

            panel.classList.remove(
                "active"
            );

        }
    );

}

function returnToDashboard() {


    // Hide interfaces

    hideAllInterfaces();


    // Show dashboard

    residentArea.classList.remove(
        "interface-open"
    );


    // Update notifications

    updateNotificationCount();


    // Scroll to top

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


document
    .getElementById("newReportForm")
    .addEventListener(
        "submit",
        function (e) {

            e.preventDefault();


            // Get location

            const location =
                document.getElementById(
                    "repLocation"
                ).value;


            // Get description

            const description =
                document.getElementById(
                    "repDescription"
                ).value;


            // Validate

            if (
                location.trim() === "" ||
                description.trim() === ""
            ) {

                alert(
                    "Please complete all required fields."
                );

                return;

            }


            // Success message

            alert(
                "Waste report submitted successfully!"
            );


            // Clear form

            document
                .getElementById(
                    "newReportForm"
                )
                .reset();


            // Return dashboard

            returnToDashboard();

        }
    );

logoutResident.addEventListener(
    "click",
    function () {


        // Hide resident area

        residentArea.classList.remove(
            "active"
        );


        // Remove interface mode

        residentArea.classList.remove(
            "interface-open"
        );


        // Hide interfaces

        hideAllInterfaces();


        // Clear login form

        document
            .getElementById("loginForm")
            .reset();


        // Show login

        loginSection.classList.add(
            "active"
        );

    }
);


logoutAdmin.addEventListener(
    "click",
    function () {


        // Hide admin

        adminArea.classList.remove(
            "active"
        );


        // Clear login

        document
            .getElementById("loginForm")
            .reset();


        // Show login

        loginSection.classList.add(
            "active"
        );

    }
);

function updateNotificationCount() {


    // Find unread notifications

    const unreadNotifications =
        document.querySelectorAll(
            ".notification-item.unread"
        );


    // Count them

    const count =
        unreadNotifications.length;


    // Notification badge

    const badge =
        document.getElementById(
            "notificationCount"
        );


    // Notification number inside interface

    const number =
        document.getElementById(
            "notificationNumber"
        );


    // Update dashboard badge

    if (badge) {

        badge.textContent =
            count;


        if (count === 0) {

            badge.style.display =
                "none";

        }

        else {

            badge.style.display =
                "inline-flex";

        }

    }


    // Update notification page number

    if (number) {

        number.textContent =
            count;

    }

}


function markNotificationAsRead(
    notification
) {


    // Remove unread class

    notification.classList.remove(
        "unread"
    );


    // Add read class

    notification.classList.add(
        "read"
    );


    // Update counter

    updateNotificationCount();

}

document.addEventListener(
    "click",
    function (e) {


        // Check if clicked element
        // belongs to notification

        const notification =
            e.target.closest(
                ".notification-item"
            );


        // Nothing clicked

        if (!notification) {

            return;

        }


        // Mark notification as read

        markNotificationAsRead(
            notification
        );

    }
);


const markAllRead =
    document.getElementById(
        "markAllRead"
    );


if (markAllRead) {

    markAllRead.addEventListener(
        "click",
        function (e) {


            // Prevent parent notification click

            e.stopPropagation();


            // Find unread notifications

            const notifications =
                document.querySelectorAll(
                    ".notification-item.unread"
                );


            // Mark each as read

            notifications.forEach(
                function (notification) {

                    notification.classList.remove(
                        "unread"
                    );

                    notification.classList.add(
                        "read"
                    );

                }
            );


            // Update counter

            updateNotificationCount();


            // Message

            alert(
                "All notifications have been marked as read."
            );

        }
    );

}



function renderChart() {


    // Get canvas

    const canvas =
        document.getElementById(
            "statsChart"
        );


    // Check canvas

    if (!canvas) {

        return;

    }


    // Get context

    const ctx =
        canvas.getContext("2d");


    // Destroy previous chart

    if (statsChartInstance) {

        statsChartInstance.destroy();

    }


    // Create chart

    statsChartInstance =
        new Chart(
            ctx,
            {

                type: "bar",


                data: {

                    labels: [
                        "Daily",
                        "Weekly",
                        "Monthly"
                    ],


                    datasets: [

                        {

                            label:
                                "Collection Volume (kg)",


                            data: [
                                120,
                                850,
                                3400
                            ],


                            backgroundColor: [
                                "#66bb6a",
                                "#43a047",
                                "#2e7d32"
                            ]

                        }

                    ]

                },


                options: {

                    responsive: true,


                    scales: {

                        y: {

                            beginAtZero: true,


                            title: {

                                display: true,


                                text:
                                    "Collection Volume (kg)"

                            }

                        }

                    }

                }

            }
        );

}

updateNotificationCount();