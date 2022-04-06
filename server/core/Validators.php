<?php

class Validators
{
    /**
     * @param string|int $value
     * @return bool
     */
    public static function requiredPassed($value)
    {
        $value = (string)$value;
        return !($value == "");
    }

    /**
     * @param int|string $value
     * @param int $length
     * @return bool
     */
    public static function minLengthPassed($value, $length)
    {
        return !(strlen($value) < $length);
    }

    /**
     * @param int|string $value
     * @param int $length
     * @return bool
     */
    public static function maxLengthPassed($value, $length)
    {
        return !(strlen($value) > $length);
    }

    /**
     * @param string $value
     * @param string $field
     * @param UsersModel $model
     */
    public static function uniqPassed($value, $field, $model)
    {
        return $model->uniq($value, $field);
    }

    public static function emailPassed($email)
    {
        $containsSpace = "/\s/";
        $validEmail = "/^.+@.+\..+/";
        if (preg_match($containsSpace, $email))
            return false;
        elseif (!preg_match($validEmail, $email))
            return false;
        else
            return true;
    }
}
