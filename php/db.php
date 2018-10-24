<?php
/**
 * PDO类的封装,使用更方便,方法名称同微擎,不过需要类调用,在微擎内提取出来的
$db = new Pdo('localhost','root','111','3306','tp','oauth_');
var_dump($db->get('users'));
$db->debug();//显示调试语句
 * date 2018.5.21
 * author yoby
 */

class Db{
    protected $host;
    protected $username;
    protected  $password;
    protected  $post;
    protected $database;
    protected $tablepre;
    protected $db;
    protected  $errors=array();

    public function __construct($host='localhost',$username='',$password='',$post='3306',$database='',$tablepre='ims_')
    {
        $this->host = $host;
        $this->username = $username;
        $this->password = $password;
        $this->post = $post;
        $this->database = $database;
        $this->tablepre=$tablepre;
        $this->db = new PDO("mysql:dbname={$database};host={$host};port={$post};charset=utf8", $username, $password);
        $sql = "SET NAMES 'utf8';";
        $this->db->exec($sql);
        $this->db->exec("SET sql_mode='';");
    }

    /**
     * 返回带前缀表名
     * @param $table 表名
     * @return string
     */
    public function tablename($table){
        return $this->tablepre .$table;
    }

    /**
     * 支持写操作的更新删除,不能查询
     * @param $sql
     * @param array $params
     * @return bool|int
     */
    public function query($sql, $params = array()) {
        $sqlsafe = SqlPaser::checkquery($sql);

        if (empty($params)) {
            $result = $this->db->exec($sql);
            $this->logging($sql, array(), $this->db->errorInfo());
            return $result;
        }
        $statement = $this->prepare($sql);
        $result = $statement->execute($params);

        $this->logging($sql, $params, $statement->errorInfo());


        if (!$result) {
            return false;
        } else {
            return $statement->rowCount();
        }
    }

    /**
     * 查询一条数据
     * @param $sql
     * @param array $params
     * @return bool|mixed
     */
    public function fetch($sql, $params = array()) {

        $statement = $this->prepare($sql);
        $result = $statement->execute($params);

        $this->logging($sql, $params, $statement->errorInfo());

        if (!$result) {
            return false;
        } else {
            $data = $statement->fetch(PDO::FETCH_ASSOC);
            return $data;
        }
    }

    /**
     * 查询多条数据
     * @param $sql
     * @param array $params
     * @param string $keyfield
     * @return array|bool
     */
    public function fetchall($sql, $params = array(), $keyfield = '') {

        $statement = $this->prepare($sql);
        $result = $statement->execute($params);

        $this->logging($sql, $params, $statement->errorInfo());

        if (!$result) {
            return false;
        } else {
            if (empty($keyfield)) {
                $result = $statement->fetchAll(pdo::FETCH_ASSOC);
            } else {
                $temp = $statement->fetchAll(pdo::FETCH_ASSOC);
                $result = array();
                if (!empty($temp)) {
                    foreach ($temp as $key => &$row) {
                        if (isset($row[$keyfield])) {
                            $result[$row[$keyfield]] = $row;
                        } else {
                            $result[] = $row;
                        }
                    }
                }
            }
            return $result;
        }
    }
    /*
     * 返回数据第一条第N列
     */
    public function fetchcolumn($sql, $params = array(), $column = 0) {

        $statement = $this->prepare($sql);
        $result = $statement->execute($params);

        $this->logging($sql, $params, $statement->errorInfo());

        if (!$result) {
            return false;
        } else {
            $data = $statement->fetchColumn($column);
            return $data;
        }
    }

