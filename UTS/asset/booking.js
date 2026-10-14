async function ambilDaftarBooking() {
  let daftarBooking = localStorage.getItem("daftarBooking");

  if (daftarBooking !== null) {
    return JSON.parse(daftarBooking);
  }

  try {
    const response = await fetch("../data/booking.json");

    if (!response.ok) {
      throw new Error("Gagal mengambil data booking.");
    }

    daftarBooking = await response.json();
    localStorage.setItem("daftarBooking", JSON.stringify(daftarBooking));

    return daftarBooking;
  } catch (error) {
    console.error(error);
    alert("Data booking gagal dimuat.");
    return [];
  }
}

function simpanDaftarBooking(daftarBooking) {
  localStorage.setItem("daftarBooking", JSON.stringify(daftarBooking));
}

function buatSelBooking(nilai) {
  const sel = document.createElement("td");
  sel.textContent = nilai ?? "-";
  return sel;
}

async function muatDaftarBooking() {
  const tabel = document.getElementById("daftar-booking");

  if (!tabel) {
    return;
  }

  const loading = document.getElementById("loading-indicator");
  const searchInput = document.getElementById("search-input");
  const daftarBooking = await ambilDaftarBooking();

  function tampilkanBooking(keyword = "") {
    tabel.replaceChildren();

    const hasil = daftarBooking.filter((booking) =>
      [
        booking.nama_customer,
        booking.nama_pekerja,
        booking.layanan,
        booking.status,
      ].some((nilai) =>
        String(nilai ?? "")
          .toLowerCase()
          .includes(keyword.toLowerCase()),
      ),
    );

    if (hasil.length === 0) {
      const baris = document.createElement("tr");
      const sel = buatSelBooking("Booking tidak ditemukan.");
      sel.colSpan = 8;
      baris.appendChild(sel);
      tabel.appendChild(baris);
    }

    hasil.forEach((booking) => {
      const baris = document.createElement("tr");

      baris.appendChild(buatSelBooking(booking.nama_customer));
      baris.appendChild(buatSelBooking(booking.nama_pekerja));
      baris.appendChild(buatSelBooking(booking.layanan));
      baris.appendChild(buatSelBooking(booking.tanggal));
      baris.appendChild(buatSelBooking(booking.jam));
      baris.appendChild(
        buatSelBooking("Rp" + Number(booking.harga).toLocaleString("id-ID")),
      );
      baris.appendChild(buatSelBooking(booking.status));

      const aksi = document.createElement("td");

      const tombolEdit = document.createElement("button");
      tombolEdit.type = "button";
      tombolEdit.textContent = "Edit";
      tombolEdit.addEventListener("click", () => {
        localStorage.setItem("idEditBooking", booking.id);
        window.location.href = "edit.html";
      });

      aksi.appendChild(tombolEdit);
      const tombolDone = document.createElement("button");
      tombolDone.type = "button";
      tombolDone.textContent = "Done";
      tombolDone.addEventListener("click", () => {
        selesaikanBooking(booking.id);
      });
      if(booking.status==='Selesai'){
        tombolDone.style.display="none"
      }
      aksi.append(" ", tombolDone);

      baris.appendChild(aksi);
      tabel.appendChild(baris);
    });

    if (loading) {
      loading.hidden = true;
    }
  }

  tampilkanBooking();

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      tampilkanBooking(searchInput.value.trim());
    });
  }
}

async function selesaikanBooking(id) {
  const daftarBooking = await ambilDaftarBooking();
  const booking = daftarBooking.find((item) => item.id === id);

  if (!booking) {
    alert("Data booking tidak ditemukan.");
    return;
  }

  if (booking.status === "Selesai") {
    return;
  }

  if (!confirm("Tandai booking ini sebagai selesai?")) {
    return;
  }

  booking.status = "Selesai";
  simpanDaftarBooking(daftarBooking);

  alert("Booking berhasil ditandai selesai.");
  muatUlangBooking();
}

function muatUlangBooking() {
  window.location.reload();
}


async function ambilDataBooking(key, path) {
    const dataLokal = localStorage.getItem(key);

    if (dataLokal !== null) {
        return JSON.parse(dataLokal);
    }

    try {
        const response = await fetch(path);

        if (!response.ok) {
            throw new Error("Gagal mengambil data.");
        }

        const data = await response.json();
        localStorage.setItem(key, JSON.stringify(data));

        return data;
    } catch (error) {
        console.error(error);
        alert("Data gagal dimuat. Pastikan Live Server aktif.");
        return [];
    }
}

async function isiPilihanBooking() {
    const form = document.getElementById("form-tambah");

    if (!form) {
        return;
    }

    const daftarCustomer = await ambilDataBooking(
        "daftarCustomer",
        "../data/customer.json"
    );

    const daftarPekerja = await ambilDataBooking(
        "daftarPekerja",
        "../data/pekerja.json"
    );

    const pilihanCustomer = document.getElementById("nama_customer");
    const pilihanPekerja = document.getElementById("nama_pekerja");

    daftarCustomer.forEach(customer => {
        const opsi = document.createElement("option");
        opsi.value = customer.nama;
        opsi.textContent = customer.nama;
        pilihanCustomer.appendChild(opsi);
    });

    daftarPekerja
        .filter(pekerja => pekerja.status === "Aktif")
        .forEach(pekerja => {
            const opsi = document.createElement("option");
            opsi.value = pekerja.nama;
            opsi.textContent = pekerja.nama;
            pilihanPekerja.appendChild(opsi);
        });

    form.addEventListener("submit", tambahBooking);
}

