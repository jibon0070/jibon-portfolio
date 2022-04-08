<?php

	class PortfolioController extends Controller
	{
		public function uniqAction()
		{
			if (!$this->request->isPost()) $this->send->status(404);
			$data = $this->request->get();
			if (
				!isset($data->field) ||
				!isset($data->value)
			) $this->send->status(401);
			$this->send->json((new PortfolioModel())->uniq($data->value, $data->field));
		}

		public function indexAction()
		{
			if (!$this->request->isGet()) $this->send->status(404);
			$portfolios = array_map(function ($portfolio) {
				$arr = [
					"title" => $portfolio->title,
					"image_link" => $portfolio->image_link
				];
				if ($portfolio->github_link) $arr["github_link"] = $portfolio->github_link;
				if($portfolio->live_link) $arr["live_link"] = $portfolio->live_link;
				return $arr;
			}, (new PortfolioModel())->find([order => 'title, id']));
			$this->send->json($portfolios);
		}

	}