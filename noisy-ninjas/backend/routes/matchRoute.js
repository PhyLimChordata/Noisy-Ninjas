const router = require('express').Router()
const Match = require('../schemas/match')
const Map = require('../schemas/map')
const Ninja = require('../schemas/ninja')
const Monster = require('../schemas/monster')

const shurikenDown = function (x, y, n, v, map, effect) {
  let cor = map.map[`cor${x},${y}`]
  if (cor && n >= 0) {
    if (cor.type.includes(effect)) {
      let index = cor.type.indexOf(effect)
      cor.type.splice(index, 1)
      cor.type.push('normal')
    } else {
      let index = cor.type.indexOf('normal')
      cor.type.splice(index, 1)
      cor.type.push(effect)
    }
    map.map[`cor${x},${y}`] = cor
    if (v % 2 === 0) {
      shurikenDown(x + 1, y + 1, n - 1, v + 1, map, effect)
    } else {
      shurikenDown(x, y + 1, n - 1, v + 1, map, effect)
    }
  }
}

const shurikenUp = function (x, y, n, v, map, effect) {
  let cor = map.map[`cor${x},${y}`]
  if (cor && n >= 0) {
    if (cor.type.includes(effect)) {
      let index = cor.type.indexOf(effect)
      cor.type.splice(index, 1)
      cor.type.push('normal')
    } else {
      let index = cor.type.indexOf('normal')
      cor.type.splice(index, 1)
      cor.type.push(effect)
    }
    map.map[`cor${x},${y}`] = cor
    if (v % 2 === 0) {
      shurikenUp(x - 1, y - 1, n - 1, v + 1, map, effect)
    } else {
      shurikenUp(x, y - 1, n - 1, v + 1, map, effect)
    }
  }
}

const shurikenRight = function (x, y, n, map, effect) {
  let cor = map.map[`cor${x},${y}`]
  if (cor && n >= 0) {
    if (cor.type.includes(effect)) {
      let index = cor.type.indexOf(effect)
      cor.type.splice(index, 1)
      cor.type.push('normal')
    } else {
      let index = cor.type.indexOf('normal')
      cor.type.splice(index, 1)
      cor.type.push(effect)
    }
    map.map[`cor${x},${y}`] = cor

    shurikenRight(x + 1, y, n - 1, map, effect)
  }
}

const shurikenLeft = function (x, y, n, map, effect) {
  let cor = map.map[`cor${x},${y}`]
  if (cor && n >= 0) {
    if (cor.type.includes(effect)) {
      let index = cor.type.indexOf(effect)
      cor.type.splice(index, 1)
      cor.type.push('normal')
    } else {
      let index = cor.type.indexOf('normal')
      cor.type.splice(index, 1)
      cor.type.push(effect)
    }
    map.map[`cor${x},${y}`] = cor

    shurikenLeft(x - 1, y, n - 1, map, effect)
  }
}

const explosionUp = function (x, y, n, map, effect) {
  if (n === 0) {
  } else {
    for (let i = 0; i <= n; i++) {
      let cor = map.map[`cor${x - i},${y - n}`]
      if (cor && n >= 0) {
        if (cor.type.includes(effect)) {
          let index = cor.type.indexOf(effect)
          cor.type.splice(index, 1)
          cor.type.push('normal')
        } else {
          let index = cor.type.indexOf('normal')
          cor.type.splice(index, 1)
          cor.type.push(effect)
        }
        map.map[`cor${x - i},${y - n}`] = cor
      }
    }

    explosionUp(x, y, n - 1, map, effect)
  }
}

const explosionDown = function (x, y, n, map, effect) {
  if (n === 0) {
  } else {
    for (let i = 0; i <= n; i++) {
      let cor = map.map[`cor${x + i},${y + n}`]
      if (cor && n > 0) {
        if (cor.type.includes(effect)) {
          let index = cor.type.indexOf(effect)
          cor.type.splice(index, 1)
          cor.type.push('normal')
        } else {
          let index = cor.type.indexOf('normal')
          cor.type.splice(index, 1)
          cor.type.push(effect)
        }
        map.map[`cor${x + i},${y + n}`] = cor
      }
    }

    explosionDown(x, y, n - 1, map, effect)
  }
}

