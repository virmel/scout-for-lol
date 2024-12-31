# Scout Backend

## Migrations

```bash
# create the initial database migration
deno run -A npm:prisma migrate dev init
# create the client
./generate.ts
# seed the database
./seed.ts
```
