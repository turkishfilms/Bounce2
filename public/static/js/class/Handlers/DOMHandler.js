class DOMHandler {
    constructor({ } = {}) {
    }

    addDiv = (id) => { //FIXME
        const scoreDiv = document.createElement("p")
        scoreDiv.id = id
        scoreDiv.appendChild(document.createTextNode(`0\n`))
        document.body.prepend(scoreDiv)
    }

    updateScoreDisplay(id, score, highscore) {
        document.getElementById(`Game ${id} score`).textContent = `Points: ${score}\n`
        document.getElementById(`Game ${id} highscore`).textContent = `Highscore: ${highscore}\n`
    }

}