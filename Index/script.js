document.querySelectorAll('input[name="expert-option"]').forEach((radio) => {
    radio.addEventListener("change", function () {
        document.getElementById("email").disabled = false;
        document.getElementById("phone").disabled = false;
        document.getElementById("contact-btn").disabled = false;
    });
});

