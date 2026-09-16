# Penjelasan Singkat

### 1. Toggle Navigation

Function `initNavToggle()` digunakan untuk membuka dan menutup menu navigasi ketika tombol menu diklik.

```javascript
initNavToggle();
```

Function ini mencari elemen dengan ID `nav-toggle-btn` dan elemen `nav` di dalam `header`.

Ketika tombol diklik, class `nav-open` akan ditambahkan atau dihapus dari elemen navigasi.

---

### 2. Konfirmasi Hapus Data

Function `initHapusConfirm()` digunakan untuk memberikan konfirmasi sebelum data pada tabel dihapus.

```javascript
initHapusConfirm();
```

Tombol yang memiliki class `.btn-hapus` akan diberikan event `click`.

Ketika tombol ditekan, akan muncul konfirmasi:

```text
Yakin ingin menghapus "nama data"?
```

Jika pengguna memilih `OK`, baris data tersebut akan dihapus dari tabel.

---

### 3. Filter atau Pencarian Data

Function `initTableFilter()` digunakan untuk melakukan pencarian data pada tabel berdasarkan kata kunci.

```javascript
initTableFilter();
```

Input pencarian menggunakan ID:

```text
search-input
```

Setiap kali pengguna mengetik, JavaScript akan membandingkan kata kunci dengan isi setiap baris tabel.

Baris yang sesuai dengan kata kunci akan ditampilkan, sedangkan baris yang tidak sesuai akan disembunyikan.

---

### 4. Validasi Form

Function `initValidasiForm()` digunakan untuk melakukan validasi sebelum form dikirim.

```javascript
initValidasiForm();
```

Form yang divalidasi memiliki ID:

```text
form-tambah
```

Validasi yang dilakukan meliputi:

* Judul atau nama tidak boleh kosong.
* Pengarang tidak boleh kosong.
* Tahun harus berada di antara 1900 sampai 2026.
* Stok tidak boleh bernilai negatif.

Jika terdapat kesalahan, pesan error akan ditampilkan di bawah input yang bermasalah.

Contoh:

```text
Pengarang wajib diisi.
```

Jika terdapat data yang tidak valid, proses submit form akan dibatalkan.

---

### 5. Menampilkan Pesan Error

Function `tampilkanError()` digunakan untuk membuat dan menampilkan pesan error pada input.

```javascript
tampilkanError(input, pesan);
```

Function ini membuat elemen `<span>` dengan class `.error`, kemudian menempatkannya setelah input yang mengalami kesalahan.

---

### 6. Menghapus Pesan Error

Function `hapusError()` digunakan untuk menghapus pesan error yang sebelumnya ditampilkan.

```javascript
hapusError(input);
```

Function akan mengecek elemen setelah input. Jika elemen tersebut memiliki class `.error`, maka elemen tersebut akan dihapus.

---

## Inisialisasi JavaScript

Semua fitur dijalankan setelah halaman selesai dimuat menggunakan event `DOMContentLoaded`.

```javascript
document.addEventListener("DOMContentLoaded", function () {
  initNavToggle();
  initHapusConfirm();
  initTableFilter();
  initValidasiForm();
});
```

Dengan cara ini, JavaScript akan menunggu sampai seluruh struktur HTML selesai dimuat sebelum menjalankan fungsi-fungsinya.

## Struktur Elemen HTML yang Dibutuhkan

Agar JavaScript dapat bekerja, beberapa elemen HTML harus menggunakan ID atau class tertentu.

| Elemen           | ID/Class                           | Fungsi                   |
| ---------------- | ---------------------------------- | ------------------------ |
| Tombol menu      | `#nav-toggle-btn`                  | Membuka/menutup navigasi |
| Navigasi         | `header nav`                       | Menu navigasi            |
| Tombol hapus     | `.btn-hapus`                       | Menghapus data           |
| Input pencarian  | `#search-input`                    | Mencari data             |
| Tabel            | `.table-responsive table`          | Menampilkan data         |
| Form tambah      | `#form-tambah`                     | Form yang divalidasi     |
| Input judul/nama | `[name='judul']` / `[name='nama']` | Validasi judul/nama      |
| Input pengarang  | `[name='pengarang']`               | Validasi pengarang       |
| Input tahun      | `[name='tahun']`                   | Validasi tahun           |
| Input stok       | `[name='stok']`                    | Validasi stok            |

## Catatan

JavaScript ini bekerja pada sisi client (browser). Fitur hapus hanya menghapus baris data dari tampilan tabel dan belum menghapus data dari database.

JavaScript juga menggunakan `confirm()` bawaan browser untuk meminta konfirmasi pengguna sebelum menghapus data.

## Perbaikan yang Perlu Diperhatikan

Terdapat dua kesalahan penulisan pada kode:

### 1. `retrun` harus menjadi `return`

Salah:

```javascript
if (!toggleBtn || !nav) retrun;
```

Benar:

```javascript
if (!toggleBtn || !nav) return;
```

### 2. `row.remove` harus menjadi `row.remove()`

Salah:

```javascript
row.remove;
```

Benar:

```javascript
row.remove();
```

`remove` adalah method, sehingga harus dipanggil menggunakan tanda kurung `()` agar baris tabel benar-benar dihapus.
