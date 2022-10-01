import axios from "axios";

const KEY = "AIzaSyCZW-7Vju3RsOTKln-rKy0DMc5E87P7Iu4";

export default axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3",
    params: {
        part: "snippet",
        type: "video",
        maxResults: 5,
        key: KEY
    },
})