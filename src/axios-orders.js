import axios from 'axios';

const instance=axios.create({
    // baseURL:'https://burger-app-d6eda.firebaseio.com/'
    baseURL:'https://react-my-burger-4d4cc.firebaseio.com/'
});

export default instance;