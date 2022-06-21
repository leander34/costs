import React, { useState, useEffect } from "react";
import './Message.css'
import PropTypes from 'prop-types'

export default function Message({ msg, type }) {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if(!msg) {
          setVisible(false)
          return
        }

        setVisible(true)

        const timer = setTimeout(() => {
            setVisible(false)
        }, 3000)

        return () => clearTimeout(timer)
    }, [msg])
    return (
        <>
        {visible && (<div className={`message ${type}`}>{msg}</div>)}
        </>
    )
}

Message.propTypes = {
    msg: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}