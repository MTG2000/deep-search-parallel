# Deep Search

Deep Search is a tool that allows you to search for a keyword inside all (txt, pdf, doc, docx) files in a specific directory on your pc.
The App uses parallism to run using all you cpu cores to finish the work much faster, so the more cores your cpu have, the better.

### Technologies

Deep Search uses several frameworks and techs to work properly :

- [NodeJs](https://nodejs.org) - For running the back-end server
- [Socket.IO](https://socket.io) - Real-time data exchanging between the server & the client app
- [VueJs](https://vuejs.org) - A Front-End framework to build interactive UIs
- [VueX](https://vuex.vuejs.org) - A State Management Library for Vue

NodeJs Clusters have been used to take advantage of multiprocessing, the more cpu cores you have, the more files scanned simultaneously.

### Installation

Deep Search requires [Node.js](https://nodejs.org/) v12+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd deep-search
$ npm install -d
$ node index
```

or you can simply use the start.bat file after downloading the dependencies.

The App now is up and running on "localhost:5000" and you can open it with any browser.

### Development

Want to contribute? Great!

Dillinger uses Gulp + Webpack for fast developing.
Make a change in your file and instantaneously see your updates!

Open your favorite Terminal and run these commands.
