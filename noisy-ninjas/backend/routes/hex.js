const router = require('express').Router()
const hex = require('../function/hex')

// const achievementsUser = require('../function/achievements/achievementsUser.js');

// /source?x=2&y=2&radius=2
router.get('/source', hex)

// function (req, res) {
//

//   Match
//   .findById(req.body.matchID)
//   .exec(function (err, match) {
//     if (err) return res.status(500).end(err);
//     map = match.matchMap;

//     smallMap = []
//     hexagonsInRadius(parseInt(req.query.x), parseInt(req.query.y), parseInt(req.query.radius), map, smallMap)
//     return res.json(smallMap);
//   });

// });

module.exports = router
