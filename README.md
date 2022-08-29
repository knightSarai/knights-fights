# KnightsFights

After you cloned the app

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


