// 1. Render songs
// 2. Scroll top
// 3. play / pause / seek
// 4. CD rotate
// 5. Next / prev
// 6. Random
// 7. Next / Repeat when ended
// 8. Active song
// 9. Scroll active song into view
// 10. Play song when click

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const playList = $('.songs-list__songs');
const songImg = $('.disc-wrap img');
const songName = $('.disc-wrap__name');
const songAuthor = $('.disc-wrap__author');
const audio = $('#main-audio');
const playBtn = $('.play');
const pauseBtn = $('.pause');
const headingArea = $('.main-area__heading');
const nextBtn = $('.ri-speed-fill.next');
const prevBtn = $('.ri-rewind-fill.back');
const cdThumb = $('.cdThumb');
const progress = $('.progress-area .progress');
const timeCurrent = $('.song-timer .current');
const timeDuration = $('.song-timer .duration');
const repeatBtn = $('.repeat');
const volBtn = $('.vol');
const volBarRange = $('.volume-bar__range');

app = {
    currentIndex: 0,
    isPlaying: false,
    isRepeat: false,
    isLove: false,
    isVolume: false,
    songs: [
        {
            name: "Look What You Made Me Do",
            singer: "Taylor Swift",
            path: "./musicPathMp3/look.mp3",
            image: "./musicImg/3.jpg"
        },
        {
            name: "Coming for You",
            singer: "SwitchOTR",
            path: "./musicPathMp3/coming.mp3",
            image: "./musicImg/6.jpg"
        },
        {
            name: "The Ocean",
            singer: "Mike Perry ft Shy Martin",
            path: "./musicPathMp3/theOcean.mp3",
            image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
        },
        {
            name: "Mạc Vấn Quy Kỳ",
            singer: "莫問歸期  蔣雪兒",
            path: "./musicPathMp3/mac.mp3",
            image:
                "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
        },
        {
            name: "LAST REUNION",
            singer: "Peter Roe",
            path: "./musicPathMp3/last.mp3",
            image:
                "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
        },
        {
            name: "TEDDY",
            singer: "Veiru",
            path: "./musicPathMp3/teddy.mp3",
            image:
                "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
        },
        {
            name: "Holo",
            singer: "Ampyx",
            path: "./musicPathMp3/holo.mp3",
            image: "./musicImg/2.jpg"
        }
    ],

    renderMusic() {
        const htmls = this.songs.map((song, index) => {
            return `<div class="song ${index === this.currentIndex ? 'playing' : ''}" data-index='${index}' >
                        <div class="song-info" div-index='${index}'>
                            <img src="${song.image}" alt="" img">
                            <span 
                                class="song-info__number">${index + 1}
                            </span>
                            <span class="song-info__author">${song.singer}</span>
                            <span class="song-info__dash">-</span>
                            <span class="song-info__name">${song.name}</span>
                        </div>
                        <i class="ri-heart-fill love"></i>
                    </div>`
        })
        playList.innerHTML = htmls.join('');

    },
    handleEvent() {
        const _this = this;
        // $('.song-timer .current')

        const cdThumbAnimate = cdThumb.animate(
            [
                { transform: 'rotate(360deg)' }
            ]
            ,
            {
                duration: 10000,
                iterations: Infinity
            }
        );
        cdThumbAnimate.pause();

        // click nút play hơi cồng kềnh
        playBtn.onclick = function () {
            audio.play();
            playBtn.classList.add('active');

        }
        pauseBtn.onclick = function () {
            audio.pause();
            playBtn.classList.remove('active');

        }
        audio.onplay = () => {
            _this.isPlaying = true
            playBtn.classList.add('active');
            cdThumbAnimate.play();
            _this.loadPlaying();
        }
        audio.onpause = () => {
            _this.isPlaying = false
            playBtn.classList.remove('active');
            cdThumbAnimate.pause()
        }
        // click nút play hơi cồng kềnh

        nextBtn.onclick = function () {
            _this.nextSong();
            audio.play();
        }
        prevBtn.onclick = function () {
            _this.prevSong();
            audio.play();
        }
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play();
            } else {
                nextBtn.click();
            }
        }
        repeatBtn.onclick = function () {
            _this.isRepeat = !_this.isRepeat;
            repeatBtn.classList.toggle('active', _this.isRepeat);
        }
        volBtn.onclick = function(){
            _this.isVolume = !_this.isVolume;
            volBtn.classList.toggle('active',this.isVolume);
            if ( _this.isVolume ){
                document.onclick = function(e){
                    if ( e.target.closest('.volume-bar__range') || e.target.closest('.vol') ){
                        
                    }else{
                        _this.isVolume = false;
                        volBtn.classList.toggle('active',_this.isVolume);
                    }
                    
                }
            }
        }
        volBarRange.oninput = function(){
            audio.volume = volBarRange.value / 100;
            if ( audio.volume == 0 ){
                volBtn.classList.add('ri-volume-mute-line');
            }else{
                volBtn.classList.remove('ri-volume-mute-line');
            }
        }

        audio.ontimeupdate = function () {
            if (audio.duration) {
                progress.value = Math.floor(audio.currentTime / audio.duration * 100);
            }
            // set time song-timer
            const timeCurrentMusic = Math.floor(audio.currentTime);
            timeCurrent.innerText = _this.setTimeMusic(timeCurrentMusic);

            const timeDurationMusic = Math.floor(audio.duration);
            timeDuration.innerText = _this.setTimeMusic(timeDurationMusic);
            // set time song-timer
        }
        progress.oninput = function () {
            audio.currentTime = progress.value * audio.duration / 100;
        }
        playList.onclick = function(e){
            const songNode = e.target.closest('.song:not(.playing)');
            if ( songNode || e.target.closest('.love') ){
                if ( e.target.closest('.love') ){
                    _this.isLove = !_this.isLove;
                    e.target.closest('.love').classList.toggle('active',_this.isLove);
                }else{
                    _this.currentIndex = songNode.dataset.index*1;
                    _this.loadCurrentSong();
                    audio.play();
                }
            }
        }
    },
    setTimeMusic(time) {
        if (time === null) {
            return '0:00';
        }
        let totalMin = Math.floor(time / 60);
        let totalSec = Math.floor(time % 60);
        if (totalSec < 10) {
            totalSec = '0' + totalSec;
        }
        return `${totalMin}:${totalSec}`;
    },
    getCurrentSong() {
        return this.songs[this.currentIndex];
    },
    loadCurrentSong() {
        currentSong = this.getCurrentSong();
        songName.innerText = currentSong.name
        songAuthor.innerText = currentSong.singer
        songImg.src = `${currentSong.image}`
        songImg.alt = `${currentSong.src}`
        audio.src = `${currentSong.path}`

        headingArea.innerHTML =
            `<h3>Phổ Biến</h3>
                <span>${this.songs.length} Songs (<a href="https://soundcloud.com">© SoundCloud</a>)</span>`

    },
    nextSong() {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong() {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    loadPlaying() {
        const listSong = $$(".song")
        listSong.forEach((song, index) => {
            if (this.currentIndex === index) {
                $(".song.playing").classList.remove("playing")
                song.classList.add("playing")
                return
            }
        })
    },
    start() {

        this.loadCurrentSong();

        this.renderMusic();

        this.handleEvent();

    }
}
console.log();
app.start();

