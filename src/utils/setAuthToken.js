import axios from '../api/axios';

const setAuthToken = async token => {
  if (token) {
    //set default global config for axios
    await (axios.defaults.headers.common['x-auth-token'] = token);
  } else {
    console.log("deleted");
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
