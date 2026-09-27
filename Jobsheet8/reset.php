

<?php 

 include __DIR__.'/includes/header.php';
if (isset($_POST["reset"])) {
    session_unset();
    session_destroy();
    header('Location:'.$_POST["file"]);
    // print_r($_SESSION);
}
?>