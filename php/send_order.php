<?php
    if($_GET["name"]) {
        header("Access-Control-Allow-Origin: *");

        $name = $_GET["name"];
        $quantity = $_GET["quantity"];
        $price = $_GET["price"];
        $type = $_GET["type"];

        //current date
        $date = date("y.m.d");

        //current time
        $time = date("h:i:s");

        //connection
        $connect = mysqli_connect('localhost','u0607688_dsxt','Misha159','u0607688_dsxt');
        mysqli_set_charset($connect, "utf8");

        //insert info
        $query = mysqli_query($connect, "INSERT INTO `orders` (`id`, `date`, `time`, `name`, `quantity`, `price`, `type`, `show`) VALUES (NULL, '$date', '$time', '$name', '$quantity', '$price', '$type', 'false')");

        //get id order
        $query = mysqli_query($connect, "SELECT `id` FROM `orders` ORDER BY `id` DESC");
        $data = mysqli_fetch_array($query);

        //response
        echo json_encode($data['id']);
    }
?>
