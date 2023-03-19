const toastify = {

    success: ({
        text: "Success!!",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
            background: "#1AE263",
        },
        onClick: function () { } // Callback after click
    }).showToast(),
    info: ({
        text: "This is information yoou asked for?!!",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
            background: "#1AE263",
        },
        onClick: function () { } // Callback after click
    }).showToast(),
    warning: ({
        text: "Pay attention here you might lose everything!!",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
            background: "#1AE263",
        },
        onClick: function () { } // Callback after click
    }).showToast(),
    error: ({
        text: "Server error try again later",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
            background: "#1AE263",
        },
        onClick: function () { } // Callback after click
    }).showToast()

}
