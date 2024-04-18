# linkback

## Env variables and secrets

create a .env file in the root directory with backend url and youtube api key:

  VITE_BACKEND_URL_PROD = "/api"
  VITE_BACKEND_URL_DEV = "http://localhost:3333"
  VITE_YOUTUBE_API_KEY = "<KEY HERE>"

---
google signin ID + secret, configured to https://www.sdwr.ca/callback

  CLIENT_ID = 1078294452749-cvcs1h8apb19th90eofd1lu2n16eocn8.apps.googleusercontent.com
  CLIENT_SECRET = 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


create a .env file to /backend, copied from .env.example
make sure host is 0.0.0.0 for outside access
  TZ=UTC
  PORT=3333
  HOST=0.0.0.0
  LOG_LEVEL=info
  APP_KEY=p0626L8idgNW_f3f71OWSJ6u4wMx23cS
  NODE_ENV=development

  DB_CONNECTION=pg
  DB_HOST=127.0.0.1
  DB_PORT=5432
  DB_USER=postgres
  DB_PASSWORD=postgres
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

## rollback migration scripts

node ace migration:rollback



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


## Running on hosted environment

install nginx
use nginx-conf file
add frontend and backend to /etc/nginx/sites-enabled

make sure the env files are created
.env
/backend/.env

make sure postgres is running, with correct user and linkback DB created

npm install in main dir
npm install in /backend

run DB migrations in backend with node ace migration:run

run frontend with

  npm run build

  npm run serve

and backend with

  node ace serve --watch

## To run FE and BE in the background, so they stay open when SSH closes

open a new screen with
  
  screen

run the command to start the process
then detach from the screen with

  ctrl+A, then D

to see all running screens

  screen -ls

reattaching to restart a process

  screen -r <Screen #>

## Thumbnail storage

thumbnails are stored in backend/thumbnails, as

  {linkId}.png

getting thumbnails uses headless puppeteer to take a screenshot of the page (if OG image doesn't exist)

for puppeteer to work, the system needs chrome dependencies:

  sudo apt-get install wget xdg-utils libxcomposite1 libxcursor1 libxi6 libxtst6 libcups2 libxss1 libxrandr2 libasound2 libpangocairo-1.0-0 libatk1.0-0 libatk-bridge2.0-0 libgtk-3-0

and the backend needs to be running as a non-root user (or with --no-sandbox mode [very insecure])
