# React Tiles

React Tiles is a **tile based game** built for a 1 week school project.

This readme contains the full history about the project, if you just want to **download source and run the project** just scroll all the way down :)

## School Instructions

The main instructions were :

> The story should be **choice-based** with some possibilites leading to loose or to a different ending.
>
> The images, sounds and text should all be **originals** and self-made.
>
> Text, Image and Sound shouldn't give the same information

*The experience shouldn't last more than 3 mins*

## Our concept

I had the simple idea of storing tiles in a 2D array to be able to render tile around you base on your position in the Array.
This allows us to build a static world were our player can evolve.

Each tiles is going to store differents parameters, so basically **the whole game** will be stored in the map as json.  
I'm definitely not sure that the way to go but its sounded like a easy way to go using React and only Html (no canvas).  
*As our game will be really short, it doesn't seems too crazy to store everything in a big json.*

## Project State [##---]2/5days

#### 1. Monday
I came with the how-it-would-work idea first than the story, and honestly I wasn't interested too much about what should I say in this little game.
That why I grouped up with someone in my course to be able to produce a full project including the art and story.
Then I realised that writing a 2D array to actually build our level design wasn't the best usecase. 

So Monday day I built :
+ TileRenderer component, that only care about which tiles to render
+ Game component, that handle the position of the player in the 2D and gives TileRender the correct 9 tiles to display.
+ Controller component which is handled by game. 
+ Map imported from a JSON and stored in a React.Context to be able to modify the map.
  + Map editor component that allows you to edit the 2D lvl array in a visual way.


## How to run the project

To be able to run this project locally. You need NodeJS and Yarn.

Here are the link in case you don't have already NodeJS and Yarn installed.

Install [Node](https://nodejs.org/en/) & [Yarn](https://classic.yarnpkg.com/latest.msi)   

Then run `yarn start` in the project directory to launch the web app. 
Click on "Edit the map" to access the map editor. 

*map editor doc to be written*



