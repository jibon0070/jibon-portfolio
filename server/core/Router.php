<?php

class Router
{
    /**
     * @param string[] $url
     */
    public static function route($url)
    {
        //controller
        $controller = (isset($url[0]) && $url[0] != '') ? $url[0] . 'Controller' : 'HomeController';
        $controller = preg_replace('/ /', '', ucwords(preg_replace('/-/', ' ', $controller)));
        array_shift($url);

        //action
        $action = (isset($url[0]) && $url[0] != '') ? $url[0] . 'Action' : 'indexAction';
        $action = lcfirst(preg_replace('/ /', '', ucwords(preg_replace('/-/', ' ', $action))));
        array_shift($url);
        //params
        $queryParams = $url;
        $class = new $controller();
        if (method_exists($class, $action)) {
            $class->$action($queryParams);
        }
        else
            http_response_code(404);
        exit();
    }
}
