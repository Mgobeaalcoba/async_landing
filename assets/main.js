/* A JavaScript function that is fetching data from the YouTube API. */
const fetch = require('node-fetch');

const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UC55-mxUj5Nj3niXFReG44OQ&part=snippet%2Cid&order=date&maxResults=9';

const content = null || document.getElementById('content')

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'd895307af4msh96c6ad40b889735p120d2fjsn55fcd09a4dca',
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  }
};

async function fetchData (urlAPI) {
    const response = await fetch(urlAPI, options);
    const data = await response.json();
    return data;
}

// función que se llama a si misma para consultar la API: 

(async () => {
    try {
        const videos = await fetchData(API);
        // Template para insertar el contenido de la API en mi landing:
        // Tengo que traer los items de la API y "mapearlos" para transformarlos a mi template HTML
        let view = `
        ${videos.items.map(video => `
        <div class="group relative">
            <div
                class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                <img src="${video.snippet.thumbnail.high.url}" alt="${video.snippet.description}" class="w-full">
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