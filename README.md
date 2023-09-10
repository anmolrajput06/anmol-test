

## clone or download
```terminal
$ git clone https://github.com/anmolrajput06/anmol-test.git
$ yarn # or npm i
```

## project structure
```terminal
LICENSE
package.json
Backend/
   package.json
   .env (to create .env, check [prepare your secret session])
Frontend/
   package.json
...
```

# Usage 

## Client-side usage(PORT: 3000)
```terminal
$ cd Frontend          // go to Frontend folder
$ yarn # or npm i    // npm install packages
$ npm run start        // run it locally

// deployment for client app
$ npm run build // this will compile the react code using webpack and generate a folder called docs in the root level
$ npm run start // this will run the files in docs, this behavior is exactly the same how gh-pages will run your static site
```

## Server-side usage(PORT: 8000)

### Prepare your secret

run the script at the first level:

(You need to add a JWT_SECRET in .env to connect to MongoDB)

```terminal
// in the root level
$ cd Backend
$ echo "JWT_SECRET=YOUR_JWT_SECRET" >> src/.env
```

### Start

```terminal
$ cd Backend   // go to Backend folder
$ npm i       // npm install packages
$ npm i nodemon 
$ nodemon app.js
```

## Deploy Server to [Heroku](https://dashboard.heroku.com/)
```terminal
$ npm i -g heroku
$ heroku login
...
$ heroku create
$ npm run heroku:add <your-super-amazing-heroku-app>
// remember to run this command in the root level, not the server level, so if you follow the documentation along, you may need to do `cd ..`
$ pwd
/Users/<your-name>/mern
$ npm run deploy:heroku
```



