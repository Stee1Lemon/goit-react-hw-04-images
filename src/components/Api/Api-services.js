const BASE_URL = 'https://pixabay.com/api/';
const MY_KEY = '38609084-88594d1851ef50d5ff8367fa3';
const DEFAULT_SETTINGS = 'image_type=photo&orientation=horizontal&per_page=12';

export async function fetchImages(searchQuery, page) {
  const response = await fetch(
    `${BASE_URL}?key=${MY_KEY}&q=${searchQuery}&page=${page}&${DEFAULT_SETTINGS}`
  );
  const images = await response.json();
  return images;
}
