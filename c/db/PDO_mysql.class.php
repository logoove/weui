<?php
/** File PDO_mysql.class.php		*
 *(C) Andrea Giammarchi [2005/10/13]	*/

// Requires PDOStatement_mysql.class.php , drived by PDO.class.php file
require_once('PDOStatement_mysql.class.php');

/**
 * Class PDO_mysql
 * 	This class is used from class PDO to manage a MySQL database.
 *	  Look at PDO.clas.php file comments to know more about MySQL connection.
 * ---------------------------------------------
 * @Compatibility	>= PHP 4
 * @Dependencies	PDO.class.php
 * 			PDOStatement_mysql.class.php
 * @Author		Andrea Giammarchi
 * @Site		http://www.devpro.it/
 * @Mail		andrea [ at ] 3site [ dot ] it
 * @Date		2005/10/13
 * @LastModified	2005/18/14 12:30
 * @Version		0.1 - tested
 */
class PDO_mysql {

	/**
	 * 'Private' variables:
	 *	__connection:Resource		Database connection
		 *	__dbinfo:Array			Array with 4 elements used to manage connection
		 *	  __persistent:Boolean		Connection mode, is true on persistent, false on normal (deafult) connection
		 *	  __errorCode:String		Last error code
		 *	  __errorInfo:Array		Detailed errors
	 */
	var $__connection;
	var $__dbinfo;
	var $__persistent = false;
	var $__errorCode = '';
	var $__errorInfo = Array('');

	/**
	 * Public constructor:
	 *	Checks connection and database selection
		 *	   	new PDO_mysql( &$host:String, &$db:String, &$user:String, &$pass:String )
	 * @Param	String		host with or without port info
		 * @Param	String		database name
		 * @Param	String		database user
		 * @Param	String		database password
	 */
	function PDO_mysql(&$host, &$db, &$user, &$pass) {
		if(!@$this->__connection = &mysql_connect($host, $user, $pass))
			$this->__setErrors('DBCON');
		else {
			if(!@mysql_select_db($db, $this->__connection))
				$this->__setErrors('DBER');
			else
				$this->__dbinfo = Array($host, $user, $pass, $db);
		}
	}

	/** NOT NATIVE BUT MAYBE USEFULL FOR PHP < 5.1 PDO DRIVER
	 * Public method
		 * Calls mysql_close function.
	 *	this->close( Void ):Boolean
		 * @Return	Boolean		True on success, false otherwise
	 */
	function close() {
		$result = is_resource($this->__connection);
		if($result) {
			mysql_close($this->__connection);
		}
		return $result;
	}

	/**
	 * Public method:
	 *	Returns a code rappresentation of an error
		 *	   	this->errorCode( void ):String
		 * @Return	String		String rappresentation of the error
	 */
	function errorCode() {
		return $this->__errorCode;
	}

	/**
	 * Public method:
	 *	Returns an array with error informations
		 *	   	this->errorInfo( void ):Array
		 * @Return	Array		Array with 3 keys:
		 * 				0 => error code
		 *							  1 => error number
		 *							  2 => error string
	 */
	function errorInfo() {
		return $this->__errorInfo;
	}

	/**
	 * Public method:
	 *	Excecutes a query and returns affected rows
		 *	   	this->exec( $query:String ):Mixed
		 * @Param	String		query to execute
		 * @Return	Mixed		Number of affected rows or false on bad query.
	 */
	function exec($query) {
		$result = 0;
		if(!is_null($this->__uquery($query)))
			$result = mysql_affected_rows($this->__connection);
		if(is_null($result))
			$result = false;
		return $result;
	}

	/**
	 * Public method:
	 *	Returns last inserted id
		 *	   	this->lastInsertId( void ):Number
		 * @Return	Number		Last inserted id
	 */
	function lastInsertId() {
		$id = mysql_insert_id($this->__connection);
		if ($id > 0) {
			return $id;	
		} else {
			$query = $this->prepare('SELECT last_insert_id()');
			$query->execute();
			return $query->fetchColumn();
		}
	}

