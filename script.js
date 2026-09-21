document.addEventListener("DOMContentLoaded", function () {


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


    const staffAccounts = [

        {
            username: "crew1",
            password: "Crew@1234",
            role: "crew",
            firstName: "Collection",
            lastName: "Crew"
        },

        {
            username: "facilitator1",
            password: "Facilitator@1234",
            role: "facilitator",
            firstName: "City",
            lastName: "Facilitator"
        },

        {
            username: "admin1",
            password: "Admin@1234",
            role: "admin",
            firstName: "System",
            lastName: "Admin"
        }

    ];


    const accounts = getData("swcrs_accounts", []);
    let accountsChanged = false;

    staffAccounts.forEach(function (staffAccount) {

        const accountExists = accounts.some(function (account) {

            return account.username.toLowerCase() === staffAccount.username.toLowerCase();

        });

        if (!accountExists) {

            accounts.push(staffAccount);
            accountsChanged = true;

        }

    });

    if (accountsChanged) {

        saveData("swcrs_accounts", accounts);

    }



    function escapeHTML(value) {

        if (
            value === null ||
            value === undefined
        ) {

            return "";

        }

        return String(value)

            .replace(/^Barangay\s+/i, "")

            .replace(/&/g, "&amp;")

            .replace(/</g, "&lt;")

            .replace(/>/g, "&gt;")

            .replace(/"/g, "&quot;")

            .replace(/'/g, "&#039;");

    }


    function validateInput(input) {

        if (!input || !input.id) {
            return true;
        }

        const errorSpan =
            document.getElementById(
                input.id + "-error"
            );

        let errorMessage = "";

        const value =
            input.value
                ? input.value.trim()
                : "";


        // 1. Required Check
        if (
            input.hasAttribute("required") &&
            !value
        ) {

            errorMessage =
                "This field is required.";

        }

        // 2. Formatting Checks
        else if (value) {

            if (
                input.tagName === "SELECT" &&
                input.hasAttribute("required") &&
                !value
            ) {

                errorMessage =
                    "Please select a valid option.";

            }

            else if (
                input.type === "email" &&
                input.validity.patternMismatch
            ) {

                errorMessage =
                    input.title ||
                    "Please enter a valid Email address.";

            }

            else if (
                input.type === "email" &&
                !input.checkValidity()
            ) {

                errorMessage =
                    "Please enter a valid email address.";

            }

            else if (
                input.type === "tel" &&
                (
                    input.validity.patternMismatch ||
                    value.length !== 11
                )
            ) {

                errorMessage =
                    "Must be an 11-digit mobile number starting with 09 (e.g. 09123456789).";

            }

            else if (
                ["regFirstName", "regMiddleName", "regLastName"].includes(input.id) &&
                /\d/.test(value)
            ) {

                errorMessage =
                    "Name must contain letters only. Numbers are not allowed.";

            }

            else if (input.validity.tooShort) {

                errorMessage =
                    `Minimum length is ${input.minLength} characters.`;

            }

            else if (input.validity.tooLong) {

                errorMessage =
                    `Maximum length is ${input.maxLength} characters.`;

            }

            else if (
                input.type === "number" &&
                input.validity.rangeUnderflow
            ) {

                errorMessage =
                    `Value must be at least ${input.min}.`;

            }

            else if (
                input.type === "number" &&
                input.validity.rangeOverflow
            ) {

                errorMessage =
                    `Value cannot exceed ${input.max}.`;

            }

            else if (input.validity.patternMismatch) {

                errorMessage =
                    input.title ||
                    "Invalid input format.";

            }

        }


        // 3. UI Feedback update
        if (errorMessage) {

            input.classList.add(
                "validation-invalid"
            );

            input.classList.remove(
                "validation-valid"
            );

            if (errorSpan) {

                errorSpan.textContent =
                    errorMessage;

                errorSpan.classList.add(
                    "show"
                );

            }

            return false;

        }

        else {

            input.classList.remove(
                "validation-invalid"
            );


            if (value) {

                input.classList.add(
                    "validation-valid"
                );

            } else {

                input.classList.remove(
                    "validation-valid"
                );

            }


            if (errorSpan) {

                errorSpan.textContent =
                    "";

                errorSpan.classList.remove(
                    "show"
                );

            }

            return true;

        }

    }



    function validateForm(form) {

        if (!form) {
            return true;
        }

        const controls =
            form.querySelectorAll(
                "input, select, textarea"
            );

        let isValid = true;


        controls.forEach(
            function (input) {

                const inputValid =
                    validateInput(input);

                if (!inputValid) {

                    isValid = false;

                }

            }
        );


        return isValid;

    }



    function clearFormValidation(form) {

        if (!form) {
            return;

        }

        const controls =
            form.querySelectorAll(
                "input, select, textarea"
            );


        controls.forEach(
            function (input) {

                input.classList.remove(
                    "validation-invalid",
                    "validation-valid"
                );

                const errorSpan =
                    document.getElementById(
                        input.id + "-error"
                    );

                if (errorSpan) {

                    errorSpan.textContent =
                        "";

                    errorSpan.classList.remove(
                        "show"
                    );

                }

            }
        );

    }



    /* Attach live listeners to all form controls */

    document
        .querySelectorAll("form")
        .forEach(
            function (form) {

                const controls =
                    form.querySelectorAll(
                        "input, select, textarea"
                    );


                controls.forEach(
                    function (input) {

                        input.addEventListener(
                            "input",
                            function () {

                                validateInput(
                                    input
                                );

                            }
                        );


                        input.addEventListener(
                            "blur",
                            function () {

                                validateInput(
                                    input
                                );

                            }
                        );


                        input.addEventListener(
                            "change",
                            function () {

                                validateInput(
                                    input
                                );

                            }
                        );

                    }
                );

            }
        );



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
       ADDRESS CASCADING OPTIONS
    ===================================================== */

    const addressData = {

        Philippines: {
            "National Capital Region (NCR)": {
                "Quezon City": [
                    "Barangay Bagong Pag-asa",
                    "Barangay Commonwealth",
                    "Barangay Dona Imelda",
                    "Barangay Holy Spirit",
                    "Barangay Kamuning"
                ],
                "Manila": [
                    "Barangay 1",
                    "Barangay 2",
                    "Barangay 3",
                    "Barangay 5",
                    "Barangay 12"
                ],
                "Pasig City": [
                    "San Antonio",
                    "Bagong Ilog",
                    "Kapitolyo",
                    "Manggahan",
                    "Pinagbuhatan"
                ],
                "Makati City": [
                    "Barangay Bel-Air",
                    "Barangay Poblacion",
                    "Barangay San Antonio",
                    "Barangay Urdaneta",
                    "Barangay Guadalupe Nuevo"
                ],
                "Taguig City": [
                    "Barangay Lower Bicutan",
                    "Barangay Central Bicutan",
                    "Barangay Fort Bonifacio",
                    "Barangay Upper Bicutan",
                    "Barangay Wawa"
                ]
            },
            "Cordillera Administrative Region (CAR)": {
                "Baguio City": [
                    "Barangay Irisan",
                    "Barangay Camp 7",
                    "Barangay Pinsao",
                    "Barangay San Luis",
                    "Barangay Santo Tomas"
                ],
                "La Trinidad": [
                    "Barangay Beckel",
                    "Barangay Poblacion",
                    "Barangay Tawang",
                    "Barangay Pico",
                    "Barangay Shilan"
                ],
                "Tabuk City": [
                    "Bulanao",
                    "Laya",
                    "Lanna",
                    "Balong",
                    "Dilag"
                ]
            },
            "Region I – Ilocos Region": {
                "Laoag City": [
                    "Barangay 1",
                    "Barangay 2",
                    "Barangay 3",
                    "Barangay 5",
                    "Barangay 10"
                ],
                "San Fernando City": [
                    "Barangay A",
                    "Barangay B",
                    "Barangay C",
                    "Barangay D",
                    "Barangay E"
                ],
                "Vigan City": [
                    "Barangay 1",
                    "Barangay 2",
                    "Barangay 3",
                    "Barangay 5",
                    "Barangay 6"
                ]
            },
            "Region II – Cagayan Valley": {
                "Tuguegarao City": [
                    "Barangay Annafunan",
                    "Barangay Balzain",
                    "Barangay Carig",
                    "Barangay Gosi",
                    "Barangay Linao"
                ],
                "Ilagan City": [
                    "Barangay Alibagu",
                    "Barangay Cabannugan",
                    "Barangay Sta. Barbara",
                    "Barangay San Vicente",
                    "Barangay Ragan Almacen"
                ],
                "Santiago City": [
                    "Barangay Burgos",
                    "Barangay Plaridel",
                    "Barangay Rizal",
                    "Barangay Centro",
                    "Barangay Mabini"
                ]
            },
            "Region III – Central Luzon": {
                "Angeles City": [
                    "Barangay Balibago",
                    "Barangay Candaba",
                    "Barangay Claro M. Recto",
                    "Barangay Lourdes North",
                    "Barangay Malabanias"
                ],
                "San Fernando City": [
                    "Barangay 1",
                    "Barangay 2",
                    "Barangay 3",
                    "Barangay 5",
                    "Barangay 7"
                ],
                "Baliuag": [
                    "Barangay 1",
                    "Barangay 2",
                    "Barangay 3",
                    "Barangay 4",
                    "Barangay 5"
                ]
            },
            "Region IV-A – CALABARZON": {
                "Calamba City": [
                    "Barangay Bucal",
                    "Barangay Canlubang",
                    "Barangay Palingon",
                    "Barangay Real",
                    "Barangay Parian"
                ],
                "Batangas City": [
                    "Barangay Alangilan",
                    "Barangay Balete",
                    "Barangay Pallocan",
                    "Barangay San Agustin",
                    "Barangay Wawa"
                ],
                "Lucena City": [
                    "Barangay Cotta",
                    "Barangay Gulang-Gulang",
                    "Barangay Mayao",
                    "Barangay Vendedor",
                    "Barangay Isabang"
                ]
            },
            "MIMAROPA Region – Southwestern Tagalog Region": {
                "Puerto Princesa City": [
                    "Barangay Bancao-Bancao",
                    "Barangay San Pedro",
                    "Barangay Tagburos",
                    "Barangay Sicsican",
                    "Barangay Sta. Lourdes"
                ],
                "Calapan City": [
                    "Barangay Batingan",
                    "Barangay Calero",
                    "Barangay Nag-iba",
                    "Barangay San Vicente",
                    "Barangay Sta. Rita"
                ],
                "Romblon": [
                    "Barangay Agpanawan",
                    "Barangay Cobrador",
                    "Barangay Lonos",
                    "Barangay Odiongan",
                    "Barangay San Fernando"
                ]
            },
            "Region V – Bicol Region": {
                "Legazpi City": [
                    "Barangay 1",
                    "Barangay 2",
                    "Barangay 3",
                    "Barangay 8",
                    "Barangay 10"
                ],
                "Naga City": [
                    "Barangay Balatas",
                    "Barangay Dayangdang",
                    "Barangay Peñafrancia",
                    "Barangay Pacol",
                    "Barangay Del Rosario"
                ],
                "Sorsogon City": [
                    "Barangay Bitan-o",
                    "Barangay Buhatan",
                    "Barangay Poblacion",
                    "Barangay Sirangan",
                    "Barangay Tagas"
                ]
            },
            "Region VI – Western Visayas": {
                "Iloilo City": [
                    "Barangay Molo",
                    "Barangay Jaro",
                    "Barangay La Paz",
                    "Barangay Mandurriao",
                    "Barangay Arevalo"
                ],
                "Bacolod City": [
                    "Barangay Alijis",
                    "Barangay Tangub",
                    "Barangay Vista Alegre",
                    "Barangay Mansilingan",
                    "Barangay Granada"
                ],
                "Roxas City": [
                    "Barangay Baybay",
                    "Barangay Cagay",
                    "Barangay Tanza",
                    "Barangay Culasi",
                    "Barangay Libas"
                ]
            },
            "Negros Island Region (NIR)": {
                "Bacolod City": [
                    "Barangay Granada",
                    "Barangay Mansilingan",
                    "Barangay Villamonte",
                    "Barangay Tangub",
                    "Barangay Pahanocoy"
                ],
                "Bais City": [
                    "Barangay Cabanbanan",
                    "Barangay Manjuyod",
                    "Barangay Tiling",
                    "Barangay Tamisu",
                    "Barangay Magsaysay"
                ],
                "Kabankalan City": [
                    "Barangay Cabadiangan",
                    "Barangay Camingawan",
                    "Barangay Hilamonan",
                    "Barangay Kawit",
                    "Barangay Talubangi"
                ]
            },
            "Region VII – Central Visayas": {
                "Cebu City": [
                    "Barangay Guadalupe",
                    "Barangay Lahug",
                    "Barangay Tisa",
                    "Barangay Mambaling",
                    "Barangay Talamban"
                ],
                "Bohol": [
                    "Barangay Alafriz",
                    "Barangay Bool",
                    "Barangay Manga",
                    "Barangay Dampas",
                    "Barangay Cogon"
                ],
                "Dumaguete City": [
                    "Barangay Daro",
                    "Barangay Piapi",
                    "Barangay Taclobo",
                    "Barangay Valencia",
                    "Barangay Camanjacan"
                ]
            },
            "Region VIII – Eastern Visayas": {
                "Tacloban City": [
                    "Barangay 1",
                    "Barangay 2",
                    "Barangay 3",
                    "Barangay 6",
                    "Barangay 10"
                ],
                "Ormoc City": [
                    "Barangay Cogon",
                    "Barangay Macabug",
                    "Barangay Valencia",
                    "Barangay Naungan",
                    "Barangay San Vicente"
                ],
                "Borongan City": [
                    "Barangay Maypangdan",
                    "Barangay Poblacion",
                    "Barangay San Gabriel",
                    "Barangay Sapa",
                    "Barangay Tabok"
                ]
            },
            "Region IX – Zamboanga Peninsula": {
                "Zamboanga City": [
                    "Barangay Baliwasan",
                    "Barangay Curuan",
                    "Barangay San Jose",
                    "Barangay Tetuan",
                    "Barangay Pasonanca"
                ],
                "Pagadian City": [
                    "Barangay Dao",
                    "Barangay Gatas",
                    "Barangay Kahayagan",
                    "Barangay San Francisco",
                    "Barangay Balangasan"
                ],
                "Dipolog City": [
                    " Central",
                    " Turno",
                    " Sicayab",
                    " Mina",
                    " Olingan"
                ]
            },
            "Region X – Northern Mindanao": {
                "Cagayan de Oro City": [
                    " Camaman-an",
                    " Gusa",
                    " Lapasan",
                    " Bulua",
                    " Kauswagan"
                ],
                "Iligan City": [
                    " Buru-un",
                    " Palao",
                    " Sta. Filomena",
                    " Suarez",
                    " Tubod"
                ],
                "Malaybalay City": [
                    " Casisang",
                    " San Jose",
                    " St. Peter",
                    " Violeta",
                    " Busdi"
                ]
            },
            "Region XI – Davao Region": {
                "Davao City": [
                    "Buhangin",
                    "Bunawan",
                    "Calinan",
                    "Catalunan Grande",
                    "J.P. Laurel",
                    "Matina Aplaya",
                    "Mintal",
                    "Poblacion",
                    "Sasa",
                    "Toril",
                    "Tugbok",
                    "Maa",
                    "Talomo",
                    "Tamayong",
                    "Panacan"
                ],
                "Tagum City": [
                    " Mankilam",
                    " Apokon",
                    " Magugpo North",
                    " La Filipina",
                    " Visayan Village"
                ],
                "Digos City": [
                    " Aplaya",
                    " Goma",
                    " San Miguel",
                    " Rufo Hill",
                    " Zone 1"
                ],
                "Panabo City": [
                    " Cagangohan",
                    " Gredu",
                    "San Francisco",
                    " Tamayong",
                    " Little Baguio"
                ]
            },
            "Region XII – SOCCSKSARGEN": {
                "General Santos City": [
                    " Apopong",
                    " Baluan",
                    " Batomelong",
                    " Buayan",
                    " Bula",
                    " Calumpang",
                    " City Heights",
                    " Conel",
                    " Dadiangas East",
                    " Dadiangas North",
                    " Dadiangas South",
                    " Dadiangas West",
                    " Fatima",
                    " Katangawan",
                    " Labangal",
                    " Lagao",
                    " Ligaya",
                    " Mabuhay",
                    " Olympog",
                    " San Isidro",
                    " San Jose",
                    " Siguel",
                    " Sinawal",
                    " Tinagacan",
                    " Upper Labay"
                ],
                "South Cotabato": [
                    " Kalawag",
                    " Koronadal",
                    " Polomolok",
                    " Surallah",
                    " Tupi"
                ],
                "Sultan Kudarat": [
                    " Isulan",
                    " Tacurong",
                    " Bagumbayan",
                    " Lebak",
                    " Kalamansig"
                ],
                "Cotabato": [
                    " Rosary Heights",
                    " Poblacion",
                    " Tamontaka",
                    " Sinsuat",
                    " Kalanganan"
                ],
                "Sarangani": [
                    " Alabel",
                    " Kiamba",
                    " Maasim",
                    " Maitum",
                    " Glan"
                ],
                
            },
            "Region XIII – Caraga": {
                "Butuan City": [
                    "Barangay Ambago",
                    "Barangay Bading",
                    "Barangay Tiniwisan",
                    "Barangay San Francisco",
                    "Barangay Dagohoy"
                ],
                "Surigao City": [
                    "Barangay Canlanipa",
                    "Barangay Poctoy",
                    "Barangay Taft",
                    "Barangay San Juan",
                    "Barangay Bonifacio"
                ],
                "Tandag City": [
                    "Barangay Poblacion",
                    "Barangay Bongdo",
                    "Barangay Maticdum",
                    "Barangay Pangi",
                    "Barangay San Agustin"
                ]
            },
            "Bangsamoro Autonomous Region in Muslim Mindanao (BARMM)": {
                "Cotabato City": [
                    "Barangay Rosary Heights",
                    "Barangay Poblacion",
                    "Barangay Tamontaka",
                    "Barangay Sinsuat",
                    "Barangay Kalanganan"
                ],
                "Marawi City": [
                    "Barangay Baclayon",
                    "Barangay Basak Malutlut",
                    "Barangay Datu Saber",
                    "Barangay Sagonsongan",
                    "Barangay Bangon"
                ],
                "Tawi-Tawi": [
                    "Barangay Bongao",
                    "Barangay Sapa-Sapa",
                    "Barangay Simunul",
                    "Barangay Panglima Sugala",
                    "Barangay Sibutu"
                ]
            }
        }

    };

    const defaultPurokOptions = [
        "Purok 1",
        "Purok 2",
        "Purok 3",
        "Purok 4",
        "Purok 5",
        "Purok 6",
        "Purok 7",
        "Purok 8",
        "Purok 9",
        "Purok 10",
        "Purok 11",
        "Purok 12",
        "Purok 13",
        "Purok 14",
        "Purok 15",
        "Purok 16",
        "Purok 17",
        "Purok 18",
        "Purok 19",
        "Purok 20",
    ];

    const defaultBlockOptions = [
        "Block 1",
        "Block 2",
        "Block 3",
        "Block 4",
        "Block 5",
        "Block 6",
        "Block 7",
        "Block 8",
        "Block 9",
        "Block 10",
        "Block 11",
        "Block 12",
        "Block 13",
        "Block 14",
        "Block 15",
        "Block 16",
        "Block 17",
        "Block 18",
        "Block 19",
        "Block 20",
        "N/A"
    ];

    const defaultStreetOptions = [
        "Phase 1",
        "Phase 2",
        "Phase 3",
        "Phase 4",
        "Phase 5",
        "Phase 6",
        "Phase 7",
        "Phase 8",
        "Phase 9",
        "Phase 10",
        "Street A",
        "Street B",
        "Street C",
        "Street D",
        "Street E",
        "Street F",
        "Street G",
        "Street H",
        "Street I",
        "Street J",
        "Lot 1",
        "Lot 2",
        "Lot 3",
        "Lot 4",
        "Lot 5",
        "Lot 6",
        "Lot 7",
        "Lot 8",
        "Lot 9",
        "Lot 10",
        "N/A"
    ];

    function populateSelect(selectElement, placeholderText, values) {

        if (!selectElement) {
            return;
        }

        selectElement.innerHTML = "";

        const emptyOption = document.createElement("option");
        emptyOption.value = "";
        emptyOption.textContent = placeholderText;
        selectElement.appendChild(emptyOption);

        values.forEach(
            function (value) {

                const option = document.createElement("option");
                option.value = value;
                option.textContent = String(value).replace(/^Barangay\s+/i, "");
                selectElement.appendChild(option);

            }
        );

        selectElement.disabled = values.length === 0;

    }

    function resetAddressCascade() {

        const regRegion = document.getElementById("regRegion");
        const regCity = document.getElementById("regCity");
        const regBarangay = document.getElementById("regBarangay");
        const regPurokZone = document.getElementById("regPurokZone");
        const regBlock = document.getElementById("regBlock");
        const regStreetPhaseLot = document.getElementById("regStreetPhaseLot");

        populateSelect(regRegion, "Select Region", []);
        populateSelect(regCity, "Select City / Municipality", []);
        populateSelect(regBarangay, "Select Barangay", []);
        populateSelect(regPurokZone, "Select Purok / Zone", []);
        populateSelect(regBlock, "Select Block (Optional)", []);
        populateSelect(regStreetPhaseLot, "Select Street / Phase / Lot (Optional)", []);

    }

    const regCountry = document.getElementById("regCountry");
    const regRegion = document.getElementById("regRegion");
    const regCity = document.getElementById("regCity");
    const regBarangay = document.getElementById("regBarangay");
    const regPurokZone = document.getElementById("regPurokZone");
    const regBlock = document.getElementById("regBlock");
    const regStreetPhaseLot = document.getElementById("regStreetPhaseLot");

    if (regCountry) {

        regCountry.addEventListener(
            "change",
            function () {

                resetAddressCascade();

                const country = regCountry.value;

                if (!country || !addressData[country]) {
                    return;
                }

                const regions = Object.keys(addressData[country]);

                populateSelect(
                    regRegion,
                    "Select Region",
                    regions
                );

                regRegion.disabled = false;

            }
        );

    }

    if (regRegion) {

        regRegion.addEventListener(
            "change",
            function () {

                const country = regCountry.value;
                const region = regRegion.value;

                populateSelect(regCity, "Select City / Municipality", []);
                populateSelect(regBarangay, "Select Barangay", []);
                populateSelect(regPurokZone, "Select Purok / Zone", []);
                populateSelect(regBlock, "Select Block (Optional)", []);
                populateSelect(regStreetPhaseLot, "Select Street / Phase / Lot (Optional)", []);

                if (!country || !region || !addressData[country] || !addressData[country][region]) {
                    return;
                }

                const cities = Object.keys(addressData[country][region]);

                populateSelect(
                    regCity,
                    "Select City / Municipality",
                    cities
                );

                regCity.disabled = false;

            }
        );

    }

    if (regCity) {

        regCity.addEventListener(
            "change",
            function () {

                const country = regCountry.value;
                const region = regRegion.value;
                const city = regCity.value;

                populateSelect(regBarangay, "Select Barangay", []);
                populateSelect(regPurokZone, "Select Purok / Zone", []);
                populateSelect(regBlock, "Select Block (Optional)", []);
                populateSelect(regStreetPhaseLot, "Select Street / Phase / Lot (Optional)", []);

                if (!country || !region || !city || !addressData[country] || !addressData[country][region] || !addressData[country][region][city]) {
                    return;
                }

                const barangays = addressData[country][region][city];

                populateSelect(
                    regBarangay,
                    "Select Barangay",
                    barangays
                );

                regBarangay.disabled = false;

            }
        );

    }

    if (regBarangay) {

        regBarangay.addEventListener(
            "change",
            function () {

                populateSelect(regPurokZone, "Select Purok / Zone", defaultPurokOptions);
                populateSelect(regBlock, "Select Block (Optional)", defaultBlockOptions);
                populateSelect(regStreetPhaseLot, "Select Street / Phase / Lot (Optional)", defaultStreetOptions);

                regPurokZone.disabled = false;
                regBlock.disabled = false;
                regStreetPhaseLot.disabled = false;

            }
        );

    }

    if (regPurokZone) {

        regPurokZone.addEventListener(
            "change",
            function () {

                if (!regPurokZone.value) {
                    return;
                }

                validateInput(regPurokZone);

            }
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

                clearFormValidation(
                    registerSection.querySelector("form")
                );

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

                clearFormValidation(
                    loginSection.querySelector("form")
                );

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
    document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            if (!validateForm(loginForm)) {
                return;
            }

            const username =
                document
                    .getElementById("loginUser")
                    .value
                    .trim();

            const password =
                document
                    .getElementById("loginPassword")
                    .value;

            const data = new URLSearchParams();

            data.append("username", username);
            data.append("password", password);

            try {

                const response =
                    await fetch("login", {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/x-www-form-urlencoded"
                        },
                        body: data.toString()
                    });

                const result =
                    await response.text();

                if (!response.ok) {

                    if (result === "INVALID") {

                        alert(
                            "Invalid username or password."
                        );

                    } else {

                        alert(result);
                    }

                    return;
                }

                if (result.startsWith("SUCCESS|")) {

                    const parts =
                        result.split("|");

                    const matchedUser = {

                        username: parts[1],
                        role: parts[2],

                        firstName: parts[3],
                        middleName: parts[4],
                        lastName: parts[5],

                        email: parts[6],
                        contactNumber: parts[7],

                        country: parts[8],
                        region: parts[9],
                        city: parts[10],
                        barangay: parts[11],
                        purokZone: parts[12],
                        block: parts[13],
                        streetPhaseLot: parts[14]
                    };

                    const role =
                        matchedUser.role;

                    saveData(
                        "swcrs_session",
                        {
                            username:
                                matchedUser.username,
                            role:
                                matchedUser.role
                        }
                    );

                    clearFormValidation(
                        loginForm
                    );

                    /* ==============================
                       RESIDENT
                    ============================== */

                    if (role === "resident") {

                        const display =
                            document.getElementById(
                                "residentDisplay"
                            );

                        if (display) {

                            display.textContent =
                                matchedUser.username;
                        }

                        populateProfileForm(
                            matchedUser
                        );

                        renderResidentReports();

                        switchSection(
                            residentArea
                        );

                        return;
                    }

                    /* ==============================
                       CREW
                    ============================== */

                    if (role === "crew") {

                        const display =
                            document.getElementById(
                                "crewDisplay"
                            );

                        if (display) {

                            display.textContent =
                                matchedUser.username;
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
                                matchedUser.username;
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

                    if (role === "admin") {

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

                } else {

                    alert(
                        "Unexpected server response."
                    );
                }

            } catch (error) {

                console.error(error);

                alert(
                    "Could not connect to the server."
                );
            }
        }
    );
}



/* =====================================================
   REGISTER
===================================================== */

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        if (!validateForm(registerForm)) {
            return;
        }

        const data = new URLSearchParams();

        data.append("firstName",
            document.getElementById("regFirstName").value.trim());

        data.append("middleName",
            document.getElementById("regMiddleName").value.trim());

        data.append("lastName",
            document.getElementById("regLastName").value.trim());

        data.append("email",
            document.getElementById("regEmail").value.trim());

        data.append("username",
            document.getElementById("regUsername").value.trim());

        data.append("password",
            document.getElementById("regPassword").value);

        data.append("contactNumber",
            document.getElementById("regContact").value.trim());

        data.append("country",
            document.getElementById("regCountry").value);

        data.append("region",
            document.getElementById("regRegion").value);

        data.append("city",
            document.getElementById("regCity").value);

        data.append("barangay",
            document.getElementById("regBarangay").value);

        data.append("purokZone",
            document.getElementById("regPurokZone").value);

        data.append("block",
            document.getElementById("regBlock").value);

        data.append("streetPhaseLot",
            document.getElementById("regStreetPhaseLot").value);

        data.append("role",
            document.getElementById("regRole").value);

        try {

            const response = await fetch("register", {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded"
                },
                body: data.toString()
            });

            const result = await response.text();

            if (response.ok) {

                alert(result);

                registerForm.reset();
                clearFormValidation(registerForm);

                switchSection(loginSection);

            } else {

                alert(result);

            }

        } catch (error) {

            console.error(error);

            alert(
                "Could not connect to the server."
            );
        }

    });
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


                if (!validateForm(newReportForm)) {

                    return;

                }


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

                clearFormValidation(newReportForm);


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


                if (!validateForm(collectionReportForm)) {

                    return;

                }


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

                clearFormValidation(collectionReportForm);


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


                if (!validateForm(crewSegregationForm)) {

                    return;

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

                clearFormValidation(crewSegregationForm);


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


                if (!validateForm(crewDisposalForm)) {

                    return;

                }


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

                clearFormValidation(crewDisposalForm);


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


                if (!validateForm(crewFeedbackForm)) {

                    return;

                }


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

                clearFormValidation(crewFeedbackForm);


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


    const segregationForm =
        document.getElementById(
            "segregationForm"
        );


    if (segregationForm) {

        segregationForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                if (!validateForm(segregationForm)) {

                    return;

                }


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

                clearFormValidation(segregationForm);


                alert(
                    "Segregation monitoring record added successfully!"
                );


                renderFacilitatorDashboard();

                renderCrewSegregation();

            }
        );

    }

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




    const crewForm =
        document.getElementById(
            "crewForm"
        );


    if (crewForm) {

        crewForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                if (!validateForm(crewForm)) {

                    return;

                }


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
                                "crewAssignedArea"
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

                clearFormValidation(crewForm);


                alert(
                    "Crew member added successfully!"
                );


                renderCrewManagement();

            }
        );

    }




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


    const profileForm =
        document.getElementById(
            "profileForm"
        );

    function populateProfileForm(account) {

        if (!profileForm || !account) {
            return;
        }

        const profileValues = {
            profileFirstName: account.firstName,
            profileLastName: account.lastName,
            profileEmail: account.email,
            profilePhone: account.contactNumber,
            profileAddress: [
                account.country,
                account.region,
                account.city,
                account.barangay,
                account.purokZone,
                account.block,
                account.streetPhaseLot
            ].filter(Boolean).join(", ")
        };

        Object.keys(profileValues).forEach(
            function (id) {

                const input = document.getElementById(id);

                if (input) {
                    input.value = profileValues[id] || "";
                }

            }
        );

    }


    if (profileForm) {

        profileForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                if (!validateForm(profileForm)) {

                    return;

                }

                const session = getData("swcrs_session", null);
                const accounts = getData("swcrs_accounts", []);
                const accountIndex = accounts.findIndex(
                    function (account) {
                        return session && account.username.toLowerCase() === session.username.toLowerCase();
                    }
                );

                if (accountIndex === -1) {
                    alert("Please login again before updating your profile.");
                    return;
                }

                accounts[accountIndex] = {
                    ...accounts[accountIndex],
                    firstName: document.getElementById("profileFirstName").value.trim(),
                    lastName: document.getElementById("profileLastName").value.trim(),
                    email: document.getElementById("profileEmail").value.trim(),
                    contactNumber: document.getElementById("profilePhone").value.trim(),
                    profileAddress: document.getElementById("profileAddress").value.trim(),
                    profileZone: document.getElementById("profileZone").value
                };

                saveData("swcrs_accounts", accounts);


                alert(
                    "Profile updated successfully!"
                );


                clearFormValidation(profileForm);

            }
        );

    }

    function logout() {

        localStorage.removeItem("swcrs_session");

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


        switchSection(
            loginSection
        );


        if (loginForm) {

            loginForm.reset();

            clearFormValidation(loginForm);

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


    renderResidentReports();

    renderCrewCollection();

    renderCrewSegregation();

    renderCrewDisposal();

    renderCrewRoutes();

    renderCrewFeedback();

    renderFacilitatorDashboard();

    renderAdminReports();

    renderCrewManagement();

    const savedSession = getData("swcrs_session", null);
    const savedAccount = savedSession
        ? getData("swcrs_accounts", []).find(
            function (account) {
                return account.username.toLowerCase() === savedSession.username.toLowerCase() && account.role === savedSession.role;
            }
        )
        : null;

    if (savedAccount) {
        if (savedAccount.role === "resident") {
            document.getElementById("residentDisplay").textContent = savedAccount.username;
            populateProfileForm(savedAccount);
            switchSection(residentArea);
        } else if (savedAccount.role === "crew") {
            document.getElementById("crewDisplay").textContent = savedAccount.username;
            switchSection(crewArea);
        } else if (savedAccount.role === "facilitator") {
            document.getElementById("facilitatorDisplay").textContent = savedAccount.username;
            showFacilitatorMenu();
            switchSection(cityFacilitatorArea);
        } else if (savedAccount.role === "admin") {
            switchSection(adminArea);
        }
    } else {
        localStorage.removeItem("swcrs_session");
        switchSection(loginSection);
    }

    const crudConfigurations = {
        residentReportsBody: {
            storage: "swcrs_reports",
            render: renderResidentReports,
            fields: [
                ["location", "Location", "text", true],
                ["type", "Waste Type", "text", true],
                ["priority", "Priority", "text", true],
                ["description", "Description", "textarea", true],
                ["status", "Status", "text", true]
            ]
        },

        adminReportsTable: {
            storage: "swcrs_reports",
            render: renderAdminReports,
            fields: [
                ["location", "Location", "text", true],
                ["type", "Waste Type", "text", true],
                ["priority", "Priority", "text", true],
                ["status", "Status", "text", true]
            ]
        },

        crewCollectionTable: {
            storage: "swcrs_collection",
            render: renderCrewCollection,
            fields: [
                ["location", "Location", "text", true],
                ["wasteType", "Waste Type", "text", true],
                ["date", "Date", "date", true],
                ["wasteLevel", "Waste Level", "text", true],
                ["status", "Status", "text", true]
            ]
        },

        facilitatorReportsTable: {
            storage: "swcrs_collection",
            render: renderFacilitatorDashboard,
            fields: [
                ["location", "Location", "text", true],
                ["wasteType", "Waste Type", "text", true],
                ["date", "Date", "date", true],
                ["wasteLevel", "Waste Level", "text", true],
                ["status", "Status", "text", true]
            ]
        },

        facilitatorDashboardTable: {
            storage: "swcrs_collection",
            render: renderFacilitatorDashboard,
            fields: [
                ["location", "Location", "text", true],
                ["wasteType", "Waste Type", "text", true],
                ["date", "Date", "date", true],
                ["wasteLevel", "Waste Level", "text", true],
                ["status", "Status", "text", true]
            ]
        },

        crewSegregationTable: {
            storage: "swcrs_segregation",
            render: renderCrewSegregation,
            fields: [
                ["location", "Location", "text", true],
                ["binId", "Bin ID", "text", true],
                ["biodegradable", "Biodegradable", "text", true],
                ["recyclable", "Recyclable", "text", true],
                ["residual", "Residual", "text", true],
                ["status", "Status", "text", true],
                ["notes", "Notes", "textarea", false]
            ]
        },

        facilitatorSegregationTable: {
            storage: "swcrs_segregation",
            render: renderFacilitatorSegregationTable,
            fields: [
                ["location", "Location", "text", true],
                ["binId", "Bin ID", "text", true],
                ["biodegradable", "Biodegradable", "text", true],
                ["recyclable", "Recyclable", "text", true],
                ["residual", "Residual", "text", true],
                ["status", "Status", "text", true]
            ]
        },

        crewDisposalTable: {
            storage: "swcrs_disposal",
            render: renderCrewDisposal,
            fields: [
                ["truck", "Truck", "text", true],
                ["category", "Category", "text", true],
                ["weight", "Weight", "number", true],
                ["facility", "Facility", "text", true],
                ["status", "Status", "text", true]
            ]
        },

        crewRouteTable: {
            storage: "swcrs_routes",
            render: renderCrewRoutes,
            fields: [
                ["sequence", "Sequence", "number", true],
                ["location", "Location", "text", true],
                ["bin", "Bin", "text", true],
                ["fill", "Fill Level", "text", true],
                ["action", "Action", "text", true],
                ["status", "Status", "text", true]
            ]
        },

        crewFeedbackTable: {
            storage: "swcrs_feedback",
            render: renderCrewFeedback,
            fields: [
                ["topic", "Topic", "text", true],
                ["target", "Target", "text", true],
                ["message", "Message", "textarea", true],
                ["status", "Status", "text", true]
            ]
        },

        crewTable: {
            storage: "swcrs_crew",
            render: renderCrewManagement,
            fields: [
                ["name", "Name", "text", true],
                ["area", "Assigned Area", "text", true],
                ["shift", "Shift", "text", true],
                ["status", "Status", "text", true]
            ]
        }
    };


    function createCrudModal() {

        let modal = document.getElementById("crudEditModal");

        if (modal) {
            return modal;
        }

        modal = document.createElement("div");
        modal.id = "crudEditModal";

        modal.style.cssText = `
            display:none;
            position:fixed;
            inset:0;
            z-index:9999;
            background:rgba(0,0,0,.55);
            align-items:center;
            justify-content:center;
        `;

        modal.innerHTML = `
            <div class="crud-edit-box">
                <form id="crudEditForm">
                    <h2>Edit Record</h2>

                    <div id="crudEditFields"></div>

                    <div class="crud-edit-buttons">
                        <button type="submit" class="btn-action">
                            Save Changes
                        </button>

                        <button type="button"
                            id="crudCancelButton"
                            class="btn-action">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector("#crudCancelButton").addEventListener(
            "click",
            function () {
                modal.style.display = "none";
            }
        );

        return modal;
    }


    function openCrudEditor(storageKey, recordIndex, fields, renderFunction) {

        const records = getData(storageKey, []);
        const record = records[recordIndex];

        if (!record) {
            return;
        }

        const modal = createCrudModal();
        const form = modal.querySelector("#crudEditForm");
        const container = modal.querySelector("#crudEditFields");

        container.innerHTML = "";

        fields.forEach(function (field) {

            const key = field[0];
            const label = field[1];
            const type = field[2];
            const required = field[3];
            const inputId = "crud_" + key;

            const wrapper = document.createElement("div");
            wrapper.style.marginBottom = "12px";

            const labelElement = document.createElement("label");
            labelElement.htmlFor = inputId;
            labelElement.textContent = label;

            let input;

            if (type === "textarea") {
                input = document.createElement("textarea");
                input.rows = 3;
            } else {
                input = document.createElement("input");
                input.type = type;
            }

            input.id = inputId;
            input.value = record[key] ?? "";
            input.required = required;
            input.style.width = "100%";
            input.style.boxSizing = "border-box";

            const error = document.createElement("span");
            error.id = inputId + "-error";
            error.className = "validation-error";

            wrapper.appendChild(labelElement);
            wrapper.appendChild(input);
            wrapper.appendChild(error);
            container.appendChild(wrapper);

            input.addEventListener("input", function () {
                validateInput(input);
            });

            input.addEventListener("blur", function () {
                validateInput(input);
            });
        });

        modal.style.display = "flex";

        form.onsubmit = function (event) {

            event.preventDefault();

            if (!validateForm(form)) {
                return;
            }

            fields.forEach(function (field) {

                const key = field[0];
                const input = document.getElementById("crud_" + key);

                record[key] = input.value.trim();

                if (field[2] === "number") {
                    record[key] = Number(record[key]);
                }
            });

            saveData(storageKey, records);
            modal.style.display = "none";

            renderFunction();

            renderResidentReports();
            renderCrewCollection();
            renderCrewSegregation();
            renderFacilitatorDashboard();
            renderAdminReports();
            renderCrewManagement();
        };
    }


    function deleteCrudRecord(storageKey, recordIndex, renderFunction) {

        const records = getData(storageKey, []);

        if (!records[recordIndex]) {
            return;
        }

        if (!confirm("Are you sure you want to permanently delete this record?")) {
            return;
        }

        records.splice(recordIndex, 1);
        saveData(storageKey, records);

        renderFunction();

        renderResidentReports();
        renderCrewCollection();
        renderCrewSegregation();
        renderFacilitatorDashboard();
        renderAdminReports();
        renderCrewManagement();
    }


    function addCrudButtons() {

        Object.keys(crudConfigurations).forEach(function (tableId) {

            const config = crudConfigurations[tableId];
            const tbody = document.getElementById(tableId);

            if (!tbody) {
                return;
            }

            Array.from(tbody.rows).forEach(function (row, index) {

                if (row.dataset.crudReady === "true") {
                    return;
                }

                const cell = document.createElement("td");

                cell.innerHTML = `
                    <button type="button"
                        class="btn-action crud-edit"
                        data-table="${tableId}"
                        data-index="${index}">
                        Edit
                    </button>

                    <button type="button"
                        class="btn-action crud-delete"
                        data-table="${tableId}"
                        data-index="${index}"
                        style="margin-left:6px;background:#b42318;color:#fff;">
                        Delete
                    </button>
                `;

                row.appendChild(cell);
                row.dataset.crudReady = "true";
            });
        });
    }


    document.addEventListener("click", function (event) {

        const editButton = event.target.closest(".crud-edit");
        const deleteButton = event.target.closest(".crud-delete");
        const button = editButton || deleteButton;

        if (!button) {
            return;
        }

        const tableId = button.dataset.table;
        const recordIndex = Number(button.dataset.index);
        const config = crudConfigurations[tableId];

        if (!config) {
            return;
        }

        if (editButton) {
            openCrudEditor(
                config.storage,
                recordIndex,
                config.fields,
                config.render
            );
        }

        if (deleteButton) {
            deleteCrudRecord(
                config.storage,
                recordIndex,
                config.render
            );
        }
    });


    const crudObserver = new MutationObserver(function () {
        addCrudButtons();
    });

    crudObserver.observe(document.body, {
        childList: true,
        subtree: true
    });

    addCrudButtons();

});