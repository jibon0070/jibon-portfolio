<?php

	class UsersController extends Controller
	{
		public function loginAction()
		{
			if (!$this->request->isPost()) $this->send->status(404);
			$data = $this->request->get();
			if (!isset($data->username) || !isset($data->password)) $this->send->status(401);
			$user = (new UsersModel())->findFirst([conditions => "username = ? or email = ?", bind => [$data->username,
				$data->username], order => "id DESC"]);
			if (!$user) $this->send->json(["error" => "username"]);
			if (!password_verify($data->password, $user->password)) $this->send->json(["error" => "password"]);
			$payload = [
				"id" => $user->id,
			];
			$token = JWT::encode($payload, SECRET_KEY);
			$this->send->json([
				"token" => $token,
			]);
		}
	}