# Noisy Ninjas

### Description

Noisy Ninjas is a **2D turn based multi-player game** where players use sound strategically to outsmart the boss or eachother. When starting a new game, **players will either be assigned the role of the boss or a ninja** and must complete a variety of objectives based on the chosen game mode (King of the Hill, Survival, Free for all and more). Ninjas would be placed at a random location of a circular arena away from other ninjas. Due to the environment being set to night, ninjas have limited visual ability and **must rely on making sound** to get an understanding of their surroundings and will be heard from other players within proximity. The boss is placed at the center of the map and has less vision than ninjas however is more keen to sound. The boss' objective is to stop the ninjas from accomplishing their goals by depleting their health points using their unique abilities.

Each turn in this game will be given a time limit. **Both sides have a limited amount of time to select options in how to react or navigate a situation.** For ninjas it will be 30 seconds and for the boss it will be a minute. Each character is given a limited set of actions, which can be upgraded based on items or completion of objectives found on the map. Ninjas will be able to move, launch kunais, use abilities and complete objectives. When launching kunais, ninjas will select the location they want to shoot at and use their voice to determine the distance, type of kunai, and damage. Frequency and volume will be the main factors. If the kunai hits the boss they will get hurt or stunned when making contact. If the kunai hits an object, it will tell the ninja the location of the object.

The boss can use the kunais to determine the location of the ninja and block it if it knows the type of kunai. There will be multiple bosses a player can choose from which will have varying abilities that can help the boss track, damage, and delay ninjas.

**There is a lot of strategy that can emerge from this game.** Both from the boss and the ninjas. Hopefully, this would make for a fun game that can be played repeatedly with different outcomes.

### Challenge Factors

1. OAuth
   In addition to users having their own accounts, they can gain access to their accounts using authorization tokens from other websites such as Google and Facebook. We will not request anything more than what's necessary for logging in from the OAuth 2.0 Provider.

2. Multiplayer
   Noisy Ninjas will need to be able to support multiplayer - up to 4 players at a time (3 ninjas and 1 boss or 4 ninjas). This will call for a party queue (game starts immediately after host clicks play) and if time permits a queue system for matching online with other players who are in the queue (game starts when all players are found).

3. Real time interactions
   Ninjas can communicate and strategize (over voice comms) with eachother if they're within proximity of one another. The boss can listen in if it is within range. Additionally, the short time limit for each turn will be shown to each player forcing a real time interaction from everyone.

4. Transactions
   The game will have ingame currency which a user will have a certain amount of. They can spend their money to buy ingame currency or specific skins that can be displayed when playing the game.

5. Integration with cloud technologies
   To host multiplayer, we will use the service Cloud Amazon Gamelift. It will deploy, operate and scale dedicated low-cost servers in the cloud for session-baed multiplayer games.

### Key Features for Beta

The following are key features listed in no particular order

1. Accounts
2. Proximity Chat
3. Customizable Avatars
4. Role selection
5. Time limit on turns
6. Ninja POV
7. Boss POV
8. Determine frequency and volume of sounds
9. Leaderboard
10. Objectives
11. Game works for 2 players (1 boss, 1 ninja)

### Key Features for Final

1.  In-game transactions
2.  Creating parties
3.  Multiple modes
4.  Multiple bosses
5.  Abilities (ninjas and bosses)
6.  Randomness in map generation

### Tech Stack

We will be using a **MERN** set up.

**M** - MongoDB - Document based **database**. Ideal due to scalability and lack of relationships. Works well with NodeJS.

**E** - Express - **Backend**: Web app framework for Nodejs

**R** - React - Javascript **frontend framework** which will generate the UI.

**N** - NodeJS - Javascript run time environment which will execute code outside of a browser such as a **server**

### Deployment

We will be using **Cloud Amazon Gamelift**.

It is intended to deploy, operate, and scale dedicated, low-cost and high-performing servers in the cloud for session-based multiplayer games.

Game sessions will be made which are instances of the game run on Gamelift. Players will find and join existing sessions to play.

We haven't used Gamelift before and so not sure if this will fully deploy the app.

In that case, the app can be deployed using AWS on some domain.

### Collaborators

Andy Phy Lim

Calvin Cheng

Annas Rahuma

Final Demo: https://www.youtube.com/watch?v=7ErIkUZ4tl0
Deployed App: https://noisy-ninjas.nn.r.appspot.com/
Documentation: https://app.swaggerhub.com/apis/ANNASRAHUMA_1/Noisy-Ninjas/1
Figma: https://www.figma.com/file/7wJWGyRVnMTbcITtFzIuTx/Noisy-Ninjas?node-id=42%3A24185
Majority of art assests are made by Andy PhyLim (me) - please refer to credits in the src folder for reference of other material
