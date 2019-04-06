<?php
    if($_GET["value"]) {
        header("Access-Control-Allow-Origin: *");

        $value = $_GET["value"];
        $name = $_GET["name"];

        $connect = mysqli_connect('localhost','u0607688_dsxt','Misha159','u0607688_dsxt');
        mysqli_set_charset($connect, "utf8");

        $query = mysqli_query($connect, "INSERT INTO `orders` (`id`, `value`, `name`) VALUES (NULL, '$value', '$name')");
        $query = mysqli_query($connect, "SELECT `id` FROM `orders` ORDER BY `id` DESC");
        $data = mysqli_fetch_array($query);

        echo json_encode($data['id']);
    }
?>
