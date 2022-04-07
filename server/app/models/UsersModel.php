<?php

	class UsersModel extends Model
	{

		public $id;
		public $username;
		public $password;
		public $email;
		public $first_time = 1;
        public $role;

        public function __construct() {
			parent::__construct('users');
		}
	}