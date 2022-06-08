<?php
    session_start();
    // If user is not logged in, goes back to main page
    if(!isset($_SESSION['username'])) {
        header('Location: index.php ');
        $_SESSION['needLogin'] = true;
    }

?>

<html>
    <head>
        <title>Tetris</title>
        <link href="style.css" rel="stylesheet" type="text/css">
        <script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
        <script src="tetrisScript.js"></script>

        <link href="http://fonts.cdnfonts.com/css/tetris" rel="stylesheet">

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

            <?php $_SESSION['postedScore'] = false;?>
        
            <div id="tetris-bg">
                <button type="button" id="startButton" onclick="tetrisStart()">Start the game</button>
                <div id="move"></div>
            </div>
            <div id="score">
                <p>Score: 0</p>
            </div>

        </div>

    </body>

</html>