# Bookshelf
## File Structure
* app - contains compiled JavaScript
	* models
      * user.js - user model
    * routes.js - all the routes for the application
* config
  * auth.js - holds the client secret keys (i.e. Google)
  * database.js - holds database connection settings
  * passport.js - configures the strategies for passport
* public - contains all static content (images, style-sheets, etc.)
  * images - contains image files
    * book-open.png - website background image
  * stylesheets - contains css files
    * main.css - contains the main css that is implemented in all ejs
* views - contains view templates
  * index.ejs.js - shows homepage with login links
  * login.ejs.js - shows login form
  * mydashboard.ejs.js - displays dashboard
  * profile.ejs.js - returns profile information after login
  * signup.ejs.js - provides sign-up form
* package.json - handles npm packages
* server.js - sets up application
## References
1. Complete Guide to Node Authentication with MySQL
2. Easy Node Authentication Setup and Local - https://scotch.io/tutorials/easy-node-authentication-setup-and-local
3. How to Create Server-Side MVC Apps With Node.js and Express - https://www.youtube.com/watch?v=QseHOX-5nJQ
4. Additional HTML and CSS - http://www.stackoverflow.com
5. Getting Started With JavaScript for Web Development - https://scotch.io/courses/getting-started-with-javascript
## Coding Instructions     
If you would like to download the code and try it yourself:
1. Clone the repo: `git clone git@github.com:manjeshpv/node-express-passport-mysql.git`
2. Install packages: `npm install` 
3. Edit the database configuration: `config/database.js`  
4. Create the database schema: `node scripts/create_database.js`_ 
5. Launch: `node server.js`
6. Visit in your browser at: `http://localhost:1337` 
