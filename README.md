CodeClan Porject 3

Exec Finder

Outline:
1) App is to be used by a manager to find the location of his/her sales team.
2) App is to be used to dynamicly push messages between sales staff and management
3) App is to caluclate who is the the most appropriate person to attend a new appointment - taking into concideration location and appointment schedules.

3 componenets make up the app, all currently built in node.js
1) React manager client (fathomless-spire)
2) express with ejs view mobile client (fierce-cliffs)
3) Node back end server with mongo DB and passport user auth (morning-reef)

The future is bright....
1) Mobile clients will be built in swift and android
2) Possibility of back end changing to Rails API in order to user PSQL in order to scale app for multiple sets of useres (i.e. many companies with a relational DB with manager has and belongs to many sales execs)
3) Re built react front end using flux thinking
use of sockets to minimise network traffic (to replace current use of nasty polling!)
4) obtain commerrcial input for further functionality (appointment tracking, what stat analysis will be required by management)

Heroku Domains:
Client Manager Desktop:         https://fierce-cliffs-56254.herokuapp.com/
Client Mobile:                  https://morning-reef-49025.herokuapp.com/
Server (No client interface):   https://fathomless-spire-32585.herokuapp.com/
