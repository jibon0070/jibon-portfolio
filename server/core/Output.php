<?php


declare(strict_types=1);

class Output
{
    /**
     * @param mixed
     */
    public function json($data)
    {
        $data = json_encode($data);
        echo $data;
        exit();
    }

    /**
     * @param int $code
     * @return $this
     */
    public function status($code)
    {
        http_response_code($code);
        exit();
    }


}
