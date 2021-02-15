# Room booking system

## Business problem
Two companies, COKE and PEPSI, are sharing an office building but as they are competitors, they don’t trust each other. Tomorrow is COLA day (for one day), that the two companies are celebrating. They are gathering a number of business partners in the building. In order to optimize space utilization, they have decided to set-up a joint booking system where any user can book one of the 20 meeting rooms available, 10 from each company (C01, C02, ..., C10 and P01, P02, ...., P10).
The booking system has the following functionalities:
- Users can see meeting rooms availability
- Users can book meeting rooms by the hour (first come first served)
- Users can cancel their own reservations

## Run in development mode

#### Install packages for frontend:

`cd web && npm i`

#### Run the app

`docker-compose up`

## Run in production mode:

#### Build docker images

- API: `cd api && docker build -t cons_app_api_prod .`
- WEB: `cd web && docker build -t cons_app_web_prod -f Dockerfile-prod .`

#### Run traefik

`cd live/traefik && TRAEFIK_TOML=traefik-no-ssl.toml docker-compose up -d`

#### Run the app:

`cd live && docker-compose up`


