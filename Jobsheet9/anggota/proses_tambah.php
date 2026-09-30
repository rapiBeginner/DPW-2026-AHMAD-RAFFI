<?php
require __DIR__ . '/../includes/koneksi.php';
session_start();
$nama = trim($_POST['name'] ?? '');
$noAnggota = trim($_POST['memberID']);
$alamat = trim($_POST['adresse']);
$noHp = trim($_POST['phoneNumber']);
$tglGabung = trim($_POST['dateOfJoin']);

$errors = [];
if ($nama === '') {
    $errors[] = "Name is required";
}

if ($noAnggota === '') {
    $errors[] = "Member ID is required.";
}

if ((int)$noAnggota < 0) {
    $errors[] = "Member ID have to be greater than 0";
}

if (!preg_match('/^[0-9-]+$/', $noHp)) {
    $errors[] = "Phone number can only contain number and '-'";
}



if (!empty($errors)) {
    $_SESSION['flash'] = ['type' => 'error', 'pesan' => implode(', ', $errors)];
    header('Location: tambah.php');
    exit;
}

if (!isset($_SESSION['flash'])) {
    $_SESSION['flash'] = [];
}

$smt = $pdo->prepare("insert into anggota (nama, no_anggota, alamat,no_hp, tanggal_bergabung )
values (:nama, :no_anggota, :alamat, :no_hp, :tanggal_bergabung) 
returning id");

$smt->execute(
    [
        'nama' => $_POST['name'],
        'no_anggota' => $_POST['memberID'],
        'alamat' => $_POST['adresse'],
        'tanggal_bergabung' => $_POST['dateOfJoin'],
        'no_hp' => $_POST['phoneNumber']
    ]
);

$_SESSION['flash'] = [
    'type' => 'success',
    'pesan' => 'Anggota berhasil ditambahkan'
];

header('Location: list.php');
exit;
