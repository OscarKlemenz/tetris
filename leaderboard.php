<?php        
    require 'connect.php';
    session_start();

    if(isset($_POST['userScore']) && $_SESSION['postedScore'] == false) {

        if(isset($_SESSION['username'])){
            
            // Gets username and score
            $username = $_SESSION['username'];
            $score = $_POST['userScore'];

            // Checks user wants score displayed
            $sql = "SELECT Display FROM Users WHERE UserName = '" . $username . "'";
            $unformatted = mysqli_query($conn, $sql);
            $result = $unformatted->fetch_assoc();

            if($result['Display'] == 0) {
                // Inserts the score
                $sql = "INSERT INTO Scores (Username, Score) VALUES ('" . $username . "'," . $score . ")";
                mysqli_query($conn, $sql);
                $_SESSION['postedScore'] = true;
            }
        }
    }

    // SQL Request to output all data (Can be used for scores)
    $sql = "SELECT * FROM Scores ORDER BY Score DESC";
    $result = mysqli_query($conn, $sql);
?>


<html>
    <head>

        <title>Leaderboard</title>
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
            <div id="leaderboardMain">
                
                <table>
                    <tr>
                        <th>Username</th>
                        <th>Score</th>
                    </tr>
                    <?php 
                        if($result->num_rows > 0) {
                            //output data of each row
                            while($row = $result->fetch_assoc()) {                
                    ?>
                    <tr>
                        <td><?php echo $row["Username"];?></td>
                        <td><?php echo $row["Score"];?></td>
                    </tr>
                    <?php 
                            }
                        } ?>
                </table>
                
            </div>
        </div>

    </body>

</html>