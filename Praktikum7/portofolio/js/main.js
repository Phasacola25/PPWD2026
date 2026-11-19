// Script bersama untuk seluruh halaman portofolio.
document.addEventListener("DOMContentLoaded", () => {
  // Tahun footer otomatis.
  document.querySelectorAll(".current-year").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  // Navigasi mobile.
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Tutup navigasi" : "Buka navigasi");
    });
  }

  // Efek mengetik hanya dijalankan pada halaman yang memiliki elemen target.
  const typingText = document.getElementById("typing-text");
  if (typingText) {
    const words = ["Web Developer", "Mahasiswa Sistem Informasi", "Technology Enthusiast"];
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {
      const currentWord = words[wordIndex];
      charIndex += deleting ? -1 : 1;
      typingText.textContent = currentWord.slice(0, charIndex);

      let delay = deleting ? 55 : 100;
      if (!deleting && charIndex === currentWord.length) {
        deleting = true;
        delay = 1500;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 350;
      }
      window.setTimeout(typeEffect, delay);
    }
    typeEffect();
  }

  // Data proyek dirender hanya jika project-grid tersedia.
  const projectGrid = document.getElementById("project-grid");
  if (projectGrid) {
    const projects = [
      { title: "Website Profil", description: "Website profil sederhana menggunakan HTML dan CSS.", symbol: "HTML" },
      { title: "Kalkulator JavaScript", description: "Latihan logika dan interaksi menggunakan JavaScript.", symbol: "JS" },
      { title: "Form Interaktif", description: "Formulir dengan pemeriksaan input di sisi browser.", symbol: "FORM" }
    ];

    projectGrid.replaceChildren();
    projects.forEach((project) => {
      const card = document.createElement("article");
      card.className = "project-card";

      const art = document.createElement("div");
      art.className = "project-art";
      art.textContent = project.symbol;

      const copy = document.createElement("div");
      copy.className = "project-copy";
      const title = document.createElement("h3");
      title.textContent = project.title;
      const description = document.createElement("p");
      description.textContent = project.description;

      copy.append(title, description);
      card.append(art, copy);
      projectGrid.appendChild(card);
    });
  }

  // Validasi formulir kontak. Data tidak dikirim ke server.
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    const fields = ["name", "email", "phone", "subject", "message"];
    const status = document.getElementById("form-status");

    function showError(fieldName, message) {
      const field = contactForm.elements[fieldName];
      const error = document.getElementById(`${fieldName}-error`);
      field.classList.toggle("invalid", Boolean(message));
      field.setAttribute("aria-invalid", String(Boolean(message)));
      if (error) error.textContent = message;
    }

    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      let valid = true;

      fields.forEach((fieldName) => {
        const field = contactForm.elements[fieldName];
        const value = field.value.trim();
        let message = "";

        if (!value) {
          message = "Bagian ini wajib diisi.";
        } else if (fieldName === "name" && value.length < 3) {
          message = "Nama minimal terdiri dari 3 karakter.";
        } else if (fieldName === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          message = "Masukkan alamat email yang valid.";
        } else if (fieldName === "phone" && !/^[0-9+() -]{8,20}$/.test(value)) {
          message = "Nomor telepon harus 8–20 karakter dan berisi angka atau + ( ) -.";
        } else if (fieldName === "message" && value.length < 10) {
          message = "Pesan minimal terdiri dari 10 karakter.";
        }

        showError(fieldName, message);
        if (message) valid = false;
      });

      if (valid) {
        status.textContent = "Validasi berhasil. Formulir siap diproses (belum dikirim ke server).";
        contactForm.reset();
        fields.forEach((fieldName) => showError(fieldName, ""));
      } else {
        status.textContent = "Periksa kembali bagian yang masih salah.";
      }
    });

    fields.forEach((fieldName) => {
      contactForm.elements[fieldName].addEventListener("input", () => {
        showError(fieldName, "");
        status.textContent = "";
      });
    });
  }
});