    /**
     * 查询一条记录,比fetch简单
     * @param $tablename表名不带前缀
     * @param array $params 查询数组
     * @param array $fields 要返回字段数组
     * @param array $orderby 排序字段数组
     * @return bool|mixed
     */
    public function get($tablename, $params = array(), $fields = array(), $orderby = array()) {
        $select = SqlPaser::parseSelect($fields);
        $condition = SqlPaser::parseParameter($params, 'AND');
        $orderbysql = SqlPaser::parseOrderby($orderby);

        $sql = "{$select} FROM " . $this->tablename($tablename) . (!empty($condition['fields']) ? " WHERE {$condition['fields']}" : '') . " $orderbysql LIMIT 1";
        return $this->fetch($sql, $condition['params']);
    }

    /**
     * 查询多条数据
     * @param $tablename 不含前缀表明
     * @param array $params 查询条件
     * @param array $fields
     * @param string $keyfield
     * @param array $orderby 排序
     * @param array $limit 限制条数
     * @return array|bool
     */
    public function getall($tablename, $params = array(), $fields = array(), $keyfield = '', $orderby = array(), $limit = array()) {
        $select = SqlPaser::parseSelect($fields);
        $condition = SqlPaser::parseParameter($params, 'AND');

        $limitsql = SqlPaser::parseLimit($limit);
        $orderbysql = SqlPaser::parseOrderby($orderby);

        $sql = "{$select} FROM " .$this->tablename($tablename) . (!empty($condition['fields']) ? " WHERE {$condition['fields']}" : '') . $orderbysql . $limitsql;
        return $this->fetchall($sql, $condition['params'], $keyfield);
    }

    /**
     * 查询区间记录
     * @param $tablename 表名不含前缀
     * @param array $params 查询条件数组
     * @param array $limit 区间条数
     * @param null $total
     * @param array $fields
     * @param string $keyfield
     * @param array $orderby
     * @return array|bool
     */
    public function getslice($tablename, $params = array(), $limit = array(), &$total = null, $fields = array(), $keyfield = '', $orderby = array()) {
        $select = SqlPaser::parseSelect($fields);
        $condition = SqlPaser::parseParameter($params, 'AND');
        $limitsql = SqlPaser::parseLimit($limit);

        if (!empty($orderby)) {
            if (is_array($orderby)) {
                $orderbysql = implode(',', $orderby);
            } else {
                $orderbysql = $orderby;
            }
        }
        $sql = "{$select} FROM " . $this->tablename($tablename) . (!empty($condition['fields']) ? " WHERE {$condition['fields']}" : '') . (!empty($orderbysql) ? " ORDER BY $orderbysql " : '') . $limitsql;
        $total = pdo_fetchcolumn("SELECT COUNT(*) FROM " . tablename($tablename) . (!empty($condition['fields']) ? " WHERE {$condition['fields']}" : ''), $condition['params']);
        return $this->fetchall($sql, $condition['params'], $keyfield);
    }

    /**
     * 返回单字段值
     * @param $tablename
     * @param array $params
     * @param string $field
     * @return bool|mixed
     */
    public function getcolumn($tablename, $params = array(), $field = '') {
        $result = $this->get($tablename, $params, $field);
        if (!empty($result)) {
            if (SqlPaser::strexists($field, '(')) {
                return array_shift($result);
            } else {
                return $result[$field];
            }
        } else {
            return false;
        }
    }

    /**
     * 更新操作
     * @param $table
     * @param array $data要更新数据
     * @param array $params 条件
     * @param string $glue
     * @return bool|int
     */
    public function update($table, $data = array(), $params = array(), $glue = 'AND') {
        $fields = SqlPaser::parseParameter($data, ',');
        $condition = SqlPaser::parseParameter($params, $glue);
        $params = array_merge($fields['params'], $condition['params']);
        $sql = "UPDATE " . $this->tablename($table) . " SET {$fields['fields']}";
        $sql .= $condition['fields'] ? ' WHERE '.$condition['fields'] : '';

        return $this->query($sql, $params);
    }

    /**
     * 插入数据
     * @param $table
     * @param array $data
     * @param bool $replace
     * @return bool|int
     */
    public function insert($table, $data = array(), $replace = FALSE) {
        $cmd = $replace ? 'REPLACE INTO' : 'INSERT INTO';
        $condition = SqlPaser::parseParameter($data, ',');
        return $this->query("$cmd " . $this->tablename($table) . " SET {$condition['fields']}", $condition['params']);
    }

/*
 * 插入数据id
 */
    public function insertid() {
        return $this->db->lastInsertId();
    }