const explosionRight = function (x, y, n, map, effect) {
  if (n === 0) {
  } else {
    for (let i = 1; i <= n; i++) {
      let cor = map.map[`cor${x + i},${y - n + i}`]
      if (cor && n > 0) {
        if (cor.type.includes(effect)) {
          let index = cor.type.indexOf(effect)
          cor.type.splice(index, 1)
          cor.type.push('normal')
        } else {
          let index = cor.type.indexOf('normal')
          cor.type.splice(index, 1)
          cor.type.push(effect)
        }
        map.map[`cor${x + i},${y - n + i}`] = cor
      }
    }
    for (let i = 1; i < n; i++) {
      let cor = map.map[`cor${x + n},${y + i}`]
      if (cor && n > 0) {
        if (cor.type.includes(effect)) {
          let index = cor.type.indexOf(effect)
          cor.type.splice(index, 1)
          cor.type.push('normal')
        } else {
          let index = cor.type.indexOf('normal')
          cor.type.splice(index, 1)
          cor.type.push(effect)
        }
        map.map[`cor${x + n},${y + i}`] = cor
      }
    }

    explosionRight(x, y, n - 1, map, effect)
  }
}

const explosionLeft = function (x, y, n, map, effect) {
  if (n === 0) {
  } else {
    for (let i = 0; i < n; i++) {
      let cor = map.map[`cor${x - n},${y - i}`]
      if (cor && n > 0) {
        if (cor.type.includes(effect)) {
          let index = cor.type.indexOf(effect)
          cor.type.splice(index, 1)
          cor.type.push('normal')
        } else {
          let index = cor.type.indexOf('normal')
          cor.type.splice(index, 1)
          cor.type.push(effect)
        }
        map.map[`cor${x - n},${y - i}`] = cor
      }
    }
    for (let i = 1; i < n; i++) {
      let cor = map.map[`cor${x - n + i},${y + i}`]
      if (cor && n > 0) {
        if (cor.type.includes(effect)) {
          let index = cor.type.indexOf(effect)
          cor.type.splice(index, 1)
          cor.type.push('normal')
        } else {
          let index = cor.type.indexOf('normal')
          cor.type.splice(index, 1)
          cor.type.push(effect)
        }
        map.map[`cor${x - n + i},${y + i}`] = cor
      }
    }

    explosionLeft(x, y, n - 1, map, effect)
  }
}

const hexagonsInRadius = function (x, y, n, map, smallMap) {
  if (n === 0) {
    let cor2 = Object.assign({}, map.map[`cor${x},${y}`])

    cor2.newCor = `cor${0},${0}`
    cor2.oldCor = `cor${x},${y}`

    if (cor2['players']) {
      delete cor2['players']
    }

    cor2.x = x
    cor2.y = y
    smallMap.push(cor2)
  } else {
    for (let i = 0; i <= n; i++) {
      let cor = Object.assign({}, map.map[`cor${x - i},${y - n}`])

      if (cor === undefined) {
        let cor1 = { oldCor: '' }
        cor1.oldCor = ``
        cor1.newCor = `cor${0 - i},${0 - n}`

        smallMap.push(cor1)
      } else {
        cor.oldCor = `cor${x - i},${y - n}`
        cor.newCor = `cor${0 - i},${0 - n}`
        cor.x = `${x - i}`
        cor.y = `${y - n}`

        smallMap.push(cor)
      }
    }
    for (let i = 0; i <= n; i++) {
      let cor = Object.assign({}, map.map[`cor${x + i},${y + n}`])
      if (cor === undefined) {
        let cor1 = { oldCor: '' }
        cor1.oldCor = ``
        cor1.newCor = `cor${0 + i},${0 + n}`
        smallMap.push(cor1)
      } else {
        cor.newCor = `cor${0 + i},${0 + n}`
        cor.oldCor = `cor${x + i},${y + n}`
        cor.x = `${x + i}`
        cor.y = `${y + n}`
        smallMap.push(cor)
      }
    }
    for (let i = 1; i <= n; i++) {
      let cor = Object.assign({}, map.map[`cor${x + i},${y - n + i}`])
      if (cor === undefined) {
        let cor1 = { oldCor: '' }
        cor1.oldCor = ``
        cor1.newCor = `cor${0 + i},${0 - n + i}`
        smallMap.push(cor1)
      } else {
        cor.oldCor = `cor${x + i},${y - n + i}`
        cor.newCor = `cor${0 + i},${0 - n + i}`
        cor.x = `${x + i}`
        cor.y = `${y - n + i}`
        smallMap.push(cor)
      }
    }
    for (let i = 1; i < n; i++) {
      let cor = Object.assign({}, map.map[`cor${x + n},${y + i}`])
      if (cor === undefined) {
        let cor1 = { oldCor: '' }
        cor1.oldCor = ``
        cor1.newCor = `cor${0 + n},${y + i}`

        smallMap.push(cor1)
      } else {
        cor.oldCor = `cor${x + n},${y + i}`
        cor.newCor = `cor${0 + n},${0 + i}`
        cor.x = `${x + n}`
        cor.y = `${y + i}`
        smallMap.push(cor)
      }
    }
    for (let i = 0; i < n; i++) {
      let cor = Object.assign({}, map.map[`cor${x - n},${y - i}`])
      if (cor === undefined) {
        let cor1 = { oldCor: '' }
        cor1.oldCor = ``
        cor1.newCor = `cor${0 - n},${0 - i}`
        smallMap.push(cor1)
      } else {
        cor.oldCor = `cor${x - n},${y - i}`
        cor.newCor = `cor${0 - n},${0 - i}`
        cor.x = `${x - n}`
        cor.y = `${y - i}`
        smallMap.push(cor)
      }
    }
    for (let i = 1; i < n; i++) {
      let cor = Object.assign({}, map.map[`cor${x - n + i},${y + i}`])
      if (cor === undefined) {
        let cor1 = { oldCor: '' }
        cor1.oldCor = ``
        cor1.newCor = `cor${0 - n + i},${0 + i}`
        smallMap.push(cor1)
      } else {
        cor.oldCor = `cor${x - n + i},${y + i}`
        cor.newCor = `cor${0 - n + i},${0 + i}`
        cor.x = `${x - n + i}`
        cor.y = `${y + i}`
        smallMap.push(cor)
      }
    }
    hexagonsInRadius(x, y, n - 1, map, smallMap)
  }
}

