<?php
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

if (!empty($error)) {
    $_SESSION['flash'] = ['type' => 'error', 'pesan' => implode('', $errors)];
    header('Location: tambah.php');
    exit;
}

if (!isset($_SESSION['flash'])) {
    $_SESSION['flash'] = [];
}

$_SESSION['anggota'][] = [
    'nama' => $nama,
    'no_anggota' => $noAnggota,
    'alamat' => $alamat,
    'no_hp' => $noHp,
    'tanggal_bergabung' => $tglGabung

];

$_SESSION['flash'] = [
    'type'=>'success',
    'pesan'=>'Anggota berhasil ditambahkan'
];

header('Location: list.php');
exit;
?>

