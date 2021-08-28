<?php

    namespace Helper;

use PDO;
use Helper\Response;
abstract class Connection{

        private static $connection=null;
        
        public static function getConn(): PDO{
            $dns=DB_DRIVER.":host". DB_DATABASE_HOST. ";dbname=".DB_DATABASE_NAME;
            $user=DB_DATABASE_USER;
            $password=DB_DATABASE_PASSWORD;
            if(self::$connection !== null){
                try {
                    self::$connection = new PDO($dns,$user,$password); 
                } catch (\Throwable $th) {
                    echo Response::error($th);
                }
            }
            return self::$connection;
        }
    }