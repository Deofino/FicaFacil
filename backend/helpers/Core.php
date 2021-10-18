<?php

namespace Helper;

use function PHPSTORM_META\type;

class Core
{
    private $url = array();
    private $controller = '\Controller\\notFoundController';
    private $method = 'index';
    private $params = array();

    public function __construct()
    {
        $data = array_filter(explode('backend', $_SERVER['REQUEST_URI']));
        array_shift($data);
        $url = array_filter(explode('/', $data[0]));
        $this->url = $url;
    }

    public function init()
    {
        if (isset($this->url[1]) && $this->url[1] === 'api') {
            array_shift($this->url);

            $this->getController();
            $this->getMethod();
            $this->getParams();

            try {
                call_user_func_array(array(new $this->controller, $this->method), array($this->params));
            } catch (\Throwable $th) {
                dd($th->getMessage());
                call_user_func_array(array(new \Controller\notFoundController, 'index'), $this->params);
            }
        }
    }
    private function getController()
    {
        if (isset($this->url[0])) {
            $exp = explode('?', $this->url[0]);
            $this->controller = '\Controller\\' . ucfirst($exp[0] === '' ? 'notFound' : $exp[0]) . 'Controller';
            array_shift($this->url);
        }
    }
    private function getMethod()
    {
        if (isset($this->url[0])) {
            $exp = explode('?', $this->url[0]);
            $this->method = $exp[0] === '' ? 'index' : $exp[0];
            array_shift($this->url);
        }
    }
    private function getParams()
    {
        if (isset($this->url[0])) {
            foreach ($this->url as $val) {
                $data = explode('?', $val);
                if ($data[0] != '') array_push($this->params, $data[0]);
            }
        }
    }
}
