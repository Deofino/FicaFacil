<?php

    namespace Helper;

use PDO;

class Connection{

        private $connection=null;
        public static function getConn(): PDO{
            $dns=DB_DRIVER."";
            $user='';
            $password='';

        }
    }