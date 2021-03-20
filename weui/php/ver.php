<?php
$arr = ["ver"=>"5.31","date"=>"2020.4.20"];
echo $_GET['callback']. '(' . json_encode($arr) . ');';