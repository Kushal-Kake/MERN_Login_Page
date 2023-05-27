import React, { useContext, useEffect, useState } from "react";
import { store } from "../App";
import { Navigate } from "react-router-dom";
import axios from "axios";
import icon from './man-avatar.jpg'
const Myprofile = () => {
    const [token, setToken] = useContext(store)
    const [data, setData] = useState(null)
    useEffect(() => {
        axios.get('http://localhost:5000/myprofile', {
            headers: {
                "Authorization": token
            }
        }).then(res => setData(res.data)).catch(err => console.log(err))
    }, [])
    if (!token) {
        return <Navigate to='/login' />
    }
    return (
        <div>
            {
                data &&
                <center>
                    <form>
                        <img src={icon} alt="icon" />  <br />
                        <h3>Welcome : {data.username}</h3> <br />
                        <button onClick={() => setToken(null)}>Logout</button>
                    </form>
                </center>
            }
        </div>
    )
}

export default Myprofile;