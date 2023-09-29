import style from './Card.module.css';
import { Link } from 'react-router-dom';

const Card = ({name, img, genres, id, rate}) => {
    return(
        <div className={style.container}>
            <Link className={ style.container_link } to={`/detail/${id}`}>
                <div className={style.card}>
                    <img className={style.img} src={img} alt={name} />
                    <h2 className={style.name}>{name}</h2>
                    <span className={style.rate}>⭐{rate}</span>
                    <div className={style.genrebox}>
                        {
                            genres.length > 7 ?
                            genres?.slice(0, 7).map((genre) => (
                                <div className={style.container_genre}>
                                    <span className={style.genre}>
                                        {genre}
                                    </span>
                                </div>))
                            : genres?.map((genre) => (
                                <div className={style.container_genre}>
                                    <span className={style.genre}>
                                        {genre}
                                    </span>
                                </div>))
                        }
                    </div>
                </div>
            </Link>
            </div>
        
    )
};

export default Card;