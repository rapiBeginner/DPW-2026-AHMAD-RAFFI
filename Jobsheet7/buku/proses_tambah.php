<?php
session_start();

$judul = trim($_POST['judul'] ?? '');
$pengarang = trim($_POST['pengarang'] ?? '');
$tahun = $_POST['tahun'] ?? '';
$isbn = trim($_POST['isbn'] ?? '');
$stok = $_POST['stok'] ?? '';
$kategori = trim($_POST['kategori'] ?? '');

$errors = [];

if ($judul === '') {
    $errors[] = "Title is required.";
}

if ($pengarang === '') {
    $errors[] = "Author is required.";
}

if (!is_numeric($tahun) || $tahun < 1900 || $tahun > 2026) {
    $errors[] = "Year must be between 1900 and 2026.";
}

if (!is_numeric($stok) || $stok < 0) {
    $errors[] = "Stock cannot be negative.";
}

if (empty($isbn)) {
    $errors[] = "ISBN cannot be empty.";
} else if (!preg_match('/^[0-9-]+$/', $isbn)) {
    $errors[] = "ISBN can only contain numbers and -.";
}

if (!empty($errors)) {
    $_SESSION['flash'] = [
        'type' => 'error',
        'pesan' => implode(' ', $errors)
    ];

    header('Location: tambah.php');
    exit;
}

if (!isset($_SESSION['buku'])) {
    $_SESSION['buku'] = [];
}

$_SESSION['buku'][] = [
    'judul' => $judul,
    'pengarang' => $pengarang,
    'tahun' => (int) $tahun,
    'isbn' => $isbn,
    'stok' => (int) $stok,
    'kategori' => $kategori,
];

$_SESSION['flash'] = [
    'type' => 'success',
    'pesan' => 'Book successfully added.'
];

header('Location: list.php');
exit;
