<?php
$page_title = "Beranda";
include __DIR__ . '/includes/header.php';

$totalBuku = count($_SESSION['buku'] ?? []);
$totalAnggota = count($_SESSION['anggota'] ?? []);

?>
<section>
    <h2>Welcome to Mini Library System &#x1F4DA</h2>
    <p>Simple aplication to manage and library member <br>This is the 1<sup>st</sup>
        page of this mini project</p>
</section>

<section>
    <h2>Summary</h2>
    <div>
        <article>
            <h3>Number of Books</h3>
            <p><?php echo $totalBuku; ?></p>
        </article>
        <article>
            <h3>Number of Member</h3>
            <p><?php echo $totalAnggota ?></p>
        </article>
        <article>
            <h3>Currently borrowed</h3>
            <p>0</p>
        </article>
    </div>
</section>

<?php include __DIR__ . '/includes/footer.php'; ?>