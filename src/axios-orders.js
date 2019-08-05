import axios from 'axios';

const instance=axios.create({
    baseURL:'https://burger-app-d6eda.firebaseio.com/'
});

export default instance;