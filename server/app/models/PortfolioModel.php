<?php

	class PortfolioModel extends Model
	{

		public $id;
		public $title;
		public $github_link;
		public $live_link;
		public $image_link;
		public $created_at;
		public function __construct() {
			parent::__construct('portfolio');
		}
	}