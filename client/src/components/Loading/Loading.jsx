import style from "./Loading.module.css"
import loader from "../../assets/sticker.webp"

const Loading = () => {
    return (
        <div className={style.loaderdiv}>
            <img className={style.gif} src={loader} alt="loader"/>
        </div>
    )
}

export default Loading