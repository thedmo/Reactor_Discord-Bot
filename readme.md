Ein kleiner Discord bot, welcher auf das Wort 'Trainingszeit' mit Emojies reagiert.
Gedacht als Rsvp Bot für ein Heroes of the Storms Team.

Schritte, um den Bot selber zu hosten:

Docker und Docker-Compese muss auf der Maschine installiert sein.

- in Projektordner (da wo das Docker-compose.yml ist) eine .env Datei anlegen
- Auf Discord eine neue Anwendung erstellen, den Token kopieren
- neue .env Datei in Reactbot Ordner anlegen
- Den kopierten Token in .env Datei nach "DISCORD_TOKEN=" einfügen

Container starten mit Docker-Compose up