router.post('/generate', function (req, res) {
  Map.findById(req.body.mapID).exec(function (err, map) {
    if (err) return res.status(500).end(err)
    let newNinjas = []
    for (i = 0; i < req.body.ninjas.length; i++) {
      let randomneg1 = Math.random() * 100
      let randomneg2 = Math.random() * 100
      let randomx = Math.floor(Math.random() * 5 + 3)
      let randomy = Math.floor(Math.random() * 5 + 3)
      if (randomneg1 > 50) {
        randomx = 20 - randomx
      } else {
        randomx = 20 + randomx
      }

      if (randomneg2 > 50) {
        randomy = 20 - randomy
      } else {
        randomy = 20 + randomy
      }

      map.map[`cor${randomx},${randomy}`].players.push({
        displayName: req.body.ninjas[i].name,
        skin: req.body.ninjas[i].skin,
      })
      newNinjas.push(
        new Ninja({
          displayName: req.body.ninjas[i].name,
          skin: req.body.ninjas[i].skin,
          chat: '',
          health: 3,
          x: randomx,
          y: randomy,
        })
      )
    }
    map.map[`cor20,19`].players.push({
      displayName: req.body.monster.name,
      skin: req.body.monster.skin,
    })
    const newMonster = new Monster({
      displayName: req.body.monster.name,
      skin: req.body.monster.skin,
      chat: '',
      health: 5,
      x: 20,
      y: 19,
    })
    const newMatch = new Match({
      matchMap: map,
      matchNinjas: newNinjas,
      matchMonsters: [newMonster],
    })
    newMatch.save(function (err, match) {
      if (err) return res.status(500).end(err)
      return res.json(match._id)
    })
  })
})

router.get('/', function (req, res) {
  Match.findById(req.body.matchID).exec(function (err, match) {
    if (err) return res.status(500).end(err)
    return res.json(match)
  })
})

router.post('/ninjas', function (req, res) {
  Match.findById(req.body.matchID).exec(function (err, match) {
    if (err) return res.status(500).end(err)
    return res.json(match.matchNinjas)
  })
})

router.post('/monsters', function (req, res) {
  Match.findById(req.body.matchID).exec(function (err, match) {
    if (err) return res.status(500).end(err)
    return res.json(match.matchMonsters)
  })
})

router.delete('/', function (req, res) {
  Match.deleteOne({ _id: req.body.matchID }, function (err) {
    if (err) return res.status(500).end(err)
    res.json('Match has been deleted')
  })
})

router.delete('/all', function (req, res) {
  Ninja.deleteMany({}, function (err) {
    if (err) return res.status(500).end(err)
  })

  Monster.deleteMany({}, function (err) {
    if (err) return res.status(500).end(err)
  })

  Match.deleteMany({}, function (err) {
    if (err) return res.status(500).end(err)
  })

  return res.json('All Matches have been deleted')
})

