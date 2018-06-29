var express = require('express')
var moment = require('moment')
var app = express();
var QRCode = require('qrcode')
var server = require('http').createServer(app);
var io = require('socket.io')(server);
app.use(express.static(__dirname + '/public'));
io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('qr', function (msg) {

        let name = moment().format('x')
        QRCode.toFile(`public/images/${name}.svg`, 'Some text', {
            color: {
              dark: '#000',  // Blue dots
              light: '#0000' // Transparent background
            }
          }, function (err) {
            if (err) throw err
            console.log('done')
          })
        
        
        setTimeout(() => { io.sockets.emit('messages', {name: name, message:msg}); }, 4000)


    });
});
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/generatorqr.html');
});
server.listen(3001);
let name = moment().format('x')
QRCode.toFile(`public/images/${name}.svg`, 'Some text', {
    color: {
      dark: '#00F',  // Blue dots
      light: '#0000' // Transparent background
    }
  }, function (err) {
    if (err) throw err
    console.log('done')
  })
