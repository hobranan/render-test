// // part3a-1 Node.js and Express
// // console.log('hello world')
// const http = require("http"); //is like: import http from 'http'
// // const app = http.createServer((request, response) => {
// //   response.writeHead(200, { 'Content-Type': 'text/plain' })
// //   response.end('Hello World')
// // })
// let notes = [
//   {
//     id: "1",
//     content: "HTML is easy",
//     important: true,
//   },
//   {
//     id: "2",
//     content: "Browser can execute only JavaScript",
//     important: false,
//   },
//   {
//     id: "3",
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true,
//   },
// ];
// const app = http.createServer((request, response) => {
//   response.writeHead(200, { "Content-Type": "application/json" });
//   response.end(JSON.stringify(notes));
// });
// const PORT = 3001;
// app.listen(PORT);
// console.log(`Server running on port ${PORT}`);
// // open http://localhost:3001/ in browser

// // part3a-2 Web and Express
// const express = require("express");
// const app = express();
// let notes = [
//   {
//     id: "1",
//     content: "HTML is easy",
//     important: true,
//   },
//   {
//     id: "2",
//     content: "Browser can execute only JavaScript",
//     important: false,
//   },
//   {
//     id: "3",
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true,
//   },
// ];
// app.get("/", (request, response) => {
//   response.send("<h1>Hello World!</h1>");
// });
// // http://localhost:3001/
// app.get("/api/notes", (request, response) => {
//   response.json(notes);
// });
// // http://localhost:3001/api/notes
// // app.get('/api/notes/:id', (request, response) => {
// //     const id = request.params.id
// //     const note = notes.find(note => note.id === id)
// //     response.json(note)
// // })
//   // http://localhost:3001/api/notes/<id>
//   // http://localhost:3001/api/notes/2  valid
//   // http://localhost:3001/api/notes/4  invalid
// app.get('/api/notes/:id', (request, response) => {
//     const id = request.params.id
//     const note = notes.find(note => note.id === id)

//     if (note) {
//       response.json(note)
//     } else {
//       response.status(404).end() // HTTP ERROR 404 Not Found
//     }
// })
// app.delete('/api/notes/:id', (request, response) => {
//     const id = request.params.id
//     notes = notes.filter(note => note.id !== id)

//     response.status(204).end()
//   }) //handles DELETE http://localhost:3001/api/notes/<id>
//   //you can test DELETE with Postman Extension
// const PORT = 3001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


// // part3a-3 Receiving data
// const express = require("express");
// const app = express();

// app.use(express.json()); // middleware to parse JSON data, useful for POST requests

// let notes = [
//   {
//     id: "1",
//     content: "HTML is easy",
//     important: true,
//   },
//   {
//     id: "2",
//     content: "Browser can execute only JavaScript",
//     important: false,
//   },
//   {
//     id: "3",
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true,
//   },
// ];
// app.get("/", (request, response) => {
//   response.send("<h1>Hello World!</h1>");
// });
// // http://localhost:3001/
// app.get("/api/notes", (request, response) => {
//   response.json(notes);
// });
// // http://localhost:3001/api/notes
// // app.get('/api/notes/:id', (request, response) => {
// //     const id = request.params.id
// //     const note = notes.find(note => note.id === id)
// //     response.json(note)
// // })
// // http://localhost:3001/api/notes/<id>
// // http://localhost:3001/api/notes/2  valid
// // http://localhost:3001/api/notes/4  invalid
// app.get("/api/notes/:id", (request, response) => {
//   const id = request.params.id;
//   const note = notes.find((note) => note.id === id);

//   if (note) {
//     response.json(note);
//   } else {
//     response.status(404).end(); // HTTP ERROR 404 Not Found
//   }
// });
// app.delete("/api/notes/:id", (request, response) => {
//   const id = request.params.id;
//   notes = notes.filter((note) => note.id !== id);

//   response.status(204).end();
// }); //handles DELETE http://localhost:3001/api/notes/<id>
// //you can test DELETE with Postman Extension
// const PORT = 3001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// // app.post('/api/notes', (request, response) => {
// //     const note = request.body
// //     console.log(note)
// //     response.json(note)
// //   }) //handles POST http://localhost:3001/api/notes/
// //you can test POST with Postman Extension
// // https://fullstackopen.com/en/part3/node_js_and_express#receiving-data
// // do 'body' > 'raw' > JSON > {"content": "this new note", "important": true}
// const generateId = () => {
//   const maxId =
//     notes.length > 0 
//     ? Math.max(...notes.map((n) => Number(n.id))) 
//     : 0;
//   return String(maxId + 1);
// };
// app.post("/api/notes", (request, response) => {
//   const body = request.body;
//   if (!body.content) {
//     return response.status(400).json({
//       error: "content missing",
//     });
//   }
//   const note = {
//     content: body.content,
//     important: Boolean(body.important) || false,
//     id: generateId(),
//   };
//   notes = notes.concat(note);
//   response.json(note);
// });
// const requestLogger = (request, response, next) => {
//     console.log('Method:', request.method)
//     console.log('Path:  ', request.path)
//     console.log('Body:  ', request.body)
//     console.log('---')
//     next()
//   }
// app.use(requestLogger)
// const unknownEndpoint = (request, response) => {
//     response.status(404).send({ error: 'unknown endpoint' })
//   }
// app.use(unknownEndpoint)


// part3b-1 Deploying app to internet
const express = require("express");
const app = express();
app.use(express.json()); // middleware to parse JSON data, useful for POST requests
let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});
// http://localhost:3001/
app.get("/api/notes", (request, response) => {
  response.json(notes);
});
// http://localhost:3001/api/notes
// app.get('/api/notes/:id', (request, response) => {
//     const id = request.params.id
//     const note = notes.find(note => note.id === id)
//     response.json(note)
// })
// http://localhost:3001/api/notes/<id>
// http://localhost:3001/api/notes/2  valid
// http://localhost:3001/api/notes/4  invalid
app.get("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  const note = notes.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end(); // HTTP ERROR 404 Not Found
  }
});
app.delete("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
}); //handles DELETE http://localhost:3001/api/notes/<id>
//you can test DELETE with Postman Extension
// app.post('/api/notes', (request, response) => {
//     const note = request.body
//     console.log(note)
//     response.json(note)
//   }) //handles POST http://localhost:3001/api/notes/
//you can test POST with Postman Extension
// https://fullstackopen.com/en/part3/node_js_and_express#receiving-data
// do 'body' > 'raw' > JSON > {"content": "this new note", "important": true}
const generateId = () => {
  const maxId =
    notes.length > 0 
    ? Math.max(...notes.map((n) => Number(n.id))) 
    : 0;
  return String(maxId + 1);
};
app.post("/api/notes", (request, response) => {
  const body = request.body;
  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  };
  notes = notes.concat(note);
  response.json(note);
});
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }
app.use(requestLogger)
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
app.use(unknownEndpoint)
const cors = require('cors')
app.use(cors())

// const PORT = 3001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
/*
For both Fly.io and Render, 
we need to change the definition of the port our application 
uses at the bottom of the index.js file in the backend like so:
*/
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})