	/**
	 * Public method:
	 *	Returns a new PDOStatement
		 *	   	this->prepare( $query:String, $array:Array ):PDOStatement
		 * @Param	String		query to prepare
		 * @Param	Array		this variable is not used but respects PDO original accepted parameters
		 * @Return	PDOStatement	new PDOStatement to manage
	 */
	function prepare($query, $array = Array()) {
		return new PDOStatement_mysql($query, $this->__connection, $this->__dbinfo);
	}

	/**
	 * Public method:
	 *	Executes directly a query and returns an array with result or false on bad query
		 *	   	this->query( $query:String ):Mixed
		 * @Param	String		query to execute
		 * @Return	Mixed		false on error, array with all info on success
	 */
	function query($query) {
		$query = @mysql_unbuffered_query($query, $this->__connection);
		if($query) {
			$result = Array();
			while($r = mysql_fetch_assoc($query))
				array_push($result, $r);
		}
		else {
			$result = false;
			$this->__setErrors('SQLER');
		}
		return $result;
	}

	/**
	 * Public method:
	 *	Quotes correctly a string for this database
		 *	   	this->quote( $string:String ):String
		 * @Param	String		string to quote
		 * @Return	String		a correctly quoted string
	 */
	function quote($string) {
		return ('"'.mysql_escape_string($string).'"');
	}


	// NOT TOTALLY SUPPORTED PUBLIC METHODS
		/**
	 * Public method:
	 *	Quotes correctly a string for this database
		 *	   	this->getAttribute( $attribute:Integer ):Mixed
		 * @Param	Integer		a constant [	PDO_ATTR_SERVER_INFO,
		 * 						PDO_ATTR_SERVER_VERSION,
		 *											  PDO_ATTR_CLIENT_VERSION,
		 *											  PDO_ATTR_PERSISTENT	]
		 * @Return	Mixed		correct information or false
	 */
	function getAttribute($attribute) {
		$result = false;
		switch($attribute) {
			case PDO_ATTR_SERVER_INFO:
				$result = mysql_get_host_info($this->__connection);
				break;
			case PDO_ATTR_SERVER_VERSION:
				$result = mysql_get_server_info($this->__connection);
				break;
			case PDO_ATTR_CLIENT_VERSION:
				$result = mysql_get_client_info();
				break;
			case PDO_ATTR_PERSISTENT:
				$result = $this->__persistent;
				break;
		}
		return $result;
	}

	/**
	 * Public method:
	 *	Sets database attributes, in this version only connection mode.
		 *	   	this->setAttribute( $attribute:Integer, $mixed:Mixed ):Boolean
		 * @Param	Integer		PDO_* constant, in this case only PDO_ATTR_PERSISTENT
		 * @Param	Mixed		value for PDO_* constant, in this case a Boolean value
		 * 				true for permanent connection, false for default not permament connection
		 * @Return	Boolean		true on change, false otherwise
	 */
	function setAttribute($attribute, $mixed) {
		$result = false;
		if($attribute === PDO_ATTR_PERSISTENT && $mixed != $this->__persistent) {
			$result = true;
			$this->__persistent = (boolean) $mixed;
			mysql_close($this->__connection);
			if($this->__persistent === true)
				$this->__connection = &mysql_pconnect($this->__dbinfo[0], $this->__dbinfo[1], $this->__dbinfo[2]);
			else
				$this->__connection = &mysql_connect($this->__dbinfo[0], $this->__dbinfo[1], $this->__dbinfo[2]);
			mysql_select_db($this->__dbinfo[3], $this->__connection);
		}
		return $result;
	}


	// UNSUPPORTED PUBLIC METHODS
	function beginTransaction() {
		return false;
	}

	function commit() {
		return false;
	}

	function rollBack() {
		return false;
	}


	// PRIVATE METHODS [ UNCOMMENTED ]
	function __setErrors($er) {
		if(!is_resource($this->__connection)) {
			$errno = mysql_errno();
			$errst = mysql_error();
		}
		else {
			$errno = mysql_errno($this->__connection);
			$errst = mysql_error($this->__connection);
		}
		$this->__errorCode = &$er;
		$this->__errorInfo = Array($this->__errorCode, $errno, $errst);
	}

	function __uquery(&$query) {
		if(!@$query = mysql_query($query, $this->__connection)) {
			$this->__setErrors('SQLER');
			$query = null;
		}
		return $query;
	}
}
?>