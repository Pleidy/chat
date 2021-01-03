<?php
namespace core;

/**
 * Class Bootstrap
 * @package core
 */
class Bootstrap {
    /**
     *
     */
    public static function run()
    {
        self::parseUrl();
    }

    public static function parseUrl()
    {
        if (isset($_GET['s'])) {
            $info = explode('/', $_GET['s']);
            $class = 'src\web\controller\\' . ucfirst($info[0]);
            $action = $info[1];
        } else {
            $class = "src\web\controller\Index";
            $action = "show";
        }

        echo (new $class)->$action();
    }
}