router.patch('/monsters/:player/health', function (req, res) {
  Match.findById(req.body.matchID).exec(function (err, match) {
    if (err) return res.status(500).end(err)
    let newMonsters = match.matchMonsters
    let updateIndex = newMonsters.findIndex(
      (n) => n.displayName === req.params.player
    )
    let health = newMonsters[updateIndex].health - parseInt(req.query.damage)
    newMonsters[updateIndex].health = health

    Match.findByIdAndUpdate(
      req.body.matchID,
      { matchMonsters: newMonsters },
      { new: true },
      function (err) {
        if (err) return res.status(500).end(err)
        return res.json(health)
      }
    )
  })
})

router.patch('/monsters/:player/chat', function (req, res) {
  Match.findById(req.body.matchID).exec(function (err, match) {
    if (err) return res.status(500).end(err)
    let newMonsters = match.matchMonsters
    let updateIndex = newMonsters.findIndex(
      (n) => n.displayName === req.params.player
    )

    newMonsters[updateIndex].chat = req.query.id

    Match.findByIdAndUpdate(
      req.body.matchID,
      { matchMonsters: newMonsters },
      { new: true },
      function (err) {
        if (err) return res.status(500).end(err)
        return res.json(newMonsters[updateIndex].chat)
      }
    )
  })
})

router.patch('/ninjas/:player/health', function (req, res) {
  Match.findById(req.body.matchID).exec(function (err, match) {
    if (err) return res.status(500).end(err)
    let newNinjas = match.matchNinjas
    let updateIndex = newNinjas.findIndex(
      (n) => n.displayName === req.params.player
    )
    let health = newNinjas[updateIndex].health - parseInt(req.query.damage)
    newNinjas[updateIndex].health = health
    Match.findByIdAndUpdate(
      req.body.matchID,
      { matchNinjas: newNinjas },
      { new: true },
      function (err) {
        if (err) return res.status(500).end(err)
        return res.json(health)
      }
    )
  })
})

router.patch('/ninjas/:player/chat', function (req, res) {
  Match.findById(req.body.matchID).exec(function (err, match) {
    if (err) return res.status(500).end(err)
    let newNinjas = match.matchNinjas
    let updateIndex = newNinjas.findIndex(
      (n) => n.displayName === req.params.player
    )

    newNinjas[updateIndex].chat = req.query.id

    Match.findByIdAndUpdate(
      req.body.matchID,
      { matchNinjas: newNinjas },
      { new: true },
      function (err) {
        if (err) return res.status(500).end(err)
        return res.json(newNinjas[updateIndex].chat)
      }
    )
  })
})

router.post('/ninjas/:player/chat', function (req, res) {
  Match.findById(req.body.matchID).exec(function (err, match) {
    if (err) return res.status(500).end(err)

    let newNinjas = match.matchNinjas
    let index = newNinjas.findIndex((n) => n.displayName === req.params.player)
    return res.json(newNinjas[index].chat)
  })
})

router.post('/monsters/:player/chat', function (req, res) {
  Match.findById(req.body.matchID).exec(function (err, match) {
    if (err) return res.status(500).end(err)
    let newMonsters = match.matchMonsters
    let index = newMonsters.findIndex(
      (n) => n.displayName === req.params.player
    )
    return res.json(newMonsters[index].chat)
  })
})

router.post('/source', function (req, res) {
  Match.findById(req.body.matchID).exec(function (err, match) {
    if (err) return res.status(500).end(err)
    let map = match.matchMap
    let smallMap = []

    hexagonsInRadius(
      parseInt(req.query.x),
      parseInt(req.query.y),
      parseInt(req.query.radius),
      map,
      smallMap
    )

    return res.json(smallMap)
  })
})

router.patch('/shuriken/:direction', function (req, res) {
  Match.findById(req.body.matchID).exec(function (err, match) {
    if (err) return res.status(500).end(err)
    let map = match.matchMap
    switch (req.params.direction) {
      case 'up':
        shurikenUp(
          parseInt(req.query.x),
          parseInt(req.query.y),
          parseInt(req.query.range),
          0,
          map,
          req.body.effect
        )
        break
      case 'down':
        shurikenDown(
          parseInt(req.query.x),
          parseInt(req.query.y),
          parseInt(req.query.range),
          0,
          map,
          req.body.effect
        )
        break
      case 'right':
        shurikenRight(
          parseInt(req.query.x),
          parseInt(req.query.y),
          parseInt(req.query.range),
          map,
          req.body.effect
        )
        break
      case 'left':
        shurikenLeft(
          parseInt(req.query.x),
          parseInt(req.query.y),
          parseInt(req.query.range),
          map,
          req.body.effect
        )
        break
    }
    Match.findByIdAndUpdate(
      req.body.matchID,
      { matchMap: map },
      { new: true },
      function (err, newmatch) {
        if (err) return res.status(500).end(err)
        return res.json(newmatch)
      }
    )
  })
})

