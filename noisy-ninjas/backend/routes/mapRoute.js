const router = require('express').Router();
const Map = require('../schemas/map');

const map = require('../function/map');

router.post('/generate', map);

router.get('/generate', function (req, res) {
      
    Map
    .findById(req.body.mapID)
    .exec(function (err, map) {
      if (err) return res.status(500).end(err);
      return res.json(map);
    });
  
});

module.exports = router;
