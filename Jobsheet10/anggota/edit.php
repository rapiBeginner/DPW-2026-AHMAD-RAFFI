<?php
require __DIR__ . '/../includes/auth.php';
$page_title = "Edit Anggota";
include __DIR__ . '/../includes/header.php';
require __DIR__ . '/../includes/koneksi.php';

$flash = $_SESSION['flash'] ?? null;
unset($_SESSION['flash']);

$id = $_GET['id'] ?? null;
if (!$id) {
    header('Location: list.php');
    exit;
}

$stmt = $pdo->prepare("SELECT * FROM anggota WHERE id = :id");
$stmt->execute(['id' => $id]);
$anggota = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$anggota) {
    header('Location: list.php');
    exit;
}
?>
        <section>
            <h2>Edit Member</h2>

            <?php if ($flash): ?>
                <p class="flash flash-<?php echo $flash['type']; ?>"><?php echo $flash['pesan']; ?></p>
            <?php endif; ?>

            <form id="form-tambah" method="post" action="proses_edit.php">
                <input type="hidden" name="id" value="<?php echo $anggota['id']; ?>">
                <p>
                    <label for="nama">Name</label><br>
                    <input type="text" id="nama" name="nama" value="<?php echo $anggota['nama']; ?>" required>
                </p>
                <p>
                    <label for="no_anggota">Member ID</label><br>
                    <input type="text" id="no_anggota" name="no_anggota" value="<?php echo $anggota['no_anggota']; ?>" required>
                </p>
                <p>
                    <label for="alamat">Adresse</label><br>
                    <input type="text" id="alamat" name="alamat" value="<?php echo $anggota['alamat']; ?>">
                </p>
                <p>
                    <label for="no_hp">Phone number</label><br>
                    <input type="text" id="no_hp" name="no_hp" value="<?php echo $anggota['no_hp']; ?>">
                </p>
                <p>
                    <label for="tanggal_bergabung">Date of join</label><br>
                    <input type="date" id="tanggal_bergabung" name="tanggal_bergabung" value="<?php echo $anggota['tanggal_bergabung']; ?>">
                </p>
                <p>
                    <button type="submit">Update</button>
                </p>
            </form>
        </section>
<?php include __DIR__ . '/../includes/footer.php'; ?>