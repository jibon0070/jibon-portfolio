<?php

class ExperienceModel extends Model
{

    public $id;
    public $title;
    public $experience;
    public $category;

    public function __construct()
    {
        parent::__construct('experience');
    }
}