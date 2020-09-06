import axios from 'axios';

const api = async ({ path = '', requestType = 'GET', requestBody = {} }) => {
  try {
    const apiEndpoint = `${process.env.REACT_APP_API_ENDPOINT}/${path}`;

    if (requestType === 'GET') {
      const { data } = await axios.get(apiEndpoint);
      return data;
    }

    if (requestType === 'POST') {
      const tokenData = await axios.post(process.env.REACT_APP_API_TOKEN, {});

      if (tokenData.data) {
        requestBody['token'] = tokenData.data.token;

        const { data } = await axios.post(apiEndpoint, requestBody);
        return data;
      }
    }

    return [];
  } catch (err) {
    console.log(err);
    return [];
  }
};

export default api;
