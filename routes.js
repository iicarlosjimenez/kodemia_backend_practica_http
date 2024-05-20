const http = require("http");

const host = 'localhost';
const port = 8080;

// todo: database.json
let _books = [
   { title: "The Alchemist", author: "Paulo Coelho", year: 1988 },
   { title: "The Prophet", author: "Kahlil Gibran", year: 1923 }
];

// todo: database.json
let _authors = [
   { name: "Paulo Coelho", countryOfBirth: "Brazil", yearOfBirth: 1947 },
   { name: "Kahlil Gibran", countryOfBirth: "Lebanon", yearOfBirth: 1883 }
];

function requestListener(request, response) {

   function error(code = 500, message = null) {
      if (!message) {
         switch (code) {
            case 400:
               message = 'Bad request'
               break;
            case 404:
               message = 'Not Found'
               break;
            case 405:
               message = 'Method Not Allowed'
               break;
            default:
               message = 'Error message'
               break;
         }
      }
      response.writeHead(code);
      response.end(JSON.stringify({ error: code, message: message }));
   }

   function index() {
      switch (request.method) {
         case 'GET':
            response.writeHead(200);
            response.end(JSON.stringify({status: true}));
            break;
         default:
            error(405)
            break;
      }
   }

   function validator(rules, data) {
      let validated = true
      let messages = []

      Object.entries(rules).forEach(([key, value]) => {
         // todo: Que value sea un array para validar que sea requerido, que el campo no esté vacio, el tipo de dato, etc...
         value.forEach(rule => {
            switch (rule) {
               case 'required':
                  if (!data.hasOwnProperty(key)) {
                     validated = false
                     messages.push(`The field ${key} is required`)
                  } else {
                     if (!data[key]) {
                        validated = false
                        messages.push(`The field ${key} is required`)
                     }
                  }
                  break;
               case 'number':
                  if (isNaN(data[key])) {
                     validated = false
                     messages.push(`The field ${key} is not a number`)
                  }
                  break;
               default:
                  break;
            }
         });
      });

      return {
         validated: validated,
         messages: messages
      }
   }

   function books() {
      switch (request.method) {
         case 'GET':
            response.writeHead(200);
            response.end(JSON.stringify(_books));
            break;
         case 'POST':
            let body = []
            request.on('data', chunk => {
               body.push(chunk);
            })
               .on('end', () => {
                  body = Buffer.concat(body)
                  body = body.toString()
                  try {
                     const book = JSON.parse(body);
                     const rules = {
                        title: ['required'],
                        author: ['required'],
                        year: ['required', 'number']
                     };
                     const validate = validator(rules, book)
   
                     if (validate.validated) {
                        _books.push(book)
   
                        response.writeHead(200);
                        response.end(JSON.stringify(_books));
                     }
                     else {
                        error(400, validate.messages)
                     }
                  } catch (exception) {
                     error(400, exception.message)
                  }
               })
               .on('error', err => {
                  console.error(err);
                  error()
               });
            break;
         // todo: case 'PUT':
         // todo: case 'DELETE':
         default:
            error(405)
            break;
      }
   }

   function authors() {
      switch (request.method) {
         case 'GET':
            response.writeHead(200);
            response.end(JSON.stringify(_authors));
            break;
         case 'POST':
            let body = []
            request.on('data', chunk => {
               body.push(chunk);
            })
               .on('end', () => {
                  body = Buffer.concat(body)
                  body = body.toString()
                  try {
                     const author = JSON.parse(body);
                     const rules = {
                        'name': ['required'],
                        'countryOfBirth': ['required'],
                        'yearOfBirth': ['required', 'number']
                     }
                     const validate = validator(rules, author)

                     if (validate.validated) {
                        _authors.push(author)

                        response.writeHead(200);
                        response.end(JSON.stringify(_authors));
                     }
                     else {
                        error(400, validate.messages)
                     }
                  } catch (exception) {
                     error(400, exception.message)
                  }
               })
               .on('error', err => {
                  console.error(err);
                  error()
               })
            break;
         // todo: case 'PUT':
         // todo: case 'DELETE':
         default:
            error(405)
            break;
      }
   }

   response.setHeader("Content-Type", "application/json");
   switch (request.url) {
      case "/":
         index(request)
         break;
      case "/books":
         books(request)
         break;
      case "/authors":
         authors(request)
         break;
      default:
         error(404)
         break;
   }

   
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
   console.log(`Server is running on http://${host}:${port}`);
});
