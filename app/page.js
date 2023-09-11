"use client"
import { useState } from "react";
import axios from "axios";
export default function home() {
    const [userName, setUserName] = useState(null)
    const [followers, setFollowers] = useState([])
    const [data, setData] = useState(null)
    const onChangeHandler = (e) => {
        setUserName(e.target.value)
    }
    const onClickHandler = async () => {
        setFollowers([])

        let response = await fetch(`https://api.github.com/users/${userName}`)
        response = await response.json()
        setData(response)
        console.log(response);

    }
    const onFollowerHandler = async () => {
        let response = await axios .get(data.followers_url)
        console.log("response", response.data);
        setFollowers(response.data)

    }
    return (
        <div>
            <div className="User-data">
                <h1>Get User Data</h1>
                <label htmlFor="userName">Enter your Name:</label>
                <input type="text" onChange={onChangeHandler} />
                <button onClick={onClickHandler}>Get Data</button>
            </div> 
            <div className="follow">

            {data &&
                <>
                
                    <h1>Github user</h1>
                    <img style={{borderRadius:"30px"}} src={data.avatar_url} width={150} alt="" /><br />
                    <span><b>Bio:</b>   {data.bio} - {data.followers}</span><hr style={{marginLeft:"420px", marginRight:"420px"}}/><br />
                    <button className="Button" onClick={onFollowerHandler}>Get followers</button>
                </>
            }
            </div><br />
            {followers.length >= 1 &&

            <table className="Table">
                <tr>
                    <th><h4>The User Id</h4> </th>
                    <th><h4>The User Image</h4></th>
                    <th><h4>The User Name</h4></th>
                    <th><h4>The Type</h4></th>
                </tr>
                {followers.map((element) => {
                    return (
                        <tr>
                            <td>{element.id}</td>
                            <td> <img style={{borderRadius:"30px"}} src={element.avatar_url} width={80} alt="" /></td>
                            <td>{element.login}</td>
                            <td>{element.type}</td>
                        </tr>
                    )
                })}

            </table>
}
        </div>  )
}