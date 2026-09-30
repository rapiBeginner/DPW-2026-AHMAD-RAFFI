<?php
$page_title = "Edit Buku";
include __DIR__ . '/../includes/header.php';
require __DIR__ . '/../includes/koneksi.php';

$flash = $_SESSION['flash'] ?? null;
unset($_SESSION['flash']);

$id = $_GET['id'] ?? null;
if (!$id) {
    header('Location: list.php');
    exit;
}

$stmt = $pdo->prepare("SELECT * FROM buku WHERE id = :id");
$stmt->execute(['id' => $id]);
$buku = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$buku) {
    header('Location: list.php');
    exit;
}
?>

<section>
    <h2>Edit Book</h2>
    <form id="form-edit" method="post" action="proses_edit.php">
        <input type="hidden" name="id" value="<?=  $buku['id']; ?>">
        <p>
            <label for="judul">Title</label>
            <input type="text" id="judul" name="judul" value="<?=  $buku['judul']; ?>" required>
        </p>
        <p>
            <label for="pengarang">Author</label>
            <input type="text" id="pengarang" name="pengarang" value="<?=  $buku['pengarang']; ?>" required>
        </p>
        <p>
            <label for="tahun">Years of release</label>
            <input type="number" id="tahun" name="tahun" min="1900" max="2026" value="<?=  $buku['tahun']; ?>" required>
        </p>
        <p>
            <label for="isbn">ISBN</label>
            <input type="text" id="isbn" name="isbn" value="<?=  $buku['isbn']; ?>">
        </p>
        <p>
            <label for="stok">Stock</label>
            <input type="number" id="stok" name="stok" min="0" value="<?=  $buku['stok']; ?>" required>
        </p>
        <p>
            <label for="kategori">Category</label>
            <select id="kategori" name="kategori">
                <?php foreach (['Fiction','Non-Fiction','References'] as $key => $value) : ?>
                    <option value="<?= $value ?>" <?php echo $buku['kategori'] == $value ?'selected':''?>><?= $value ?></option>
                <?php endforeach; ?>
            </select>
        </p>
        <p>
            <button type="submit">Save</button>
        </p>
    </form>
</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>