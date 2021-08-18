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
            array_shift($this->url);
            if (self::verifyArray($this->url[0])) {

                $this->controller = '\Controller\\' . ucfirst($this->url[0]) . 'Controller';
                array_shift($this->url);

                if (self::verifyArray($this->url[0])) {
                    $this->method = $this->url[0];
                    array_shift($this->url);

                    if (self::verifyArray($this->url[0])) {
                        $this->params = $this->url;
                    }
                }
            }
        }
        try {
            call_user_func_array(array(new $this->controller, $this->method), $this->params);
        } catch (\Throwable $th) {
            call_user_func_array(array(new \Controller\notFoundController, 'index'), array());
        }
    }

    public static function verifyArray($array)
    {
        if (isset($array[0]))
            return true;
        return false;
    }
}
