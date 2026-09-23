<?php

$page_title = "Daftar Anggota";
include __DIR__ . '/../includes/header.php';

$flash = $_SESSION['flash'] ?? null;
unset($_SESSION['flash']);
$daftarAnggota = $_SESSION['anggota'] ?? [];
?>
<section>
    <h2>Member List</h2>

    <?php if ($flash): ?>
        <p class="flash flash-<?php echo $flash['type']; ?>"><?php echo $flash['pesan']; ?></p>
    <?php endif; ?>
    <div class="search-box">
        <label for="search-input">Cari Nama Anggota</label>
        <input type="text" name="" id="search-input" placeholder="Ketik nama anggota...">
    </div>
    <p id="loading-indicator" style="display: none;">Memuat data...</p>
    <div class="table-responsive">
        <table>
            <thead>
                <tr>
                    <th>Member ID</th>
                    <th>Name</th>
                    <th>Adresse</th>
                    <th>Phone number</th>
                    <th>Date of joining</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($daftarAnggota)): ?>
                    <tr>
                        <td colspan="6" style="text-align: center;">Belum ada data anggota. Silahlan tambah lewat menu "Tambah Anggota".</td>
                    </tr>
                
                <?php else: ?>
                    <?php foreach ($daftarAnggota as $anggota): ?>
                        <tr>
                            <td><?php echo $anggota['no_anggota']; ?></td>
                            <td><?php echo $anggota['nama'] ?></td>
                            <td><?php echo $anggota['alamat']; ?></td>
                            <td><?php echo $anggota['no_hp'] ?></td>
                            <td><?php echo $anggota['tanggal_bergabung'] ?></td>
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
        <input type="hidden" name="file" value="<?php echo $_SERVER['PHP_SELF']?>">
        <button type="submit">Reset</button>
    </form>
</section>
<?php include __DIR__ . '/../includes/footer.php' ?>