router.patch('/explosion/:direction', function (req, res) {
  Match.findById(req.body.matchID).exec(function (err, match) {
    if (err) return res.status(500).end(err)
    let map = match.matchMap
    switch (req.params.direction) {
      case 'up':
        explosionUp(
          parseInt(req.query.x),
          parseInt(req.query.y),
          parseInt(req.query.range),
          map,
          req.body.effect
        )
        break
      case 'down':
        explosionDown(
          parseInt(req.query.x),
          parseInt(req.query.y),
          parseInt(req.query.range),
          map,
          req.body.effect
        )
        break
      case 'right':
        explosionRight(
          parseInt(req.query.x),
          parseInt(req.query.y),
          parseInt(req.query.range),
          map,
          req.body.effect
        )
        break
      case 'left':
        explosionLeft(
          parseInt(req.query.x),
          parseInt(req.query.y),
          parseInt(req.query.range),
          map,
          req.body.effect
        )
        break
    }
    Match.findByIdAndUpdate(
      req.body.matchID,
      { matchMap: map },
      { new: true },
      function (err, newmatch) {
        if (err) return res.status(500).end(err)
        return res.json(newmatch)
      }
    )
  })
})

router.patch('/move/:player', function (req, res) {
  Match.findById(req.body.matchID).exec(function (err, match) {
    if (err) return res.status(500).end(err)

    let map = match.matchMap

    cor1 = map.map[`cor${req.query.srcx},${req.query.srcy}`]
    cor2 = map.map[`cor${req.query.tarx},${req.query.tary}`]

    for (i = 0; i < match.matchNinjas.length; i++) {
      if (match.matchNinjas[i].displayName == req.params.player) {
        let newNinjas = match.matchNinjas
        newNinjas[i].x = req.query.tarx
        newNinjas[i].y = req.query.tary
        let index = cor1.players.findIndex(
          (player) => player.displayName === req.params.player
        )

        let player = cor1.players[index]
        if (player === undefined) {
          console.log(cor1.players)
        } else {
          cor1.players.splice(index, 1)
          cor2.players.push(player)
          map.map[`cor${req.query.srcx},${req.query.srcy}`] = cor1
          map.map[`cor${req.query.tarx},${req.query.tary}`] = cor2
        }

        Match.findByIdAndUpdate(
          req.body.matchID,
          { matchMap: map, matchNinjas: newNinjas },
          { new: true },
          function (err, newmatch) {
            if (err) return res.status(500).end(err)

            return res.json(newmatch)
          }
        )
      }
    }
    for (i = 0; i < match.matchMonsters.length; i++) {
      if (match.matchMonsters[i].displayName == req.params.player) {
        let newMonsters = match.matchMonsters
        newMonsters[i].x = req.query.tarx
        newMonsters[i].y = req.query.tary
        let index = cor1.players.findIndex(
          (player) => player.displayName === req.params.player
        )

        let player = cor1.players[index]
        if (player === undefined) {
          console.log(cor1.players)
        } else {
          cor1.players.splice(index, 1)
          cor2.players.push(player)
          map.map[`cor${req.query.srcx},${req.query.srcy}`] = cor1
          map.map[`cor${req.query.tarx},${req.query.tary}`] = cor2
        }

        Match.findByIdAndUpdate(
          req.body.matchID,
          { matchMap: map, matchMonsters: newMonsters },
          { new: true },
          function (err, newmatch) {
            if (err) return res.status(500).end(err)

            return res.json(newmatch)
          }
        )
      }
    }
  })
})

router.patch('/clear', function (req, res) {
  Match.findById(req.body.matchID).exec(function (err, match) {
    if (err) return res.status(500).end(err)

    let map = match.matchMap

    for (let cor in map.map) {
      map.map[cor].type = ['normal']
    }

    Match.findByIdAndUpdate(
      req.body.matchID,
      { matchMap: map },
      { new: true },
      function (err, newmatch) {
        if (err) return res.status(500).end(err)
        return res.json(newmatch)
      }
    )
  })
})

module.exports = router
