import axios from 'axios';

const getVideos = async() => {
    try {
        const res = await axios.get('http://localhost:3000/videos')
        return(res.data)
    } catch (error) {
        
    }
};

const getVideo = async(id)=>{
    try {
        const res = await axios.get(`http://localhost:3000/videos/${id}`);
        return res.data
    } catch (error) {
        
    }
}

export { getVideos, getVideo };