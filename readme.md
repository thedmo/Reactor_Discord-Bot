Ein kleiner Discord bot, welcher auf das Wort 'Trainingszeit' mit Emojies reagiert.
Gedacht als Rsvp Bot für ein Heroes of the Storms Team.

# Docker

Um den service mit docker zu hosten:

1. Repository clonen
2. .env in root anlegen
3. Discord Token und AppID aus developer portal kopieren und in .env einfügen (siehe .env-example file)
4. ServerID aus Discord von server kopieren, wo der Bot zum Einsatz kommen soll.
5. container starten via docker compose up

Via logs kann man sehen, ob der login funktioniert hat oder nicht.
