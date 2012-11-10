<?php

/****************************************************

sql class

By Peter Welch
invertible@gmail.com

This code provides basic connection and query
functions based on a config file.

Copyright Peter Welch 2007

This code can be used and distributed under the GNU
General Public License.  More info at this link:

http://www.gnu.org/licenses/gpl-3.0-standalone.html

****************************************************/

class sql {
	var $con,
	    $fei,
	    $tab,
	    $custom;
	
	public function __construct($custom=false) 
	{
		$c = (mysql_connect(mip, mus, mpa) ? true : false);
		$s = (mysql_select_db(pdb) ? true : false);
		$this->con = $c;
		if($custom)
			$this->custom = true;
		else
			$this->custom = false;
	}
	
	public function set_table($name) 
	{
		$this->tab = $name;
	}

	public function field($id) 
	{
		$q = mysql_query( "select * from "
		                . $this->tab
		                . " where id = "
		                . $id);

		$this->fei = mysql_fetch_assoc($q);
		return $this->fei;
	}
	
	public function exists($value,$column)
	{
		if(is_string($value))
			$value = "'$value'";	
		$q = mysql_query( "select id from "
		                . $this->tab
		                . " where "
		                . $column
		                . " = "
		                . $value);
		if(!$q)
			return false;

		$id = mysql_fetch_row($q);
		
		if(!$id)
			return false;

		return $id[0];
	}

	public function set($parts, $condition=false, $order=false, $addition=false) 
	{
		if(is_array($parts)) 
			$parts = implode(",",$parts);
			
		$q = "select " 
		   . $parts;

		if($addition)
			$q .= ", "
			    . $addition;
 
		$q .= " from " 
		    . $this->tab;
		
		if($condition) 
			$q .= " where " . $condition;
		if($order) 
			$q .= " order by " . $order;

		$q = mysql_query($q);

		$set = array();
		while($row = mysql_fetch_array($q)) 
			$set[] = $row;

		return $set;
	}
	
	public function delete($id) 
	{
		$q = "delete from " 
		   . $this->tab 
		   . " where id=" 
		   . $id;

		if($run = mysql_query($q)) 
			return $run;
		else 
			return mysql_error();
	}
	
	public function insert($array) 
	{
		$ks = array();
		$vs = array();
		if($this->custom) {
			$array["DC"] = date("Y-m-d G:i:00");
			$array["DM"] = date("Y-m-d G:i:00"); 
		}
		foreach($array as $k => $v) {
			$ks[] = $k;
			if(is_string($v)) 
				$v = "'" . addslashes($v) . "'";
			$vs[] = $v;
		}
		$q = "insert into " 
		   . $this->tab 
		   . " (" 
		   . implode(",",$ks) 
		   . ") values ( " 
		   . implode(",",$vs) 
		   . " )";

		if($run = mysql_query($q)) 
			return $run;
		else 
			return mysql_error();
	}
	
    public function last()
    {
        return mysql_insert_id();
    }

	public function mod($condition, $changes) 
	{
		if(is_numeric($condition)) 
			$condition = "id=" . $condition;

		if($this->custom)
			$array["DM"] = date("Y-m-d G:i:00");

		if(is_array($changes)) {
			$send = array();
			foreach($changes as $k => $v) {
				if(is_string($v)) 
					$v = "'" . addslashes($v) . "'";
				$send[] = $k . "=" . $v;
			}
			$changes = implode(",",$send);
		}

		$q = "update " 
		   . $this->tab 
		   . " set " 
		   . $changes 
		   . " where " 
		   . $condition;

		if($run = mysql_query($q)) 
			return $run;
		else 
			return mysql_error();
	}
}

?>
