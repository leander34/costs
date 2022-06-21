import React from "react";
import loading from '../../img/loading.svg'
import './Loading.css'

export default function Loading() {
    return (
        <div className="loader_container">
            <img className="loader" src={loading} alt="Loading" />
        </div>
    )
}