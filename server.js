/**
 * @copyright 2019 Tactical Tools LLC.
 * @author Darren Hill darren@tacticaltools.com
 */
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var express = require("express");
var router = express();
router.use('/delay/:milliseconds', function (req, res) {
    // req.params.milliseconds
    setTimeout(function () {
        res.send("Waited for " + req.params.milliseconds + " milliseconds");
    }, req.params.milliseconds);
});
var server = http.createServer(router);
router.get('/', function (req, res) {
    res.sendStatus(200);
});
server.listen(process.env.PORT || 3000, +process.env.IP, function () {
    var addr = server.address();
    console.log("Chat server listening at " + addr.address + " : " + addr.port);
});
