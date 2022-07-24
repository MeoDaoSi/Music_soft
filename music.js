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
            id: 1,
            name: "Khúc Cửu Môn Hồi Ức - Đẳng Thập Ma Quân",
            author: "辞九门回忆",
            image: "https://i1.sndcdn.com/artworks-okGdzJU5zoepc4rV-Wem4BQ-t500x500.jpg",
            path: "id_1"
        },
        {
            id: 2,
            name: "I Want You To Know",
            author: "Hella x Pegato Remix",
            image: "https://avatar-ex-swe.nixcdn.com/song/2017/09/20/d/c/d/0/1505872853038_640.jpg",
            path: "id_2"
        },
        {
            name: "Dusk Till Dawn",
            author: "ZAYN ft. Sia",
            image: "https://i1.sndcdn.com/artworks-000675552454-mldjm4-t500x500.jpg",
            path: "id_3",
            id: 3
        },
        {
            name: "Không có lý do",
            author: "Dương Bàn Vũ & Lambert",
            image: "https://i1.sndcdn.com/artworks-000642594505-ms9tx1-t500x500.jpg",
            path: "id_4",
            id: 4
        },
        {
            name: "Nevada x Boom shakalaka",
            author: "苦ferry remix",
            image: "https://i1.sndcdn.com/artworks-zqzFEpSrzQBs7yHJ-oLz8Kw-t500x500.jpg",
            path: "id_5",
            id: 5
        },
        {
            name: "Despair",
            author: "风靡全网的背景",
            image: "https://i1.sndcdn.com/avatars-000056054928-7ijgpv-t500x500.jpg",
            path: "id_6",
            id: 6
        },
        {
            name: "Faded",
            author: "(Jacla remix) - Naxsy Douyin Version",
            image: "https://i1.sndcdn.com/artworks-OYLVkyVygb0XZ0rg-poBvJA-t500x500.jpg",
            path: "id_7",
            id: 7
        },
        {
            name: "Ngôi sao sáng nhất bầu trời đêm",
            author: "夜空中最亮的星",
            image: "https://i1.sndcdn.com/artworks-000380164236-beiirx-t500x500.jpg",
            path: "id_8",
            id: 8
        },
        {
            name: "Đêm Tỏ Tình | 告白の夜",
            author: "Ayasa",
            image: "https://i1.sndcdn.com/artworks-000524283663-3sm7ky-t500x500.jpg",
            path: "id_9",
            id: 9
        },
        {
            name: "The Ocean (ft. Shy Martin) [Lyrics CC]",
            author: "Mike Perry",
            image: "https://i1.sndcdn.com/artworks-000234033071-pj3oex-t500x500.jpg",
            path: "id_10",
            id: 10
        },
        {
            name: "Cash Cash - Hero",
            author: "feat. Christina Perri",
            image: "https://i1.sndcdn.com/artworks-ISZXG0eTqM2kh4l0-A6siDg-t500x500.jpg",
            path: "id_11",
            id: 11
        },
        {
            name: "Kings & Queens",
            author: "Ava Max",
            image: "https://i1.sndcdn.com/artworks-XNgKm7rU7v1Izatq-yD1Omg-t500x500.jpg",
            path: "id_12",
            id: 12
        },
        {
            name: "Into Your Arms",
            author: "Witt Lowry ft. Ava Max",
            image: "https://i1.sndcdn.com/artworks-Qbfg1L3MEZeHpLXa-uELt9Q-t500x500.jpg",
            path: "id_13",
            id: 13
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
                            <span class="song-info__author">${song.author}</span>
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


        nextBtn.onclick = function () {
            _this.nextSong();
            audio.play();
            _this.scrollActiveSong();
        }
        prevBtn.onclick = function () {
            _this.prevSong();
            audio.play();
            _this.scrollActiveSong();
        }
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play();
                _this.scrollActiveSong();
            } else {
                nextBtn.click();
                _this.scrollActiveSong();
            }
        }
        repeatBtn.onclick = function () {
            _this.isRepeat = !_this.isRepeat;
            repeatBtn.classList.toggle('active', _this.isRepeat);
        }
        volBtn.onclick = function () {
            _this.isVolume = !_this.isVolume;
            volBtn.classList.toggle('active', this.isVolume);
            if (_this.isVolume) {
                document.onclick = function (e) {
                    if (e.target.closest('.volume-bar__range') || e.target.closest('.vol')) {

                    } else {
                        _this.isVolume = false;
                        volBtn.classList.toggle('active', _this.isVolume);
                    }

                }
            }
        }
        volBarRange.oninput = function () {
            audio.volume = volBarRange.value / 100;
            if (audio.volume == 0) {
                volBtn.classList.add('ri-volume-mute-line');
            } else {
                volBtn.classList.remove('ri-volume-mute-line');
            }
        }

        audio.ontimeupdate = function () {
            if (audio.duration) {
                progress.value = Math.floor(audio.currentTime / audio.duration * 100);
            }

            const timeCurrentMusic = Math.floor(audio.currentTime);
            timeCurrent.innerText = _this.setTimeMusic(timeCurrentMusic);

            const timeDurationMusic = Math.floor(audio.duration);
            timeDuration.innerText = _this.setTimeMusic(timeDurationMusic);

        }
        progress.oninput = function () {
            audio.currentTime = progress.value * audio.duration / 100;
        }
        playList.onclick = function (e) {
            const songNode = e.target.closest('.song:not(.playing)');
            if (songNode || e.target.closest('.love')) {
                if (e.target.closest('.love')) {
                    _this.isLove = !_this.isLove;
                    e.target.closest('.love').classList.toggle('active', _this.isLove);
                } else {
                    _this.currentIndex = songNode.dataset.index * 1;
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
        songAuthor.innerText = currentSong.author
        songImg.src = `${currentSong.image}`
        songImg.alt = `${currentSong.src}`
        audio.src = `./assets/listMusic/${currentSong.path}.mp3`

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
    scrollActiveSong() {
        setTimeout(function () {
            $('.song.playing').scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        }, 300);
    },
    start() {

        this.loadCurrentSong();

        this.renderMusic();

        this.handleEvent();

    }
}
app.start();

