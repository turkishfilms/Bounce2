const express = require('express'),
    app = express(),
    p = process.env.PORT || 3007,
    server = app.listen(p, () => console.log(`No Freaking Way!! ${p}`))

app.use(express.static('public'))