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

const ds = DIRECTORY_SEPARATOR;
define('root', dirname(__FILE__));

$url = isset($_SERVER['REQUEST_URI']) ? explode('/', rtrim(ltrim(explode('?', $_SERVER['REQUEST_URI'])[0], '/'), '/')) :[];

if(!file_exists(root . ds . 'config' . ds . 'config.php')){
    echo '<h1>Please copy config/config.php.sample to config/config.php and fill in the details</h1>';
    exit;
}
require_once(root . ds . 'config' . ds . 'config.php');
if(!file_exists(root . ds . 'core' . ds . 'const.php')){
    echo '<h1>Please copy core/const.php.sample to core/const.php and fill in the details</h1>';
    exit;
}
require_once(root . ds . 'core' . ds . 'const.php');

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


if (!Helpers::is_production()) {

    //display errors
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
}

//log errors
ini_set('log_errors', 1);
ini_set('error_log', root . ds . 'logs' . ds . 'error.log');

//route the request
Router::route($url);
