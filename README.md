# beecee
A reactjs based word game

RULES
1. The main aim is to figure out a randomly generated four letter word.
2. The player enters 4 letter word until he gets the right one
3. If the word entered contains a letter that is also there in the solution, the system returns a 'C'
4. If the word entered contains a letter that is in the same position as it is in the solution, the system returns a 'B'
5. The system returns the total count of B's and C's on submitting the word
6. ex: SOLUTION--> car
       ENTERED WORD--> rat
       RETURN--> 1B (a)   1C (r)
7. Game ends when the player figures out the word
