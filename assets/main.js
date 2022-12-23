/* Storing the API url in a constant. */
const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UC55-mxUj5Nj3niXFReG44OQ&part=snippet%2Cid&order=date&maxResults=9';

/* Checking if the element with the id 'content' exists. If it does, it will store it in the variable
'content'. If it doesn't, it will store null in the variable 'content'. */
const content = null || document.getElementById('content');

/* A constant that is storing the method and the headers of the API. */
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'd895307af4msh96c6ad40b889735p120d2fjsn55fcd09a4dca',
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  }
};

/* A function that is fetching data from the API. */
async function fetchData(urlApi) {
  const response = await fetch(urlApi, options);
  const data = await response.json();
  return data;
}


/* A function that is executed automatically when the file is executed. */
// Función que se reproduce de manera automatica al comenzar a ejecutarse el file
(async () => {
  try {
    const videos = await fetchData(API);
    let view = `
    ${videos.items.map(video => `
      <div class="group relative">
        <div
          class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
          <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
        </div>
        <div class="mt-4 flex justify-between">
          <h3 class="text-sm text-gray-700">
            <span aria-hidden="true" class="absolute inset-0"></span>
            ${video.snippet.title}
          </h3>
        </div>
      </div>
    `).slice(0,4).join('')}

    `;
    content.innerHTML = view;
  } catch (error) {
    console.log(error);
  }
})();
