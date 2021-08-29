Inlämning 3 - REST API

Beskrivning
Projektet innehåller ett REST-API som använder sig av paketet Express (ett ramverk för att bland annat bygga API:er) till Node.js och en tillhörande klient som körs direkt i webbläsaren.
Använder JavaScript i för API-servern och HTML, CSS samt JavaScript för klienten.
API:et i sig hanterar "items". Ett item har ett id, ett namn, ett antal och ett datum då det senaste modifierades. Kan tänka sig att det är ett eller flera föremål av en viss typ (specifikt namn) på ett lager eller liknande.
https://expressjs.com/
https://nodejs.org

Vilka krav som är uppfyllda
Projektet innehåller minst 4 st. endpoints (GET, POST, PUT & DELETE för en resurs)
    Se filen ItemRouter.js.
Samtliga endpoints skall kunna nås via en REST Client fil (.rest|.http)
    Se filen restclient.http.
Datan som API:et hanterar sparas lokalt i serverfilen
    Se arrayen state.itemContainer i Business.js.
Git & GitHub har använts
    Ja.
Projektmappen innehåller en README.md fil
    Ja.
Uppgiften lämnas in i tid!
    Ja.
Alla punkter för godkänt är uppfyllda
    Ja.
All data skall vara sparad i en JSON-fil istället för i serverfilen
    Sparar i filen save.json. Se IO.js för implementationen.
Datan i JSON-filen skall uppdateras då något läggs till, uppdateras eller tas bort
    Kör funktionen WriteToFile() från IO.js från de endpoints som är relevanta.
Ett simpelt klient-gränssnitt skall finnas för att anropa API:ets olika endpoints, samt visa upp resultatet vid GET anrop
    Se mappen client.
Ytterligare en GET endpoint skall läggas till där det går att hämta ett specifikt objekt
    Se endpointen "/get/:id" i filen ItemRouter.js.

Info om hur projektet byggs och körs
    Kör "npm install".
    Startas antingen via "npm run start" eller "node server.js".

Vad jag hade velat förbättra om tid fanns
Servern blev rörig med alla filer i en mapp; hade behövt lägga dessa i separata.
Business.js lever inte upp till namnet.
De datum (framförallt klockslaget) som sparas stämmer inte med verkligheten; hade behövt se över tidzoner så hade det nog inte varit så avancerad fix.
Destructuring hade gjort koden lite renare istället för att skriva ut t.ex. "business.state.itemContainer" varje gång.
Hade gått att skriva ut id och senaste editerings-datumet i klienten.
