<?php

class SiteOptionsModel extends Model
{

    public $id;
    public $name;
    public $option_value;

    public function __construct()
    {
        parent::__construct('site_options');
    }
}