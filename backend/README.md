#  👨‍💻 Ajala Duty Tour Management (DTMS)


The solution automates the processing and payment of duty tour allowances using eNaira. It automates out-of-office notifications and integrates with major airline and hotel merchants that accept eNaira payments.



<!-- GETTING STARTED -->
## Getting Started

Below are the instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This are tools required to get the project up and running.

* Visual Studio Code
* Docker

### Installation

Below are instructions for installing and setting the app.

1. Download [Visual Studio Code](https://code.visualstudio.com/download)

3. Download Docker from [here](https://www.docker.com/).


## Setting up dev environment
Project STACK (PERN)  => Postgres, Express, React, Nodejs

Clone the project into any directory of choice
```bash
$ git clone https://github.com/Application-Management-Division/Ajala_DTMS.git
```

Run the following command.

```bash
# Navigate to the project root
cd ajala_dtms 
```


### Environment Variables `.env`:

Create a .env file in the root of your project and populate with the right values.

```markdown
COMPOSE_PROJECT_NAME=Ajala_DTMS



#Data base credentials



PG_HOST=ajala_postgres

PG_USER=ajala

PG_PASSWORD=

PG_DB=ajala

PG_SSL_SUPPORT=false


# Tiqwa credentials (Flight Aggregator)
TIQWA_API_KEY_SANDBOX=
    



# JWT credentials (Authentication)

JWT_ACCESS_TOKEN_PUBKEY=
JWT_ACCESS_TOKEN_PRIVKEY=

JWT_REFRESH_TOKEN_PUBKEY= 
JWT_REFRESH_TOKEN_PRIVKEY=
# Access Time Out
ACCESS_TOKEN_EXPIRES_IN = 60
REFRESH_TOKEN_EXPIRES_IN = 120


#web apps client ID
TENANT_ID=9cdc7dd5-9dd6-4fbb-9a68-bcb9021721d0
APP_ID=004b7b3b-d42f-451d-a079-709fe3670af5
HOST_URL= http://localhost
PORT= 8000
APP_SECRET=


CBDC_ACCESS_KEY=
SENDGRID_API_KEY=
```


```bash
# Startup containers
docker compose -f "docker-compose.yaml" up -d --build 
```

## License

_____


