<?php 
$host = "localhost";
$port = "5432";
$db = "dpw_jobsheet8";
$user = "postgres";
$pass = "admin1234";

try {
    $pdo = new PDO("pgsql:host=$host;port=$port;dbname=$db;", 
    $user, 
    $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Koneksi database gagal: " . $e->getMessage());
}
?>