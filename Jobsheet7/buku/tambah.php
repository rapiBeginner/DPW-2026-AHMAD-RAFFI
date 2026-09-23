<?php
$page_title = "Tambah Buku";
include __DIR__ . '/../includes/header.php';

$flash = $_SESSION['flash'] ?? null;
unset($_SESSION['flash']);
?>
        <section>
            <h2>Add Book</h2>

            <?php if ($flash): ?>
                <p class="flash flash-<?php echo $flash['type']; ?>"><?php echo $flash['pesan']; ?></p>
            <?php endif; ?>

            <form id="form-tambah" method="post" action="proses_tambah.php">
                <p>
                    <label for="judul">Title</label>
                    <input type="text" id="judul" name="judul" required>
                </p>
                <p>
                    <label for="pengarang">Author</label>
                    <input type="text" id="pengarang" name="pengarang" required>
                </p>
                <p>
                    <label for="tahun">Years of release</label>
                    <input type="number" id="tahun" name="tahun" min="1900" max="2026" required>
                </p>
                <p>
                    <label for="isbn">ISBN</label>
                    <input type="text" id="isbn" name="isbn">
                </p>
                <p>
                    <label for="stok">Stock</label>
                    <input type="number" id="stok" name="stok" min="0" required>
                </p>
                <p>
                    <label for="kategori">Category</label>
                    <select id="kategori" name="kategori">
                        <option value="fiksi">Fiction</option>
                        <option value="non-fiksi">Non-Fiction</option>
                        <option value="referensi">References</option>
                    </select>
                </p>
                <p>
                    <button type="submit">Save</button>
                </p>
            </form>
        </section>
<?php include __DIR__ . '/../includes/footer.php';?>