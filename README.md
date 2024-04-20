##  Express

Fast, unopinionated, minimalist web framework for Node.js.
It provides mechanisms to:

 - Write handlers for requests with different HTTP verbs at different URL paths (routes).

 - Integrate with "view" rendering engines in order to generate responses by inserting data into templates.

 - Set common web application settings like the port to use for connecting, and the location of templates that are used for rendering the response.

 - Add additional request processing "middleware" at any point within the request handling pipeline.

https://expressjs.com/en/4x/api.html


##  Middleware

Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.

Middleware functions can perform the following tasks:

 - Execute any code.

 - Make changes to the request and the response objects.

 - End the request-response cycle.

 - Call the next middleware function in the stack.


##  *cross-env* vs *dotenv* packages

- **cross-env** is a CLI that will spawn a process for the command you give it with the environment variables set as you specify in the command.
				cross-env is used to set environment variables *inline when running node commands*.

- **dotenv** will spawn the process with the environment variables based on a .env file.


##  *nodemon* package

Nodemon is a utility depended on about 3 million projects, that will monitor for any changes in your source and automatically restart your server. 
Perfect for development. Swap nodemon instead of node to run your code, and now your process will automatically restart when your code changes. 

##  *express-validator* package

express-validator is a set of express.js middlewares that wraps the extensive collection of validators and sanitizers offered by validator.js.

It allows you to combine them in many ways so that you can validate and sanitize your express requests, and offers tools to determine if the request is valid or not, which data was matched according to your validators, and so on. For ex:

	```
	check("username", "Empty username").notEmpty(),
	check("password", "Password must be between 4 and 10 symbols").isLength({min:4, max:10}),
	```

##  JSON Web Token

JSON Web Token (JWT) is a proposed Internet standard for creating data with optional signature and/or optional encryption whose payload holds JSON that 
asserts some number of claims. The tokens are signed either using a private secret or a public/private key.

Structure

 - Header
Identifies which algorithm is used to generate the signature. 
Typical cryptographic algorithms used are HMAC with SHA-256 (HS256) and RSA signature with SHA-256 (RS256). JWA (JSON Web Algorithms) 

 - Payload
Contains a set of claims. The JWT specification defines seven Registered Claim Names, which are the standard fields commonly included in tokens.

 - Signature
Securely validates the token. The signature is calculated by encoding the header and payload using Base64url Encoding RFC 4648 and 
concatenating the two together with a period separator. That string is then run through the cryptographic algorithm specified in the header. 

##  jsonwebtoken

An implementation of JSON Web Tokens.

Usage:

``` jwt.sign(payload, secretOrPrivateKey, [options, callback]) ```

 - (Asynchronous) If a callback is supplied, the callback is called with the err or the JWT.
 - (Synchronous) Returns the JsonWebToken as string
 - payload could be an object literal, buffer or string representing valid JSON.

``` jwt.verify(token, secretOrPublicKey, [options, callback]) ```

 - (Asynchronous) If a callback is supplied, function acts asynchronously. The callback is called with the decoded payload if the signature is valid and optional expiration, audience, or issuer are valid. If not, it will be called with the error.

 - (Synchronous) If a callback is not supplied, function acts synchronously. Returns the payload decoded if the signature is valid and optional expiration, audience, or issuer are valid. If not, it will throw the error.

##  bcrypt

Optimized bcrypt in JavaScript with zero dependencies. Compatible to the C++ bcrypt binding on node.js and also working in the browser.

Besides incorporating a salt to protect against rainbow table attacks, bcrypt is an adaptive function: over time, the iteration count can be increased to make it slower, so it remains resistant to brute-force search attacks even with increasing computation power. (see)

While bcrypt.js is compatible to the C++ bcrypt binding, it is written in pure JavaScript and thus slower (about 30%), effectively reducing the number of iterations that can be processed in an equal time span.

The maximum input length is 72 bytes (note that UTF8 encoded characters use up to 4 bytes) and the length of generated hashes is 60 characters.