async function tambahBooking(event) {
    event.preventDefault();

    const daftarBooking = await ambilDataBooking(
        "daftarBooking",
        "../data/booking.json"
    );

    const idBaru = daftarBooking.length > 0
        ? Math.max(...daftarBooking.map(booking => Number(booking.id))) + 1
        : 1;

    const bookingBaru = {
        id: idBaru,
        nama_customer: document.getElementById("nama_customer").value,
        nama_pekerja: document.getElementById("nama_pekerja").value,
        layanan: document.getElementById("layanan").value,
        tanggal: document.getElementById("tanggal").value,
        jam: document.getElementById("jam").value,
        harga: Number(document.getElementById("harga").value),
        status: document.getElementById("status").value
    };

    daftarBooking.push(bookingBaru);

    localStorage.setItem(
        "daftarBooking",
        JSON.stringify(daftarBooking)
    );

    alert("Booking berhasil ditambahkan.");
    window.location.href = "list.html";
}


async function tampilkanFormEditBooking() {
    const form = document.getElementById("form-edit");

    if (!form) {
        return;
    }

    const id = Number(localStorage.getItem("idEditBooking"));

    const daftarBooking = await ambilDataBooking(
        "daftarBooking",
        "../data/booking.json"
    );

    const daftarCustomer = await ambilDataBooking(
        "daftarCustomer",
        "../data/customer.json"
    );

    const daftarPekerja = await ambilDataBooking(
        "daftarPekerja",
        "../data/pekerja.json"
    );

    const booking = daftarBooking.find(item => Number(item.id) === id);

    if (!booking) {
        alert("Data booking tidak ditemukan.");
        window.location.href = "list.html";
        return;
    }

    const pilihanCustomer = document.getElementById("nama_customer");
    const pilihanPekerja = document.getElementById("nama_pekerja");

    daftarCustomer.forEach(customer => {
        const opsi = document.createElement("option");
        opsi.value = customer.nama;
        opsi.textContent = customer.nama;
        pilihanCustomer.appendChild(opsi);
    });

    daftarPekerja.forEach(pekerja => {
        const opsi = document.createElement("option");
        opsi.value = pekerja.nama;
        opsi.textContent = pekerja.nama;
        pilihanPekerja.appendChild(opsi);
    });

   if (![...pilihanCustomer.options].some(
    opsi => opsi.value === booking.nama_customer
)) {
    const opsi = document.createElement("option");
    opsi.value = booking.nama_customer;
    opsi.textContent = booking.nama_customer;
    pilihanCustomer.appendChild(opsi);
}

if (![...pilihanPekerja.options].some(
    opsi => opsi.value === booking.nama_pekerja
)) {
    const opsi = document.createElement("option");
    opsi.value = booking.nama_pekerja;
    opsi.textContent = booking.nama_pekerja;
    pilihanPekerja.appendChild(opsi);
}

pilihanCustomer.value = booking.nama_customer;
pilihanPekerja.value = booking.nama_pekerja;
    document.getElementById("layanan").value = booking.layanan;
    document.getElementById("tanggal").value = booking.tanggal;
    document.getElementById("jam").value = booking.jam;
    document.getElementById("harga").value = booking.harga;
    document.getElementById("status").value = booking.status;

    form.addEventListener("submit", editBooking);
}

async function editBooking(event) {
    event.preventDefault();

    const id = Number(localStorage.getItem("idEditBooking"));

    const daftarBooking = await ambilDataBooking(
        "daftarBooking",
        "../data/booking.json"
    );

    const index = daftarBooking.findIndex(
        booking => Number(booking.id) === id
    );

    if (index === -1) {
        alert("Data booking tidak ditemukan.");
        window.location.href = "list.html";
        return;
    }

    daftarBooking[index] = {
        ...daftarBooking[index],
        nama_customer: document.getElementById("nama_customer").value,
        nama_pekerja: document.getElementById("nama_pekerja").value,
        layanan: document.getElementById("layanan").value,
        tanggal: document.getElementById("tanggal").value,
        jam: document.getElementById("jam").value,
        harga: Number(document.getElementById("harga").value),
        status: document.getElementById("status").value
    };

    simpanDaftarBooking(daftarBooking);

    alert("Booking berhasil diperbarui.");
    window.location.href = "list.html";
}

document.addEventListener("DOMContentLoaded", () => {
    tampilkanFormEditBooking();
});


document.addEventListener("DOMContentLoaded", () => {
    isiPilihanBooking();
});


document.addEventListener("DOMContentLoaded", () => {
  muatDaftarBooking();
});
