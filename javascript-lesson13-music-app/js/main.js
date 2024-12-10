const audioElement = document.querySelector("audio");
const nextButton = document.querySelector(".player-next-btn");
const previousButton = document.querySelector(".player-previous-btn");
const playerButton = document.querySelector(".main-player-btn");
const playIcon = document.querySelector(".player-icon-play");
const pauseIcon = document.querySelector(".player-icon-pause");
const progress = document.querySelector(".player-progress");
const progressFilled = document.querySelector(".player-progress-filled");
const playerCurrentTime = document.querySelector(".player-time-current");
const playerDuration = document.querySelector(".player-time-duration");
const playerDisplay = document.querySelector(".player-info");
const playList = document.querySelector(".playlist");
const songContainer1 = document.getElementById("song-1");
const songContainer2 = document.getElementById("song-2");
const songContainer3 = document.getElementById("song-3");
const songContainer4 = document.getElementById("song-4");
const songContainer5 = document.getElementById("song-5");
const songPlayButton1 = document.getElementById("song-play-button-1");
const songPlayButton2 = document.getElementById("song-play-button-2");
const songPlayButton3 = document.getElementById("song-play-button-3");
const songPlayButton4 = document.getElementById("song-play-button-4");
const songPlayButton5 = document.getElementById("song-play-button-5");
const searchInput = document.querySelector("#search-input");

const songs = [
    "songs/Taylor Swift - Style.mp3",
    "songs/OneRepublic - Counting Stars.mp3",
    "songs/Justin Bieber - Sorry.mp3",
    "songs/Wiz Khalifa - See You Again ft. Charlie Puth.mp3",
    "songs/Maroon 5 - Sugar.mp3",
];

audioElement.src=songs[0];


