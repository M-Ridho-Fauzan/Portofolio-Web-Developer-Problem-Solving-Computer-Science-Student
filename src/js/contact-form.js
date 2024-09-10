document
  .getElementById("contact-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Get the reCAPTCHA response
    var recaptchaResponse = grecaptcha.getResponse();

    if (!recaptchaResponse) {
      alert("Mohon selesaikan reCAPTCHA.");
      return;
    }

    try {
      // Get form data
      var name = document.getElementById("name").value;
      var email = document.getElementById("email").value;
      var message = document.getElementById("message").value;
      var website = document.getElementById("website").value;

      // Prepare parameters for EmailJS
      var params = {
        from_name: name,
        email_id: email,
        website_url: website,
        message: message,
        "g-recaptcha-response": recaptchaResponse, // Include reCAPTCHA response
      };

      // Send email using EmailJS
      const emailRes = await emailjs.send(
        "service_foxifpb",
        "template_k6sl1rl",
        params
      );
      console.log("SUCCESS!", emailRes.status, emailRes.text);
      alert("Pesan berhasil dikirim!");
      grecaptcha.reset(); // Reset reCAPTCHA
      document.getElementById("contact-form").reset(); // Reset form
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal mengirim pesan. Silakan coba lagi.");
    }
  });
