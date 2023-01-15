Data Selfie (Project Explore 1 - WS 2022/23)
============================================

Dies ist ein Code-Starter für Project Explore 1 im Wintersemester 2022/23 mit einem Beispiel.
Die technische Basis zur Umsetzung ist [p5.js](https://p5js.org/).

Zur Entwicklung auf dem eigenen Rechner:
* `git clone <repo-url>`
* Datei `index.html` in Browser öffnen. <br>
  ![Kontext-Menü](doc/open-in-browser.png)
* Experimentieren... (d.h. Dateien bearbeiten).
* Das Ergebnis aktualisiert sich im Browser automatisch.<br>
  (Wenn die automatische Aktualisierung nicht mehr funktioniert, Tab schließen und Datei wie oben neu öffnen.)

**Hinweis**: Wenn du sehen willst, was ein [`print()`](https://p5js.org/reference/#/p5/print) ausgegeben hat, öffne die Entwickler-Werkzeuge des Browsers mit `F12` und schau auf die Konsole.

Datenquellen
------------

### Ideen möglicher Daten, die über sich selbst gesammelt werden könnten

* Bestellungen in Online-Shops
* Social Media Nutzung
* Youtube Konsum
* Lauftracking (oder anderes Sporttracking)
* Schlaftracking
* Bewegungs- / Positions-Daten
* Google-Suchanfragen
* Umgebungsgeräusche
* Selfies und anschließende Auswertung und Übersetzung der Bilder in Daten / Visualisierung (Farbwerte etc.)
* geschaute Serien / Filme
* gehörte Musik
* Ernährung
* Gewohnheiten
* Interaktion mit einem Haustier oder Zimmerpflanzen
* Stromverbrauch
* Gaming Statistik

und viele weitere Möglichkeiten ...

### Beispiele / Inspiration

* http://dataselfportrait.catarinasampaio.com/
* https://www.rommelballesteros.com/data-self-portraits
* http://giorgialupi.com/data-portraits-at-ted2017
* https://ideas.ted.com/how-to-draw-your-own-selfie-using-your-personal-data/
* https://twitter.com/ngenart_co/status/1567660511373787136
* https://www.youtube.com/watch?v=ypOuH_baHGI
* https://elkue.com/nyc-slice/
* https://quantifiedself.com/show-and-tell/


### Mögliche Schnittstellen und APIs für eigene Daten

* statische CSV laden: [loadTable](https://p5js.org/reference/#/p5/loadTable)
* per Google Spreadsheet:
  * [opensheet](https://github.com/benborgers/opensheet) (Dokument muss öffentlich lesbar sein!)
  * via _publish on the web_ & `loadTable()` [siehe dieses Tutorial-Video](https://www.youtube.com/watch?v=EU7SvAyybOE&ab_channel=DavidBouchard)
* per Airtable (kostenloser Account möglich, aber nicht getestet): <br>
  Dokumentation:https://airtable.com/developers/web/api/authentication <br>
  Beispiel: https://editor.p5js.org/slow_izzm/sketches/BZ9my0BCH
* Graph API für Facebook, Instagram etc. (eher nicht empfohlen, besser Data scraping oder per Hand rausziehen):
  https://developers.facebook.com/docs/graph-api
* Spotify API:
  https://developer.spotify.com/documentation/web-api/
* Strava API: <br>
  Dokumentation: https://developers.strava.com/ <br>
  Beispiel: https://codepen.io/alyda/pen/zGERzL
* Komoot API: https://static.komoot.de/doc/external-api/v007/index.html
* Mastodon API: <br>
  Dokumentation: https://docs.joinmastodon.org/client/intro/ <br>
  Client Lib: https://github.com/Kirschn/mastodon.js

### Literatur

* Fry, Ben – Visualizing Data: Exploring and Explaining Data with the Processing Environment
* Gross, Benedikt et al. – Generative Design: Visualize, Program, and Create with Processing
* Reas, Casey et al. – Form+Code in Design, Art, and Architecture
* Shiffman, Daniel – Learning Processing: A Beginner's Guide to Programming Images, Animation, and Interaction