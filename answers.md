# Self-Study Questions

1. What is the purpose of using _sessions_?
A: Sessions allow users to stay "signed-in" and able to access certain pages without having to log in every time the page refreshes.

2. What does bcrypt do to help us store passwords in a secure manner.
A: Bcrypt hashes the password so that they are different from what the actual password is. The hashed passwords must be decoded and compared during authentication to allow user access.

3. What does bcrypt do to slow down attackers?
A: Bcrypt hashes the password a certain amount of times using a specific algorithm to keep attackers guessing. 

4. What are the three parts of the JSON Web Token?
A: JSON Web Tokens have a header, the data payload, and the signature that has a special signature specified by the developer.