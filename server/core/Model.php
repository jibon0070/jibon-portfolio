<?php


class Model
{
    /**
     * @var DB|null
     */
    protected $_db;
    /**
     * @var string
     */
    protected $_table;
//    protected $_modelName;
    /**
     * @var int|null
     */
    public $id;

    /**
     * Model constructor.
     * @param string $table
     */
    public function __construct($table)
    {
        
        $this->_db = DB::getInstance();
        $this->_table = $table;
//        $this->_modelName = str_replace(' ', '', ucwords(str_replace('_', ' ', $this->_table)));
    }

    /**
     * @param array $params
     * @return stdClass[]|$this[]
     */
    public function find($params = [])
    {
        $resultsQuery = $this->_db->find($this->_table, $params, get_class($this));
        if (!$resultsQuery) return [];
        return $resultsQuery;
    }

    /**
     * @param array $params
     * @return stdClass| bool|$this
     */
    public function findFirst($params = [])
    {
        return $this->_db->findFirst($this->_table, $params, get_class($this));
    }

    /**
     * @param int $id
     * @return stdClass|bool|$this
     */
    public function findById($id)
    {
        return $this->findFirst(['conditions' => 'id = ?', 'bind' => [$id]]);
    }

    /**
     * @param array $fields
     * @return bool|int
     */
    public function insert($fields)
    {
        if (empty($fields)) return false;
        return $this->_db->insert($this->_table, $fields);
    }

    /**
     * @param int $id
     * @param array $fields
     * @return bool
     */
    public function update($id, $fields)
    {
        if (empty($fields || $id == '')) {
            return false;
        }
        return $this->_db->update($this->_table, $id, $fields);
    }

    /**
     * @param int|null $id
     * @return bool
     */
    public function delete($id = null)
    {
        if ($id == null && $this->id == '') {
            return false;
        }
        if ($id == null) {
            $id = $this->id;
        }
        return $this->_db->delete($this->_table, $id);
    }

    /**
     * @param string $sql
     * @param array $bind
     * @return DB
     */
    public function query($sql, $bind = [])
    {
        return $this->_db->query($sql, $bind);
    }

    /**
     * @return bool|int
     */
    public function save()
    {
        $fields = Helpers::getObjectProperty($this);
        //determine whether to update or insert
        if (property_exists($this, 'id') && $this->id != '') {
            return $this->update($this->id, $fields);
        }
        else {
            return $this->insert($fields);
        }
    }

    /**
     * @return stdClass
     */
    private function data()
    {
        $data = new stdClass();
        foreach (Helpers::getObjectProperty($this) as $column => $value) {
            $data->column = $value;
        }
        return $data;
    }

    /**
     * @param array| stdClass $params
     * @return bool
     */
    public function assign($params)
    {
        if (!empty($params)) {
            foreach ($params as $key => $value) {
                if (property_exists($this, $key)) {
                    if ($key != '_db' && $key != '_table' && $key != '_modelName') {
                        $this->$key = Helpers::sanitize($value);
                    }
                }
            }
            return true;
        }
        return false;
    }

    /**
     * @param string | int $value
     * @param string $field
     * @param array $except
     * @return bool
     */
    public function uniq($value, $field, $except = [])
    {
        if (in_array($value, $except)) return true;
        $data = $this->find([conditions => "$field = ?", bind => [$value]]);
        if (count($data)) return false;
        return true;
    }

    public function getSqlError()
    {
        return $this->_db->sql_error;
    }
}
