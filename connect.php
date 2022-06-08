<?php
/** Used to set up a php connection, as a few pages use this 
 *  all database connection info is here 
 */

$servername = "localhost";
$username = "ecm1417";
$password = "WebDev2021";
$dbname = "tetris";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
?>
