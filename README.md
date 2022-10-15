## KnightsFights
Fighters can get an estimate for a fight price based on thier fighting resume comparing to other fighters.
## Tech Stack
![Nest](https://img.shields.io/badge/-Nest-black?style=flat-square&logo=nestjs)
![Angular](https://img.shields.io/badge/-Angular-black?style=flat-square&logo=angular)
![Prisma](https://img.shields.io/badge/-Prisma-black?style=flat-square&logo=prisma)
![Nx](https://img.shields.io/badge/-Nx-black?style=flat-square&logo=nx)


## Installation Guide
After you cloned the repo

Add .env.development inside apps/api directory

.env.development example
```
NODE_ENV=development
DB_NAME="dev.db"
DB_PROVIDER=sqlite
COOKIE_KEY=randomkey
DATABASE_URL="file:../dev.db"
```

Add .env inside apps/commands
.env exmaple
```
DB_NAME=<should-match-.env.development>"
DB_PROVIDER=<should-match-.env.development>
DATABASE_URL=<should-match-.env.development>  
```

```
npm install
nx run api:prisma migrate dev
nx build commands
npm run create-superuser <username> <email> <password>
nx run api:dev
```
api.http file is provided. If you're on vscode you could install REST Client extention and use the file to try out the app


