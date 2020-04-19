Vue-apollo-node-express client boilerplate
========

This boilerplate can be used to quickly start a vue front project that will connect with APIs like Graphql or Rest Api.

Starting in dev mode
--------------------

    git clone <git_url_of_the_project>
    cd <project_folder>
    yarn # or npm install

Create a .env file with this model (not necessary for dev env because config.js configure defaults) :  

  API_GRAPHQL_URI='http://localhost:3000'
  PORT=5000

    yarn serve # or npm run dev


Features
--------
###### Hot reloading and package manager
- uses `yarn` for node package manager
- Hot reloading configuration for fast developement with `yarn serve`

###### Quality tools, doc and syntax
- logging integration to see api requests, queries and response from the graphql serverOptions
- documenting code with [jsdoc](http://usejsdoc.org/) style and [flow](https://flow.org/) inspired from this [post](https://medium.com/4thought-studios/documenting-javascript-projects-f72429da2eea)
- documentation generator tool with : [documentation.js](http://documentation.js.org/) (see also [github doc](https://github.com/documentationjs/documentation#documentation))
- using babel for using all new javascript syntax
- using eslint to have nice consistent code syntax. For linting code, use in root app directory :

    yarn eslint


###### Technology stack
- node, express
- apollo : https://www.apollographql.com/docs/
- vue
- vuetify framework for css/html (based on Material Design)
- babel compiler for last js features
- webpack

###### Docker ready
- The project is ready to be use with Docker : dockerfile définit la configuration de Docker pour l’application, et on utilise docker compose pour générer toute l’infrastructure de containers nécessaire et connecter les containers.
- Pour créer les images des containers, taper dans le terminal : `docker-compose build` 
- Pour lancer les containers : `docker-compose up`  ou `docker-compose up containerName`
  ou en daemon `docker-compose up -d containerName`
- pour arrêter: `docker-compose stop`
- pour enlever les containers créés avec docker-compose up:  `docker-compose rm -f`
- Pour voir les images créées :  `docker image ls`
- Pour enlever l’image xxxx créée :  `docker image rm xxxx`
- Pour accéder via le terminal à la console du container (remplacer l’ID du container en le recherchant avec `docker container ps`): 
docker exec -it <containerID> bash   
- `.dockerignore` lists les fichiers et dossiers non copiés dans les containers.
- la configuration de docker pour heroku est proposée et à mettre à jour selon le projet.

###### Clean code organization
Code is modularized in `src` directory:
- `config.js` contains all environment variables that can be used by the project (for the server, for the database...)
- `/public` : change your favicon, configure informations and fonts available in index.html, package.json and server.js are used to launch server in production
- `/.browserslistrc` defines browsers compatibility : defaults (it has to be updated after tests)
- le fichier .editorconfig configure les standards d'écriture pour les éditeurs de code.
- le fichier .eslintrc.js configure eslint pour le projet. Pour lancer le linter automatique, lancer :  yarn lint
- vue app and webpack are configured in /vue.config.js
- the app connect to graphql api with apollo tools and packages
- apollo is configured in apollo.config.js : makes apollo and vue-apollo components and methods available in files .vue and .js
- the app is organized in /src folder :
  - the app start with /main.js : which will render App.vue, make vue-plyr available as video player, it uses apolloProvider for graphql, a router or the views and vuetify framework for htms/css
  - /assets folder contains all css and images
  - The file schemaQuery.js is necessary in case of fragments used in graphql requests to create a fragmentTypes.json from the graphqlServer.
  - App.vue is the general layout of the app which is injected in index.html and include the routed views.
  - All views are in the /views folder.
  - All vue components are in the /components folder.
  - The file apollo.js configure the apolloProvider and apolloClient to request the graphql Api : it adds the authorization bearer to the request, log errors from response, and try refresh the token if the token has expired.
  - All graphql queries are set in the folder graphqlQueries
  - The folder layouts contains all reusable layouts for views
  - The folder /utils contains all methods helpers/utilities
  - The folder /plugin contains all plugins that are not installed in node_modules
  - The folder store contains the local store to organize local states : apolloLocalState use the possibilities of apollo cache, but if using Api Rest (with axios for exemple), the classical Vuex store is configured in a folder. There's a main concern here with the single source of truth principle. So usually with only a graphql Api, it's better to use apollo Cache for single source of truth. 

###### Tests : E2E and unit
- unit tests use mocha, chai and test-utils
- E2E tests use cypress configured in cypress.json
- All tests are present in /test folder

##### Configuration
- Fonts : use googlefonts and add link in /public/index.html
- Colors : define colors variables in /src/assets/css/variables.scss
- Material Design colors :
- Icons : use material design icons configured in /public/index.html


###### Security, authentication, authorization
- git is used with a .gitignore : .env file is ignored and contains secret environment variables : you have to recreate yours. [Dotenv](https://www.npmjs.com/package/dotenv) package is used to grab the environment variables from .env file. [Cross-env](https://www.npmjs.com/package/cross-env) package is used to start server giving variables in command line (ex : for production)

- /src/router.js defines the routes and the access conditions (authentication) : before each route, the router check if user is logged, if not, it will try to refresh the token
- implement also redirect if logged or not logged in for all openned tabs with the site
-

###### Error handling consideration

Other commands
--------------

Todo : see scripts in `package.json`:

    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "deploy": "git subtree push --prefix dist heroku master",
    "start": "yarn start-server && yarn build-fragment",
    "start-server": "node --inspect server.js",
    "build-fragment": "node src/schemaQuery.js",
    "lint": "vue-cli-service lint",
    "test:e2e": "vue-cli-service test:e2e",
    "test:unit": "vue-cli-service test:unit"

Improvement plan
-----------------

- [ ] add [Flow](https://flow.org/en/docs/usage/) (read also this [post](https://codeburst.io/getting-started-with-flow-and-nodejs-b8442d3d2e57)) or [Typescript](https://www.typescriptlang.org/) for type annotations, type checking, code refactoring...
- [ ] add CI (continuous integration) tool

Contribute
----------

- Issue Tracker: todo
- Source Code: this repo (todo : update)

Support
-------

If you are having issues, please let us know.

License
-------

The project is licensed under proprietary (open source?) license. (todo : update)
