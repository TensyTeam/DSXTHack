<?php
    if($_GET["id"]) {
        header("Access-Control-Allow-Origin: *");

        $id = $_GET["id"];

        //connection
        $connect = mysqli_connect('localhost','u0607688_dsxt','Misha159','u0607688_dsxt');
        mysqli_set_charset($connect, "utf8");

        //insert info
        $query = mysqli_query($connect, "UPDATE `orders` SET `show` = 'true' WHERE `id` = '$id'");

        //get id order
        $query = mysqli_query($connect, "SELECT `id` FROM `orders` ORDER BY `id` DESC");
        $data = mysqli_fetch_array($query);

        //response
        echo json_encode("Success");
    }
?>
