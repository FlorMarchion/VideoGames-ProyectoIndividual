import React from "react";
import styles from './styles/Loading.module.css'

const Loading = () => {

    const {
        loader,
        circles,
        one,
        two,
        three,
        pacman,
        top,
        bottom,
        left,
        eye } = styles;

    return (
        <div className={loader}>
            <div className={circles}>
                <span className={one}></span>
                <span className={two}></span>
                <span className={three}></span>
            </div>
            <div className={pacman}>
                <span className={top}></span>
                <span className={bottom}></span>
                <span className={left}></span>
                <div className={eye}></div>
            </div>
        </div>
    )
}
export default Loading;