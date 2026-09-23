<?php
$page_title = "Daftar Buku";
include __DIR__ . '/../includes/header.php';

$flash = $_SESSION['flash'] ?? null;
unset($_SESSION['flash']);
$daftarBuku = $_SESSION['buku'] ?? [];
?>
<section>
    <h2>Books List</h2>
    <?php if ($flash): ?>
        <p class="flash flash-<?php echo $flash['type']; ?>"><?php echo $flash['pesan']; ?></p>
    <?php endif; ?>
    <div class="search-box">
        <label for="search-input">Cari Judul Buku</label>
        <input type="text" name="" id="search-input" placeholder="Ketik judul buku...">
    </div>
    <p id="loading-indicator" style="display: none;">Memuat data...</p>
    <div class="table-responsive">
        <table title="The books list table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Years</th>
                    <th>Stock</th>
                    <th>Kategori</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($daftarBuku)): ?>
                    <tr>
                        <td colspan="6" style="text-align: center;">Belum ada data buku. Silakan tambah lewat menu "Tambah Buku".</td>
                    </tr>
                <?php else: ?>
                    <?php foreach ($daftarBuku as $buku): ?>
                        <tr>
                            <td><?php echo $buku['judul']; ?></td>
                            <td><?php echo $buku['pengarang']; ?></td>
                            <td><?php echo $buku['tahun']; ?></td>
                            <td><?php echo $buku['stok']; ?></td>
                            <td><?php echo $buku['kategori']; ?></td>
                            <td>
                                <button type="button">Edit</button>
                                <button type="button" class="btn-hapus">Hapus</button>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
    <form action="../reset.php" method="post">
        <input type="hidden" name="reset" value="true">
        <input type="hidden" name="file" value="<?php echo $_SERVER['PHP_SELF'] ?>">
        <button type="submit" style="margin-top: 1rem;">Reset</button>
    </form>
</section>
<?php include __DIR__.'/../includes/footer.php';?>