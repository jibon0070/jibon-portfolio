<?php

declare(strict_types=1);

class Helpers
{
    /**
     * @param mixed $data
     */
    public static function dnd($data)
    {
        echo '<pre>';
        var_dump($data);
        echo '</pre>';
        die();
    }

    /**
     * @param string| int $dirty
     * @return string
     */
    public static function sanitize($dirty)
    {
        if (is_int($dirty)) {
            $dirty = (string)$dirty;
        } elseif ($dirty == null) {
            return null;
        }
        return htmlentities($dirty, ENT_QUOTES, 'UTF-8');
    }

    /**
     * @param Model $obj
     * @return array
     */
    public static function getObjectProperty($obj)
    {
        return get_object_vars($obj);
    }

    /**
     * @param string $string
     * @return array|false|string[]
     */
    public static function mb_str_split($string)
    {
        # Split at all position not after the start: ^
        # and not before the end: $
        return preg_split('/(?<!^)(?!$)/u', $string);
    }
}
