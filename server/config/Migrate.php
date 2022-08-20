<?php


class Migrate
{
    /**
     * @var array {`table_name`: {`column_name`: `extras`}[]}[]
     * id column will be automatically added
     */
    private static $add_table = [];
    /**
     * @var array {`table_name`: `column_name` `extras` after `column_name`}[]
     */
    private static $add_columns = [
        "products" => "brand text not null after name"
    ];

    private static $raw_sqls = [];

    private static $skip_columns = [];

    private static function generate_skip_columns()
    {
    }

    public static function auto_migrate()
    {
        self::generate_skip_columns();
        $db_conn = new Model('');
        $db_name = DB_NAME;
        $models = array_map(function ($row) {
            return rtrim($row, ".php");
        }, array_values(array_filter(scandir(root . ds . "app" . ds . "models"), function ($row) {
            return !in_array($row, [".", ".."]);
        })));
        $tables = [];
        foreach ($models as $model) {
            $temp_table_name = implode(explode("Model", $model));
            $temp_table_name = preg_split('/(?=[A-Z])/', $temp_table_name);
            array_shift($temp_table_name);
            $temp_table_name = strtolower(implode("_", $temp_table_name));
            $model = new $model();
            $model = array_keys(get_object_vars($model));
            array_shift($model);
            $tables[] = (object)["table_name" => $temp_table_name, "model" => $model];
        }
        $db_tables = array_map(function ($row) use ($db_name) {
            return $row->{"Tables_in_{$db_name}"};
        }, $db_conn->query("SHOW TABLES")->results());
        $model_tables = array_map(function ($row) {
            return $row->table_name;
        }, $tables);
        //remove unnecessary table or column
        foreach ($db_tables as $db_table) {
            //remove table
            if (!in_array($db_table, $model_tables)) {
                $db_conn->query("DROP TABLE $db_table");
            }
            //check for column
            else {
                $table_columns = array_filter(array_map(function ($row) {
                    return $row->Field;
                }, $db_conn->query("SHOW COLUMNS FROM $db_table")->results()), function ($row) {
                    return $row != "id";
                });
                $model_columns = array_values(array_filter($tables, function ($row) use ($db_table) {
                    return $row->table_name == $db_table;
                }))[0]->model;
                foreach ($table_columns as $table_column) {
                    //delete column
                    if (!in_array($table_column, $model_columns) && !in_array($table_column, self::$skip_columns)) {
                        $sql = "ALTER TABLE $db_table DROP $table_column";
                        $db_conn->query($sql);
                    }
                }
            }
        }
        //add missing table or column
        foreach ($tables as $table) {
            $temp = $db_conn->query("SHOW TABLES WHERE Tables_in_{$db_name} = ?", [$table->table_name])->results();
            //add missing table
            if (!count($temp)) {
                $sql = "CREATE TABLE $table->table_name (id int auto_increment";
                foreach ($table->model as $item) {
                    $sql .= ", $item TEXT NULL";
                }
                $sql .= ", constraint {$table->table_name}_pk primary key (id));";
                $db_conn->query($sql);
            }
            //add missing column
            else {
                foreach ($table->model as $item) {
                    $temp = $db_conn->query("SHOW COLUMNS FROM $table->table_name WHERE Field = ?", [$item])->results();
                    if (!count($temp)) {
                        $prev_column = $table->model[array_search($item, $table->model) - 1];
                        $sql = "ALTER TABLE $table->table_name ADD $item TEXT NULL AFTER $prev_column";
                        $db_conn->query($sql);
                    }
                }
            }
        }
    }

}