document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card-con");
  const portoDetailsBtn = document.querySelector("#porto-details-btn");
  const portoDetails = document.querySelector("#porto-details");

  portoDetails.classList.add("hidden");

  portoDetailsBtn.addEventListener("click", () => {
    if (portoDetails.classList.contains("hidden")) {
      portoDetailsBtn.innerText = `Show less ▴`;
      portoDetails.classList.remove("hidden");

      setTimeout(() => {
        portoDetails.classList.remove("opacity-0", "scale-95");
        portoDetails.classList.add("opacity-100", "scale-100");
      }, 10);
    } else {
      portoDetailsBtn.innerText = `Show more ▾`;
      portoDetails.classList.add("opacity-0", "scale-95");
      portoDetails.classList.remove("opacity-100", "scale-100");

      portoDetails.addEventListener(
        "transitionend",
        () => {
          portoDetails.classList.add("hidden");
        },
        { once: true }
      );
    }
  });

  // Fungsi untuk menutup semua card
  function closeAllCards() {
    cards.forEach((card) => {
      card.classList.remove("flex-[0_0_576px]", "group");
      card.classList.add("flex-[0_0_120px]");
    });
  }

  // Tambahkan event listener untuk setiap card
  cards.forEach((card) => {
    card.addEventListener("click", (event) => {
      event.stopPropagation(); // Mencegah event bubbling

      if (card.classList.contains("flex-[0_0_576px]")) {
        closeAllCards();
      } else {
        closeAllCards();
        card.classList.remove("flex-[0_0_120px]");
        card.classList.add("flex-[0_0_576px]", "group");
      }
    });
  });

  // Tambahkan event listener ke document untuk menutup card jika area di luar card diklik
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".card-con")) {
      closeAllCards();
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".card-porto").forEach((cardBtm) => {
    const textDetail = cardBtm.querySelector(".card-text-desk");
    const toggleBtn = cardBtm.querySelector(".toggle-btn"); // Gunakan tombol yang sudah ada di HTML

    if (textDetail && toggleBtn) {
      const wordLimit = 40;
      const fullText = textDetail.innerText.replace("Read more...", "").trim(); // Ambil teks tanpa tombol

      // Fungsi untuk memotong teks
      function truncateText(trText, wordLimit) {
        return trText.split(" ").slice(0, wordLimit).join(" ");
      }

      // Inisialisasi teks yang dipotong
      const truncatedText = truncateText(fullText, wordLimit);

      // Menampilkan teks yang dipotong (tetap pertahankan tombol di HTML)
      textDetail.innerHTML = `${truncatedText} `;
      textDetail.appendChild(toggleBtn); // Jangan tambahkan tombol lagi, gunakan yang ada

      // Event listener untuk tombol "Read more..." atau "Read less"
      toggleBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Mencegah klik tombol mempengaruhi event card
        if (toggleBtn.innerText === "Read more...") {
          // Saat tombol "Read more..." diklik, tampilkan teks penuh
          textDetail.innerHTML = `${fullText} `;
          toggleBtn.innerText = "Read less";
        } else {
          // Saat tombol "Read less" diklik, kembalikan teks yang dipotong
          textDetail.innerHTML = `${truncatedText} `;
          toggleBtn.innerText = "Read more...";
        }
        textDetail.appendChild(toggleBtn); // Tambahkan tombol kembali
      });
    }
  });
});
