console.log('welcome');

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar')
let gif = document.getElementById('gif')
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSong = document.getElementById('masterSong');
// console.log(songItems);

let songs = [
    {
        songName: 'Pehle-bhi-main',
        filePath: 'songs/1.mp3',
        coverPath: "covers/1.jpg"
    },
    {
        songName: 'Hua-main',
        filePath: 'songs/2.mp3',
        coverPath: "covers/2.jpg"
    },
    {
        songName: 'chaleyan',
        filePath: 'songs/3.mp3',
        coverPath: "covers/3.jpg"
    },

    {
        songName: 'jhume-jo-pathan',
        filePath: 'songs/4.mp3',
        coverPath: "covers/4.jpg"
    },
    // {
    //     songName: 'one dance',
    //     filePath: 'songs/5.mp3',
    //     coverPath: "covers/5.jpg"
    // },

]

songItems.forEach((element, i) => {
    // console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})


masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})


audioElement.addEventListener('timeupdate', () => {
    console.log('timeupdate');
    //update seek bar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100)
    console.log(progress);
    myProgressBar.value = progress;

})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
})


const makeAllPlays = () => {

    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause')
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSong.innerText = songs[songIndex - 1].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 3) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSong.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSong.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})


