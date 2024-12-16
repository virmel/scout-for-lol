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
    servers: [ { server_id, player_ids } ]
}
```

## General

- save extra match statistics, like LP gained

## Post-match

- add champ icon
- make vision score easier to see
- add icons for damage, K/D/A, and gold

## UI

- visualizations
- player stats pages
