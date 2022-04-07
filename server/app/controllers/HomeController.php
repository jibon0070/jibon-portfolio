<?php

	class HomeController extends Controller
	{
		public function indexAction()
		{
			if (!$this->request->isGet()) $this->send->status(404);
            $header_image = (new SiteOptionsModel())->findFirst(['conditions' => 'name = ?', 'bind' => ['header_image']]);
            if (!$header_image) $header_image = null;
            else $header_image = $header_image->option_value;
            $about_me_image = (new SiteOptionsModel())->findFirst(['conditions' => 'name = ?', 'bind' => ['about_me_image']]);
            if (!$about_me_image) $about_me_image = null;
            else $about_me_image = $about_me_image->option_value;
            $experience = (new SiteOptionsModel())->findFirst(['conditions' => 'name = ?', 'bind' => ['experience']]);
            if (!$experience) $experience = null;
            else $experience = $experience->option_value;
            $clients = (new SiteOptionsModel())->findFirst(['conditions' => 'name = ?', 'bind' => ['clients']]);
            if (!$clients) $clients = null;
            else $clients = $clients->option_value;
            $projects = (new SiteOptionsModel())->findFirst(['conditions' => 'name = ?', 'bind' => ['projects']]);
            if (!$projects) $projects = null;
            else $projects = $projects->option_value;
            $this->send->json(["header_image" => $header_image, "about_me_image" => $about_me_image, "experience" => $experience, "clients" => $clients, "projects" => $projects]);
		}
	}