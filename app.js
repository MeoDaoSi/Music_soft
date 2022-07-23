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

const playSong = $('.btn-toggle-play');
const audio = $('#audio');
const cd = $('.cd');
const cdthumb = $('.cd-thumb');
const btnPlay = $('.btn-toggle-play');
const player = $('.player');
const timeLine = $('.time-line');
const progress = $('.progress');
const cdThumb = $('.cd-thumb');
const nextSongBtn = $('.btn-next');
const prevSongBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const playList = $('.playlist');


const app = {
    currentIndex: 0,
    isRandom: false,
    isPlaying: false,
    isRepeat: false,
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
    render() {
        const htmls = this.songs.map((song, index )=> {
            return `
            <div class="song ${ index === this.currentIndex ? 'active' : ' '}" data-index='${index}' >
                <div class="thumb" 
                    style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `;
        })
        playList.innerHTML = htmls.join('');
    },
    handleEvent(){
        const _this = this;
        const cdWidth = cd.offsetWidth;

        const cdThumbAnimate = cdThumb.animate([
           { transform: 'rotate(360deg)'}
        ],{
            duration: 10000,
            iterations: Infinity
        })
        cdThumbAnimate.pause();

        document.onscroll = () => {
            const scroll = document.documentElement.scrollTop;
            const newWidth = cdWidth - scroll;
            cd.style.width = newWidth > 0 ? newWidth + 'px' : 0 ;
            cd.style.opacity = newWidth / cd.style.width;
        }
        btnPlay.onclick = function(){
            if ( _this.isPlaying ){
                audio.pause();
            }
            else{ 
                audio.play();
            }
        }
        audio.onplay = function(){
            _this.isPlaying = true;
            cdThumbAnimate.play();
            player.classList.add('playing');
        }
        audio.onpause = function(){
            _this.isPlaying = false;
            cdThumbAnimate.pause();
            player.classList.remove('playing');
        }
        nextSongBtn.onclick = () => {
            if ( _this.isRandom ){
                _this.playRandomSong();
            }else{
                
                _this.nextSong();
            }
            _this.render();
            _this.scrollActiveSong();
            audio.play();
        }
        prevSongBtn.onclick = () => {
            if ( _this.isRandom ){
                _this.playRandomSong();
            }else{
                
                _this.prevSong();
            }
            _this.render();
            _this.scrollActiveSong();
            audio.play();
        }
        audio.ontimeupdate = () => {
            if ( audio.duration ){
                progress.value = Math.floor(audio.currentTime / audio.duration * 100 );
            }
        }
        progress.oninput = () => {
            audio.currentTime = audio.duration * progress.value / 100;
        };
        randomBtn.onclick = () => {
            _this.isRandom = !_this.isRandom;
            randomBtn.classList.toggle('active',_this.isRandom);
        }
        repeatBtn.onclick = () => {
            _this.isRepeat = !_this.isRepeat;
            repeatBtn.classList.toggle('active',_this.isRepeat);
        }
        audio.onended = function(){
            if ( _this.isRepeat ){
                audio.play();
                _this.scrollActiveSong();
            }else{
                nextSongBtn.click();
                _this.scrollActiveSong();
            }
        }
        playList.onclick = function(e){
            const songNode = e.target.closest('.song:not(.active)');
            if ( songNode || e.target.closest('.option')){
                if ( songNode ){
                    _this.currentIndex = songNode.dataset.index*1;
                    _this.loandCurrentSong();
                    _this.render();
                    audio.play();
                }
                else{

                }
            }
        }
    },
    nextSong(){
        this.currentIndex++;
        if ( this.currentIndex >= this.songs.length ){
            this.currentIndex = 0;
        }
        this.loandCurrentSong();
    },
    prevSong(){
        this.currentIndex--;
        if ( this.currentIndex < 0 ){
            this.currentIndex = this.songs.length - 1;
        }
        this.loandCurrentSong();
    },
    playRandomSong(){
        const newIndexSong = this.currentIndex;
        do{
            this.currentIndex = Math.floor(Math.random() * this.songs.length );
        }
        while( this.currentIndex === newIndexSong );
        this.loandCurrentSong();
    },
    getCurrentSong(){
        return this.songs[this.currentIndex];
    },
    loandCurrentSong(){
        const heading = $('.dashboard h2');
        heading.innerText = this.getCurrentSong().name;
        cdthumb.style.backgroundImage = `url('${this.getCurrentSong().image}')`
        audio.src = this.getCurrentSong().path;
    },
    scrollActiveSong(){
        setTimeout( function(){
            $('.song.active').scrollIntoView({
                behavior: "smooth", 
                block: "end"
            });
        },300);
    },
    start() {
        this.render();
        this.loandCurrentSong();
        this.handleEvent();
    }
}

app.start();