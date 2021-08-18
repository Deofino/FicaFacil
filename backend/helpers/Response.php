<?php

namespace Helper;

class Response
{

    public static function success($message, int $status_code = 200)
    {
        return json_encode([
            "data" => $message,
            "status_code" => $status_code
        ]);
    }

    public static function json($message)
    {
        return json_encode([
            "data" => $message,
        ]);
    }

    public static function error($message, int $status_code = 500)
    {
        return json_encode([
            "data" => $message,
            "status_code" => $status_code
        ]);
    }

    public static function warning($message, int $status_code = 400)
    {
        return json_encode([
            "data" => $message,
            "status_code" => $status_code
        ]);
    }
}
