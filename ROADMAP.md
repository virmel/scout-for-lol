# ROADMAP

There seems to be a fair bit of coupling. Examples:

- Some parts of the app are not runnable without config, resvg, React, Discord,
  etc.
- Unrelated concerns should be runnable

## Misc

- [x] Fix KDA ratio
- [x] Fix image width
- [x] Show CS
- [x] Show lane images
- [x] Better rank support, show message for placements
- [x] Better duo/flex squeue support

## MVP

- [x] Store player configs and database in either Postgres or sqlite
  - [x] Setup Prisma
- [x] Add support for player regions
- [ ] Frontend/marketing site
- [ ] Add commands for customizing player configs and database state
- [ ] Track players that aren't subscribed to by any server & prune from
      database
- [ ] Store match objects in S3
- [ ] Store generated images in S3
- [x] Use correct username in generated images
- [x] Support unranked queue types
  - Currently it will show LP stats/promos, etc.

## Post-match

- [ ] add champ icon
- [ ] make vision score easier to see
- [ ] add icons for damage, K/D/A, and gold
