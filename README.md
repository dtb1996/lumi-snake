# Lumi-Snake

A variation on the classic Snake game created for the Gamedev.js Jam 2024.

**Link to project:** https://dillionaire.itch.io/lumi-snake

## How it was made:

**Tech Used:** HTML, CSS, JavaScript

The goal of this project was to use basic web tools to make a simple game. Normally I use an engine like Unreal Engine or Godot for game development, so this was an opportunity to step out of my comfort zone and learn how to build a web page that doubles as a simple game. This game also includes a demo mode with simple logic to control the snake while in the menu.

## Optimizations

 **Base64 audio conversion:** One of the optional jam challenges was to fit the entire game into a 13 kb zip file. To include sound effects I decided to use an online Base64 audio conversion tool to reduce their storage footprint. **Link to Base64.Guru:** https://base64.guru/converter/encode/audio/mp3

 **Reused code:** To reduce the complexity and size of the project, the demo snake controller uses the same snake object and game logic as the in-game snake. The major difference between the two modes in how the movement velocity is calculated since the demo snake needs to move without player input.

 ## Lession Learned

 **Define game states early** - Although I ran out of time to fully implement it, I quickly discovered that without keeping track of the current game state in a central location (ie: finite state machine), it can be difficult maintain code/logic organization. If I were to build this game again or refactor the existing code, I would define transition functions for each of the states to keep changes to the game variables, display, etc. well-organized and easier to follow.
