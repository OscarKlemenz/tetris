
function createAndFillTwoDArray({ rows, columns, defaultValue }){
    /** Creates the tetris gameboard array */
    return Array.from({ length:rows }, () => (
            Array.from({ length:columns }, ()=> defaultValue)
        ))
}

// GLOBALS
var tetrisGrid = createAndFillTwoDArray({rows:20, columns:10, defaultValue: ''});
var currentBlock;
var currentName;
var score;
var intervalId;
var audio;


function tetrisStart() {
    /** Game start */

    document.getElementById("tetris-bg").innerHTML = "";
    
    // Resets score
    score = 0;
    // Plays tetris audio
    audio = new Audio('tetris_music.mp3');
    audio.loop = true;
    audio.play();

    // Creates a new block
    newBlock();
    // Starts interval to move block down every second
    startInterval();
}

function newBlock() {
    /** Spawns a new game block */

    // Associative array for game pieces
    const pieces = {"L":[ [1,1],[1,2],[1,3],[2,3] ], 
                    "Z" : [ [1,1],[2,1],[2,2],[3,2] ], 
                    "S" : [ [1,2],[2,1],[2,2],[3,1] ],
                    "T" : [ [1,1],[2,1],[2,2],[3,1] ], 
                    "O" : [ [1,1],[1,2],[2,1],[2,2] ],
                    "I" : [ [1,1],[1,2],[1,3],[1,4] ]} ;

    // Randomly selects one of the pieces
    var keys = Object.keys(pieces);
    var blockName = keys[Math.floor(keys.length * Math.random())]
    currentBlock = pieces[blockName];
    currentName = blockName;

    // Checks spawn point of block is clear
    var spawnClear = checkSpawnPoint(currentBlock);
    
    if (spawnClear) {
        // Creates a new div, to hold blocks and places inside gameboard
        var newPiece = document.createElement("div");
        newPiece.setAttribute("id","currentPiece");
        var gameBoard = document.getElementById("tetris-bg");
        gameBoard.appendChild(newPiece);


        // Loops through each coordinate
        for ( let y = 0; y < currentBlock.length ; y++ ) { 
            
            // Places pieces on 2d array
            tetrisGrid[currentBlock[y][1]][currentBlock[y][0]] = blockName;
            
            
            // Creates a div and places it on the grid relative to its coordinates
            var newBlock = document.createElement("div");
            newBlock.setAttribute("id", blockName);
            newBlock.setAttribute("class", 'block');
            newBlock.style.transform = "translate(  " +  currentBlock[y][0] * 30 +  "px, " + currentBlock[y][1] * 30 +  "px )";
            newPiece.appendChild(newBlock);
        }
        
        // Score is incremented and displayed
        score += 1;
        document.getElementById('score').innerHTML = "<p>Score: " + score + "</p>";

    } else {
        // If the spawn is not clear, the game is ended
        endGame();
    }
}

