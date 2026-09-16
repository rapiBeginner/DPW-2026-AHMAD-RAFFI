Pencarian data pada tabel, validasi form, serta pemuatan data buku dari file JSON secara asynchronous.

## Fitur

### 1. Toggle Navigation

Function `initNavToggle()` digunakan untuk membuka dan menutup menu navigasi ketika tombol menu diklik.

Elemen yang digunakan:

```text
#nav-toggle-btn
header nav
```

Ketika tombol diklik, class `nav-open` akan ditambahkan atau dihapus dari elemen navigasi.

---

### 2. Memuat Data Buku dari JSON

Function `muatDaftarBuku()` digunakan untuk mengambil data buku dari file `buku.json` dan menampilkannya ke dalam tabel secara asynchronous.

```javascript
async function muatDaftarBuku() {
    // ...
}
```

Data buku diambil menggunakan `fetch()`:

```javascript
const res = await fetch("../data/buku.json");
const daftarBuku = await res.json();
```

Setelah data berhasil diambil, setiap data buku akan dibuat menjadi elemen `<tr>` dan dimasukkan ke dalam `<tbody>` tabel.

Data yang ditampilkan meliputi:

* Judul buku
* Pengarang
* Tahun terbit
* Stok
* Tombol Edit
* Tombol Hapus

### Struktur Data JSON

Data buku disimpan pada:

```text
data/buku.json
```

Contoh struktur data:

```json
[
    {
        "judul": "Laskar Pelangi",
        "pengarang": "Andrea Hirata",
        "tahun": 2005,
        "stok": 10
    },
    {
        "judul": "Bumi",
        "pengarang": "Tere Liye",
        "tahun": 2014,
        "stok": 8
    }
]
```

Dengan menggunakan JSON, data buku tidak perlu ditulis satu per satu langsung di HTML.

---

### 3. Loading Indicator

Saat data buku sedang diambil, loading indicator akan ditampilkan.

```javascript
loading.style.display = "block";
```

Setelah proses selesai, loading indicator akan disembunyikan:

```javascript
loading.style.display = "none";
```

Program juga menggunakan `setTimeout()` untuk mensimulasikan delay jaringan selama 2 detik agar proses loading dapat terlihat.

```javascript
await new Promise((resolve) => setTimeout(resolve, 2000));
```

---

### 4. Penanganan Error

Jika data JSON gagal diambil, program akan menampilkan pesan error pada tabel.

```javascript
catch (err) {
    tbody.innerHTML =
        "<tr><td colspan=\"5\">Gagal memuat data: " + err.message + "</td></tr>";
}
```

Program juga mengecek status response menggunakan:

```javascript
if (!res.ok) {
    throw new Error("Gagal mengambil data (status " + res.status + ")");
}
```

Dengan demikian, pengguna dapat mengetahui ketika terjadi masalah saat mengambil data.

---

### 5. Konfirmasi Hapus Data

Function `initHapusConfirm()` digunakan untuk memberikan konfirmasi sebelum data pada tabel dihapus.

Tombol yang memiliki class `.btn-hapus` akan diberikan event `click`.

Ketika tombol ditekan, akan muncul konfirmasi:

```text
Yakin ingin menghapus "nama data"?
```

Jika pengguna memilih `OK`, baris data tersebut akan dihapus dari tabel.

---

### 6. Filter atau Pencarian Data

Function `initTableFilter()` digunakan untuk melakukan pencarian data pada tabel berdasarkan kata kunci.

Input pencarian menggunakan ID:

```text
#search-input
```

Setiap kali pengguna mengetik, JavaScript akan membandingkan kata kunci dengan isi setiap baris tabel.

Baris yang sesuai dengan kata kunci akan ditampilkan, sedangkan baris yang tidak sesuai akan disembunyikan.

---

### 7. Validasi Form

Function `initValidasiForm()` digunakan untuk melakukan validasi sebelum form dikirim.

