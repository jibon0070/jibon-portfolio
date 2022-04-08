<?php

class ContactController extends Controller
{
	public function sendAction()
	{
		if (!$this->request->isPost()) $this->send->status(404);
		if ($this->auth->error()) $this->send->status(401);
		$data = $this->request->get();
		if (
			!isset($data->name) ||
			!isset($data->email) ||
			!isset($data->message)
		) $this->send->status(401);
		$contact = (new ContactModel())->findFirst([conditions => "email = ? and verified = 0", bind => [$data->email]]);
		if($contact){
			$this->send->json(['error' => 'You have already sent a message to this email address. Please check your inbox for the verification email.']);
		}
		$contact = new ContactModel();
		$contact->name = $data->name;
		$contact->email = $data->email;
		$contact->message = $data->message;
		$contact->token1 = bin2hex(random_bytes(32));
		$token2 = bin2hex(random_bytes(32));
		$contact->token2 = password_hash($token2, PASSWORD_DEFAULT);
		$contact->verified = 0;
		$contact->created_at = time();
		$contact->save();
		$url = "https://" . $_SERVER['HTTP_HOST'] . '/contact/confirm?token1=' . $contact->token1 . '&token2=' . $token2;
		$message = "
			<h1>Hello, " . $contact->name . "</h1>
			<p>
				You have a new message from your contact form.
				<br>
				<br>
				<b>Message:</b>
				<br>
				" . $contact->message . "
				<br>
				<br>
				<b>Email:</b>
				<br>
				" . $contact->email . "
			</p>
			<p>
				Please click on the following link to confirm your email address:
			</p>
			<p>
				<a href='" . $url . "'>Confirm</a>
			</p>";
		if (H::is_production()) {
			H::sendMail("A.R. Jibon", "atikurrahaman386@gmail.com", $contact->email, "Contact Form", $message);
			$this->send->json([success => true]);
		}
		$this->send->json(['url' => $url]);
	}
}
