import axios from 'axios';

const API_KEY = '40580814-1f1887412e50f82259cec363c';
const BASE_URL = 'https://pixabay.com/api/';

export const requestImagesByQuery = async (searchQuery, page = 1) => {
  const url = `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  const response = await axios.get(url);
  return response.data;
};
