import axios from 'axios';

// const fetcher = (url: string) => axios.get(url, { withCredentials: true }).then((response) => response.data);
const fetcher = (url: string) => axios.get(url, { withCredentials: true }).then((response) => {
    return response.data;
});

export default fetcher;
