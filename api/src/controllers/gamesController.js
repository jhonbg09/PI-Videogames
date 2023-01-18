const {Videogame, Genre} = require("../db");
const {Op} = require("sequelize");
const { API_KEY} = process.env;
const axios = require("axios");

const getGames = async () => {
    try {
        let apiurls = [];
        for(let i = 1; i <= 5; i++) {
            apiurls = [...apiurls, `https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`]
        };
        let api = apiurls.map((url)=> axios.get(url));
        api = await Promise.all(api);
        api = api?.map((response) => response.data.results).flat();
        api = api?.map((game) => {
            return {
                id: game.id,
                name: game.name,
                genres: game.genres?.map((gen) => gen.name),
                plataforms: game.platfoms?.map((plat)=> plat.platform.name),
                released: game.released,
                img: game.background_image,
                rating: game.rating,
            };
        });
        let gamesdb = await Videogame.findAll({
            include: {
                model: Genre,
                attributes:  ["name"],
                through: {
                    attributes: [],
                },
            },
        });
        gamesdb = gamesdb?.map((game)=> {
            return {
                id: game.id,
                name: game.name,
                genres: game.genres?.map((gen) => gen.name),
                plataforms: game.platfoms,
                released: game.released,
                img: game.background_image,
                rating: game.rating,
                description: game.description,
            };
        });

        return [...api, ...gamesdb];
    } catch (error) {
        throw new Error("Cannot get the games");
    };
};

const findGameById = async (id) => {
    try {
        const allGames = await getGames();
        const filterGame = allGames.filter(game => game.id == id);
        if (filterGame.length > 0) {
            return filterGame;
        } else {
            throw new Error(`cannot find the game by ID ${id}`);
        }
    } catch (error) {
        throw new Error(error);
    }
};

const findGamesByQuery = async (name) => {
    try {
        let fetchapidb = [];
        //busco los 15 resultados en la api
        let api = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);
        api = api.data.results;
        if(api.length) {
            api = api.splice(0,15);
            
            api = api?.map((game) => {
                return {
                    id: game.id,
                    name: game.name,
                    genres: game.genres?.map((gen) => gen.name),
                    plataforms: game.platfoms?.map((plat)=> plat.platform.name),
                    released: game.released,
                    img: game.background_image,
                    rating: game.rating,
                    description: game.description,
                };
            });
        };
        //ahora con la database local
        let results = await Videogame.findAll({
            where:{
                name: { [Op.iLike]: `%${name}%`},
            },
            include: {
                model: Genre,
                attributes: ["name"],
                through: {
                    attributes: [],
                },
            },
        });
        if(results.length) {
            results = results.map((game) => {
                return {
                    id: game.id,
                    name: game.name,
                    genres: game.genres?.map((gen) => gen.name),
                    plataforms: game.platfoms,
                    released: game.released,
                    img: game.background_image,
                    rating: game.rating,
                    description: game.description,
                };
            });
        };

        fetchapidb = [...api, ...results];
        return fetchapidb;
    } catch (error) {
        throw new Error(error);
    };
};

const createGame = async (name, description, released, rating, genres, plataforms, img) => {
    try {
        let [game, boolean] = await Videogame.findOrCreate({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`,
                },
            },
            defaults: {
                name,
                description,
                released,
                rating,
                plataforms,
                img,
            }
        });
        if(!boolean) throw new Error(error);

        let gamegen = await Genre.findAll({
            where: {
                name: genres,
            }
        });
        
        game.addGenre(gamegen);

        return "Game created :)";
    } catch (error) {
        throw new Error("failed to create game")
    }
};

module.exports = {
    createGame,
    getGames,
    findGamesByQuery,
    findGameById
}