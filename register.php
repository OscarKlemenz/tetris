<html>
    <head>

        <title>Registration</title>
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
            
            <div id="registerMain">
                <h1>Register Now to Play</h1>

                <form class="register" action="index.php" method="POST">
                    <input type="text" placeholder="First Name" name="fName" required><br>
                    <input type="text" placeholder="Last Name" name="lName" required><br>
                    <input type="text" placeholder="Username" name="Username" required><br>
                    <input type="password" placeholder="Password" name="password" required><br>
                    <input type="password" placeholder="Confirm Password" name="cPassword" required><br>
                    Display Scores on Leaderboard?
                    <input type="radio" name="display" value="yes" checked>Yes</input>
                    <input type="radio" name="display" value="no">No</input><br>
                    <button type="submit">Register</button>   
                </form>
            </div>
        

        </div>

    </body>

</html>