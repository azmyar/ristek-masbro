import {useState, useEffect} from 'react'
import axios from 'axios'

export const Posts = (source) => {

    // Get bros post
    const[brospost,Post] = useState("");

    setTimeout( async function () {
        const active = source
        const postsGet = await axios.get(`http://localhost:8080/api/post/bros?username=${active}`); // render bros only posts
        // const postsGet = await axios.get(`http://localhost:8080/api/post`); // render every posts
        Post(postsGet.data.reverse());
    }, 500)

    // Handle Change for Edit Post

    const [post, setPost] = useState ({})

    const handleChange = ({currentTarget: input}) => {
        setPost(input.value)
    }

    const output = [];

    // Edit Post

    const [showDivs, setShowDivs] = useState(false);
    const showEditPrompt = async() => {
        setShowDivs(!showDivs);
    }

    const saveID = async(id) => {
        sessionStorage.setItem('editID', id)
    }

    const editClick = async() => {
        await axios.post(`http://localhost:8080/api/post/edit`, {_id:sessionStorage.getItem('editID'),post})
        sessionStorage.removeItem('editID')
        setShowDivs(!showDivs)
    };

    // Delete Post
    const deleteClick = async(id) => {
        await axios.post(`http://localhost:8080/api/post/delete`, {_id:id})
    };


    // Return
    try{
        for (let i = 0; i < brospost.length; i++) {

            const bestBroValidation = sessionStorage.getItem("bestbroingme").includes(brospost[i].username)

                    if (brospost[i].bestbro && !bestBroValidation){}
                    else{

                        if (brospost[i].bestbro){

                            output.push(
                                <div>
                                <div className="login">
                                        {brospost[i].post}
                                        {brospost[i].date}
                                        {brospost[i].username}
                                </div>
                                <div>this is private</div>
                                </div>

                            )}else {
                                output.push(
                                <div className="login">
                                        {brospost[i].post}
                                        {brospost[i].date}
                                        {brospost[i].username}
                                </div>)
                            
                }}
        }
        return (
        <div>
                <div>
                    {showDivs && (
                    <div>
                        <input onChange={handleChange}></input>
                        <button onClick= {editClick}>
                        Done
                        </button>
                    </div>)}
                </div>

            {output}
        </div>
        )
    } catch (error) {
        console.log(error)
    }
}