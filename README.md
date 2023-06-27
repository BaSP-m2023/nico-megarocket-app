# BaSP - MegaRocket App

Mega Rocket App is a software project that offers a platform to administer and manage a gym. It provides essential functionalities to manage members, register trainers, schedule classes.

### WEEK 13

## INTRODUCTION

This week, the Devs team worked on implementing Redux in the project. To improve the efficiency, readabilitily and maintainability of the code.

We restructured the application's state management system. Previously, each component handled and modified its own state, which, from a technical standpoint, we believe hindered code readability and maintainability. Because there is a clear separation between state management and component logic.

Currently, with the implementation of Redux in our application, we have achieved more efficient code because all the information is consolidated in a global state called store and can only be modified through the use of reducers. Thanks to this, we have achieved cleaner code by avoiding "prop drilling," Redux eliminates the need for passing data through multiple nested child components. This reduces the complexity of passing data between components and improves overall code cleanliness.

### WEEK 14

## OBJETIVES FOR THE PROBLEM

For this week we had the objective of making use of the Hook and JOI libraries in React to update the respective Forms and carry out the corresponding routing to achieve their correct operation.
Everything mentioned above should respect what is shown in the Figma screenflow, where the styles of each object shown in the tabs are clarified, as well as an adequate use for its correct performance.

In turn, we should begin to diagram the users with the role of Admin and Members. Each one of them had to have separate views with their functionalities that differentiated them from each other.

In order to meet these objectives, the developers were subdivided into two groups to arrive on time and in a proper way to the assigned delivery date.

### WEEK 15

## OBJETIVES FOR THIS WEEK

We had to update our operation of the website, implementing security in the system using the platform Firebase for managing user access, taking into account the different roles that exist in the system (Member, Admin).

To solve this problem, we implemented the Firebase library for Node projects, and we had to add the credentials in all environment variables to connect the Firebase project with the Frontend and Backend applications by MegaRocket.
Then, we develop Sign-up, Login and Logout functionalities.

For this, the endpoints and routes had to be transformed into private ones, except for the routes and/or endpoints that are public, based on the problem of week 01. That is, an existing user must be logged in.

### Benefits of Redux implementation

- Improved Code Efficiency
  <br>
- Enhanced Code Readability
  <br>
- Better Code Maintainability

## Initial Setup

### Install dependencies

    npm install

### Setup environment file

create a file at root called `.env` and add this:

    REACT_APP_API_URL=http://localhost:4000/api

### Run App

    npm start

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.\
You will also see any lint errors in the console.

### Check Lint errors

    npm run lint

### Fix Lint errors

    npm run lint:fix

<br>

## Members

### Develevoper team

|                                          Photo                                           |        Name         |               Mail               |                          Github                          |
| :--------------------------------------------------------------------------------------: | :-----------------: | :------------------------------: | :------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/127541829?v=4" height="50" width="50"> |  Yhanahi Rosenthal  |       yhanahi16@gmail.com        | [@YhanahiRosenthal](https://github.com/YhanahiRosenthal) |
| <img src="https://avatars.githubusercontent.com/u/102418096?v=4" height="50" width="50"> |    Mauro Jimenez    |      maurojim123@gmail.com       |      [@MauroJimenez](https://github.com/maurojjzz)       |
| <img src="https://avatars.githubusercontent.com/u/91099276?v=4" height="50" width="50">  |  Cristian Lotorto   |    cristianlotorto@gmail.com     |  [@CristianLotorto](https://github.com/CristianLotorto)  |
| <img src="https://avatars.githubusercontent.com/u/49520632?v=4" height="50" width="50">  |    Ivan Jukonis     |      jukoivan024@gmail.com       |      [@IvanJukonis](https://github.com/IvanJukonis)      |
| <img src="https://avatars.githubusercontent.com/u/93749172?v=4" height="50" width="50">  |      Gino Boca      |        gnoboca@gmail.com         |        [@GinoBoca](https://github.com/Ginoboca1)         |
| <img src="https://avatars.githubusercontent.com/u/127460882?v=4" height="50" width="50"> |   Mateo Carciente   |    mateocarciente1@gmail.com     |      [@MateoCarciente](https://github.com/MaateoC)       |
| <img src="https://avatars.githubusercontent.com/u/70213263?v=4" height="50" width="50">  | Franco Gaston Lelli |   francogastonlelli@gmail.com    |   [@FrancoGastonLelli](https://github.com/FrancoLelli)   |
| <img src="https://avatars.githubusercontent.com/u/127543742?v=4" height="50" width="50"> |  Emanuel Lamberti   |      elemanu9222@gmail.com       | [@Emanuel Lamberti](https://github.com/Emanuel-Lamberti) |
| <img src="https://avatars.githubusercontent.com/u/123522303?v=4" height="50" width="50"> | Florencia Di Mónaco |      flordimonaco@gmail.com      |  [@FlorenciaDiMónaco](https://github.com/flordimonaco)   |
| <img src="https://avatars.githubusercontent.com/u/86127600?v=4" height="50" width="50">  |  Ticiano Licarzze   |      ticilicarzze@gmail.com      |   [@TicianoLicarzze](https://github.com/ticilicarzze)    |
| <img src="https://avatars.githubusercontent.com/u/55507203?v=4" height="50" width="50">  |   Nicolas Cagnina   | nicolas.cagnina@radiumrocket.com |    [@NicolasCagnina](https://github.com/NicoCagnina)     |
| <img src="https://avatars.githubusercontent.com/u/72134180?v=4" height="50" width="50">  |    Carla Baleani    |  carla.baleani@radiumrocket.com  |       [@CarlaBaleani](https://github.com/cbaleani)       |

### QA team

|                                          Photo                                           |        Name        |           Mail           |                        Github                        |
| :--------------------------------------------------------------------------------------: | :----------------: | :----------------------: | :--------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/127681628?v=4" height="50" width="50"> |    Glenda Viera    |    glevide@gmail.com     |     [@Glenda Viera](https://github.com/GleViDe)      |
| <img src="https://avatars.githubusercontent.com/u/127527880?v=4" height="50" width="50"> | Alejandra Paggiola |  alefpaggiola@gmail.com  | [@AlejandraPaggiola](https://github.com/AlePaggiola) |
| <img src="https://avatars.githubusercontent.com/u/127547287?v=4" height="50" width="50"> |   Barbara Millan   | barbii.millan@gmail.com  |   [@BarbaraMillan](https://github.com/Barbimillan)   |
| <img src="https://avatars.githubusercontent.com/u/127552931?v=4" height="50" width="50"> |    Martin Lupo     | lupomartin2003@gmail.com |     [@MartinLupo](https://github.com/lupomartin)     |

<br>

### License & Copyright

© Radium Rocket "Become a Software Professional 2023"
