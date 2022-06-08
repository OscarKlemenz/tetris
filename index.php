<?php
    require 'connect.php';

    session_start();
    
    if(isset($_POST['fName'])){
        // Checks if password and confirm password match
        if( $_POST['password'] == $_POST['cPassword']) {
            
            // Sets integer value, based on is yes/no was selected for display
            if($_POST['display'] == 'yes') {
                $display = 0;
            } else {
                $display = 1;
            }

            // Hashes the password
            $hashed_password = password_hash($_POST['password'], PASSWORD_DEFAULT);
            // Creates sql statement
            $sql = "INSERT INTO Users VALUES ('" . $_POST['Username'] . "','" . $_POST['fName'] 
            . "','" . $_POST['lName'] . "','" . $hashed_password . "','" . $display . "');";

            // Performs sql query
            if ( mysqli_query($conn, $sql) ) {
                $user_created = true;
            } else {
                $wrong_username = true;
            }
            

        } else {
            $wrong_password = true;
        }
    }

    #If for when user attempts to log in
    if(isset($_POST["username"])) {
        
        $sql = "SELECT * FROM Users";

        $result = mysqli_query($conn, $sql);

        $wrong_login = true;
        // Searches for logged in user
        if($result->num_rows > 0) {

            //output data of each row
            while($row = $result->fetch_assoc()) {  
                // If user log in info is correct session starts
                if($_POST['username'] == $row['UserName']){
                    // Verifies hashed password
                    if(password_verify($_POST['password'], $row['Password'])){

                        $_SESSION['in_session'] = true;
                        $_SESSION['username'] = $_POST['username'];
                        $wrong_login = false;
                    }
                }
            }
        }     
    } 
    // Used when the user wants to logout, session is destroyed
    if (isset($_POST['logout'])) {
        session_destroy();
        // Reloads the webpgae
        header('Location: '.$_SERVER['PHP_SELF']);
    }

?>

<html>
    
    <head>
        <title>Home</title>
        <link href="style.css" rel="stylesheet" type="text/css">

    </head>

    <body>

        <div>

            <ul class="menu">
                <li name="home" class="left">
                    <a href="index.php">Home</a>
                </li>
                <li name="leaderboard" class="right">
                    <a href="leaderboard.php">Leaderboard</a>
                </li>
                <li name="tetris" class="right">
                    <a href="tetris.php">Play Tetris</a>
                </li>
            </ul>

        </div>

        <div class="main">


            
            <?php if(isset($_SESSION["in_session"])) {?>

                <div id="indexMain">
                    <h1>Welcome to Tetris</h1>

                    <p>Hello <?php echo $_SESSION["username"]?></p>
                    
                    <form action="tetris.php">
                        <button type="submit" name="play">Click here to play</button>
                    </form>
                    <form action="index.php" method="POST">
                        <button type="submit" name="logout" value="logout" onclick="logout()">Logout</button>
                    </form>
                </div>

            <?php } else { ?>
                    
                <div class="login" id="indexMain">
                        <h1>Welcome to Tetris</h1>

                        <p style="color: red;">
                            <?php if($wrong_password) {
                                echo "Password did not match confirm password";
                            } else if ($wrong_username) {
                                echo "Username already exists" ;
                            } else if ($wrong_login) {
                                echo "Wrong username or password!";
                            } else if ($_SESSION['needLogin'] == true) {
                                echo "Login before playing tetris!";
                                $_SESSION['needLogin'] = false;
                            }
                            ?>
                        </p>

                        <p style="color: green;">
                            <?php if($user_created) {
                                echo "Account Registered";
                            } 
                            ?>
                        </p>

                        <form action="index.php" method="POST">
                            <input type="text" placeholder="username" name="username" required><br>
                            <input type="password" placeholder="Enter Password" name="password" required><br> 
                            <button type="submit">Login</button>   
                            <p>Don't have a user account? <a href="register.php"> Register now </a></p>
                        </form>
                </div>

            <?php } ?>
        </div>
    </body>

</html>