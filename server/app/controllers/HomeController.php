<?php

	class HomeController extends Controller
	{
		public function indexAction()
		{
			$this->send->json('Hello World!');
		}
	}