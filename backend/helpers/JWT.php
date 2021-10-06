<?php

namespace Helper;

class JWT
{
    /**
     * createJWT --> Cria um token JWT de acordo com a data = payload
     * 
     * Exemplo = [
     *      'iss' => 'localhost',
     *     'sub' => id,
     *     'name' => "Delfino",
     *      ]
     *
     *  @param  array $data
     * @return string|bool
     */
    public static function createJWT($data): string | bool
    {
        try {
            $header = [
                'alg' => 'HS256',
                'typ' => 'JWT'
            ];

            $header = json_encode($header);
            $header = base64_encode($header);

            $payload = $data;
            $payload = json_encode($payload);
            $payload = base64_encode($payload);

            $signature = hash_hmac('sha256', "$header.$payload", PASSWORD_JWT, true);
            $signature = base64_encode($signature);

            $jwt  = "$header.$payload.$signature";
            return $jwt;
        } catch (\Throwable $th) {
            return false;
        }
    }

    /**
     * validateJWT --> Ira validar se seu Token JWT
     *
     * @param  string $jwt
     * @return bool
     */
    public static function validateJWT(string $jwt): bool
    {
        try {
            $part = explode(".", $jwt);
            $header = isset($part[0]) ? $part[0] : '';
            $payload = isset($part[1]) ? $part[1] : '';
            $signature = isset($part[2]) ? $part[2] : '';

            $valid = hash_hmac('sha256', "$header.$payload", PASSWORD_JWT, true);
            $valid = base64_encode($valid);

            return $signature == $valid ? true : false;
        } catch (\Throwable $th) {
            return false;
        }
    }
}