window.addEventListener("load", () => {

    setTimes();

    audioElement.addEventListener("timeupdate", () => {
        setTimes();
        setPlayerDisplay();
        progressUpdate();
    });

    audioElement.addEventListener("ended", () => {
        playerButton.dataset.playing = "false";
        playIcon.classList.remove("hidden");
        pauseIcon.classList.add("hidden");
        progressFilled.style.flexBasis = "0%";
        nextSong(audioElement);
    });

    // Player Controls

    playerButton.addEventListener("click", () => {
        if (playerButton.dataset.playing === "false") {
            playSong(audioElement);
        } else{
            pauseSong(audioElement);
        }
    });

    nextButton.addEventListener("click", () => {
        nextSong();
    });

    previousButton.addEventListener("click", () => {
        previousSong();
    });

    function playSong(audio) {
        audio.play();

        playerButton.dataset.playing = "true";
        playIcon.classList.add("hidden");
        pauseIcon.classList.remove("hidden");
    }

    function pauseSong(audio) {
        audio.pause();
        
        playerButton.dataset.playing = "false";
        pauseIcon.classList.add("hidden");
        playIcon.classList.remove("hidden");
    }

    function nextSong(audio) {
        audioElement.currentTime = 0;
        audioElement.duration = audioElement.duration;
        for (const song of songs){
            if (audioElement.getAttribute("src") === song) {
                const currentSong = songs.indexOf(song);
                if (currentSong !== 4) {
                    audioElement.src = songs[currentSong+1];
                    } else {
                    audioElement.src = songs[0];
                    }
                playSong(audioElement);
                break;
            }
        }
    }

    function previousSong(audio) {
        for (const song of songs){
            if (audioElement.getAttribute("src") === song) {
                const currentSong = songs.indexOf(song);
                if (currentSong !== 0) {
                    audioElement.src = songs[currentSong-1];
                    } else {
                        audioElement.src = songs[4];
                    }
                playSong(audioElement);
                break;
            }
        }
    }

    function adjustSeconds(seconds) {
        if (seconds < 10) {
            return '0'+seconds;
        } else {
            return seconds;
        };
    }

    //Player display

    function setTimes() {
        const newCurrentTime = new Date(audioElement.currentTime * 1000);
        const newDuration = new Date(audioElement.duration * 1000);

            playerCurrentTime.textContent = `${newCurrentTime.getMinutes()}:${adjustSeconds(newCurrentTime.getSeconds())}`;
            playerDuration.textContent = `${newDuration.getMinutes()}:${adjustSeconds(newDuration.getSeconds())}`;
    };

    function setPlayerDisplay() {
        playerDisplay.innerHTML = audioElement.getAttribute("src").slice(6, -4);
    };

    function progressUpdate(){
        const flexPercent = (audioElement.currentTime/audioElement.duration) * 100;
        progressFilled.style.flexBasis = `${flexPercent}%`;
    };

    function scrub(event) {
        const scrubTime = (event.offsetX / progress.offsetWidth)*audioElement.duration;
        audioElement.currentTime = scrubTime;
    };

    progress.addEventListener("click", scrub);
    progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
    progress.addEventListener("mousedown", () => (mousedown = true));
    progress.addEventListener("mousedown", () => (mousedown = false));

    // Playlist

    //Searchbar

    searchInput.addEventListener("keyup", () => {
        const userSearchContent = searchInput.value.toLowerCase().split(" ");
        let searchKeywords = [];
        let songResults = [];

        for (let y = 0; y < userSearchContent.length; y++) {
            if (userSearchContent[y] !== ''){
                searchKeywords.push(userSearchContent[y]);
            }
        }
        for (let i=0; i < songs.length ; i++){
            let resultKeywords = songs[i].slice(6, -4).toLowerCase().split(" - ").join(" ");
            let match = false;
            for (let j = 0; j < searchKeywords.length; j++){
                console.log(searchKeywords[j])
                console.log(resultKeywords);
                if (resultKeywords.includes(searchKeywords[j])){
                    match = true;
                } else {
                    match = false;
                }
                if (match === true){
                    songResults.push(i+1);
                }
            }
        }

        
        console.log(songResults);
        if (searchInput.value == []){
            songContainer1.classList.remove("filtered");
            songContainer2.classList.remove("filtered");
            songContainer3.classList.remove("filtered");
            songContainer4.classList.remove("filtered");
            songContainer5.classList.remove("filtered");
        } else {
            if (songResults.includes(1)){
                songContainer1.classList.remove("filtered");
            } else {
                songContainer1.classList.add("filtered");
            };
            if (songResults.includes(2)){
                songContainer2.classList.remove("filtered");
            } else {
                songContainer2.classList.add("filtered");
            };
            if (songResults.includes(3)){
                songContainer3.classList.remove("filtered");
            } else {
                songContainer3.classList.add("filtered");
            };
            if (songResults.includes(4)){
                songContainer4.classList.remove("filtered");
            } else {
                songContainer4.classList.add("filtered");
            };
            if (songResults.includes(5)){
                songContainer5.classList.remove("filtered");
            } else {
                songContainer5.classList.add("filtered");
            };
            if (songResults.length === 0) {
                songContainer1.classList.add("filtered")
                songContainer2.classList.add("filtered")
                songContainer3.classList.add("filtered")
                songContainer4.classList.add("filtered")
                songContainer5.classList.add("filtered")
            }
        }
    });

    //Playlist Container doubleclick
    songContainer1.addEventListener("dblclick", () => {
       audioElement.src = songs[0];
       playSong(audioElement);
    });

    songContainer2.addEventListener("dblclick", () => {
        audioElement.src = songs[1];
        playSong(audioElement);
     });

     songContainer3.addEventListener("dblclick", () => {
        audioElement.src = songs[2];
        playSong(audioElement);
     });

     songContainer4.addEventListener("dblclick", () => {
        audioElement.src = songs[3];
        playSong(audioElement);
     });

     songContainer5.addEventListener("dblclick", () => {
        audioElement.src = songs[4];
        playSong(audioElement);
     });
     //Playlist playbuttons
     songPlayButton1.addEventListener("click", () => {
        audioElement.src = songs[0];
        playSong(audioElement);
     });
 
     songPlayButton2.addEventListener("click", () => {
         audioElement.src = songs[1];
         playSong(audioElement);
      });
 
      songPlayButton3.addEventListener("click", () => {
         audioElement.src = songs[2];
         playSong(audioElement);
      });
 
      songPlayButton4.addEventListener("click", () => {
         audioElement.src = songs[3];
         playSong(audioElement);
      });
 
      songPlayButton5.addEventListener("click", () => {
         audioElement.src = songs[4];
         playSong(audioElement);
      });


});