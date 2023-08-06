import axios from 'axios';

const getVideos = async() => {
    try {
        const res = await axios.get('http://localhost:3001/videos')
        return { success: true, data: res.data}
    } catch (error) {
        return {success: false}
    }
};

const getVideo = async(id)=>{
    try {
        const res = await axios.get(`http://localhost:3001/videos/${id}`);
        return { success: true, data: res.data}
    } catch (error) {
        return {success: false}
    }
};

const getAuthors = async ()=> {
    try {
        const res = await axios.get('http://localhost:3001/authors');
        return { success: true, data: res.data}
    } catch (error) {
        return {success: false}
    }
};

const getAuthor = async (id)=> {
    try {
        const res = await axios.get(`http://localhost:3001/authors/${id}`);
        return { success: true, data: res.data}
    } catch (error) {
        return {success: false}
    }
};

const getVideoLikes = async() => {
    try {
        const res = await axios.get('http://localhost:3001/video_likes')
        return { success: true, data: res.data}
    } catch (error) {
        return {success: false}
    }
}

const postVideoLike = async(value) => {
    try {
       const res =  await axios.post('http://localhost:3001/video_likes', value)
       return {success: true, data: res.data}
    } catch (error) {
        return {success: false}
    }
}

const deleteVideoLike = async(id) => {
    try {
        const res = await axios.delete(`http://localhost:3001/video_likes/${id}`)
        return {success: true, data: res.data}
    } catch (error) {
        return {success: false}
    }
}

const editLike = async(id, body) =>{
    try {
        const res = await axios.put(`http://localhost:3001/video_likes/${id}`, body)
        return {success: true, data: res.data}
    } catch (error) {
        return {success: false}
    }
}

const getFollowers = async() => {
    try {
        const res = await axios.get('http://localhost:3001/followers')
        return { success: true, data: res.data}
    } catch (error) {
        return {success: false}
    }
}

const postFollower = async(value) => {
    try {
        const res = await axios.post('http://localhost:3001/followers', value)
        return res
    } catch (error) {
        
    }
}

const deleteFollower = async(id) => {
    try {
        await axios.delete(`http://localhost:3001/followers/${id}`)
    } catch (error) {
        
    }
}

const getComments = async() => {
    try {
        const res = await axios.get('http://localhost:3001/comments');
        return({success: true, data: res.data})

    } catch (error) {
        return {success: false}
    }
}

const addComment = async(value) => {
    try {
        const res = await axios.post('http://localhost:3001/comments', value);
        return {success: true, data: res.data}
    } catch (error) {
        return {success: false}
    }

}



export { getVideos, getVideo, getAuthors, getAuthor, getVideoLikes, getFollowers, postVideoLike, 
    deleteVideoLike, postFollower, deleteFollower, editLike, getComments, addComment  };