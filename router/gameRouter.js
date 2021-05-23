const express = require("express");
const router = express.Router();
const uuidv4 = require("uuid").v4;

let games = [
    {
        id: "adowb1b3bb",
        game: "League of Legends",
        description: "League of Legends is a team-based game with over 140 champions to make epic plays with."
    },
    {
        id: "kd7b9ks2nda",
        game: "PlayerUnknown's Battlegrounds",
        description: "PLAYERUNKNOWN'S BATTLEGROUNDS is a last-man-standing shooter being developed with community feedback."
    }
]

router.get("/get-all-games", function (req, res) {
    res.json({ payload: games });
});

router.get("/get-game-by-id/:id", function (req, res) {
    const id = req.params.id

    let index = games.findIndex((index) => {
        return index.id === id
    })

    if (index === -1) { res.status(404).json({ message: "The game with the id does not exist, please check id" }); }
    else {
        res.json({ payload: games[index] });
    }
});

//Spaces are simply replaced by "%20" in url

router.get("/get-game-by-name/:game", function (req, res) {
    const name = req.params.game

    let index = games.findIndex((index) => {
        return index.game === name
    })

    if (index === -1) { res.status(404).json({ message: "The game with the id does not exist, please check id" }); }
    else {
        res.json({ payload: games[index] });
    }
});

router.post("/create-new-game", function (req, res) {
    const { game, description } = req.body;
    console.log(game)
    if (game === '' || description === '' || game === undefined || description === undefined) { res.json({ message: "cannot leave text area blank" }); }

    else {
        let exist = false;
        games.forEach((item) => {
            if (item.game === game) {
                exist = true
            }
        })

        if (exist) { res.json({ message: "Game already exists, cannot add game" }); }
        else {

            let newGameObj = { id: uuidv4(), game, description };
            games.push(newGameObj);
            res.json({ payload: games });
        }
    }
});

router.put("/update-game/:id", function (req, res) {
    const { id } = req.params;
    const { game } = req.body;
    const { description } = req.body;

    let foundProductIndex = games.findIndex((item) => {
        return item.id === id;
    });
    if (foundProductIndex === -1) {
        res.status(404).json({ message: "game not found, cannot update" });
    } else {
        if (game === '' || game === undefined) { } else { games[foundProductIndex].game = game; }
        if (description === '' || description === undefined) { } else { games[foundProductIndex].description = description; }
        res.json({ payload: games });
    }
});

router.delete("/delete-product-by-id/:id", function (req, res) {
    const { id } = req.params;
    let foundProductIndex = games.findIndex((item) => {
        return item.id === id;
    });
    if (foundProductIndex === -1) {
        res.status(404).json({ message: "game not found, cannot delete" });
    } else {
        games.splice(foundProductIndex, 1);
        res.json({ payload: games });
    }
});

module.exports = router;
