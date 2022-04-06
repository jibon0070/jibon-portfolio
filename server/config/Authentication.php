<?php

class Authentication
{
    /**
     * @var int
     */
    private $id;
    /**
     * @var bool
     */
    private $error = true;

    private $send_first_time_error = true;

    public function __construct($send_first_time_error = true)
    {
        $this->send_first_time_error = $send_first_time_error;
    }

    /**
     * @return $this
     */
    public function verify()
    {
        $this->error = false;
        $headers = getallheaders();
        $authorization = null;
        if (isset($headers['Authorization'])) $authorization = $headers['Authorization'];
        if ($authorization == null) {
            $this->error = true;
            return $this;
        }

        $authorization = explode(' ', $authorization);

        $token = $authorization[1];

        $payload = JWT::decode($token, SECRET_KEY, ['HS256']);
        if ($payload === false) {
            $this->error = true;
            return $this;
        }
        $user = (new UsersModel())->findById($payload->id);
        if (!$user) {
            $this->error = true;
            return $this;
        }
        if ($user->role != $payload->role) {
            $this->error = true;
            return $this;
        }

        if ($user->first_time == 1 && $this->send_first_time_error) {
            $this->error = true;
            echo json_encode([error => 'first time']);
            exit();
        }
        $id = $payload->id;
        $this->id = $id;
        return $this;
    }

    /**
     * @return bool
     */
    public function error()
    {
        $this->verify();
        return $this->error;
    }

    /**
     * @return int
     */
    public function id()
    {
        $this->verify();
        return $this->id;
    }

    /**
     * @param string $role
     * @return boolean
     */
    public function is_role($role)
    {
        $this->verify();
        if ($this->error) return false;
        $users = new UsersModel();
        $users = $users->findById($this->id);
        if ($users->role != $role) return false;
        return true;
    }
}
