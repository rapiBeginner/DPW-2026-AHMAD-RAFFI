function initNavToggle() {
  const toggleBtn = document.getElementById("nav-toggle-btn");
  const nav = document.querySelector("header nav");
  if (!toggleBtn || !nav) retrun;

  toggleBtn.addEventListener("click", function () {
    nav.classList.toggle("nav-open");
  });
}

// Memakai event delegation di document karena baris tabel sekarang
// dirender dinamis via fetch (lihat buku.js/anggota.js) sehingga
// tombol .btn-hapus belum tentu ada saat DOMContentLoaded.


function tampilkanError(input, pesan) {
  hapusError(input);
  const span = document.createElement("span");
  span.className = "error";
  span.textContent = pesan;
  input.insertAdjacentElement("afterend", span);
}

function hapusError(input) {
  const next = input.nextElementSibling;
  if (next && next.classList.contains("error")) {
    next.remove();
  }
}

function initValidasiForm() {
  const form = document.getElementById("form-tambah");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    let valid = true;
    const judul = form.querySelector("[name='judul'], [name='nama']");
    if (judul && judul.value.trim() === "") {
      tampilkanError(judul, "Field ini wajib diisi.");
      valid = false;
    } else if (judul) {
      hapusError(judul);
    }
    const pengarang = form.querySelector("[name='pengarang']");
    if (pengarang && pengarang.value.trim() === "") {
      tampilkanError(pengarang, "Pengarang wajib diisi.");
      valid = false;
    } else if (pengarang) {
      hapusError(pengarang);
    }

    const tahun = form.querySelector("[name='tahun']");
    if (tahun) {
      const nilai = parseInt(tahun.value, 10);
      if (isNaN(nilai) || nilai < 1900 || nilai > 2026) {
        tampilkanError(tahun, "Tahun harus di antara 1900-2026.");
        valid = false;
      } else {
        hapusError(tahun);
      }
    }

    const stok = form.querySelector("[name='stok']");
    if (stok) {
      const nilai = parseInt(stok.value, 10);
      if (isNaN(nilai) || nilai < 0) {
        tampilkanError(stok, "Stok tidak boleh negatif.");
        valid = false;
      } else {
        hapusError(stok);
      }
    }

    if (!valid) {
      e.preventDefault();
    }
  });
}

function dashboard() {
  const daftarPekerja = JSON.parse(
    localStorage.getItem("daftarPekerja") || "[]",
  );

  const daftarCustomer = JSON.parse(
    localStorage.getItem("daftarCustomer") || "[]",
  );

  const daftarBooking = JSON.parse(
    localStorage.getItem("daftarBooking") || "[]",
  );

  const totalPekerja = document.getElementById("total-pekerja");
  const totalCustomer = document.getElementById("total-customer");
  const totalBooking = document.getElementById("total-booking");
  console.log(localStorage.getItem("daftarBooking"));

  if (totalPekerja) {
    totalPekerja.textContent = daftarPekerja.length;
  }

  if (totalCustomer) {
    totalCustomer.textContent = daftarCustomer.length;
  }

  if (totalBooking) {
    totalBooking.textContent = JSON.parse(
      localStorage.getItem("daftarBooking") || "[]",
    ).length;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  initNavToggle();
  initValidasiForm();
  dashboard();
});
