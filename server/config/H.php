<?php

	use Minishlink\WebPush\Subscription;
	use Minishlink\WebPush\WebPush;

	class H
	{
		public static function is_production()
		{
			return explode(".", $_SERVER['HTTP_HOST'])[1] != "local";
		}

		/**
		 * @noinspection PhpUnused
		 * @param $data mixed
		 */
		public static function dnd($data)
		{
			echo '<pre>';
			echo json_encode($data);
			echo '</pre>';
			exit();
		}

		public static function dump($data)
		{
			echo "<pre>";
			var_dump($data);
			echo "</pre>";
		}

		/**
		 * @param $fromName string
		 * @param $from string
		 * @param $to string
		 * @param $subject string
		 * @param $message string
		 * @return void
		 */
		public static function sendMail($fromName, $from, $to, $subject, $message)
		{
			$headers = "MIME-Version: 1.0\r\n";
			$headers .= "Content-Type:text/html;charset=UTF-8\r\n";
			$headers .= "From: $fromName<$from>\r\n";
			$headers .= "Replay-To: $from\r\n";
			$headers .= "X-Mailer: PHP " . phpversion();

			mail($to, $subject, $message, $headers);
		}

		/**
		 * @param $number int|float|double
		 * @return string
		 */
		public static function numberPadding($number)
		{
			if ($number < 10) {
				return "0$number";
			}
			return "$number";
		}

		/**
		 * @param $id int
		 * @param $date int
		 * @return string|null
		 */

		/**
		 * @param $data mixed
		 * @return string
		 */
		public static function json_encode($data)
		{
			$data = str_replace("\\", "", json_encode($data));
			return $data;
		}

		/** @noinspection RegExpRedundantEscape
		 * @noinspection SqlResolve
		 * @param $body string
		 * @return string
		 */
		public static function cyfer($body)
		{
			preg_match_all("/\\$\{\w*:\w*:\d*\}/", $body, $array);
			$array = $array[0];
			$array = array_map(
				function ($row) {
					$row = ltrim($row, "\${");
					$row = rtrim($row, "}");
					return $row;
				}, $array
			);
			$temp = [];
			foreach ($array as $item) {
				$frac = explode(":", $item);
				$users = (new Model(""))->query("select * from $frac[0] where id = ?", [$frac[2]])->results();
				$temp[] = $users[0]->{$frac[1]};
			}
			foreach ($temp as $item) {
				$body = preg_replace("/\\$\{\w*:\w*:\d*\}/", $item, $body, 1);
			}
			return $body;
		}

		public static function ar_bf($id, $user_id, $to)
		{
			$ar = (new AccountsReceivableModel())->findById($id);
			$balance = $ar->bf * 1;
			$transactions = (new TransactionsModel())->query("select sum(debit) as dr, sum(credit) as cr from transactions where account = 'ar' and ar = 
		? and user_id = ? and date < ?", [$id, $user_id, $to])->results()[0];
			$balance += $transactions->dr * 1;
			$balance -= $transactions->cr * 1;
			return $balance;
		}

		public static function ap_bf($id, $user_id, $to)
		{
			$ap = (new AccountsPayableModel())->findById($id);
			$balance = $ap->bf * 1;
			$transactions = (new TransactionsModel())->query("select sum(debit) as dr, sum(credit) as cr from transactions where account = 'ap' and ap = 
		? and user_id = ? and date < ?", [$id, $user_id, $to])->results()[0];
			$balance -= $transactions->dr * 1;
			$balance += $transactions->cr * 1;
			return $balance;
		}
	}
