_computer-club_

# Computer club Nest + Next fullstack app 
Masha's diploma at BSUIR

### Backend tech stack

- TypeScript
- NestJS
- TypeORM
- PostgreSQL

### Frontend tech stack

- TypeScript
- NextJS
- ReactStrap

### Repository secrets

- `HEROKU_APP_NAME` name of backend Heroku app
- `HEROKU_API_KEY` used Heroku api key for deploy backend
- `HEROKU_EMAIL` used Heroku email for deploy backend
- `VERCEL_TOKEN` used Vercel token for deploy frontend
- `VERCEL_ORGANIZATION_ID` used Vercel org id for deploy frontend
- `VERCEL_PROJECT_ID` used Vercel project id for deploy frontend

### Environment variables

- `PORT` used port by backend
- `NEXT_PUBLIC_BACKEND_URL` backend deploy url (used by frontend)

### Load project

```shell
git clone git@github.com:IIPEKOLICT/computer-club.git
cd computer-club
```

### Start backend locally (needed 16+ NodeJS)

```shell
cd backend
npm i
npm run start:dev
```

### Start frontend locally (needed 16+ NodeJS)

```shell
cd frontend
npm i
npm run start
```

### Start backend on Heroku command (needed 16+ NodeJS)

```shell
npm run start:prod
```

### Generate vercel secrets and deploy (needed 16+ NodeJS and globally installed vercel-cli)

```shell
cd frontend
vercel deploy
```
