<?php

namespace Helper;

class Response
{

    public static function success($message, int $status_code = 200)
    {
        http_response_code($status_code);
        return json_encode([
            "data" => $message,
            "status_code" => $status_code
        ], JSON_UNESCAPED_UNICODE);
    }

    public static function json($message)
    {
        http_response_code(200);
        return json_encode([
            "data" => $message,
        ], JSON_UNESCAPED_UNICODE);
    }

    public static function error($message, int $status_code = 500)
    {
        return json_encode([
            "data" => $message,
            "status_code" => $status_code
        ], JSON_UNESCAPED_UNICODE);
    }

    public static function warning($message, int $status_code = 400)
    {
        return json_encode([
            "data" => $message,
            "status_code" => $status_code
        ], JSON_UNESCAPED_UNICODE);
    }
}
