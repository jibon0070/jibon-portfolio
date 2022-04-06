<?php

	class MigrateDatabaseController extends Controller
	{
		public function indexAction()
		{
			if (!$this->request->isGet())$this->send->status(404);
			Migrate::auto_migrate();
			$this->send->json('database migrated');
		}
	}