document.onkeydown = function (event) {
    /** Registers key presses, and moves block accordingly */
    
    var div = document.getElementById("currentPiece");
    
    // Wipes the board of current piece so collision wont detect the currently moving piece
    for (let y = 0 ; y < currentBlock.length ; y++) {
        tetrisGrid[currentBlock[y][1]][currentBlock[y][0]] = "";
    }

    // Variable used for if a block is below currentpiece, causing it to move to next game piece
    var isCollidingBelow = false;

    // Re add current coords once, been manipulated
    switch (event.keyCode) {
        case 37:
            // LEFT KEY   
            // Check if coordinates are at the border of grid
            var atBorder = checkEdge(currentBlock, 0);

            // Move coordinates on grid to the left
            if (!atBorder) {

                // Checks if it will collide with another object
                if (checkOverlap(currentBlock, "l")){

                    for (let y =0; y < 4; y++) {
                        currentBlock[y][0] -= 1
                    }
                }
            }

            break;
        case 39:
            // RIGHT KEY
            // Check if coordinates are at the border of grid
            var atBorder = checkEdge(currentBlock, 9);

            // Move coordinates on grid to the right
            if (!atBorder) {

                // Checks if it will collide with another object
                if (checkOverlap(currentBlock, "r")){
            
                    for (let y =0; y < 4; y++) {
                        currentBlock[y][0] += 1
                    }
                }
            }

            break;
        case 40:
            // DOWN KEY
            var atBottom = false;
            // Checks if at bottom of grid
            for (let y = 0 ; y<4 ; y++) {
                if (currentBlock[y][1] == 19) {
                    atBottom = true;
                }
            }
            // If not at bottom moves blocks down
            if(!atBottom) {
                
                // Checks if it will collide with another object
                if (checkOverlap(currentBlock, "d")){

                    for (let y =0; y < 4; y++) {
                        currentBlock[y][1] += 1
                    }
                } else {
                    // Used to tell system to spawn next gamepiece
                    isCollidingBelow = true;
                }
            }

            break;
        case 32:
            // SPACEBAR 
            var atBottom = false;
            var isCollidingBelow = false;
            while(!atBottom && !isCollidingBelow) {

                // Checks if at bottom of grid
                for (let y = 0 ; y<4 ; y++) {
                    if (currentBlock[y][1] == 19) {
                        atBottom = true;
                    }
                }
                // If not at bottom moves blocks down
                if(!atBottom) {
                    
                    // Checks if it will collide with another object
                    if (checkOverlap(currentBlock, "d")){

                        for (let y =0; y < 4; y++) {
                            currentBlock[y][1] += 1
                        }
                    } else {
                        // Used to tell system to spawn next gamepiece
                        isCollidingBelow = true;
                    }
                }
            }
            break;
        case 38:
            // UP KEY
            rotatePiece();
            break;
        default:
            break;
    }

    // Gets the children (blocks) to translate
    var childDivs = div.getElementsByTagName('div');
    // Moves divs based upon their altered coordinates
    for( let y=0; y< childDivs.length; y++ )
    {
        childDivs[y].style.transform = "translate(  " +  currentBlock[y][0] * 30 +  "px, " + currentBlock[y][1] * 30 +  "px )";
    }

    // Re add current coords once, been manipulated
    for (let y = 0 ; y < currentBlock.length ; y++) {
        tetrisGrid[currentBlock[y][1]][currentBlock[y][0]] = currentName;
    }
    // Checks if piece has reached bottom or touching another piece below
    if (atBottom || isCollidingBelow) {
        div.setAttribute("id", "notMoving");
        
        // Set final coordinates 
        setFinalCoordinates(childDivs, currentBlock);
        // Clears any full rows and redraws grid
        clearRows();
        
        // New block is created
        newBlock();
    }



};
 
function startInterval() {
    /** Starts interval to move pieces down every second */

    // Interval for moving game piece down each second, done by simulating a down key press
    var intervalId = window.setInterval(function(){

        var evtName = (typeof(type) === "string") ? "key" + type : "keydown";	

        var event = document.createEvent("HTMLEvents");
        event.initEvent(evtName, true, false);
        event.keyCode = 40;

        document.dispatchEvent(event);

    }, 1000);
    
}

function checkEdge(currentBlock, xCoord) {
    /** Checks if the coords of the current block are at the edge of grid
     *  (0 for left, 9 for right)
     */

    for (let y=0; y<4; y++) {
        if (currentBlock[y][0] == xCoord) {
            return true;
        }
    }

    return false;

};

function rotatePiece(){
    /** Rotates current block */

    // Checks the point to rotate around based on shape name
    var pieceToRotate = blockToRotate();

    var colliding = false;
    // If piece is an O it will not be rotated
    if (pieceToRotate != -1) {
        // Sets the fixed point the blocks will rotate around
        var fixedX = currentBlock[pieceToRotate][0];
        var fixedY = currentBlock[pieceToRotate][1];

        for( let y = 0; y<4 ; y++) {
            // Points to be rotated
            var pointX = currentBlock[y][0];
            var pointY = currentBlock[y][1];
            
            // Rotates every piece but, piece rotating around
            if (y != pieceToRotate) {
                // Rotates the coords 90 degrees clockwise around center piece
                currentBlock[y][0] = -(pointY - fixedY) + fixedX;
                currentBlock[y][1] = (pointX - fixedX) + fixedY;
            }

            // Check none of the coordinates are at -1 or 10
            if(currentBlock[y][0] == 10 || currentBlock[y][0] == -1) {
                colliding = true;
            }
            // Checks none of the coordinates are at 20
            else if (currentBlock[y][1] == 20) {
                colliding = true;
            }
            // Checks none of the coordinates are overlapping with other blocks
            else if (tetrisGrid[currentBlock[y][1]][currentBlock[y][0]] != "") {
                colliding = true;
            }

        }



    }
    // If any of the pieces are colliding or off the grid, rotation does not happen, by reversing maths
    if(colliding){
        //Reverses all the calculations done
        for (let y = 0; y < 4 ; y ++) {
            // Stores the fixed point the piece will rotate around
            var fixedX = currentBlock[pieceToRotate][0];
            var fixedY = currentBlock[pieceToRotate][1];

            if (y != pieceToRotate) {
                // x,y to rotate are stored
                var pointX = currentBlock[y][0];
                var pointY = currentBlock[y][1];
                // Coords rotated 90 degrees clockwise
                currentBlock[y][0] = (pointY - fixedY) + fixedX;
                currentBlock[y][1] = -(pointX - fixedX) + fixedY;
            }
        }
    }





}

