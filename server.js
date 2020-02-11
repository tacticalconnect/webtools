/**
 * @copyright 2019 Tactical Tools LLC.
 * @author Darren Hill darren@tacticaltools.com
 */
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var serverless = require("serverless-http");
var router = express();
router.use('/delay/:milliseconds', function (req, res) {
    // req.params.milliseconds
    setTimeout(function () {
        res.send("Waited for " + req.params.milliseconds + " milliseconds");
    }, req.params.milliseconds);
});
router.get('/', function (req, res) {
    res.sendStatus(200);
});
serverless(router);
