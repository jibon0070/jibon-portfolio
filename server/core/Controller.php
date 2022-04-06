<?php

class Controller
{
    /**
     * @var Input
     */
    public $request;
    /**
     * @var Authentication
     */
    public $auth;
    /**
     * @var Output
     */
    public $send;

    /**
     * Controller constructor.
     */
    public function __construct()
    {
        $this->request = new Input();
        $this->auth = new Authentication();
        $this->send = new Output();
    }
}
