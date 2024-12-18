# ROADMAP

## MVP

- allow users to install the bot on their Discord server
- allow users to configure which summonors they want to see notifications for
  - can be done either throgugh Discord or via a web UI
- send notifications to the appropriate servers
  - servers can maintain a list of players that they're interested in
  - when sending messages we can iterate over all servers and determine which servers would like to see the message

data model is something like this:

```json
{
  players: [ { region, id, name, etc. } ],
  servers: [ { server_id, player_ids, owner, channel_id } ]
}
```

how do we determine who is allowed to configure the bot?

- they need the _manager server_ permission

users can use Discord commands to configure the bot

- use modals as form input

### API

Let's skip the API for now. We will do everything via Discord

### Database

Options:

- sqlite
- Postgres

### Queue

### File Storage

I would like to store match data and generated images for the sake of testing

- Local files
- S3 (CloudFlare R2)

## Features

### General

- save extra match statistics, like LP gained

### Post-match

- add champ icon
- make vision score easier to see
- add icons for damage, K/D/A, and gold

### UI

- visualizations
- player stats pages
