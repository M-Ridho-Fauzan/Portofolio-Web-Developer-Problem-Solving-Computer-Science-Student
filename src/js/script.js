document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector("#hamburger");
  const navMenu = document.querySelector("#nav-menu");
  const header = document.querySelector("header");
  const toTop = document.querySelector("#to-top");
  const darkToggle = document.querySelector("#dark-toggle");
  const html = document.querySelector("html");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("hamburger-active");
    navMenu.classList.toggle("hidden");
  });

  window.onscroll = () => {
    const fixedNav = header.offsetTop;

    if (window.scrollY > fixedNav) {
      header.classList.add("navbar-fixed");
      toTop.classList.remove("hidden");
      header.classList.add("flex");
    } else {
      header.classList.remove("navbar-fixed");
      toTop.classList.add("hidden");
      header.classList.remove("flex");
    }
  };

  // Event listener untuk close menu saat klik di luar
  document.addEventListener("click", (event) => {
    if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
      hamburger.classList.remove("hamburger-active");
      navMenu.classList.add("hidden");
    }
  });

  darkToggle.addEventListener("click", () => {
    if (darkToggle.checked) {
      html.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      html.classList.remove("dark");
      localStorage.theme = "light";
    }
  });

  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    darkToggle.checked = true;
  } else {
    darkToggle.checked = false;
  }

  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      // Jika scroll ke bawah
      header.classList.add("-top-20");
      header.classList.remove("top-0");
    } else {
      //   console.log("Scrolling detected");
      header.classList.add("top-0");
      header.classList.remove("-top-20");
    }

    lastScrollTop = scrollTop;
  });

  const scrollContainer3 = document.getElementById("scrollContainer3");
  const curtainSkill = document.getElementById("curtain-skill");
  const startBtn3 = document.getElementById("startBtn3");
  const stopBtn3 = document.getElementById("stopBtn3");
  let scrollTween3;

  function setupInfiniteScroll() {
    const items = Array.from(scrollContainer3.children);
    const totalItems = items.length;
    const itemWidth =
      items[0].offsetWidth +
      parseInt(window.getComputedStyle(items[0]).marginLeft) * 2;
    const totalWidth = itemWidth * totalItems;

    // Clone items and append them to create a seamless loop
    for (let i = 0; i < totalItems * 2; i++) {
      const clone = items[i % totalItems].cloneNode(true);
      scrollContainer3.appendChild(clone);
    }

    function startScroll() {
      if (scrollTween3) scrollTween3.kill();

      scrollTween3 = gsap.to(scrollContainer3, {
        x: `-=${totalWidth}`,
        duration: totalItems * 1, // Adjust this value to change scroll speed
        ease: "none",
        repeat: -1,
        onUpdate: () => {
          if (Math.abs(gsap.getProperty(scrollContainer3, "x")) >= totalWidth) {
            gsap.set(scrollContainer3, { x: 0 });
          }
        },
      });
    }

    function pauseScroll() {
      if (scrollTween3) scrollTween3.pause();
    }

    function resumeScroll() {
      if (scrollTween3) scrollTween3.resume();
    }

    // Start scrolling automatically
    startScroll();

    function goScroll() {
      resumeScroll();
      startBtn3.classList.add("hidden");
      curtainSkill.classList.remove("hidden");
      stopBtn3.classList.remove("hidden");
    }

    function endScroll() {
      pauseScroll();
      startBtn3.classList.remove("hidden");
      curtainSkill.classList.add("hidden");
      stopBtn3.classList.add("hidden");
    }

    // Add event listeners for hover
    scrollContainer3.addEventListener("mouseenter", endScroll);
    scrollContainer3.addEventListener("mouseleave", goScroll);
    //
    startBtn3.addEventListener("click", goScroll);
    stopBtn3.addEventListener("click", endScroll);
    //
    document.addEventListener("click", (event) => {
      if (!scrollContainer3.contains(event.target)) {
        goScroll();
      }
    });
  }

  // Run setup when the page is loaded
  window.addEventListener("load", setupInfiniteScroll);

  // const formContact = document.getElementById("contact-form");

  // formContact.addEventListener("submit", (e) => {
  //   e.preventDefault();

  //   const captchaResponse = grecaptcha.getResponse();

  //   if (!captchaResponse.length > 0) {
  //     throw new Error("captcha not complete!");
  //   }

  //   const fd = new FormData(e.target);
  //   const params = new URLSearchParams(fd);

  //   fetch("http://httpbin.org/post", {
  //     method: "POST",
  //     body: params,
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data))
  //     .then((err) => console.error(err));
  // });

  //------------------------

  const formContact = document.getElementById("contact-form");
  const contactName = document.getElementById("name");
  const contactEmail = document.getElementById("email");
  const contactMsg = document.getElementById("message");
  const contactWeb = document.getElementById("website");
  const contactBtn = document.getElementById("send-contact-btn");
  let canSend = true;
  const delay = 10000;

  formContact.addEventListener("submit", () => {
    // e.preventDefault(); // Mencegah form dikirim secara default
    if (!canSend) {
      alert("Please wait a few seconds before trying again.");
      return;
    }

    // validasi input kolom website
    if (contactWeb.value === "") {
      contactWeb.value = "Tidak Ada";
    }

    // Validasi input
    if (
      contactName.value === "" ||
      contactEmail.value === "" ||
      contactMsg.value === ""
    ) {
      alert("Please fill in all the fields.");
      return;
    }

    let params = {
      from_name: contactName.value,
      email_id: contactEmail.value,
      website_url: contactWeb.value,
      message: contactMsg.value,
    };

    contactBtn.disabled = true; // Disable tombol selama proses pengiriman
    contactBtn.textContent = "Sending...";

    emailjs
      .send("service_foxifpb", "template_k6sl1rl", params)
      .then((res) => {
        alert("Success!" + res.status);
        contactName.value = "";
        contactEmail.value = "";
        contactMsg.value = "";
        contactWeb.value = "";
        contactBtn.disabled = false;
        contactBtn.textContent = "Send"; // Kembalikan tombol ke teks semula
        canSend = false;
        setTimeout(() => (canSend = true), delay); // Reset setelah 10 detik
      })
      .catch((err) => {
        alert("Failed! Error: " + JSON.stringify(err));
        contactBtn.disabled = false;
        contactBtn.textContent = "Send";
      });
  });
});
