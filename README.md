# Nightlife Coordination App
*A project in the FreeCodeCamp curriculum*

*Prerequisites*
* [Docker](http) _this is the only prerequisite you need, because containerization._

## Running the project

This project requires the following environment variables to run
* FOURSQUARE_CLIENT_ID
* FOURSQUARE_CLIENT_SECRET
* PORT (optional)
*If PORT is not specified, the server will run on port 8080*
In development, you can create a .env file and store the environment variables in there.

```bash
$ docker-compose build
$ docker-compose up web
$ open "http://$(docker-machine ip default):8080" # open the app in your default browser
```


`$ docker-compose run shell` Will configure a shell process for you to access the container running the app.

## Building

Run `docker-compose build` to rebuild the app.

## Deploying 

You can deploy the app to Heroku from Docker.
```bash
$ heroku create
$ heroku docker:release
$ heroku open # open the app in your default browser
```
