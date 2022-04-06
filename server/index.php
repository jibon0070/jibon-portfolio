<?php

//headers for api
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding, X-Auth-Token, content-type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    header("Content-Type: application/json");
    exit();
}


//time zone
date_default_timezone_set('Asia/Dhaka');

define('ds', DIRECTORY_SEPARATOR);
define('root', dirname(__FILE__));

$url = isset($_SERVER['PATH_INFO']) ? explode('/', ltrim($_SERVER['PATH_INFO'], '/')) : [];

//require config file
require_once(root . ds . 'config' . ds . 'config.php');

//autoload classed
function autoload($className)
{
    if (file_exists(root . ds . 'core' . ds . $className . '.php')) {
        require_once(root . ds . 'core' . ds . $className . '.php');
    } elseif (file_exists(root . ds . 'app' . ds . 'controllers' . ds . $className . '.php')) {
        require_once(root . ds . 'app' . ds . 'controllers' . ds . $className . '.php');
    } elseif (file_exists(root . ds . 'app' . ds . 'models' . ds . $className . '.php')) {
        require_once(root . ds . 'app' . ds . 'models' . ds . $className . '.php');
    } elseif (file_exists(root . ds . 'config' . ds . $className . '.php')) {
        require_once(root . ds . 'config' . ds . $className . '.php');
    } else {
        http_response_code(404);
        exit();
    }
}

spl_autoload_register('autoload');


//route the request
Router::route($url);

