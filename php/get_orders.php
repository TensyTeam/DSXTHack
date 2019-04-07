<?php
    if($_GET["request"]) {
        header("Access-Control-Allow-Origin: *");

        //connection
        $connect = mysqli_connect('localhost','u0607688_dsxt','Misha159','u0607688_dsxt');
        mysqli_set_charset($connect, "utf8");

        //inizialize array
        $json_orders = array ();

        //get orders info
        $query = mysqli_query($connect, "SELECT `id`, `date`, `time`, `name`, `quantity`, `price`, `type`  FROM `orders` ORDER BY `id` DESC LIMIT 50");
        while($data = mysqli_fetch_array($query)) {
            //push order info
            array_push($json_orders, array('id'=>$data['id'],'date'=>$data['date'],'time'=>$data['time'],'name'=>$data['name'],'quantity'=>$data['quantity'],'price'=>$data['price'],'type'=>$data['type']));
        }

        //response
        echo json_encode($json_orders);
    }
?>
