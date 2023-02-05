import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: '31877726-de77d5eff1f0b572f2213dfa6',
    per_page: 12,
    image_type: 'photo',
    orientation: 'horizontal',
  },
});

async function getPictures(search, page = 1) {
  const { data } = await instance.get('/', {
    params: {
      q: search,
      page,
    },
  });
  return data;
}

export default getPictures;
