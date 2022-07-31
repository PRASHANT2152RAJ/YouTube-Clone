const videoCardContainer = document.querySelector('.video-container');  // make video container

// for API go to google cloud free trial...then go to console then go to youtube clone ..click on new project then edit the project name as youtube-clone then click on create..open side bar and navigate to API section then go to API & Services then open library then open youtube V3 library..then enable this library..go to credentials then go to create credentials(to create API keys)..then copy this API keys..go to edit icon of created API...(here make sure application restriction is none,otherwise our API will not accept requests from local IP and also in api restriction dont restrict key should be selected)..then save it..lastly paste the API key on js file.
let api_key = "AIzaSyA_EaqQV30dCqm504kQsn_fV69YJjbeGoI"; 

// for link of video - go to youtube documentation and open video lists...then scrool down to reach https request then copy this link and paste on js file
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http ="https://www.googleapis.com/youtube/v3/channels?";

// use fetch function to make request , use new URLSearchParams to add parameters after link
fetch (video_http + new URLSearchParams({   
    key: api_key,       // add these parameters
    part : 'snippet',   // set part param to snippet so ,we will get video related data  
    chart : 'mostPopular',             // set chart param to mostpopular,to fetch popular videos        
    maxResults: 50,      // set this to 1 for now ,so we can understand the data structure easily..actually this is the number of videos shown in home page ...
    regionCode: 'IN',    // regionCode is to specify from which region we are fetching data...here IN means INDIA...

}))
.then(res => res.json())
.then(data => {
    // console.log(data);
    data.items.forEach(item => {
        getChannelIcon(item);
        
    })
}).catch(err => console.log(err));   // use catch block to handle error also

const getChannelIcon = (video_data) => {         //create channelicon function to fetch channelicon seperately
    fetch(channel_http + new URLSearchParams({           //  use fetch function again
        key: api_key,
        part:'snippet',
        id: video_data.snippet.channelId    // use give same param again but in id pass videos again
    }))   
    .then(res => res.json())
    .then(data =>{
        // console.log(data);
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        console.log(video_data);
        makeVideoCard(video_data);
    })
}

const makeVideoCard = (data) => {  // make -makeVideoCard function
    // use innerHTML method to attach elements and delete image path and title ,channel name from here...and add fetched data from google..this way we make dynamic html elements from js...now add click events
    videoCardContainer.innerHTML += `                 
    <div class="video" onclick= "Location.href =https://www.youtube.com/watch?v=${data.id}">
            <img src="${data.snippet.thumbnails.high.url}" class = "thumbnail" alt="">
            <div class="content">
                <img src="${data.channelThumbnail}" class ="channel-icon" alt=""> 
                <div class="info">
                    <h4 class = "title">${data.snippet.title}</h4>
                    <p class="channel-name">${data.snippet.channelTitile}</p>
                </div>
            </div>
        </div>

    `;

}

//search bar

const searchInput = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");
let searchLink = "https://www.youtube.com/results?search_query=";  //deleted text after query params

// FUNCTION OF SEARCHING IN YOUTUBE ...

searchBtn.addEventListener('click', () =>{
    if(searchInput.value.length){
        location.href = searchLink + searchInput.value;
    }
})