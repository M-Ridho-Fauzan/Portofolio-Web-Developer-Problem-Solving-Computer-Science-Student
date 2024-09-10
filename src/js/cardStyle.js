// document.addEventListener("DOMContentLoaded", function () {
// document.querySelectorAll(".card-porto").forEach((cardBtm) => {
//   const textDetail = cardBtm.querySelector(".card-text-desk");
//   if (textDetail) {
//     const wordLimit = 20;
//     const fullText = textDetail.innerText;

//     // Fungsi untuk memotong teks
//     function truncateText(trText, wordLimit) {
//       return trText.split(" ").slice(3, wordLimit).join(" ");
//     }

//     // Inisialisasi teks yang dipotong
//     const truncatedText = truncateText(fullText, wordLimit);
//     // Simpan tombol
//     let toggleBtn = `<button class="text-base text-secondary dark:text-darkFont toggle-btn">Read more</button>`;

//     // Pasang teks yang dipotong beserta tombol "Read more"
//     textDetail.innerHTML = `${truncatedText} ${toggleBtn}`;

//     // Event listener untuk tombol
//     textDetail.addEventListener("click", (e) => {
//       if (e.target.classList.contains("toggle-btn")) {
//         if (e.target.innerText === "Read more") {
//           // Saat tombol "Read more" diklik, tampilkan teks penuh
//           textDetail.innerHTML = `${fullText} <button class="text-base text-secondary dark:text-darkFont toggle-btn">Read less</button>`;
//         } else {
//           // Saat tombol "Read less" diklik, kembalikan teks yang dipotong
//           textDetail.innerHTML = `${truncatedText} <button class="text-base text-secondary dark:text-darkFont toggle-btn">Read more</button>`;
//         }
//       }
//     });
//   }
// });
// });