function blockToRotate(){
    /** Checks which piece the shape should rotate around.
     *  Different pieces require different fixed points. e.g. 'O' doesn't need rotating
     */

    var toRotate = -1;
    if(currentName == "I" || currentName == "Z" || currentName == "S") {
        toRotate = 2;
    } else if (currentName == "T" || currentName == "L") {
        toRotate = 1;
    } else {
        toRotate = -1;
    }

    return toRotate;

}

function checkOverlap(currentBlock, direction) {
    /** Checks if one movement to left, right or down will cause an overlap.
     *  True if no overlap, false if overlap
     *  
     *  NOTE MAKE SURE CURRENT PIECES ARENT ON GRID WHEN PERFORMING 
     *  THESE CHECKS AS THEY WILL DETECT THEMSELVES
     */
    switch (direction) {

        case 'l':
            for( let y = 0 ; y < 4; y++) {
                if( tetrisGrid[currentBlock[y][1]][currentBlock[y][0] - 1] != "") {
                    return false;
                }
            }
            break;
        case 'r':
            for( let y = 0 ; y < 4; y++) {
                if( tetrisGrid[currentBlock[y][1]][currentBlock[y][0] + 1] != "") {
                    return false;
                }
            }
            break;
        case 'd':
            for( let y = 0 ; y < 4; y++) {
                if( tetrisGrid[currentBlock[y][1] + 1][currentBlock[y][0]] != "") {
                    return false;
                }
            }
            break;      
    }

    return true;

}

function checkSpawnPoint(spawnCoords){
    /** Checks the spawn point of block.
     *  True if coords are clear, false if spawn is not clear
     */
    for (let y = 0; y < 4 ; y++) {

        if (tetrisGrid[spawnCoords[y][1]][spawnCoords[y][0]] != "") {
            return false;
        }
    }

    return true;
}

function endGame() {
    /** End game procedures */

    // Stops game audio
    audio.pause();

    // Stops attempting to move pieces down every second
    clearInterval(intervalId);

    // Sends a post request to the leaderboard
    var url = 'leaderboard.php';
    var form = $('<form action="' + url + '" method="post">' +
    '<input type="text" name="userScore" value="' + score + '" />' +
    '</form>');
    $('body').append(form);
    form.submit();

}

function clearRows(){
    /** Checks if any rows are full */

    //Loop through tetris grid
    for (let y = 0 ; y < 20 ; y++) {
        //Check if any rows are full
        var full = true;
        for (let x = 0 ; x < 10 ; x++) {

            if (tetrisGrid[y][x] == "") {
                full = false;
            }

        }
        //If row is full
        if (full) {
            //Move all rows above down by one
            var down = y - 1;
            while (down >= 0) {
                for (let x = 0; x < 10 ; x++) {

                    tetrisGrid[down+1][x] = tetrisGrid[down][x];
                }
                down -= 1;
            }

            // GRID NEEDS TO BE REDRAWN 
            redrawGrid(y);

        }
    }
            
}

function setFinalCoordinates(childDivs, currentBlock) {
    /** Sets final coordinates of current block */

    for ( let i=0; i < 4 ; i++) {
        var coordinateString = currentBlock[i][0] + ',' + currentBlock[i][1];
        childDivs[i].setAttribute("class", coordinateString);
    }
}

function redrawGrid(deletedRow){
    /** Redraws grid when a row is deleted */

    //WORKS
    for (let i = 0 ; i < 10 ; i++) {
        var className = i + ',' + deletedRow;

        // All divs with y of deleted row get deleted
        var elementsToRemove = document.getElementsByClassName(className);

        // Deletes the row of the element
        while(elementsToRemove.length > 0){
            elementsToRemove[0].parentNode.removeChild(elementsToRemove[0]);
        }

    }

    // Loops through each row above moving pieces down
    rowToMove = deletedRow - 1;
    while (rowToMove >= 0) {
        
        // Goes along x axis
        for ( let x=0 ; x<10 ; x++) {
            
            // Checks if any piece at said coordinate on grid
            var className = x + "," + rowToMove;
            var divToMove = document.getElementsByClassName(className);

            // Moves pieces down
            for (let i=0; i<divToMove.length;i++) {
                // Translates down by one
                divToMove[i].style.transform = "translate(" + x*30 + "px," + (rowToMove+1)*30 + "px)";
                // Class name (coords) updated
                divToMove[i].setAttribute("class", (x + "," + (rowToMove + 1)));
            }
            
        }
        rowToMove -= 1;
    }
}
    
        


