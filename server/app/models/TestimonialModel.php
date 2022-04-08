<?php

	class TestimonialModel extends Model
	{
		public $id;
		public $name;
		public $description;
		public $image_link;
		public $created_at;

		public function __construct() {
			parent::__construct('testimonial');
		}
	}