<?php

    header('Content-type: application/json; charset=utf-8');

    require "sql.config.php";
    require "sql.php";

    function spit( $content ) {
        die(json_encode($content));
    }

    $sql = new sql();
    $sql->set_table("users");

    $data = json_decode(file_get_contents('php://input'));
    $action = $_SERVER['REQUEST_METHOD'];

    if( !$data
     or !count($data) ) {
        spit("No data was sent.");
    }

    switch( $data->action ) {
        case "signup":
            $record = array(
                "username" => $data->uname,
                "email" => $data->email,
                "online" => true,
                "password" => sha1($data->password)
            );
            $r = $sql->insert($record);
            if( $r === true ) {
                spit("success");
            } else {
                spit($r);        
            }
        break;

        case "login":
            

        break;

?>
