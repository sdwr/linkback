# linkback

## Env variables and secrets

create a .env file in the root directory with backend url and youtube api key:

  VITE_BACKEND_URL_PROD = "/api"
  VITE_BACKEND_URL_DEV = "http://localhost:3333"
  VITE_YOUTUBE_API_KEY = "<KEY HERE>"


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

make sure the env files are created
.env
/backend/.env

make sure postgres is running, with correct user and linkback DB created

npm install in main dir
npm install in /backend

run DB migrations in backend with node ace migration:run

check that server isn't running already in headless w

  ss -tuln | grep 3333

run server in background with 

  nohup node ace serve --watch &

run FE in backgroun with

  nohup npm run dev &