    /**
     * 删除
     * @param $table
     * @param array $params
     * @param string $glue
     * @return bool|int
     */
    public function delete($table, $params = array(), $glue = 'AND') {
        $condition = SqlPaser::parseParameter($params, $glue);
        $sql = "DELETE FROM " . $this->tablename($table);
        $sql .= $condition['fields'] ? ' WHERE '.$condition['fields'] : '';
        return $this->query($sql, $condition['params']);
    }

    /**
     * 检测表是否为空
     * @param $tablename
     * @param array $params
     * @return bool
     */
    public function exists($tablename, $params = array()) {
        $row = $this->get($tablename, $params);
        if (empty($row) || !is_array($row) || count($row) == 0) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * 查询表中数据条数
     * @param $tablename
     * @param array $params
     * @param int $cachetime
     * @return int
     */
    public function count($tablename, $params = array(), $cachetime = 30) {
        $total = $this->getcolumn($tablename, $params, 'count(*)');
        return intval($total);
    }


    public function begin() {
        $this->db->beginTransaction();
    }


    public function commit() {
        $this->db->commit();
    }


    public function rollback() {
        $this->db->rollBack();
    }
    /*
     * 执行多条sql语句,建表常用
     * $sql sql语句
     * $stuff 数据表的前缀
     * */
    public function run($sql, $stuff = 'ims_') {
        if(!isset($sql) || empty($sql)) return;

        $sql = str_replace("\r", "\n", str_replace(' ' . $stuff, ' ' . $this->tablepre, $sql));
        $sql = str_replace("\r", "\n", str_replace(' `' . $stuff, ' `' . $this->tablepre, $sql));
        $ret = array();
        $num = 0;
        $sql = preg_replace("/\;[ \f\t\v]+/", ';', $sql);
        foreach(explode(";\n", trim($sql)) as $query) {
            $ret[$num] = '';
            $queries = explode("\n", trim($query));
            foreach($queries as $query) {
                $ret[$num] .= (isset($query[0]) && $query[0] == '#') || (isset($query[1]) && isset($query[1]) && $query[0].$query[1] == '--') ? '' : $query;
            }
            $num++;
        }
        unset($sql);
        foreach($ret as $query) {
            $query = trim($query);
            if($query) {
                $this->query($query, array());
            }
        }
    }

    /**
     * 检测表中是否存在某个字段
     * @param $tablename
     * @param $fieldname
     * @return bool
     */
    public function fieldexists($tablename, $fieldname) {
        $isexists = $this->fetch("DESCRIBE " . $this->tablename($tablename) . " `{$fieldname}`", array());
        return !empty($isexists) ? true : false;
    }

    /**
     * 检测表是否存在
     * @param $table
     * @return bool
     */
    public function tableexists($table) {
        if(!empty($table)) {
            $data = $this->fetch("SHOW TABLES LIKE '{$this->tablepre}{$table}'", array());
            if(!empty($data)) {
                $data = array_values($data);
                $tablename = $this->tablepre . $table;
                if(in_array($tablename, $data)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    /**
     * 检测表中是否存在某个索引
     * @param $tablename
     * @param $indexname
     * @return bool
     */
    public function indexexists($tablename, $indexname) {
        if (!empty($indexname)) {
            $indexs = $this->fetchall("SHOW INDEX FROM " . $this->tablename($tablename), array(), '');
            if (!empty($indexs) && is_array($indexs)) {
                foreach ($indexs as $row) {
                    if ($row['Key_name'] == $indexname) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    public function prepare($sql) {
        $sqlsafe = SqlPaser::checkquery($sql);

        $statement = $this->db->prepare($sql);
        return $statement;
    }
    private function logging($sql, $params = array(), $message = '') {
        if(TRUE) {
            $info = array();
            $info['sql'] = $sql;
            $info['params'] = $params;
            $info['error'] = empty($message) ? $this->pdo->errorInfo() : $message;
            $this->debug(false, $info);
        }
        return true;
    }

    /**
     * 显示debug
     * @param bool $output
     * @param array $append
     * @return array
     */
    public function debug($output = true, $append = array()) {
        if(!empty($append)) {
            $output = false;
            array_push($this->errors, $append);
        }
        if($output) {

            echo '<pre>'.print_r($this->errors,TRUE).'</pre>';
        } else {
            if (!empty($append['error'][1])) {
                $traces = debug_backtrace();
                $ts = '';
                foreach($traces as $trace) {
                    $trace['file'] = str_replace('\\', '/', $trace['file']);
                    $ts .= "file: {$trace['file']}; line: {$trace['line']}; <br />";
                }
                $params = var_export($append['params'], true);
                trigger_error("SQL: <br/>{$append['sql']}<hr/>Params: <br/>{$params}<hr/>SQL Error: <br/>{$append['error'][2]}<hr/>Traces: <br/>{$ts}", E_USER_NOTICE);
            }
        }
        return $this->errors;
    }
}
class SqlPaser {
    private static $checkcmd = array('SELECT', 'UPDATE', 'INSERT', 'REPLAC', 'DELETE');
    private static $disable = array(
        'function' => array('load_file', 'floor', 'hex', 'substring', 'if', 'ord', 'char', 'benchmark', 'reverse', 'strcmp', 'datadir', 'updatexml', 'extractvalue', 'name_const', 'multipoint', 'database', 'user'),
        'action' => array('@', 'intooutfile', 'intodumpfile', 'unionselect', 'uniondistinct', 'information_schema', 'current_user', 'current_date'),
        'note' => array('/*','*/','#','--'),
    );
public static function strexists($string, $find) {
	return !(strpos($string, $find) === FALSE);
}
    public static function checkquery($sql) {
        $cmd = strtoupper(substr(trim($sql), 0, 6));
        if (in_array($cmd, self::$checkcmd)) {
            $mark = $clean = '';
            $sql = str_replace(array('\\\\', '\\\'', '\\"', '\'\''), '', $sql);
            if (strpos($sql, '/') === false && strpos($sql, '#') === false && strpos($sql, '-- ') === false && strpos($sql, '@') === false && strpos($sql, '`') === false) {
                $cleansql = preg_replace("/'(.+?)'/s", '', $sql);
            } else {
                $cleansql = self::stripSafeChar($sql);
            }

            $cleansql = preg_replace("/[^a-z0-9_\-\(\)#\*\/\"]+/is", "", strtolower($cleansql));
            if (is_array(self::$disable['function'])) {
                foreach (self::$disable['function'] as $fun) {
                    if (strpos($cleansql, $fun . '(') !== false) {
                        return error(1, 'SQL中包含禁用函数 - ' . $fun);
                    }
                }
            }

            if (is_array(self::$disable['action'])) {
                foreach (self::$disable['action'] as $action) {
                    if (strpos($cleansql, $action) !== false) {
                        return error(2, 'SQL中包含禁用操作符 - ' . $action);
                    }
                }
            }

            if (is_array(self::$disable['note'])) {
                foreach (self::$disable['note'] as $note) {
                    if (strpos($cleansql, $note) !== false) {
                        return error(3, 'SQL中包含注释信息');
                    }
                }
            }
        } elseif (substr($cmd, 0, 2) === '/*') {
            return error(3, 'SQL中包含注释信息');
        }
    }

    private static function stripSafeChar($sql) {
        $len = strlen($sql);
        $mark = $clean = '';
        for ($i = 0; $i < $len; $i++) {
            $str = $sql[$i];
            switch ($str) {
                case '\'':
                    if (!$mark) {
                        $mark = '\'';
                        $clean .= $str;
                    } elseif ($mark == '\'') {
                        $mark = '';
                    }
                    break;
                case '/':
                    if (empty($mark) && $sql[$i + 1] == '*') {
                        $mark = '/*';
                        $clean .= $mark;
                        $i++;
                    } elseif ($mark == '/*' && $sql[$i - 1] == '*') {
                        $mark = '';
                        $clean .= '*';
                    }
                    break;
                case '#':
                    if (empty($mark)) {
                        $mark = $str;
                        $clean .= $str;
                    }
                    break;
                case "\n":
                    if ($mark == '#' || $mark == '--') {
                        $mark = '';
                    }
                    break;
                case '-':
                    if (empty($mark) && substr($sql, $i, 3) == '-- ') {
                        $mark = '-- ';
                        $clean .= $mark;
                    }
                    break;
                default:
                    break;
            }
            $clean .= $mark ? '' : $str;
        }
        return $clean;
    }


    public static function parseParameter($params, $glue = ',', $alias = '') {
        $result = array('fields' => ' 1 ', 'params' => array());
        $split = '';
        $suffix = '';
        $allow_operator = array('>', '<', '<>', '!=', '>=', '<=', '+=', '-=', 'LIKE', 'like');
        if (in_array(strtolower($glue), array('and', 'or'))) {
            $suffix = '__';
        }
        if (!is_array($params)) {
            $result['fields'] = $params;
            return $result;
        }
        if (is_array($params)) {
            $result['fields'] = '';
            foreach ($params as $fields => $value) {
                if ($glue == ',') {
                    $value = $value === null ? '' : $value;
                }
                $operator = '';
                if (strpos($fields, ' ') !== FALSE) {
                    list($fields, $operator) = explode(' ', $fields, 2);
                    if (!in_array($operator, $allow_operator)) {
                        $operator = '';
                    }
                }
                if (empty($operator)) {
                    $fields = trim($fields);
                    if (is_array($value) && !empty($value)) {
                        $operator = 'IN';
                    } elseif ($value === null) {
                        $operator = 'IS';
                    } else {
                        $operator = '=';
                    }
                } elseif ($operator == '+=') {
                    $operator = " = `$fields` + ";
                } elseif ($operator == '-=') {
                    $operator = " = `$fields` - ";
                } elseif ($operator == '!=' || $operator == '<>') {
                    if (is_array($value) && !empty($value)) {
                        $operator = 'NOT IN';
                    } elseif ($value === null) {
                        $operator = 'IS NOT';
                    }
                }

                $select_fields = self::parseFieldAlias($fields, $alias);
                if (is_array($value) && !empty($value)) {
                    $insql = array();
                    $value = array_values($value);
                    foreach ($value as $v) {
                        $placeholder = self::parsePlaceholder($fields, $suffix);
                        $insql[] = $placeholder;
                        $result['params'][$placeholder] = is_null($v) ? '' : $v;
                    }
                    $result['fields'] .= $split . "$select_fields {$operator} (".implode(",", $insql).")";
                    $split = ' ' . $glue . ' ';
                } else {
                    $placeholder = self::parsePlaceholder($fields, $suffix);
                    $result['fields'] .= $split . "$select_fields {$operator} " . (is_null($value) ? 'NULL' : $placeholder);
                    $split = ' ' . $glue . ' ';
                    if (!is_null($value)) {
                        $result['params'][$placeholder] = is_array($value) ? '' : $value;
                    }
                }
            }
        }
        return $result;
    }


    private static function parsePlaceholder($field, $suffix = '') {
        static $params_index = 0;
        $params_index++;

        $illegal_str = array('(', ')', '.', '*');
        $placeholder = ":{$suffix}" . str_replace($illegal_str, '_', $field) . "_{$params_index}";
        return $placeholder;
    }

    private static function parseFieldAlias($field, $alias = '') {
        if (self::strexists($field, '.') || self::strexists($field, '*')) {
            return $field;
        }
        if (self::strexists($field, '(')) {
            $select_fields = str_replace(array('(', ')'), array('(' . (!empty($alias) ? "`{$alias}`." : '') .'`',  '`)'), $field);
        } else {
            $select_fields = (!empty($alias) ? "`{$alias}`." : '') . "`$field`";
        }
        return $select_fields;
    }


    public static function parseSelect($field = array(), $alias = '') {
        if (empty($field) || $field == '*') {
            return ' SELECT *';
        }
        if (!is_array($field)) {
            $field = array($field);
        }
        $select = array();
        $index = 0;
        foreach ($field as $field_row) {
            if (self::strexists($field_row, '*')) {
                if (!self::strexists(strtolower($field_row), 'as')) {
                }
            } elseif (self::strexists(strtolower($field_row), 'select')) {
                if ($field_row[0] != '(') {
                    $field_row = "($field_row) AS '{$index}'";
                }
            } elseif (self::strexists($field_row, '(')) {
                $field_row = str_replace(array('(', ')'), array('(' . (!empty($alias) ? "`{$alias}`." : '') . '`',  '`)'), $field_row);
                if (!self::strexists(strtolower($field_row), 'as')) {
                    $field_row .= " AS '{$index}'";
                }
            } else {
                $field_row = self::parseFieldAlias($field_row, $alias);
            }
            $select[] = $field_row;
            $index++;
        }
        return " SELECT " . implode(',', $select);
    }

    public static function parseLimit($limit, $inpage = true) {
        $limitsql = '';
        if (empty($limit)) {
            return $limitsql;
        }
        if (is_array($limit)) {
            if (empty($limit[0]) && !empty($limit[1])) {
                $limitsql = " LIMIT " . $limit[1];
            } else {
                $limit[0] = max(intval($limit[0]), 1);
                !empty($limit[1]) && $limit[1] = max(intval($limit[1]), 1);
                if (empty($limit[0]) && empty($limit[1])) {
                    $limitsql = '';
                } elseif (!empty($limit[0]) && empty($limit[1])) {
                    $limitsql = " LIMIT " . $limit[0];
                } else {
                    $limitsql = " LIMIT " . ($inpage ? ($limit[0] - 1) * $limit[1] : $limit[0]) . ', ' . $limit[1];
                }
            }
        } else {
            $limit = trim($limit);
            if (preg_match('/^(?:limit)?[\s,0-9]+$/i', $limit)) {
                $limitsql = self::strexists(strtoupper($limit), 'LIMIT') ? " $limit " : " LIMIT $limit";
            }
        }
        return $limitsql;
    }

    public static function parseOrderby($orderby, $alias = '') {
        $orderbysql = '';
        if (empty($orderby)) {
            return $orderbysql;
        }

        if (!is_array($orderby)) {
            $orderby = explode(',', $orderby);
        }
        foreach ($orderby as $i => &$row) {
            $row = strtolower($row);
            list($field, $orderbyrule) = explode(' ', $row);

            if ($orderbyrule != 'asc' && $orderbyrule != 'desc') {
                unset($orderby[$i]);
            }
            $field = self::parseFieldAlias($field, $alias);
            $row = "{$field} {$orderbyrule}";
        }
        $orderbysql = implode(',', $orderby);
        return !empty($orderbysql) ? " ORDER BY $orderbysql " : '';
    }

    public static function parseGroupby($statement, $alias = '') {
        if (empty($statement)) {
            return $statement;
        }
        if (!is_array($statement)) {
            $statement = explode(',', $statement);
        }
        foreach ($statement as $i => &$row) {
            $row = self::parseFieldAlias($row, $alias);
            if (self::strexists($row, ' ')) {
                unset($statement[$i]);
            }
        }
        $statementsql = implode(', ', $statement);
        return !empty($statementsql) ? " GROUP BY $statementsql " : '';
    }
}
$db = new Db('121.42.172.1','root','mysqlmysql','3306','weui','ims_');