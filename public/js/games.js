
let games = [

    {
        "name": "Drive Mad",
        "type": "local",
        "src": "./game-files/drivemad/index.html",
        "image": "./game-files/img/drivemad.png"
    },
    {
        "name": "Poly Track",
        "type": "local",
        "src": "./game-files/polytack/index.html",
        "image": "./game-files/img/polytrack.png"
    },
    {
        "name": "Doge Miner",
        "type": "local",
        "src": "./game-files/DogeMiner/index.html",
        "image": "./game-files/img/DogeMiner.png"
    },
    {
        "name": "BasketBros",
        "type": "local",
        "src": "./game-files/baskbros-io/index.html",
        "image": "./game-files/img/basketbros.png"
    },
    {
        "name": "Funny Shooter 2",
        "type": "local",
        "src": "./game-files/funnyshooter2/index.html",
        "image": "./game-files/img/funnyshooter2.jpg"
    },
    {
        "name": "Learn to Fly",
        "type": "flash",
        "src": "./game-files/flash-files/ltf.swf",
        "image": "./game-files/img/learntofly.webp"
    },
    {
        "name": "Learn to Fly 2",
        "type": "flash",
        "src": "./game-files/flash-files/ltf2.swf",
        "image": "./game-files/img/learntofly2.jpg"
    },
    {
        "name": "Learn to Fly 3",
        "type": "flash",
        "src": "./game-files/flash-files/ltf3.swf",
        "image": "./game-files/img/learntofly3.png"
    },
    {
        "name": "Duck Life",
        "type": "flash",
        "src": "./game-files/flash-files/dl.swf",
        "image": "./game-files/img/ducklife.png"
    },
    {
        "name": "Duck Life 2",
        "type": "flash",
        "src": "./game-files/flash-files/dl2.swf",
        "image": "./game-files/img/ducklife2.png"
    },
    {
        "name": "Duck Life 3",
        "type": "flash",
        "src": "./game-files/flash-files/dl3.swf",
        "image": "./game-files/img/ducklife3.png"
    },
    {
        "name": "Duck Life 4",
        "type": "flash",
        "src": "./game-files/flash-files/dl4.swf",
        "image": "./game-files/img/ducklife4.png"
    },
    {
        "name": "Bloons Tower Defense",
        "type": "flash",
        "src": "./game-files/flash-files/btd.swf",
        "image": "./game-files/img/btd.png"
    },
    {
        "name": "Bloons Tower Defense 2",
        "type": "flash",
        "src": "./game-files/flash-files/btd2.swf",
        "image": "./game-files/img/btd2.png"
    },
    {
        "name": "Bloons Tower Defense 3",
        "type": "flash",
        "src": "./game-files/flash-files/btd3.swf",
        "image": "./game-files/img/btd3.png"
    },
    {
        "name": "Papas Burgeria",
        "type": "flash",
        "src": "./game-files/flash-files/papaburger.swf",
        "image": "./game-files/img/papaburger.png"
    },
    {
        "name": "Papas Cupcakeria",
        "type": "flash",
        "src": "./game-files/flash-files/papacupcake.swf",
        "image": "./game-files/img/papacupcake.png"
    },
    {
        "name": "Papas Freezeria",
        "type": "flash",
        "src": "./game-files/flash-files/papafreeze.swf",
        "image": "./game-files/img/papafreeze.png"
    },
    {
        "name": "Papas Hot Doggeria",
        "type": "flash",
        "src": "./game-files/flash-files/papahotdog.swf",
        "image": "./game-files/img/papahotdog.png"
    },
    {
        "name": "Papas Pancakeria",
        "type": "flash",
        "src": "./game-files/flash-files/papapancake.swf",
        "image": "./game-files/img/papapancake.png"
    },
    {
        "name": "Papas Pizzaeria",
        "type": "flash",
        "src": "./game-files/flash-files/papapizza.swf",
        "image": "./game-files/img/papapizza.png"
    },
    {
        "name": "Papas Taco Mia",
        "type": "flash",
        "src": "./game-files/flash-files/papataco.swf",
        "image": "./game-files/img/papataco.png"
    },
    {
        "name": "Papas Wingeria",
        "type": "flash",
        "src": "./game-files/flash-files/papawing.swf",
        "image": "./game-files/img/papawing.png"
    },
]
document.addEventListener("DOMContentLoaded", () => {
    games.forEach(game => {
        appendGame(game)
    });
})

function appendGame(e) {
    let game_card = document.createElement("div");
    game_card.className = "game-card";
    game_card.setAttribute("onclick", `NavigateToFrame("${e.src}")`)
    let gameImg = document.createElement("img");
    gameImg.src = e.image;
    game_card.appendChild(gameImg);
    let game_title = document.createElement("p");
    game_title.innerHTML = `<strong>${e.name}</strong>`;
    game_card.appendChild(game_title);
    document.querySelector(".games-list").appendChild(game_card);
}

console.log("helo")
console.log("xineese is gay")