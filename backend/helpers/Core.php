<?php

namespace Helper;


class Core
{
    private $url = array();
    private $controller = '\Controller\\notFoundController';
    private $method = 'index';
    private $params = array();

    public function __construct(array $url)
    {
        $this->url = $url;
    }

    public function init()
    {

        if ($this->url[0] === 'api') {
            if (self::verifyArray($this->url[1])) {
                $this->controller = '\Controller\\' . ucfirst($this->url[1]) . 'Controller';

                if (self::verifyArray($this->url[2])) {
                    $this->method = $this->url[2];

                    if (self::verifyArray($this->url)) {
                        array_shift($this->url);
                        array_shift($this->url);

                        $this->params = $this->url;
                    }
                }
            }
        }
        try {
            call_user_func_array(array(new $this->controller, $this->method), $this->params);
        } catch (\Throwable $th) {
            // var_dump($this->url);
            // echo $this->controller;
            // echo "method" . $this->method;
            // var_dump($this->params);
            call_user_func_array(array(new \Controller\notFoundController, 'index'), array(['url' => $_GET['url']]));
        }
    }

    public static function verifyArray($string)
    {
        if (isset($string) && $string != "")
            return true;
        return false;
    }
}
