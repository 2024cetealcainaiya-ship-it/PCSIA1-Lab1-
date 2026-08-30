/* =========================================================
   SMART WASTE COLLECTION AND REPORTING SYSTEM
   SWCRS
   FULL SCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       LOCAL STORAGE
    ===================================================== */

    function getData(key, defaultValue = []) {

        const data =
            localStorage.getItem(key);

        if (!data) {
            return defaultValue;
        }

        try {

            return JSON.parse(data);

        } catch (error) {

            console.error(
                "Storage error:",
                error
            );

            return defaultValue;

        }

    }


    function saveData(key, data) {

        localStorage.setItem(
            key,
            JSON.stringify(data)
        );

    }



    /* =====================================================
       HTML ESCAPE
    ===================================================== */

    function escapeHTML(value) {

        if (
            value === null ||
            value === undefined
        ) {

            return "";

        }

        return String(value)

            .replace(/&/g, "&amp;")

            .replace(/</g, "&lt;")

            .replace(/>/g, "&gt;")

            .replace(/"/g, "&quot;")

            .replace(/'/g, "&#039;");

    }



    /* =====================================================
       STATUS CLASS
    ===================================================== */

    function statusClass(status) {

        const value =
            String(status || "")
                .toLowerCase();


        if (
            value.includes("completed") ||
            value.includes("resolved") ||
            value.includes("compliant") ||
            value.includes("active")
        ) {

            return "low";

        }


        if (
            value.includes("medium") ||
            value.includes("progress") ||
            value.includes("improvement")
        ) {

            return "medium";

        }


        if (
            value.includes("full") ||
            value.includes("non-compliant")
        ) {

            return "full";

        }


        return "pending";

    }



    /* =====================================================
       DEFAULT DATA
    ===================================================== */

    if (
        !localStorage.getItem(
            "swcrs_reports"
        )
    ) {

        saveData(
            "swcrs_reports",
            [

                {
                    id: 1,
                    user: "Resident 1",
                    location: "Main Street",
                    type: "Plastic",
                    priority: "High",
                    description:
                        "Overflowing waste",
                    status: "Pending",
                    date:
                        "2026-08-30"
                },

                {
                    id: 2,
                    user: "Resident 2",
                    location: "Barangay 2",
                    type: "Organic",
                    priority: "Medium",
                    description:
                        "Uncollected waste",
                    status: "Completed",
                    date:
                        "2026-08-29"
                }

            ]
        );

    }



    if (
        !localStorage.getItem(
            "swcrs_collection"
        )
    ) {

        saveData(
            "swcrs_collection",
            [

                {
                    id: 1,
                    location: "Barangay 1",
                    wasteType: "General Waste",
                    date: "2026-08-30",
                    wasteLevel: "Full",
                    status: "Completed"
                },

                {
                    id: 2,
                    location: "Barangay 2",
                    wasteType: "Recyclable",
                    date: "2026-08-30",
                    wasteLevel: "Medium",
                    status: "Pending"
                }

            ]
        );

    }



    if (
        !localStorage.getItem(
            "swcrs_segregation"
        )
    ) {

        saveData(
            "swcrs_segregation",
            [

                {
                    id: 1,
                    location: "Barangay 1",
                    binId: "BIN-001",
                    biodegradable: "Proper",
                    recyclable: "Proper",
                    residual: "Proper",
                    status: "Compliant",
                    date: "2026-08-30"
                },

                {
                    id: 2,
                    location: "Barangay 2",
                    binId: "BIN-002",
                    biodegradable: "Proper",
                    recyclable: "Mixed",
                    residual: "Proper",
                    status: "Non-Compliant",
                    date: "2026-08-30"
                }

            ]
        );

    }



    if (
        !localStorage.getItem(
            "swcrs_disposal"
        )
    ) {

        saveData(
            "swcrs_disposal",
            [

                {
                    id: 1,
                    truck: "TRUCK-001",
                    category: "Organic",
                    weight: 420,
                    facility:
                        "Central Composting Facility",
                    status: "Completed"
                }

            ]
        );

    }



    if (
        !localStorage.getItem(
            "swcrs_crew"
        )
    ) {

        saveData(
            "swcrs_crew",
            [

                {
                    id: 1,
                    name: "Juan Dela Cruz",
                    area: "Barangay 1",
                    shift: "Morning",
                    status: "Active"
                },

                {
                    id: 2,
                    name: "Maria Santos",
                    area: "Barangay 2",
                    shift: "Afternoon",
                    status: "Active"
                }

            ]
        );

    }



    if (
        !localStorage.getItem(
            "swcrs_routes"
        )
    ) {

        saveData(
            "swcrs_routes",
            [

                {
                    id: 1,
                    sequence: 1,
                    location: "Main Street",
                    bin: "BIN-001",
                    fill: "90%",
                    action: "Immediate Pickup",
                    status: "Pending"
                },

                {
                    id: 2,
                    sequence: 2,
                    location: "Barangay Hall",
                    bin: "BIN-002",
                    fill: "55%",
                    action: "Scheduled Pickup",
                    status: "In Progress"
                },

                {
                    id: 3,
                    sequence: 3,
                    location: "Community Park",
                    bin: "BIN-003",
                    fill: "25%",
                    action: "Monitor Only",
                    status: "Pending"
                }

            ]
        );

    }



    if (
        !localStorage.getItem(
            "swcrs_feedback"
        )
    ) {

        saveData(
            "swcrs_feedback",
            [

                {
                    id: 1,
                    topic:
                        "Non-compliance Alert",
                    target:
                        "Zone 1 - Main Street",
                    message:
                        "Multiple unsegregated bins.",
                    status:
                        "Sent to Admin",
                    date:
                        "2026-08-30"
                }

            ]
        );

    }



    /* =====================================================
       SECTION REFERENCES
    ===================================================== */

    const loginSection =
        document.getElementById(
            "loginSection"
        );


    const registerSection =
        document.getElementById(
            "registerSection"
        );


    const residentArea =
        document.getElementById(
            "residentArea"
        );


    const crewArea =
        document.getElementById(
            "crewArea"
        );


    const cityFacilitatorArea =
        document.getElementById(
            "cityFacilitatorArea"
        );


    const adminArea =
        document.getElementById(
            "adminArea"
        );



    /* =====================================================
       SWITCH MAIN SECTION
    ===================================================== */

    function switchSection(section) {

        const sections = [

            loginSection,
            registerSection,
            residentArea,
            crewArea,
            cityFacilitatorArea,
            adminArea

        ];


        sections.forEach(
            function (item) {

                if (item) {

                    item.classList.remove(
                        "active"
                    );

                }

            }
        );


        if (section) {

            section.classList.add(
                "active"
            );

        }

    }



    /* =====================================================
       LOGIN / REGISTER LINK
    ===================================================== */

    const showRegister =
        document.getElementById(
            "showRegister"
        );


    const showLogin =
        document.getElementById(
            "showLogin"
        );


    if (showRegister) {

        showRegister.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                switchSection(
                    registerSection
                );

            }
        );

    }


    if (showLogin) {

        showLogin.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                switchSection(
                    loginSection
                );

            }
        );

    }



    /* =====================================================
       LOGIN
    ===================================================== */

    const loginForm =
        document.getElementById(
            "loginForm"
        );


    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const username =
                    document
                        .getElementById(
                            "loginUser"
                        )
                        .value
                        .trim();


                const password =
                    document
                        .getElementById(
                            "loginPassword"
                        )
                        .value;


                const role =
                    document
                        .getElementById(
                            "loginRole"
                        )
                        .value;


                if (
                    !username ||
                    !password ||
                    !role
                ) {

                    alert(
                        "Please complete all login fields."
                    );

                    return;

                }



                /* ==============================
                   RESIDENT
                ============================== */

                if (
                    role === "resident"
                ) {

                    const display =
                        document.getElementById(
                            "residentDisplay"
                        );


                    if (display) {

                        display.textContent =
                            username;

                    }


                    renderResidentReports();


                    switchSection(
                        residentArea
                    );


                    return;

                }



                /* ==============================
                   CREW
                ============================== */

                if (
                    role === "crew"
                ) {

                    const display =
                        document.getElementById(
                            "crewDisplay"
                        );


                    if (display) {

                        display.textContent =
                            username;

                    }


                    renderCrewCollection();

                    renderCrewSegregation();

                    renderCrewDisposal();

                    renderCrewRoutes();

                    renderCrewFeedback();


                    switchSection(
                        crewArea
                    );


                    return;

                }



                /* ==============================
                   CITY FACILITATOR
                ============================== */

                if (
                    role === "facilitator"
                ) {

                    if (
                        !cityFacilitatorArea
                    ) {

                        alert(
                            "City Facilitator area was not found."
                        );

                        return;

                    }


                    const display =
                        document.getElementById(
                            "facilitatorDisplay"
                        );


                    if (display) {

                        display.textContent =
                            username;

                    }


                    renderFacilitatorDashboard();


                    showFacilitatorMenu();


                    switchSection(
                        cityFacilitatorArea
                    );


                    return;

                }



                /* ==============================
                   ADMIN
                ============================== */

                if (
                    role === "admin"
                ) {

                    renderAdminReports();

                    renderCrewManagement();

                    switchSection(
                        adminArea
                    );


                    return;

                }


                alert(
                    "Invalid role."
                );

            }
        );

    }



    /* =====================================================
       REGISTER
    ===================================================== */

    const registerForm =
        document.getElementById(
            "registerForm"
        );


    if (registerForm) {

        registerForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                alert(
                    "Resident account created successfully!"
                );


                registerForm.reset();


                switchSection(
                    loginSection
                );

            }
        );

    }



    /* =====================================================
       RESIDENT REPORT FORM
    ===================================================== */

    const newReportForm =
        document.getElementById(
            "newReportForm"
        );


    if (newReportForm) {

        newReportForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const reports =
                    getData(
                        "swcrs_reports"
                    );


                const newReport = {

                    id:
                        Date.now(),

                    user:
                        document
                            .getElementById(
                                "residentDisplay"
                            )
                            .textContent,

                    location:
                        document
                            .getElementById(
                                "repLocation"
                            )
                            .value
                            .trim(),

                    type:
                        document
                            .getElementById(
                                "repType"
                            )
                            .value,

                    priority:
                        document
                            .getElementById(
                                "repPriority"
                            )
                            .value,

                    description:
                        document
                            .getElementById(
                                "repDescription"
                            )
                            .value
                            .trim(),

                    status:
                        "Pending",

                    date:
                        new Date()
                            .toISOString()
                            .split("T")[0]

                };


                reports.unshift(
                    newReport
                );


                saveData(
                    "swcrs_reports",
                    reports
                );


                this.reset();


                alert(
                    "Waste report submitted successfully!"
                );


                renderResidentReports();

                renderFacilitatorDashboard();

                renderAdminReports();

            }
        );

    }



    /* =====================================================
       RESIDENT REPORT TABLE
    ===================================================== */

    function renderResidentReports() {

        const tbody =
            document.getElementById(
                "residentReportsBody"
            );


        if (!tbody) {

            return;

        }


        const reports =
            getData(
                "swcrs_reports"
            );


        tbody.innerHTML =
            reports.map(
                function (report) {

                    return `

                        <tr>

                            <td>
                                WR-${String(
                                    report.id
                                ).slice(-4)}
                            </td>

                            <td>
                                ${escapeHTML(
                                    report.location
                                )}
                            </td>

                            <td>
                                ${escapeHTML(
                                    report.type
                                )}
                            </td>

                            <td>
                                ${escapeHTML(
                                    report.priority
                                )}
                            </td>

                            <td>
                                ${escapeHTML(
                                    report.description
                                )}
                            </td>

                            <td>

                                <span
                                    class="status ${statusClass(
                                        report.status
                                    )}"
                                >
                                    ${escapeHTML(
                                        report.status
                                    )}
                                </span>

                            </td>

                        </tr>

                    `;

                }
            ).join("");

    }



    /* =====================================================
       RESIDENT INTERFACE
    ===================================================== */

    window.openInterface =
        function (interfaceId) {

            const dashboard =
                document.getElementById(
                    "residentDashboard"
                );


            if (dashboard) {

                dashboard.style.display =
                    "none";

            }


            document
                .querySelectorAll(
                    "#residentArea .view-panel"
                )
                .forEach(
                    function (panel) {

                        panel.classList.remove(
                            "active"
                        );

                    }
                );


            const panel =
                document.getElementById(
                    interfaceId
                );


            if (panel) {

                panel.classList.add(
                    "active"
                );

            }

        };



    window.returnToDashboard =
        function () {

            document
                .querySelectorAll(
                    "#residentArea .view-panel"
                )
                .forEach(
                    function (panel) {

                        panel.classList.remove(
                            "active"
                        );

                    }
                );


            const dashboard =
                document.getElementById(
                    "residentDashboard"
                );


            if (dashboard) {

                dashboard.style.display =
                    "block";

            }

        };



    /* =====================================================
       CREW INTERFACE
    ===================================================== */

    window.openCrewInterface =
        function (interfaceId) {

            const dashboard =
                document.getElementById(
                    "crewDashboard"
                );


            if (dashboard) {

                dashboard.style.display =
                    "none";

            }


            document
                .querySelectorAll(
                    "#crewArea .view-panel"
                )
                .forEach(
                    function (panel) {

                        panel.classList.remove(
                            "active"
                        );

                    }
                );


            const panel =
                document.getElementById(
                    interfaceId
                );


            if (panel) {

                panel.classList.add(
                    "active"
                );

            }

        };



    window.returnToCrewDashboard =
        function () {

            document
                .querySelectorAll(
                    "#crewArea .view-panel"
                )
                .forEach(
                    function (panel) {

                        panel.classList.remove(
                            "active"
                        );

                    }
                );


            const dashboard =
                document.getElementById(
                    "crewDashboard"
                );


            if (dashboard) {

                dashboard.style.display =
                    "block";

            }

        };



    /* =====================================================
       CREW COLLECTION FORM
    ===================================================== */

    const collectionReportForm =
        document.getElementById(
            "collectionReportForm"
        );


    if (collectionReportForm) {

        collectionReportForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const collection =
                    getData(
                        "swcrs_collection"
                    );


                collection.unshift({

                    id:
                        Date.now(),

                    location:
                        document
                            .getElementById(
                                "collectionLocation"
                            )
                            .value
                            .trim(),

                    wasteType:
                        document
                            .getElementById(
                                "wasteType"
                            )
                            .value,

                    date:
                        document
                            .getElementById(
                                "collectionDate"
                            )
                            .value,

                    wasteLevel:
                        document
                            .getElementById(
                                "wasteLevel"
                            )
                            .value,

                    status:
                        "Pending"

                });


                saveData(
                    "swcrs_collection",
                    collection
                );


                this.reset();


                alert(
                    "Collection report added successfully!"
                );


                renderCrewCollection();

                renderFacilitatorDashboard();

            }
        );

    }



    /* =====================================================
       CREW COLLECTION TABLE
    ===================================================== */

    function renderCrewCollection() {

        const tbody =
            document.getElementById(
                "crewCollectionTable"
            );


        if (!tbody) {

            return;

        }


        const records =
            getData(
                "swcrs_collection"
            );


        tbody.innerHTML =
            records.map(
                function (record) {

                    return `

                        <tr>

                            <td>
                                CR-${String(
                                    record.id
                                ).slice(-4)}
                            </td>

                            <td>
                                ${escapeHTML(
                                    record.location
                                )}
                            </td>

                            <td>
                                ${escapeHTML(
                                    record.wasteType
                                )}
                            </td>

                            <td>
                                ${escapeHTML(
                                    record.date
                                )}
                            </td>

                            <td>

                                <span
                                    class="status ${statusClass(
                                        record.wasteLevel
                                    )}"
                                >
                                    ${escapeHTML(
                                        record.wasteLevel
                                    )}
                                </span>

                            </td>

                            <td>

                                <span
                                    class="status ${statusClass(
                                        record.status
                                    )}"
                                >
                                    ${escapeHTML(
                                        record.status
                                    )}
                                </span>

                            </td>

                        </tr>

                    `;

                }
            ).join("");

    }



    /* =====================================================
       CREW SEGREGATION FORM
    ===================================================== */

    const crewSegregationForm =
        document.getElementById(
            "crewSegregationForm"
        );


    if (crewSegregationForm) {

        crewSegregationForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const records =
                    getData(
                        "swcrs_segregation"
                    );


                records.unshift({

                    id:
                        Date.now(),

                    location:
                        document
                            .getElementById(
                                "segLocation"
                            )
                            .value
                            .trim(),

                    binId:
                        document
                            .getElementById(
                                "segBinId"
                            )
                            .value
                            .trim(),

                    biodegradable:
                        "Proper",

                    recyclable:
                        "Proper",

                    residual:
                        "Proper",

                    status:
                        document
                            .getElementById(
                                "segStatus"
                            )
                            .value,

                    notes:
                        document
                            .getElementById(
                                "segNotes"
                            )
                            .value
                            .trim(),

                    date:
                        new Date()
                            .toISOString()
                            .split("T")[0]

                });


                saveData(
                    "swcrs_segregation",
                    records
                );


                this.reset();


                alert(
                    "Segregation record saved successfully!"
                );


                renderCrewSegregation();

                renderFacilitatorDashboard();

            }
        );

    }



    /* =====================================================
       CREW SEGREGATION TABLE
    ===================================================== */

    function renderCrewSegregation() {

        const tbody =
            document.querySelector(
                "#crewSegregationTable tbody"
            );


        if (!tbody) {

            return;

        }


        const records =
            getData(
                "swcrs_segregation"
            );


        tbody.innerHTML =
            records.map(
                function (record) {

                    return `

                        <tr>

                            <td>
                                SG-${String(
                                    record.id
                                ).slice(-4)}
                            </td>

                            <td>

                                ${escapeHTML(
                                    record.binId
                                )}

                                <br>

                                ${escapeHTML(
                                    record.location
                                )}

                            </td>

                            <td>

                                <span
                                    class="status ${statusClass(
                                        record.status
                                    )}"
                                >

                                    ${escapeHTML(
                                        record.status
                                    )}

                                </span>

                            </td>

                            <td>
                                ${escapeHTML(
                                    record.notes || ""
                                )}
                            </td>

                            <td>
                                ${escapeHTML(
                                    record.date
                                )}
                            </td>

                        </tr>

                    `;

                }
            ).join("");

    }



    /* =====================================================
       CREW DISPOSAL FORM
    ===================================================== */

    const crewDisposalForm =
        document.getElementById(
            "crewDisposalForm"
        );


    if (crewDisposalForm) {

        crewDisposalForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const records =
                    getData(
                        "swcrs_disposal"
                    );


                records.unshift({

                    id:
                        Date.now(),

                    truck:
                        document
                            .getElementById(
                                "dispTruck"
                            )
                            .value
                            .trim(),

                    category:
                        document
                            .getElementById(
                                "dispCategory"
                            )
                            .value,

                    weight:
                        document
                            .getElementById(
                                "dispWeight"
                            )
                            .value,

                    facility:
                        document
                            .getElementById(
                                "dispFacility"
                            )
                            .value
                            .trim(),

                    status:
                        "Completed"

                });


                saveData(
                    "swcrs_disposal",
                    records
                );


                this.reset();


                alert(
                    "Disposal record saved successfully!"
                );


                renderCrewDisposal();

            }
        );

    }



    /* =====================================================
       CREW DISPOSAL TABLE
    ===================================================== */

    function renderCrewDisposal() {

        const tbody =
            document.getElementById(
                "crewDisposalTable"
            );


        if (!tbody) {

            return;

        }


        const records =
            getData(
                "swcrs_disposal"
            );


        tbody.innerHTML =
            records.map(
                function (record) {

                    return `

                        <tr>

                            <td>
                                DSP-${String(
                                    record.id
                                ).slice(-4)}
                            </td>

                            <td>
                                ${escapeHTML(
                                    record.truck
                                )}
                            </td>

                            <td>
                                ${escapeHTML(
                                    record.category
                                )}
                            </td>

                            <td>
                                ${escapeHTML(
                                    record.weight
                                )} kg
                            </td>

                            <td>
                                ${escapeHTML(
                                    record.facility
                                )}
                            </td>

                            <td>

                                <span
                                    class="status low"
                                >
                                    ${escapeHTML(
                                        record.status
                                    )}
                                </span>

                            </td>

                        </tr>

                    `;

                }
            ).join("");

    }



    /* =====================================================
       CREW ROUTE TABLE
    ===================================================== */

    function renderCrewRoutes() {

        const tbody =
            document.getElementById(
                "crewRouteTable"
            );


        if (!tbody) {

            return;

        }


        const routes =
            getData(
                "swcrs_routes"
            );


        tbody.innerHTML =
            routes.map(
                function (route) {

                    return `

                        <tr>

                            <td>
                                ${route.sequence}
                            </td>

                            <td>
                                ${escapeHTML(
                                    route.location
                                )}
                            </td>

                            <td>
                                ${escapeHTML(
                                    route.bin
                                )}
                            </td>

                            <td>
                                ${escapeHTML(
                                    route.fill
                                )}
                            </td>

                            <td>
                                ${escapeHTML(
                                    route.action
                                )}
                            </td>

                            <td>

                                <span
                                    class="status ${statusClass(
                                        route.status
                                    )}"
                                >
                                    ${escapeHTML(
                                        route.status
                                    )}
                                </span>

                            </td>

                            <td>

                                <button
                                    class="btn-action"
                                    type="button"
                                    onclick="updateRoute(${route.id})"
                                >
                                    Update
                                </button>

                            </td>

                        </tr>

                    `;

                }
            ).join("");

    }



    /* =====================================================
       UPDATE ROUTE
    ===================================================== */

    window.updateRoute =
        function (id) {

            const routes =
                getData(
                    "swcrs_routes"
                );


            const route =
                routes.find(
                    function (item) {

                        return item.id === id;

                    }
                );


            if (!route) {

                return;

            }


            if (
                route.status ===
                "Pending"
            ) {

                route.status =
                    "In Progress";

            }

            else if (
                route.status ===
                "In Progress"
            ) {

                route.status =
                    "Completed";

            }

            else {

                route.status =
                    "Pending";

            }


            saveData(
                "swcrs_routes",
                routes
            );


            renderCrewRoutes();

        };



    /* =====================================================
       CREW FEEDBACK FORM
    ===================================================== */

    const crewFeedbackForm =
        document.getElementById(
            "crewFeedbackForm"
        );


    if (crewFeedbackForm) {

        crewFeedbackForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const records =
                    getData(
                        "swcrs_feedback"
                    );


                records.unshift({

                    id:
                        Date.now(),

                    topic:
                        document
                            .getElementById(
                                "fbTopic"
                            )
                            .value,

                    target:
                        document
                            .getElementById(
                                "fbTarget"
                            )
                            .value
                            .trim(),

                    message:
                        document
                            .getElementById(
                                "fbMessage"
                            )
                            .value
                            .trim(),

                    status:
                        "Sent to Admin",

                    date:
                        new Date()
                            .toISOString()
                            .split("T")[0]

                });


                saveData(
                    "swcrs_feedback",
                    records
                );


                this.reset();


                alert(
                    "Feedback submitted successfully!"
                );


                renderCrewFeedback();

            }
        );

    }



    /* =====================================================
       CREW FEEDBACK TABLE
    ===================================================== */

    function renderCrewFeedback() {

        const tbody =
            document.getElementById(
                "crewFeedbackTable"
            );


        if (!tbody) {

            return;

        }


        const records =
            getData(
                "swcrs_feedback"
            );


        tbody.innerHTML =
            records.map(
                function (record) {

                    return `

                        <tr>

                            <td>
                                FB-${String(
                                    record.id
                                ).slice(-4)}
                            </td>

                            <td>
                                ${escapeHTML(
                                    record.topic
                                )}
                            </td>

                            <td>
                                ${escapeHTML(
                                    record.target
                                )}
                            </td>

                            <td>
                                ${escapeHTML(
                                    record.message
                                )}
                            </td>

                            <td>

                                <span
                                    class="status pending"
                                >
                                    ${escapeHTML(
                                        record.status
                                    )}
                                </span>

                            </td>

                        </tr>

                    `;

                }
            ).join("");

    }



    /* =====================================================
       CITY FACILITATOR MENU
    ===================================================== */

    window.showFacilitatorMenu =
        function () {

            const menu =
                document.getElementById(
                    "facilitatorMenu"
                );


            if (menu) {

                menu.style.display =
                    "block";

            }


            document
                .querySelectorAll(
                    "#cityFacilitatorArea .view-panel"
                )
                .forEach(
                    function (panel) {

                        panel.classList.remove(
                            "active"
                        );

                    }
                );

        };



    /* =====================================================
       CITY FACILITATOR VIEW
    ===================================================== */

    window.showFacilitatorView =
        function (viewId) {

            const menu =
                document.getElementById(
                    "facilitatorMenu"
                );


            if (menu) {

                menu.style.display =
                    "none";

            }


            document
                .querySelectorAll(
                    "#cityFacilitatorArea .view-panel"
                )
                .forEach(
                    function (panel) {

                        panel.classList.remove(
                            "active"
                        );

                    }
                );


            const selected =
                document.getElementById(
                    viewId
                );


            if (selected) {

                selected.classList.add(
                    "active"
                );

            }


            renderFacilitatorDashboard();

        };



    /* =====================================================
       CITY FACILITATOR DASHBOARD
    ===================================================== */

    function renderFacilitatorDashboard() {

        const reports =
            getData(
                "swcrs_collection"
            );


        const segregation =
            getData(
                "swcrs_segregation"
            );


        const total =
            reports.length;


        const pending =
            reports.filter(
                function (record) {

                    return (
                        record.status ===
                        "Pending"
                    );

                }
            ).length;


        const completed =
            reports.filter(
                function (record) {

                    return (
                        record.status ===
                        "Completed"
                    );

                }
            ).length;


        const compliant =
            segregation.filter(
                function (record) {

                    return (
                        record.status ===
                        "Compliant"
                    );

                }
            ).length;


        const compliance =
            segregation.length > 0

                ? Math.round(
                    (
                        compliant /
                        segregation.length
                    ) * 100
                )

                : 0;



        const totalElement =
            document.getElementById(
                "totalCollectionReports"
            );


        const pendingElement =
            document.getElementById(
                "pendingReports"
            );


        const completedElement =
            document.getElementById(
                "completedReports"
            );


        const complianceElement =
            document.getElementById(
                "segregationCompliance"
            );


        if (totalElement) {

            totalElement.textContent =
                total;

        }


        if (pendingElement) {

            pendingElement.textContent =
                pending;

        }


        if (completedElement) {

            completedElement.textContent =
                completed;

        }


        if (complianceElement) {

            complianceElement.textContent =
                compliance + "%";

        }


        renderFacilitatorCollectionTable();

        renderFacilitatorSegregationTable();

    }



    /* =====================================================
       FACILITATOR COLLECTION TABLE
    ===================================================== */

    function renderFacilitatorCollectionTable() {

        const tbody =
            document.getElementById(
                "facilitatorReportsTable"
            );


        const dashboardBody =
            document.getElementById(
                "facilitatorDashboardTable"
            );


        const records =
            getData(
                "swcrs_collection"
            );


        const html =
            records.map(
                function (record) {

                    return `

                        <tr>

                            <td>
                                CR-${String(
                                    record.id
                                ).slice(-4)}
                            </td>

                            <td>
                                ${escapeHTML(
                                    record.location
                                )}
                            </td>

                            <td>
                                ${escapeHTML(
                                    record.wasteType
                                )}
                            </td>

                            <td>
                                ${escapeHTML(
                                    record.date
                                )}
                            </td>

                            <td>

                                <span
                                    class="status ${statusClass(
                                        record.wasteLevel
                                    )}"
                                >
                                    ${escapeHTML(
                                        record.wasteLevel
                                    )}
                                </span>

                            </td>

                            <td>

                                <span
                                    class="status ${statusClass(
                                        record.status
                                    )}"
                                >
                                    ${escapeHTML(
                                        record.status
                                    )}
                                </span>

                            </td>

                        </tr>

                    `;

                }
            ).join("");


        if (tbody) {

            tbody.innerHTML =
                html;

        }


        if (dashboardBody) {

            dashboardBody.innerHTML =
                html;

        }

    }



    /* =====================================================
       FACILITATOR SEGREGATION TABLE
    ===================================================== */

    function renderFacilitatorSegregationTable() {

        const tbody =
            document.getElementById(
                "facilitatorSegregationTable"
            );


        if (!tbody) {

            return;

        }


        const records =
            getData(
                "swcrs_segregation"
            );


        tbody.innerHTML =
            records.map(
                function (record) {

                    return `

                        <tr>

                            <td>
                                SG-${String(
                                    record.id
                                ).slice(-4)}
                            </td>

                            <td>
                                ${escapeHTML(
                                    record.location
                                )}
                            </td>

                            <td>
                                ${escapeHTML(
                                    record.binId
                                )}
                            </td>

                            <td>
                                ${escapeHTML(
                                    record.biodegradable
                                )}
                            </td>

                            <td>
                                ${escapeHTML(
                                    record.recyclable
                                )}
                            </td>

                            <td>
                                ${escapeHTML(
                                    record.residual
                                )}
                            </td>

                            <td>

                                <span
                                    class="status ${statusClass(
                                        record.status
                                    )}"
                                >
                                    ${escapeHTML(
                                        record.status
                                    )}
                                </span>

                            </td>

                            <td>
                                ${escapeHTML(
                                    record.date
                                )}
                            </td>

                        </tr>

                    `;

                }
            ).join("");

    }



    /* =====================================================
       FACILITATOR SEGREGATION FORM
    ===================================================== */

    const segregationForm =
        document.getElementById(
            "segregationForm"
        );


    if (segregationForm) {

        segregationForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const biodegradable =
                    document
                        .getElementById(
                            "biodegradable"
                        )
                        .value;


                const recyclable =
                    document
                        .getElementById(
                            "recyclable"
                        )
                        .value;


                const residual =
                    document
                        .getElementById(
                            "residual"
                        )
                        .value;


                let status =
                    "Compliant";


                if (
                    biodegradable ===
                    "Mixed" ||

                    recyclable ===
                    "Mixed" ||

                    residual ===
                    "Mixed"
                ) {

                    status =
                        "Non-Compliant";

                }


                const records =
                    getData(
                        "swcrs_segregation"
                    );


                records.unshift({

                    id:
                        Date.now(),

                    location:
                        document
                            .getElementById(
                                "segregationLocation"
                            )
                            .value
                            .trim(),

                    binId:
                        document
                            .getElementById(
                                "segregationBinId"
                            )
                            .value
                            .trim(),

                    biodegradable:
                        biodegradable,

                    recyclable:
                        recyclable,

                    residual:
                        residual,

                    status:
                        status,

                    notes:
                        document
                            .getElementById(
                                "segregationRemarks"
                            )
                            .value
                            .trim(),

                    date:
                        document
                            .getElementById(
                                "segregationDate"
                            )
                            .value

                });


                saveData(
                    "swcrs_segregation",
                    records
                );


                this.reset();


                alert(
                    "Segregation monitoring record added successfully!"
                );


                renderFacilitatorDashboard();

                renderCrewSegregation();

            }
        );

    }



    /* =====================================================
       ADMIN REPORTS
    ===================================================== */

    function renderAdminReports() {

        const tbody =
            document.getElementById(
                "adminReportsTable"
            );


        if (!tbody) {

            return;

        }


        const reports =
            getData(
                "swcrs_reports"
            );


        tbody.innerHTML =
            reports.map(
                function (report) {

                    return `

                        <tr>

                            <td>
                                WR-${String(
                                    report.id
                                ).slice(-4)}
                            </td>

                            <td>
                                ${escapeHTML(
                                    report.user
                                )}
                            </td>

                            <td>
                                ${escapeHTML(
                                    report.location
                                )}
                            </td>

                            <td>
                                ${escapeHTML(
                                    report.type
                                )}
                            </td>

                            <td>
                                ${escapeHTML(
                                    report.priority
                                )}
                            </td>

                            <td>

                                <span
                                    class="status ${statusClass(
                                        report.status
                                    )}"
                                >
                                    ${escapeHTML(
                                        report.status
                                    )}
                                </span>

                            </td>

                            <td>

                                <button
                                    class="btn-action"
                                    type="button"
                                    onclick="updateReport(${report.id})"
                                >
                                    Update
                                </button>

                            </td>

                        </tr>

                    `;

                }
            ).join("");

    }



    /* =====================================================
       UPDATE REPORT
    ===================================================== */

    window.updateReport =
        function (id) {

            const reports =
                getData(
                    "swcrs_reports"
                );


            const report =
                reports.find(
                    function (item) {

                        return item.id === id;

                    }
                );


            if (!report) {

                return;

            }


            if (
                report.status ===
                "Pending"
            ) {

                report.status =
                    "In Progress";

            }

            else if (
                report.status ===
                "In Progress"
            ) {

                report.status =
                    "Resolved";

            }

            else {

                report.status =
                    "Pending";

            }


            saveData(
                "swcrs_reports",
                reports
            );


            renderAdminReports();

            renderResidentReports();

        };



    /* =====================================================
       ADMIN CREW MANAGEMENT
    ===================================================== */

    function renderCrewManagement() {

        const tbody =
            document.getElementById(
                "crewTable"
            );


        if (!tbody) {

            return;

        }


        const crews =
            getData(
                "swcrs_crew"
            );


        tbody.innerHTML =
            crews.map(
                function (crew) {

                    return `

                        <tr>

                            <td>
                                CREW-${crew.id}
                            </td>

                            <td>
                                ${escapeHTML(
                                    crew.name
                                )}
                            </td>

                            <td>
                                ${escapeHTML(
                                    crew.area
                                )}
                            </td>

                            <td>
                                ${escapeHTML(
                                    crew.shift
                                )}
                            </td>

                            <td>

                                <span
                                    class="status low"
                                >
                                    ${escapeHTML(
                                        crew.status
                                    )}
                                </span>

                            </td>

                        </tr>

                    `;

                }
            ).join("");

    }



    /* =====================================================
       ADD CREW FORM
    ===================================================== */

    const crewForm =
        document.getElementById(
            "crewForm"
        );


    if (crewForm) {

        crewForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const crews =
                    getData(
                        "swcrs_crew"
                    );


                crews.push({

                    id:
                        Date.now(),

                    name:
                        document
                            .getElementById(
                                "crewName"
                            )
                            .value
                            .trim(),

                    area:
                        document
                            .getElementById(
                                "crewArea"
                            )
                            .value
                            .trim(),

                    shift:
                        document
                            .getElementById(
                                "crewShift"
                            )
                            .value,

                    status:
                        "Active"

                });


                saveData(
                    "swcrs_crew",
                    crews
                );


                this.reset();


                alert(
                    "Crew member added successfully!"
                );


                renderCrewManagement();

            }
        );

    }



    /* =====================================================
       ADMIN INTERFACE
    ===================================================== */

    window.openAdminInterface =
        function (interfaceId) {

            const dashboard =
                document.getElementById(
                    "adminDashboard"
                );


            if (dashboard) {

                dashboard.style.display =
                    "none";

            }


            document
                .querySelectorAll(
                    "#adminArea .admin-view-panel"
                )
                .forEach(
                    function (panel) {

                        panel.classList.remove(
                            "active"
                        );

                    }
                );


            const panel =
                document.getElementById(
                    interfaceId
                );


            if (panel) {

                panel.classList.add(
                    "active"
                );

            }


            if (
                interfaceId ===
                "analyticsInterface"
            ) {

                renderChart();

            }

        };



    window.returnToAdminDashboard =
        function () {

            document
                .querySelectorAll(
                    "#adminArea .admin-view-panel"
                )
                .forEach(
                    function (panel) {

                        panel.classList.remove(
                            "active"
                        );

                    }
                );


            const dashboard =
                document.getElementById(
                    "adminDashboard"
                );


            if (dashboard) {

                dashboard.style.display =
                    "block";

            }

        };



    /* =====================================================
       CHART
    ===================================================== */

    let chart = null;


    function renderChart() {

        const canvas =
            document.getElementById(
                "statsChart"
            );


        if (
            !canvas ||
            typeof Chart ===
            "undefined"
        ) {

            return;

        }


        const reports =
            getData(
                "swcrs_reports"
            );


        const pending =
            reports.filter(
                function (item) {

                    return (
                        item.status ===
                        "Pending"
                    );

                }
            ).length;


        const progress =
            reports.filter(
                function (item) {

                    return (
                        item.status ===
                        "In Progress"
                    );

                }
            ).length;


        const completed =
            reports.filter(
                function (item) {

                    return (
                        item.status ===
                        "Resolved" ||
                        item.status ===
                        "Completed"
                    );

                }
            ).length;


        if (chart) {

            chart.destroy();

        }


        chart =
            new Chart(
                canvas,
                {

                    type:
                        "bar",

                    data: {

                        labels: [

                            "Pending",

                            "In Progress",

                            "Completed"

                        ],

                        datasets: [

                            {

                                label:
                                    "Waste Reports",

                                data: [

                                    pending,

                                    progress,

                                    completed

                                ]

                            }

                        ]

                    },

                    options: {

                        responsive:
                            true,

                        maintainAspectRatio:
                            false

                    }

                }
            );

    }



    /* =====================================================
       PROFILE
    ===================================================== */

    const profileForm =
        document.getElementById(
            "profileForm"
        );


    if (profileForm) {

        profileForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                alert(
                    "Profile updated successfully!"
                );

            }
        );

    }



    /* =====================================================
       LOGOUT
    ===================================================== */

    function logout() {

        /*
         * Hide all panels.
         */

        document
            .querySelectorAll(
                ".view-panel, .admin-view-panel"
            )
            .forEach(
                function (panel) {

                    panel.classList.remove(
                        "active"
                    );

                }
            );


        /*
         * Reset dashboard visibility.
         */

        const dashboards = [

            "residentDashboard",

            "crewDashboard",

            "facilitatorMenu",

            "adminDashboard"

        ];


        dashboards.forEach(
            function (id) {

                const dashboard =
                    document.getElementById(
                        id
                    );


                if (dashboard) {

                    dashboard.style.display =
                        "block";

                }

            }
        );


        /*
         * Return to login.
         */

        switchSection(
            loginSection
        );


        if (loginForm) {

            loginForm.reset();

        }

    }



    const logoutButtons = [

        "logoutResident",

        "logoutCrew",

        "logoutFacilitator",

        "logoutAdmin"

    ];


    logoutButtons.forEach(
        function (id) {

            const button =
                document.getElementById(
                    id
                );


            if (button) {

                button.addEventListener(
                    "click",
                    logout
                );

            }

        }
    );



    /* =====================================================
       INITIAL DISPLAY
    ===================================================== */

    renderResidentReports();

    renderCrewCollection();

    renderCrewSegregation();

    renderCrewDisposal();

    renderCrewRoutes();

    renderCrewFeedback();

    renderFacilitatorDashboard();

    renderAdminReports();

    renderCrewManagement();


    switchSection(
        loginSection
    );

});