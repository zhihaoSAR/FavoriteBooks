const WebSocket = require('ws');
var book = require('Book')
const wss = new WebSocket.Server({ port: 3030 });

var service =
{
  "getBooks" : function(args,ws)
              {
                  ws.send(book.getBooks());
              },
  "getBook" : function(args,ws)
              {
                ws.send(book.getBook(args.id))
              },
  "editBook" : function(args,ws)
              {
                book.editBook(args.id,args.title,args.description)
              }

}


function initService()
{
  
  wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(data) {
      let args = JSON.parse(data)
      service[args.method](args,ws)
    });
  });
  setInterval(book.SaveBooks,5000)
}
book.LoadBook().then(initService)
