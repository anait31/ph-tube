// Get Categories Items

const getCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => showCategories(data.categories));
}

const getVideos = (searchText = "") => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(res => res.json())
        .then(data => showVideos(data.videos));
}

const loadCategories = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {
            const buttons = document.getElementsByClassName('buttonsActive');

            for (let button of buttons) {
                button.classList.remove('active');
            }

            const activeBtn = document.getElementById(`btn-${id}`);
            activeBtn.classList.add('active');
            showVideos(data.category)
        });
}

const loadVideoDetails = async (vidoeId) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${vidoeId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.video)
}

const displayDetails = (video) => {

    document.getElementById('customModal').showModal();

    const showDetails = document.getElementById('show-details');
        showDetails.innerHTML = `
        <img class="w-full mb-3" src=${video.thumbnail} />
        <p>${video.description}</p>
        
        `
}


const showCategories = (data) => {
    const categoryContainer = document.getElementById('catergories');
    data.forEach(category => {
        const div = document.createElement('div');
        categoryContainer.classList = 'flex justify-center gap-4'
        div.innerHTML = `
        <button id="btn-${category.category_id}" " onclick="loadCategories(${category.category_id})" class ="btn buttonsActive">${category.category}</button>
        `
        categoryContainer.appendChild(div);

        

    })

}

const showVideos = (videos) => {
    const cardContainer = document.getElementById('car-container');
    cardContainer.innerHTML = "";
    if (!videos.length) {
        cardContainer.innerHTML = `
        <div class="h-[400px] w-full col-span-4  text-center">
            <img class=" w-[250px] my-12 mx-auto" src="../assets/Icon.png" />
            <div class="text-center mb-6 text-3xl font-bold">
                <h2>Oops!! Sorry, There is no</h2>
                <h2>content here<h2/>
            <div/>
        </div>
        `;
        return
    }
    videos.forEach(video => {
        // console.log(video)
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="card card-compact bg-base-100 pb-4">
                <figure class="h-[250px] relative">
                    <img class="h-full w-full object-cover" src=${video.thumbnail} alt="thumbnail" />
                </figure>
                ${video.others.posted_date ? `<p class="absolute bg-black p-2 rounded-md text-white top-4 right-5">${video.others.posted_date}</p>` : ""
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
                <button onclick="loadVideoDetails('${video?.video_id}')" class="btn btn-sm ml-3 btn-error text-white">Details</button>
        `

        cardContainer.appendChild(div);
    })

}



document.getElementById('search-input').addEventListener('keyup', (e) => {
    getVideos(e.target.value);
})

getCategories();
getVideos();