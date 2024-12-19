 const marvel = {
    render:() => {
        
        const urlAPI = 'https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=425691b7e8fe08c1980dd23332005825&hash=4c7e6de0477e01aa01088a42ee141725';
        const container = document.querySelector('#marvel-row');
        let contentHTML = '';

        fetch(urlAPI)
        .then(res => res.json())
        .then((json)=>{
            console.log(json, 'RES.JSON')
            for(const heroe of json.data.results){
                let urlHeroe = heroe.urls[0].url;
                contentHTML += `
                    <div class="col-md-4">
                        <a href="${urlHeroe}" target="_blank">
                            <img src="${heroe.thumbnail.path}.${heroe.thumbnail.extension}" alt="${heroe.name}" class="img-thumbnail">
                        </a>
                        <h3 class="title">${heroe.name}</h3>
                    </div>`;
            }
            container.innerHTML = contentHTML;

        })
    }
};

marvel.render();