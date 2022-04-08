<?php
class ContactModel extends Model
{
    public $id;
    public $name;
    public $email;
    public $message;
    public $token1;
    public $token2;
    public $verified;
    public $created_at;
    public function __construct()
    {
        parent::__construct('contact');
    }
}
