document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("enquiryForm");
    const responseDiv = document.getElementById("formResponse");

    form.addEventListener("submit", function (event) {
        // Prevent the default browser full-page reload
        event.preventDefault();

        // Clear previous error messages and responses
        clearErrors();
        responseDiv.innerHTML = "";
        responseDiv.className = "";

        // Collect Form Inputs
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const interest = document.getElementById("interest").value;
        const message = document.getElementById("message").value.trim();

        let isValid = true;

        // 1. Full Name Validation
        if (name.length < 3) {
            showError("nameError", "Name must be at least 3 characters long.");
            isValid = false;
        }

        // 2. Email Validation using Regular Expression (Regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError("emailError", "Please enter a valid email address.");
            isValid = false;
        }

        // 3. Message Length Validation
        if (message.length < 10) {
            showError("messageError", "Your message must be at least 10 characters long.");
            isValid = false;
        }

        // If validation checks fail, halt execution
        if (!isValid) return;

        // --- SECTION 4.1: AJAX FORM SUBMISSION VIA FETCH API ---
        // Change submit button state visually
        const submitBtn = document.getElementById("submitBtn");
        submitBtn.innerText = "Processing...";
        submitBtn.disabled = true;

        // Simulate an asynchronous server response
        setTimeout(() => {
            submitBtn.innerText = "Submit Enquiry";
            submitBtn.disabled = false;

            // Tailored client responses based on criteria selected (Requirement 4.1)
            let answerText = "";
            if (interest === "wholesale") {
                answerText = `Thank you, ${name}! Your wholesale catalog request has been processed. Price tier details will be sent to ${email} shortly.`;
            } else if (interest === "custom") {
                answerText = `Hi ${name}, our pastry chefs have received your Custom design request and will check date availability for you!`;
            } else if (interest === "volunteer") {
                answerText = `Thank you for volunteering, ${name}! We appreciate your support and will send onboarding information soon.`;
            } else {
                answerText = `Thank you for reaching out to The Golden Crust, ${name}. Your general enquiry has been successfully logged.`;
            }

            // Display success message directly on the interface
            responseDiv.className = "success-box";
            responseDiv.innerHTML = `<p>${answerText}</p>`;
            
            // Clear the form fields after successful async delivery
            form.reset();
        }, 1500); // 1.5-second processing delay simulation
    });

    function showError(elementId, message) {
        const errorSpan = document.getElementById(elementId);
        errorSpan.innerText = message;
        errorSpan.style.color = "#B55D3A"; /* Terracotta alert color */
        errorSpan.style.display = "block";
        errorSpan.style.fontSize = "0.85rem";
        errorSpan.style.textAlign = "left";
        errorSpan.style.marginTop = "4px";
    }

    function clearErrors() {
        const errorSpans = document.querySelectorAll(".error-msg");
        errorSpans.forEach(span => span.innerText = "");
    }
});