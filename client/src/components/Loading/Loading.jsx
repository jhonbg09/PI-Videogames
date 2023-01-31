import s from "./Loading.module.css"
import loader from "../../assets/loader.gif"

const Loading = () => {
    return (
        <div className={s.loaderc}>
            <img className={s.gif} src={loader} alt="loader"/>
        </div>
    )
}

export default Loading