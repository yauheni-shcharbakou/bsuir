_hotel_

# Hotel Spring + Next app

Task on subjects "Java Program Development" and "Web Program Development for Mobile Systems" at BSUIR

### Backend tech stack

- Kotlin
- Gradle
- Spring Boot
- Hybernate ORM

### Frontend tech stack

- TypeScript
- NextJS
- MaterialUI

### Repository secrets

- `HEROKU_APP_NAME` name of backend Heroku app
- `HEROKU_API_KEY` used Heroku api key for deploy backend
- `HEROKU_EMAIL` used Heroku email for deploy backend
- `VERCEL_TOKEN` used Vercel token for deploy frontend
- `VERCEL_ORGANIZATION_ID` used Vercel org id for deploy frontend
- `VERCEL_PROJECT_ID` used Vercel project id for deploy frontend

### Environment variables

- `PORT` used port by backend
- `SPRING_DATASOURCE_URL` db url string
- `SPRING_DATASOURCE_USERNAME` db username
- `SPRING_DATASOURCE_PASSWORD` db password
- `JWT_SECRET` secret key for JWT
- `JWT_EXPIRATION_HOURS` jwt expiration time in hours
- `ROOM_LIMIT` default limit for room pagination
- `BCRYPT_STRENGTH`
- `MIN_EMAIL_CHUNKS` min chunks separated by `.` in email
- `MIN_PASSWORD_LENGTH`
- `TOKEN_TYPE_KEY`
- `TOKEN_TYPE_VALUE`
- `PGSSLMODE` set to 'no-verify' for Heroku
- `NEXT_PUBLIC_BACKEND_URL` backend deploy url (used by frontend)

### Setup database

```shell
psql -U postgres
create database hotel;
\q
```

### Load project

```shell
git clone git@github.com:IIPEKOLICT/hotel.git
cd hotel
```

### Start backend locally (needed 17 Java)

```shell
cd backend
./gradlew build
./gradlew bootRun
```

### Start frontend locally (needed 16+ NodeJS)

```shell
cd frontend
npm i
npm run start
```

### Start backend on Heroku command (needed 17 Java)

```shell
java -Dserver.port=$PORT $JAVA_OPTS -jar build/libs/backend.jar
```
