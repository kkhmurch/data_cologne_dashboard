Dash Crash (Project Explore 1 - WS 2022/23)
===========================================

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

Hier ein paar grobe Themen und mögliche Datenquellen.

* Umwelt
  * Norwegischer Wetterdienst: https://api.met.no/weatherapi/ <br>
    Viele End-Points mit verschiedenen Formaten, benötigt Registrierung, einfache Dokumenation.
  * https://openweathermap.org/api <br>
    Mehr Wetterdaten. Registrierung erforderlich.
  * https://www.wind-watch.org/documents/real-time-wind-production-various-regions/ <br>
    Daten zu Wind-Energie-Erzeugung.
  * https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php <br>
    Daten über Erdbeben in jüngster Zeit, z.B. [der starken Beben der letzten 7 Tage](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson).
  * https://bund.dev/ <br>
    Öffentlich zugängliche Daten nach dem Open-Data-Gesetz.
    Etwa 20 APIs von radioaktiver Strahlung, Luftqualität, Warnmeldungen des Bevölkerungsschutzes, ...
* Corona
  * https://api.corona-zahlen.org/docs/endpoints/germany.html <br>
    Keine Registrierung oder Keys notwendig, einfache Dokumentation.
* Gitlab
  * https://git.coco.study/help/api/api_resources.md
  * https://github.com/public-apis/public-apis
* State & Public
  * https://www.govdata.de/
  * [Smart City Dashboard Münster](https://www.govdata.de/web/guest/suchen/-/details/25)
  * https://bund.dev/ <br>
    Öffentlich zugängliche Daten nach dem Open-Data-Gesetz.
    Etwa 20 APIs von Autobahnen, Reisewarnungen, Interpol-Fahndungen, Bundestag, ...
* Space & Earth
  * https://api.nasa.gov/ <br>
    * Viele unterschiedliche APIs mit wissenschaftlichen Daten. Einfache Registrierung.
  * https://developer.flightstats.com/api-docs/flightstatus/v2
* Social Networks
  * Twitter API
* Wirtschaft
  * https://blockchain.info/api
  * https://geekflare.com/de/best-stock-market-api/