Form yang divalidasi memiliki ID:

```text
#form-tambah
```

Validasi yang dilakukan meliputi:

* Judul atau nama tidak boleh kosong.
* Pengarang tidak boleh kosong.
* Tahun harus berada di antara 1900 sampai 2026.
* Stok tidak boleh bernilai negatif.

Jika terdapat kesalahan, pesan error akan ditampilkan di bawah input yang bermasalah.

---

### 8. Menampilkan Pesan Error

Function `tampilkanError()` digunakan untuk membuat dan menampilkan pesan error pada input.

```javascript
tampilkanError(input, pesan);
```

Pesan error dibuat menggunakan elemen `<span>` dengan class `.error`.

---

### 9. Menghapus Pesan Error

Function `hapusError()` digunakan untuk menghapus pesan error yang sebelumnya ditampilkan.

```javascript
hapusError(input);
```

Program akan mengecek elemen setelah input. Jika elemen tersebut memiliki class `.error`, elemen tersebut akan dihapus.

---

## Struktur HTML Tabel

Sebelumnya data buku dapat ditulis langsung di dalam HTML. Setelah menggunakan JSON, `<tbody>` tabel dikosongkan dan data akan dimasukkan secara otomatis oleh JavaScript.

Contoh:

```html
<div id="loading-indicator">
    Memuat data...
</div>

<div class="table-responsive">
    <table>
        <thead>
            <tr>
                <th>Judul</th>
                <th>Pengarang</th>
                <th>Tahun</th>
                <th>Stok</th>
                <th>Aksi</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
</div>
```

JavaScript kemudian membuat baris tabel berdasarkan isi `buku.json`.

---

## Inisialisasi JavaScript

Function `muatDaftarBuku()` dijalankan setelah halaman selesai dimuat menggunakan `DOMContentLoaded`.

```javascript
document.addEventListener("DOMContentLoaded", muatDaftarBuku);
```

Fungsi-fungsi lainnya juga dijalankan setelah halaman selesai dimuat:

```javascript
document.addEventListener("DOMContentLoaded", function () {
    initNavToggle();
    initHapusConfirm();
    initTableFilter();
    initValidasiForm();
});
```

Dengan menggunakan `DOMContentLoaded`, program memastikan elemen HTML sudah tersedia sebelum JavaScript mencoba mengaksesnya.

---

## Struktur Folder

```text
Mini Library System/
│
├── data/
│   └── buku.json
│
├── js/
│   └── script.js
│
├── index.html
├── list.html
├── tambah.html
│
└── anggota/
    ├── list.html
    └── tambah.html
```

## Alur Pemuatan Data

```text
Halaman dibuka
      ↓
DOMContentLoaded
      ↓
muatDaftarBuku()
      ↓
Tampilkan loading indicator
      ↓
Ambil data dari buku.json
      ↓
Response berhasil?
   ↙          ↘
 Tidak        Ya
  ↓            ↓
Error      Parse JSON
               ↓
       Buat baris <tr>
               ↓
       Masukkan ke <tbody>
               ↓
      Sembunyikan loading
```

## Catatan

Data yang berasal dari `buku.json` hanya digunakan sebagai sumber data pada sisi client/browser. Perubahan seperti menghapus baris menggunakan `row.remove()` hanya mengubah tampilan tabel dan tidak mengubah isi file `buku.json`.

Fitur Edit juga masih berupa tombol tampilan dan belum memiliki proses untuk mengubah data pada JSON.

## Perbaikan yang Perlu Diperhatikan

Pastikan terdapat dua hal berikut agar program dapat berjalan dengan benar.

### 1. Gunakan `return`, bukan `retrun`

```javascript
if (!toggleBtn || !nav) return;
```

### 2. Panggil method `remove()` dengan tanda kurung

```javascript
row.remove();
```

Tanpa `()`, method `remove` tidak akan dijalankan.
