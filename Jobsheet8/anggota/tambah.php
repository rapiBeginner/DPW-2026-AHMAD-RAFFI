<?php
$page_title = "Tambah Anggota";
include __DIR__ . '/../includes/header.php';

$flash = $_SESSION['flash'] ?? null;
unset($_SESSION['flash']);
?>
<section>
    <h2>Add Member</h2>
    <?php
    if ($flash): ?>
        <p class="flash flash-<?php echo $flash['type']; ?>"><?php echo $flash['pesan']; ?></p>
    <?php endif; ?>
    <form id="form-tambah" method="post" action="proses_tambah.php">
        <p>
            <label for="name">Name </label>
            <input type="text" id="name" name="name" required>
        </p>
        <p>
            <label for="memberID">Member ID</label>
            <input type="text" id="memberID" name="memberID" required>
        </p>
        <p>
            <label for="adresse">Address</label>
            <input type="text" id="adresse" name="adresse">
        </p>
        <p>
            <label for="phoneNumber">Phone Number</label>
            <input type="number" name="phoneNumber" id="phoneNumber">
        </p>
        <p>
            <label for="dateOfJoin">Date of joining</label>
            <input type="date" name="dateOfJoin" id="dateOfJoin">
        </p>
        <p>
            <button type="submit">Save</button>
        </p>
    </form>
</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>