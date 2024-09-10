document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(TextPlugin);

  // Pastikan selektor menggunakan tanda titik jika itu kelas

  var hero = gsap.timeline({ delay: 0.1 });

  hero
    .from(".title-be", {
      duration: 1,
      text: "",
    })
    .from(".title-name", {
      duration: 1,
      text: "",
    })
    .from(".title-role", {
      duration: 1,
      text: "",
    });

  hero.from(".text-tick", {
    duration: 3,
    delay: 1,
    text: "",
  });

  // Nav
  gsap.from(".boun", {
    delay: 0.1,
    duration: 1.5,
    y: "-100%",
    opacity: 0,
    ease: "bounce",
  });

  gsap.from(".text-glic", {
    duration: 2,
    text: "",
    delay: 1,
  });

  // Timeline untuk animasi kemunculan
  const appearTimeline = gsap
    .timeline({ paused: true })
    .from([".float1", ".float2", ".float3"], {
      y: "-100%",
      opacity: 0,
      duration: 1,
      ease: "bounce",
      stagger: 0.5, // Mengatur jeda antara animasi elemen
      onComplete: startIdleAnimations, // Mulai animasi idle setelah kemunculan
    })
    .from(".float-text", {
      duration: 1,

      text: "",
    });

  // Animasi Idle (mengambang) untuk masing-masing elemen
  let idleAnimations = {};

  function startIdleAnimations() {
    document
      .querySelectorAll(".float1, .float2, .float3")
      .forEach((element) => {
        idleAnimations[element.className] = gsap.to(element, {
          y: "-20px",
          duration: 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
  }

  // Animasi saat hover dan mengembalikan ke idle
  function toggleHoverAnimation(isHovering, element) {
    const idleAnimation = idleAnimations[element.className];

    if (isHovering) {
      idleAnimation.pause(); // Pause animasi idle hanya pada elemen yang di-hover
      gsap.to(element, { scale: 1.2, duration: 0.3 });
    } else {
      gsap.to(element, { scale: 1, duration: 0.3 });
      idleAnimation.play(); // Lanjutkan animasi idle pada elemen yang di-hover
    }
  }

  // Event Listeners untuk hover dan mouse leave
  document.querySelectorAll(".float1, .float2, .float3").forEach((element) => {
    element.addEventListener("mouseenter", () =>
      toggleHoverAnimation(true, element)
    );
    element.addEventListener("mouseleave", () =>
      toggleHoverAnimation(false, element)
    );
  });

  // Jalankan animasi kemunculan
  appearTimeline.play();

  //===================
});

// const port = gsap.timeline({
//   scrollTrigger: {
//     scrub: 1,
//     pin: true,
//     trigger: "#pin-windmill",
//     start: 0,
//     endTrigger: "#pin-windmill-wrap",
//     end: "bottom 50%",
//   },
// });

// gsap.from(".bak", {
//   delay: 1.5,
//   stagger: 0.5,
//   duration: 1.5,
//   y: "-100%",
//   opacity: 0,
//   ease: "back",
// });

// gsap.from(".asd", {
//   duration: 1,
//   rotateY: 360,
//   opacity: 0,
// });

// gsap.from(".baba", {
//   duration: 1,
//   x: -50,
//   opacity: 0,
//   delay: 0.5,
//   //   ease: "back",
// });

// gsap.to(".float", {
//   delay: 1.5,
//   y: "-20px", // Bergerak naik sejauh 20px
//   duration: 2, // Durasi animasi 2 detik
//   ease: "sine.inOut", // Efek easing yang lembut
//   repeat: -1, // Ulangi tanpa henti
//   yoyo: true, // Bergerak bolak-balik (naik dan turun)
// });
