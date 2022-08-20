<?php


class DB
{
    /**
     * @var null | DB
     */
    private static $_instance = null;
    /**
     * @var PDO
     */
    private $_pdo;
    /**
     * @var PDOStatement|bool
     */
    private $_query;
    /**
     * @var bool
     */
    private $_error = false;
    /**
     * @var array|stdClass
     */
    private $_results;
    /**
     * @var int
     */
    private $_count = 0;
    /**
     * @var null |int
     */
    private $_lastInsertId = null;

    public $sql_error = null;

    /**
     * DB constructor.
     */
    private function __construct()
    {

        // Helpers::dnd(new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME, DB_USER, DB_PASSWORD));
        try {
            $this->_pdo = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME, DB_USER, DB_PASSWORD, [PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8' "]);
            $this->_pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->_pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->_pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        } catch (PDOException $e) {
            echo json_encode([
                "message" => $e->getMessage(),
                "code" => $e->getCode(),
                "file name" => $e->getFile(),
                "line number" => $e->getLine()
            ]);
            exit();
        }
    }

    /**
     * @return DB
     */
    public static function getInstance()
    {
        if (!isset(self::$_instance)) {
            self::$_instance = new DB();
        }

        return self::$_instance;
    }

    /**
     * @param string $sql
     * @param mixed[] $params
     * @param bool|string $class
     * @return $this
     */
    public function query($sql, $params = [], $class = false)
    {
        $this->_error = false;
        if ($this->_query = $this->_pdo->prepare($sql)) {
            $x = 1;
            if (count($params)) {
                foreach ($params as $param) {
                    $this->_query->bindValue($x, $param);
                    $x++;
                }
            }
            try {
                $this->_query->execute();
                if ($class) {
                    $this->_results = $this->_query->fetchAll(PDO::FETCH_CLASS, $class);
                } else {
                    $this->_results = $this->_query->fetchAll(PDO::FETCH_OBJ);
                }
                $this->_count = $this->_query->rowCount();
                $this->_lastInsertId = (int)$this->_pdo->lastInsertId();
            } catch (PDOException $exception) {
                $this->_error = true;
                $this->_results = null;
                $this->sql_error = $exception->getMessage();
            }
        }
        return $this;
    }

    /**
     * @param string $table
     * @param string[] $fields
     * @return bool|int
     */
    public function insert($table, $fields = [])
    {
        $fieldString = '';
        $values = [];
        foreach ($fields as $key => $value) {
            $fieldString .= $key . ' = ?, ';
            $values[] = $value;
        }

        $fieldString = rtrim($fieldString, ', ');

        $sql = "INSERT INTO " . $table . " SET " . $fieldString;

        if (!$this->query($sql, $values)->error()) {
            return $this->lastID();
        }
        return false;
    }

    /**
     * @return bool
     */
    public function error()
    {
        return $this->_error;
    }

    /**
     * @param string $table
     * @param int $id
     * @param string[] $fields
     * @return bool
     */
    public function update($table, $id, $fields)
    {
        $fieldString = '';
        $values = [];
        foreach ($fields as $key => $value) {
            $fieldString .= $key . ' = ?, ';
            $values[] = $value;
        }

        $fieldString = rtrim($fieldString, ', ');

        $values[] = $id;

        $sql = "UPDATE {$table} SET {$fieldString} WHERE id = ?";

        if (!$this->query($sql, $values)->error()) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @param string $table
     * @param int $id
     * @return bool
     */
    public function delete($table, $id)
    {
        $sql = "DELETE FROM {$table} WHERE id = {$id}";
        if (!$this->query($sql)->error()) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @return array | stdClass
     */
    public function results()
    {
        return $this->_results;
    }

    /**
     * @return array
     */
    public function first()
    {
        return (!empty($this->results())) ? $this->results()[0] : [];
    }

    /**
     * @return int
     */
    public function count()
    {
        return $this->_count;
    }

    /**
     * @return int
     */
    public function lastID()
    {
        return $this->_lastInsertId;
    }

    /**
     * @param string $table
     * @param array $params
     * @param bool | string $class
     * @return array
     */
    public function find($table, $params = [], $class = false)
    {
        if ($this->_read($table, $params, $class)) {
            return $this->results();
        }
        return [];
    }

    /**
     * @param string $table
     * @param array $params
     * @param bool|string $class
     * @return array|bool
     */
    public function findFirst($table, $params = [], $class = false)
    {
        if ($this->_read($table, $params, $class)) {
            return $this->first();
        }
        return false;
    }

    /**
     * @param string $table
     * @param array $params
     * @param bool|string $class
     * @return bool
     */
    protected function _read($table, $params = [], $class = false)
    {
        $conditionString = '';
        $bind = [];
        $order = '';
        $limit = '';
        $offset = '';

        //condition
        if (isset($params['conditions'])) {
            if ($params['conditions'] != '') {
                $conditionString = ' WHERE ' . $params['conditions'];
            }
        }

        //bind
        if (array_key_exists('bind', $params)) {
            $bind = $params['bind'];
        }

        //order
        if (array_key_exists('order', $params)) {
            $order = ' ORDER BY ' . $params['order'];
        }

        //limit
        if (array_key_exists('limit', $params)) {
            $limit = ' LIMIT ' . $params['limit'];
        }

        //offset
        if (array_key_exists('offset', $params)) {
            $offset = ' OFFSET ' . $params['offset'];
        }

        $sql = "SELECT * FROM {$table}{$conditionString}{$order}{$limit}{$offset}";

        if ($this->query($sql, $bind, $class)) {
            if (!count($this->_results)) return false;
            return true;
        }
        return false;
    }
}
