
async function ambilDaftarPekerja() {
    let daftarPekerja = localStorage.getItem("daftarPekerja");

    if (daftarPekerja !== null) {
        return JSON.parse(daftarPekerja);
    }

    const response = await fetch("../data/pekerja.json");

    if (!response.ok) {
        throw new Error("Gagal mengambil data pekerja");
    }

    daftarPekerja = await response.json();
    localStorage.setItem("daftarPekerja", JSON.stringify(daftarPekerja));

    return daftarPekerja;
}

function simpanDaftarPekerja(daftarPekerja) {
    localStorage.setItem("daftarPekerja", JSON.stringify(daftarPekerja));
}

function buatSel(nilai) {
    const td = document.createElement("td");
    td.textContent = nilai ?? "";
    return td;
}

// Menampilkan daftar pekerja
async function muatDaftarPekerja() {
    const tbody = document.getElementById("daftar-pekerja");
    const loading = document.getElementById("loading-indicator");
    const searchInput = document.getElementById("search-input");

    if (!tbody) return;

    try {
        if (loading) loading.style.display = "block";

        let daftarPekerja = await ambilDaftarPekerja();

        function tampilkan(keyword = "") {
            tbody.innerHTML = "";

            const hasil = daftarPekerja.filter(function (pekerja) {
                return pekerja.nama.toLowerCase().includes(keyword.toLowerCase());
            });

            hasil.forEach(function (pekerja) {
                const tr = document.createElement("tr");

                tr.appendChild(buatSel(pekerja.nama));
                tr.appendChild(buatSel(pekerja.jabatan));
                tr.appendChild(buatSel(pekerja.no_hp));
                tr.appendChild(buatSel(pekerja.keahlian));
                tr.appendChild(buatSel(pekerja.status));

                const aksi = document.createElement("td");

                const tombolEdit = document.createElement("button");
                tombolEdit.type = "button";
                tombolEdit.textContent = "Edit";
                tombolEdit.addEventListener("click", function () {
                    localStorage.setItem("idEditPekerja", pekerja.id);
                    window.location.href = "edit.html";
                });

                const tombolHapus = document.createElement("button");
                tombolHapus.type = "button";
                tombolHapus.textContent = "Hapus";

                tombolHapus.addEventListener("click", function () {
                    hapusPekerja(pekerja.id);
                });

                aksi.appendChild(tombolEdit);
                aksi.appendChild(tombolHapus);
                tr.appendChild(aksi);
                tbody.appendChild(tr);
            });

            if (hasil.length === 0) {
                const tr = document.createElement("tr");
                const td = buatSel("Data pekerja tidak ditemukan.");
                td.colSpan = 6;
                tr.appendChild(td);
                tbody.appendChild(tr);
            }
        }

        tampilkan();

        if (searchInput) {
            searchInput.addEventListener("input", function () {
                tampilkan(this.value);
            });
        }
    } catch (error) {
        tbody.innerHTML = "";
        const tr = document.createElement("tr");
        const td = buatSel(error.message);
        td.colSpan = 6;
        tr.appendChild(td);
        tbody.appendChild(tr);
    } finally {
        if (loading) loading.style.display = "none";
    }
}

// Menambahkan pekerja
async function tambahPekerja(event) {
    event.preventDefault();

    try {
        const daftarPekerja = await ambilDaftarPekerja();

        const pekerjaBaru = {
            id: daftarPekerja.length > 0
                ? Math.max(...daftarPekerja.map(p => Number(p.id))) + 1
                : 1,
            nama: document.getElementById("nama").value.trim(),
            jenis_kelamin: document.getElementById("jenis_kelamin").value,
            no_hp: document.getElementById("no_hp").value.trim(),
            jabatan: document.getElementById("jabatan").value,
            keahlian: document.getElementById("keahlian").value.trim(),
            status: document.getElementById("status").value
        };

        daftarPekerja.push(pekerjaBaru);
        simpanDaftarPekerja(daftarPekerja);

        alert("Pekerja berhasil ditambahkan!");
        window.location.href = "list.html";
    } catch (error) {
        alert(error.message);
    }
}

// Menghapus pekerja
async function hapusPekerja(id) {
    if (!confirm("Yakin ingin menghapus pekerja ini?")) return;

    try {
        let daftarPekerja = await ambilDaftarPekerja();

        daftarPekerja = daftarPekerja.filter(function (pekerja) {
            return pekerja.id !== id;
        });

        simpanDaftarPekerja(daftarPekerja);
        alert("Pekerja berhasil dihapus!");
        window.location.reload();
    } catch (error) {
        alert(error.message);
    }
}

// Mengisi form edit dengan data lama
async function tampilkanFormEditPekerja() {
    const form = document.getElementById("form-edit");
    if (!form) return;

    try {
        const id = Number(localStorage.getItem("idEditPekerja"));
        const daftarPekerja = await ambilDaftarPekerja();
        const pekerja = daftarPekerja.find(p => p.id === id);

        if (!pekerja) {
            alert("Data pekerja tidak ditemukan!");
            window.location.href = "list.html";
            return;
        }

        document.getElementById("nama").value = pekerja.nama;
        document.getElementById("jenis_kelamin").value = pekerja.jenis_kelamin;
        document.getElementById("no_hp").value = pekerja.no_hp;
        document.getElementById("jabatan").value = pekerja.jabatan;
        document.getElementById("keahlian").value = pekerja.keahlian;
        document.getElementById("status").value = pekerja.status;
    } catch (error) {
        alert(error.message);
    }
}

// Menyimpan perubahan pekerja
async function editPekerja(event) {
    event.preventDefault();

    try {
        const id = Number(localStorage.getItem("idEditPekerja"));
        const daftarPekerja = await ambilDaftarPekerja();
        const index = daftarPekerja.findIndex(p => p.id === id);

        if (index === -1) {
            alert("Data pekerja tidak ditemukan!");
            return;
        }

        daftarPekerja[index] = {
            ...daftarPekerja[index],
            nama: document.getElementById("nama").value.trim(),
            jenis_kelamin: document.getElementById("jenis_kelamin").value,
            no_hp: document.getElementById("no_hp").value.trim(),
            jabatan: document.getElementById("jabatan").value,
            keahlian: document.getElementById("keahlian").value.trim(),
            status: document.getElementById("status").value
        };

        simpanDaftarPekerja(daftarPekerja);

        alert("Data pekerja berhasil diperbarui!");
        localStorage.removeItem("idEditPekerja");
        window.location.href = "list.html";
    } catch (error) {
        alert(error.message);
    }
}

// Menjalankan fungsi sesuai halaman
document.addEventListener("DOMContentLoaded", function () {
    muatDaftarPekerja();

    const formTambah = document.getElementById("form-tambah");
    if (formTambah) {
        formTambah.addEventListener("submit", tambahPekerja);
    }

    const formEdit = document.getElementById("form-edit");
    if (formEdit) {
        tampilkanFormEditPekerja();
        formEdit.addEventListener("submit", editPekerja);
    }
});
