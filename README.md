## Walmart Tic Tac Toe 😭
#### Allow me to paint a scenario. 👌
#### You ask your mother to play Tic Tac Toe.
#### She tells you no, because you seem to have it at home. 😢
#### You stumble upon this. 😒

### Notes
1. Draw worked
2. Spot Taken worked
3. Diag Detect did not work
4. Horiz Detect did not work
5. Vert Detect did not work
6. checkWinner is not running. 
7. checkWinner was being sent 2 arguments, but only had 1 parameter, that's why not running. 
8. Running, checkWinner not working; see below
* ![failed.png](/failed.png)
9. **Line 146 is not testing player**.  We need a function to test whether player is in each position. 

### Changes
1. Made displayBoard return the display, not alert it. 
2. Added displayBoard when there's an error in turn. 
3. Showed board when taking a turn
4. Made a button so we can turn on console log first.
5. Added a linebreak at the head of boardDisplay
6. Added a console log to testArray
7. Added a 0 = cancel option to view console logs. 
8. Replaced (function() == true) with (function())
9. Simplified checkWinner();

### Needs

