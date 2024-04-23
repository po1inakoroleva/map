import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

const geocodingService = {
  async geocodeAddress(address: string) {
    try {
      const response: AxiosResponse = await axios.get(`${API_BASE_URL}/${encodeURIComponent(address)}.json`, {
        params: {
          access_token: process.env.REACT_APP_MAPBOX_TOKEN,
          types: 'address',
        },
      });
      return response.data.features;
    } catch (error) {
      throw new Error('Ошибка при выполнении запроса геокодирования');
    }
  },
};

export default geocodingService;
