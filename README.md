# linkback

## Env variables and secrets

create a .secrets.js file in /src
add export const YOUTUBE_API_KEY="<KEY_HERE>" to the file

add an .env.js file in /src
add export const BACKEND_URL="URL:port" to the file

create a .env file to /backend, copied from .env.example

  DB_CONNECTION=pg
  DB_HOST=127.0.0.1
  DB_PORT=5432
  DB_USER=postgres
  DB_PASSWORD=
  DB_DATABASE=linkback
  SESSION_DRIVER=cookie


## Frontend setup
## -----------------------------
```
npm install


```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Running the backend
## -------------------

in /backend directory:

npm install 

## hot reload

node ace serve --watch

## build for production

node ace build

## status of migration scripts

node ace migration:status

## run migration scripts

node ace migration:run



## Running the DB
## ----------------

## install postgres

  sudo apt install postgresql postgresql-contrib

## make sure its running 

  sudo systemctl status postgresql

## create new DB with

  createdb linkback

## confirm by logging in as default user

  psql linkback -U postgres

## while the backend is running, run migration scripts with

  node ace migration:run


