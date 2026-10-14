
async function ambilDaftarCustomer() {
    let daftarCustomer = localStorage.getItem("daftarCustomer");

    if (daftarCustomer !== null) {
        return JSON.parse(daftarCustomer);
    }

    try {
        const response = await fetch("../data/customer.json");

        if (!response.ok) {
            throw new Error("Gagal mengambil data customer.");
        }

        daftarCustomer = await response.json();
        localStorage.setItem("daftarCustomer", JSON.stringify(daftarCustomer));

        return daftarCustomer;
    } catch (error) {
        console.error(error);
        alert("Data customer gagal dimuat.");
        return [];
    }
}

function simpanDaftarCustomer(daftarCustomer) {
    localStorage.setItem("daftarCustomer", JSON.stringify(daftarCustomer));
}

function buatSel(nilai) {
    const sel = document.createElement("td");
    sel.textContent = nilai ?? "-";
    return sel;
}

async function muatDaftarCustomer() {
    const tabel = document.getElementById("daftar-customer");

    if (!tabel) {
        return;
    }

    const loading = document.getElementById("loading-indicator");
    const searchInput = document.getElementById("search-input");
    const daftarCustomer = await ambilDaftarCustomer();

    function tampilkanCustomer(keyword = "") {
        tabel.replaceChildren();

        const hasil = daftarCustomer.filter(customer =>
            [
                customer.nama,
                customer.no_hp,
                customer.email,
                customer.alamat
            ].some(nilai =>
                String(nilai ?? "").toLowerCase().includes(keyword.toLowerCase())
            )
        );

        if (hasil.length === 0) {
            const baris = document.createElement("tr");
            const sel = buatSel("Customer tidak ditemukan.");
            sel.colSpan = 6;
            baris.appendChild(sel);
            tabel.appendChild(baris);
        }

        hasil.forEach(customer => {
            const baris = document.createElement("tr");

            baris.appendChild(buatSel(customer.nama));
            baris.appendChild(buatSel(customer.no_hp));
            baris.appendChild(buatSel(customer.email));
            baris.appendChild(buatSel(customer.alamat));
            baris.appendChild(buatSel(customer.tanggal_daftar));

            const aksi = document.createElement("td");

            const tombolEdit = document.createElement("button");
            tombolEdit.type = "button";
            tombolEdit.textContent = "Edit";
            tombolEdit.addEventListener("click", () => {
                localStorage.setItem("idEditCustomer", customer.id);
                window.location.href = "edit.html";
            });

            const tombolHapus = document.createElement("button");
            tombolHapus.type = "button";
            tombolHapus.textContent = "Hapus";
            tombolHapus.addEventListener("click", () => {
                hapusCustomer(customer.id);
            });

            aksi.append(tombolEdit, document.createTextNode(" "), tombolHapus);
            baris.appendChild(aksi);
            tabel.appendChild(baris);
        });

        if (loading) {
            loading.hidden = true;
        }
    }

    tampilkanCustomer();

    if (searchInput) {
        searchInput.addEventListener("input", () => {
            tampilkanCustomer(searchInput.value.trim());
        });
    }
}

async function tambahCustomer(event) {
    event.preventDefault();

    const daftarCustomer = await ambilDaftarCustomer();
    const idBaru = daftarCustomer.length > 0
        ? Math.max(...daftarCustomer.map(customer => Number(customer.id))) + 1
        : 1;

    const customerBaru = {
        id: idBaru,
        nama: document.getElementById("nama").value.trim(),
        jenis_kelamin: document.getElementById("jenis_kelamin").value,
        no_hp: document.getElementById("no_hp").value.trim(),
        email: document.getElementById("email").value.trim(),
        alamat: document.getElementById("alamat").value.trim(),
        tanggal_daftar: new Date().toISOString().slice(0, 10)
    };

    daftarCustomer.push(customerBaru);
    simpanDaftarCustomer(daftarCustomer);

    alert("Customer berhasil ditambahkan.");
    window.location.href = "list.html";
}

async function hapusCustomer(id) {
    if (!confirm("Yakin ingin menghapus customer ini?")) {
        return;
    }

    const daftarCustomer = await ambilDaftarCustomer();
    const daftarBaru = daftarCustomer.filter(customer => customer.id !== id);

    simpanDaftarCustomer(daftarBaru);

    alert("Customer berhasil dihapus.");
    window.location.reload();
}

async function tampilkanFormEditCustomer() {
    const form = document.getElementById("form-edit");

    if (!form) {
        return;
    }

    const id = Number(localStorage.getItem("idEditCustomer"));
    const daftarCustomer = await ambilDaftarCustomer();
    const customer = daftarCustomer.find(item => item.id === id);

    if (!customer) {
        alert("Data customer tidak ditemukan.");
        window.location.href = "list.html";
        return;
    }

    document.getElementById("nama").value = customer.nama;
    document.getElementById("jenis_kelamin").value = customer.jenis_kelamin;
    document.getElementById("no_hp").value = customer.no_hp;
    document.getElementById("email").value = customer.email;
    document.getElementById("alamat").value = customer.alamat;
}

async function editCustomer(event) {
    event.preventDefault();

    const id = Number(localStorage.getItem("idEditCustomer"));
    const daftarCustomer = await ambilDaftarCustomer();
    const index = daftarCustomer.findIndex(customer => customer.id === id);

    if (index === -1) {
        alert("Data customer tidak ditemukan.");
        window.location.href = "list.html";
        return;
    }

    daftarCustomer[index] = {
        ...daftarCustomer[index],
        nama: document.getElementById("nama").value.trim(),
        jenis_kelamin: document.getElementById("jenis_kelamin").value,
        no_hp: document.getElementById("no_hp").value.trim(),
        email: document.getElementById("email").value.trim(),
        alamat: document.getElementById("alamat").value.trim()
    };

    simpanDaftarCustomer(daftarCustomer);

    alert("Data customer berhasil diperbarui.");
    window.location.href = "list.html";
}

document.addEventListener("DOMContentLoaded", () => {
    muatDaftarCustomer();

    const formTambah = document.getElementById("form-tambah");
    const formEdit = document.getElementById("form-edit");

    if (formTambah) {
        formTambah.addEventListener("submit", tambahCustomer);
    }

    if (formEdit) {
        tampilkanFormEditCustomer();
        formEdit.addEventListener("submit", editCustomer);
    }
});
