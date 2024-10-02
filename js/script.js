// Get Categories Items

const getCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => showCategories(data.categories));
}

const getVideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => showVideos(data.videos));
}

const showCategories = (data) => {
    const categoryContainer = document.getElementById('catergories');
    data.forEach(category => {
        const div = document.createElement('div');
        categoryContainer.classList = 'flex justify-center gap-4'
        div.innerHTML = `
        <button class ="btn">${category.category}</button>
        `
        categoryContainer.appendChild(div);

    })

}

const showVideos = (videos) => {
    const cardContainer = document.getElementById('car-container');
    videos.forEach(video => {
        console.log(video)
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="card card-compact bg-base-100 pb-4">
                <figure class="h-[250px] relative">
                    <img class="h-full w-full object-cover" src=${video.thumbnail} alt="thumbnail" />
                </figure>
                ${
                    video.others.posted_date ? `<p class="absolute bg-black p-2 rounded-md text-white top-4 right-5">${video.others.posted_date}</p>` : ""
                }
                
                <div class="ml-3 mt-4">
                    <h2 class="card-title">${video.title}</h2>
                    <div class="flex items-center space-x-2">
                        <p>${video.authors[0].profile_name}</p>
                        ${video.authors[0].verified ? `<img class="h-4" src="../assets/verified.png" alt="veryfied">` : ""}
                    </div>
                    <p>${video.others.views} Views</p>
                </div>
            </div>
        `

        cardContainer.appendChild(div);
    })

}





getCategories();
getVideos();