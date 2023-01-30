import s from "./Filter.module.css"
import { useDispatch, useSelector } from "react-redux";
import { getByGenre, getDbGames, getVideogamesByAlp, getVideogamesByRate, resetFilters } from "../../redux/actions";

const Filter = ({sort, setSort, setInput, setPage}) => {
    const dispatch = useDispatch();
    const genr = useSelector(state => state.genres)

    const handleRating = (e) => {
        dispatch(getVideogamesByRate(e.target.value))
        setSort(!sort)
        setInput(1)
        setPage(1)
    };

    const handleAlp = (e) => {
        dispatch(getVideogamesByAlp(e.target.value))
        setSort(!sort)
        setInput(1)
        setPage(1)
    };

    const handleGenres = (e) => {
        dispatch(getByGenre(e.target.value))
        setInput(1)
        setPage(1)
    };

    const handleCreated = (e) => {
        dispatch(getDbGames(e.target.value))
        setInput(1)
        setPage(1)
    };

    const handleReset = () => {
        dispatch(resetFilters())
        setInput(1)
        setPage(1)
    }

    return (
        <div className={s.container}>
            <div className={s.filters}>
                <div>
                    <label>Sort</label>
                    <select name="Sort" id="Sort" onChange={handleAlp}>
                        <option value="sorting">-</option>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                    </select>
                </div>
                <div>
                    <label>Rating</label>
                    <select name="Rating" id="Rating" onChange={handleRating}>
                        <option value="rating">-</option>
                        <option value="higer">major to minor</option>
                        <option value="lower">minor to major</option>
                    </select>
                </div>
                <div>
                    <label>Genres</label>
                    <select name="Genres" id="Genres" onChange={handleGenres}>
                        <option>genres</option>
                        {genr?.map((gen, i) => <option key={i} value={gen.name}>{gen.name}</option>)}
                    </select>
                </div>
                <div>
                    <label>Created</label>
                    <select name="created" id="created" onChange={handleCreated}>
                        <option value="all">ALL</option>
                        <option value="api">API</option>
                        <option value="db">CREATED</option>
                    </select>
                </div>
                <div>
                    <button onClick={handleReset}>RESET FILTERS</button>
                </div>
            </div>
        </div>
    )
};

export default Filter;