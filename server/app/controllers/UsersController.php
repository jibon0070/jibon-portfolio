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
			if ($user->first_time == 1) $this->send->json(["error" => "first_time"]);
			if (!password_verify($data->password, $user->password)) $this->send->json(["error" => "password"]);
			$payload = [
				"id" => $user->id,
                "role" => $user->role
			];
			$token = JWT::encode($payload, SECRET_KEY);
			$this->send->json([
				"token" => $token,
			]);
		}

		public function registerAction()
		{
			if (!$this->request->isPost()) $this->send->status(404);
			$data = $this->request->get();
			if (!isset($data->email) || !(new UsersModel())->uniq($data->email, "email")) $this->send->status(401);
			$user = (new UsersModel());
			$user->email = $data->email;
            $user->role = "admin";
			$user->save();
			$this->send->json([success => true]);
		}

		public function uniqAction()
		{
			if (!$this->request->isPost()) $this->send->status(404);
			$data = $this->request->get();
			if (!isset($data->field) || !isset($data->value)) $this->send->status(401);
			$this->send->json((new UsersModel())->uniq($data->value, $data->field));
		}

		public function loginWithGoogleAction()
		{
			if (!$this->request->isPost()) $this->send->status(404);
			$data = $this->request->get();
			if (!isset($data->token)) $this->send->status(401);
			require_once './vendor/autoload.php';
			$client = new Google_Client();
			$client->setClientId(GOOGLE_CLIENT_ID);
			$client->setClientSecret(GOOGLE_CLIENT_SECRET);
			$client->addScope(['email', 'profile']);
			$ticket = $client->verifyIdToken($data->token);
			if (!$ticket) $this->send->status(401);
			$user = (new UsersModel())->findFirst([conditions => "email = ?", bind => [$ticket['email']]]);
			if (!$user) $this->send->json([error => "email"]);
			$payload = [
				"id" => $user->id,
                "role" => $user->role
			];
			$token = Firebase\JWT\JWT::encode($payload, SECRET_KEY);
			$this->send->json([
				"token" => $token,
				"first_time" => $user->first_time
			]);
		}

		public function firstTimeAction()
		{
			if (!$this->request->isPost()) $this->send->status(404);
			$this->auth = new Authentication(false);
			if ($this->auth->error()) $this->send->status(401);
			$data = $this->request->get();
			if (!isset($data->state)) $this->send->status(401);
			$user = (new UsersModel())->findById($this->auth->id());


			/*------------------------get---------------------------*/


			if ($data->state == 'get') {
				$this->send->json([
					"email" => $user->email
				]);
			}


			/*--------------------------set---------------------------*/


			if (
				!isset($data->data) ||
				!isset($data->data->username) ||
				!isset($data->data->password)
			) $this->send->status(401);
			$user->username = $data->data->username;
			$user->password = password_hash($data->data->password, PASSWORD_DEFAULT);
			$user->first_time = 0;
			$user->save();
			$this->send->json([success => true]);
		}
	}