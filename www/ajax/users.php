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

    switch( $action ) {
        case "POST":
            if( $data->action == "signup" ) {
                $record = array(
                    "username" => $data->uname,
                    "email" => $data->email,
                    "online" => true,
                    "password" => sha1($data->password)
                );
                $r = $sql->insert($record);
                if( $r === true ) {
                    $data->id = $sql->last();
                    $data->action = "signedup";
                    spit($data);
                } else {
                    $data->error = mysql_error();
                    $data->action = "error";
                    spit($data);
                }
            } elseif( $data->action == "login" ) {

            }
        break;

        case "login":
            

        break;
    }
?>
