<?php
$__jobsheetRoot = dirname(__DIR__);
$__scriptDir = dirname($_SERVER['SCRIPT_FILENAME']);
$__rel = ltrim(str_replace('\\', '/', substr($__scriptDir, strlen($__jobsheetRoot))), '/');
$base = $__rel === '' ? '' : str_repeat('../', substr_count($__rel, '/') + 1);

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
$sudahLogin = isset($_SESSION['user_id']);

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LibSym-Mini <?php echo isset($page_title) ? ' | ' . $page_title : ''; ?></title>
    <link rel="stylesheet" href="<?php echo $base; ?>asset/style.css">
</head>

<body>
    <header>
        <h1>Mini Library System</h1>
        <!-- <input type="checkbox" name="" id="nav-toggle" class="nav-toggle"> -->
        <!-- <label for="nav-toggle" class="nav-toggle-label">&#9776;</label> -->
        <button type="button" id="nav-toggle-btn" class="nav-toggle-label" aria-label="Menu">&#9776;</button>
        <nav>
            <ul>
                <li><a href="<?php echo $base; ?>index.php">Home</a></li>
                <li><a href="<?php echo $base; ?>buku/list.php">Book List</a></li>
                <?php if ($sudahLogin): ?>
                    <li><a href="<?php echo $base; ?>buku/tambah.php">Add Book</a></li>
                    <li><a href="<?php echo $base; ?>anggota/list.php">Member List</a></li>
                    <li><a href="<?php echo $base; ?>anggota/tambah.php">Add Member</a></li>
                <?php endif; ?>
            </ul>
        </nav>
        <div class="auth-status">
            <?php if ($sudahLogin): ?>
                <span><?php echo $_SESSION['nama']; ?></span>
                <a href="<?php echo $base; ?>auth/logout.php">Logout</a>
            <?php else: ?>
                <a href="<?php echo $base; ?>auth/login.php">Login</a>
            <?php endif; ?>
        </div>
    </header>

    <main>