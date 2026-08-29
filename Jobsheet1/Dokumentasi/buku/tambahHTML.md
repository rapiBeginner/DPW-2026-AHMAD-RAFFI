|  | Desain dan Pemrograman web |
|--|--|
| NIM |  254107020097|
| Nama | Ahmad Raffi |
| Kelas | TI - 2F |

# Penjelasan buku/tambah.html
1. Tag ```<form>``` digunakan untuk mengirim data ke server atau pihak manapun yang akan memprosesnya, melalui metode http (post, get, put delete). Form berikut belum bisa mengirim data karena atribut action dan method belum di isi
2. ```<label>``` digunakan untuk memberikan nama kepada setiap input dengan mencantumkan nilai id dari input tersebut kedalam atribut for milik label.
3. Tag ```<input>``` memiliki berbagai macam tipe, bisa berupa text, angka,dan lain-lain. Terdapat juga atribut id dan name yang akan digunakan sebagai referensi pada css, javascript, ataupun ke server. Ada juga atribut required yang membuat input wajib diisi sebelum form disubmit
4. Terdapat juga tag ```<select>``` yang di isi dengan beberapa ```<option>``` untuk membuat input berupa pilihan. ```<option>``` memiliki atribut value yang nilainya akan dikirim ke server
5. Tombol yang bertipe submit didalam form akan otomatis mengirim data ke alamat yang tertera pada atribut action saat diklik. Namun karena action belum diisi, maka hanya akan merefresh halaman 