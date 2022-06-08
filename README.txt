___________     __         .__        
\__    ___/____/  |________|__| ______
  |    |_/ __ \   __\_  __ \  |/  ___/
  |    |\  ___/|  |  |  | \/  |\___ \ 
  |____| \___  >__|  |__|  |__/____  >
             \/                    \/ 
Author: Oscar Klemenz
Version: 1.0

Azure Lab: http://ml-lab-4d78f073-aa49-4f0e-bce2-31e5254052c7.ukwest.cloudapp.azure.com:62293

INTRODUCTION

This project was built using an Azure VM running apache, using a LAMP stack structure. My finished
product is a tetris game, which allows users to create accounts, login and post their tetris scores
to a leaderboard. 
As full stack development is a new concept to me, it has taught me a lot about each individual language
involved. Combining these languages together has been a tricky yet rewarding challenge. 

CONTROLS

When playing the game, the player is able to move pieces around the grid.
Controls for the tetris game are as follows:

    - Left: Moves piece to the left
    - Right: Moves piece to the right
    - Down: Moves piece down by one block
    - Up: Rotates a piece 90 degrees clockwise
    - Spacebar: Drops the piece

HOW TO LAUNCH

To launch tetris, go to this link: http://ml-lab-4d78f073-aa49-4f0e-bce2-31e5254052c7.ukwest.cloudapp.azure.com:62293

Initially, players have the option to log in or register an account. Players MUST login
to play tetris, although they have the option to post scores. 

For additional security, any passwords the player registers are hashed, protecting them
from any security breaches to the website. 

Once players have logged in they can then play tetris and have their scores displayed on a
public leaderboard, if they selected to display their scores. 
