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
    arrIndex: [],
    currentIndex: 0,
    isPlaying: false,
    isRepeat: false,
    isLove: false,
    isVolume: false,
    isRandom: false,
    isSetting: 0,
    songs: [
        {
            id: 1,
            name: "Tay Trái Chỉ Trăng",
            author: "Tát Đỉnh Đỉnh",
            image: "https://i1.sndcdn.com/artworks-000106026773-9p02r9-t500x500.jpg",
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
        },
        {
            name: "Normal No More (remix)",
            author: "TYSM",
            image: "https://www.cevirce.com/en/translate/wp-content/uploads/2022/01/tysm-normal-no-more-lyrics-1-1200x1200.jpg",
            path: "id_14",
            id: 14
        },
        {
            name: "Summertime Sadness Remix - BTTN Remix",
            author: "ft. Lana Del Rey",
            image: "https://i1.sndcdn.com/artworks-OGsWCzxA81lkcy17-nGTz5Q-t500x500.jpg",
            path: "id_15",
            id: 15
        },
        {
            name: "La la la - Naughty Boy",
            author: "ft. Sam Smith",
            image: "https://i1.sndcdn.com/artworks-GqEzPZ0pi7v0yCHK-UmlBrA-t240x240.jpg",
            path: "id_16",
            id: 16
        },
        {
            name: "Alan Walker - All Falls Down",
            author: "feat. Noah Cyrus & Digital Farm Animals",
            image: "https://i1.sndcdn.com/artworks-000290815104-d5gvij-t500x500.jpg",
            path: "id_17",
            id: 17
        },
        {
            name: "Yami",
            author: "Tiểu Ái, Dương Kiệt, A Lạp Mai Ft. Nhĩ Mã Na Y",
            image: "https://avatar-ex-swe.nixcdn.com/song/2020/08/04/4/0/c/9/1596518239688_640.jpg",
            path: "id_18",
            id: 18
        },
        {
            name: "Copines",
            author: "Aya Nakamura",
            image: "https://i1.sndcdn.com/artworks-Dy6cktJWyiHRGkG3-hKx4HA-t500x500.jpg",
            path: "id_19",
            id: 19
        },
        {
            name: "Heat Waves",
            author: "Glass Animals ( Slowed And Reverb )",
            image: "https://i1.sndcdn.com/artworks-wWBD46nyrfzhzwDY-wNzu8Q-t240x240.jpg",
            path: "id_20",
            id: 20
        },
        {
            name: "Cưới Thôi",
            author: "Masiu x Masew",
            image: "https://i1.sndcdn.com/artworks-hbjj5DFw5EOae3FY-gafjEQ-t500x500.jpg",
            path: "id_21",
            id: 21
        },
        {
            name: "Holo",
            author: "Ampyx",
            image: "https://i1.sndcdn.com/artworks-000205941539-eafdz6-t500x500.jpg",
            path: "id_22",
            id: 22
        },
        {
            name: "Safari",
            author: "Serena | Gritty Remix",
            image: "https://i1.sndcdn.com/artworks-000427800225-j7ul3j-t500x500.jpg",
            path: "id_23",
            id: 23
        },
        {
            name: "Là tự em đa tình",
            author: "Thiếu Lâm & Thất Tú (Y Xuy Ngũ Nguyệt) - Hồ Dương Lâm",
            image: "https://i1.sndcdn.com/avatars-000590302836-2idbz1-t240x240.jpg",
            path: "id_24",
            id: 24
        },
        {
            name: "Nổi Gió Rồi Violin",
            author: "『 Shine 』",
            image: "https://i1.sndcdn.com/artworks-000329073225-498xiq-t500x500.jpg",
            path: "id_25",
            id: 25
        },
        {
            name: "Alive Remix",
            author: "TEDDY X VeiruX",
            image: "https://i1.sndcdn.com/artworks-NyT0rcU0pSw7MFtm-vcTJAw-t500x500.jpg",
            path: "id_26",
            id: 26
        },
        {
            name: "LAST REUNION ",
            author: "Epic Music VN",
            image: "https://i1.sndcdn.com/artworks-000126359398-c9oz4i-t500x500.jpg",
            path: "id_27",
            id: 27
        },
        {
            name: "Đáy Biển",
            author: "Nhất Chi Lựu Liên",
            image: "https://i1.sndcdn.com/artworks-2YygOzts5lM08z8a-01173A-t500x500.jpg",
            path: "id_28",
            id: 28
        },
        {
            name: "Let Me Down Slowly",
            author: "Alec Benjamin",
            image: "https://i1.sndcdn.com/artworks-000467984463-isiz59-t500x500.jpg",
            path: "id_29",
            id: 29
        },
        {
            name: "Look What You Made Me Do",
            author: "Taylor Swift",
            image: "https://i1.sndcdn.com/artworks-000290686212-t9dcrb-t500x500.jpg",
            path: "id_30",
            id: 30
        },
        {
            name: "Coming for You",
            author: "SwitchOTR",
            image: "https://i1.sndcdn.com/artworks-kPds54n50e0SdC9r-cxbWng-t500x500.jpg",
            path: "id_31",
            id: 31
        },
        {
            name: "HEY HEY HEY x MOOD ",
            author: "TVT Remix",
            image: "https://i1.sndcdn.com/artworks-Xba5vCZhDZyUywIK-pXtiqw-t500x500.jpg",
            path: "id_32",
            id: 32
        },
        {
            name: "Dynasty",
            author: "MIIA",
            image: "https://i1.sndcdn.com/avatars-T00WpJeWUDyDYLDK-umtBzA-t500x500.jpg",
            path: "id_33",
            id: 33
        },
        {
            name: "Dreams II",
            author: "Lost Sky (ft. Sara Skinner)",
            image: "https://i1.sndcdn.com/artworks-000463431084-s9wr2o-t500x500.jpg",
            path: "id_34",
            id: 34
        },
        {
            name: "Impossible",
            author: "Shontelle",
            image: "https://i1.sndcdn.com/artworks-PqVst0lsJyiOEOdH-HVwfMQ-t500x500.jpg",
            path: "id_35",
            id: 35
        },
        {
            name: "Unstoppable",
            author: "Sia",
            image: "https://i1.sndcdn.com/artworks-000348039945-gymz8a-t500x500.jpg",
            path: "id_36",
            id: 36
        },
        {
            name: "The Night",
            author: "Avicii",
            image: "https://i1.sndcdn.com/avatars-OmHZ4z6wHHj1PQwz-8MIgiw-t240x240.jpg",
            path: "id_37",
            id: 37
        },
        {
            name: "THE NIGHT REMIX",
            author: "TVT FT NEVER",
            image: "https://i1.sndcdn.com/artworks-000217774120-m1mqsj-t240x240.jpg",
            path: "id_38",
            id: 38
        },
        {
            name: "Nevada",
            author: "Vicetone Lofi Mix",
            image: "https://i1.sndcdn.com/artworks-000174788935-d1hrl9-t500x500.jpg",
            path: "id_39",
            id: 39
        },
        {
            name: "You x Ngau Hung Be Your Sun",
            author: "DJ版",
            image: "https://i1.sndcdn.com/artworks-000234241861-h5pc3v-t500x500.jpg",
            path: "id_40",
            id: 40
        },
        {
            name: "Mạc Vấn Quy Kỳ",
            author: " DJ弹鼓版",
            image: "https://i1.sndcdn.com/artworks-tQwFzp8Y09SzFSXi-DSxKFg-t500x500.jpg",
            path: "id_41",
            id: 41
        },
        {
            name: "Mạc Vấn Quy Kỳ",
            author: "Tưởng Tuyết Nhi",
            image: "https://i1.sndcdn.com/artworks-000672249628-gkn1b9-t240x240.jpg",
            path: "id_42",
            id: 42
        },
        {
            name: "Tie Me Down Remix",
            author: "Griffin - || 4GET SAUCY X CH",
            image: "https://i1.sndcdn.com/artworks-mdOUOjfnsaLl-0-t500x500.jpg",
            path: "id_43",
            id: 43
        },
        {
            name: "Tie Me Down x Fade",
            author: "Griffin - || 4GET SAUCY X CH",
            image: "https://i1.sndcdn.com/artworks-000446531922-qq76kd-t500x500.jpg",
            path: "id_44",
            id: 44
        },
        {
            name: "Demons",
            author: "Jar Of Heart",
            image: "https://i1.sndcdn.com/artworks-ZW0KnQ6U7YKd-0-t500x500.jpg",
            path: "id_45",
            id: 45
        },
        {
            name: "Can We Kiss Forever?",
            author: "Kina",
            image: "https://i1.sndcdn.com/artworks-000483921816-nx3ypm-t500x500.jpg",
            path: "id_46",
            id: 46
        },
        {
            id: 47,
            name: "Khúc Cửu Môn Hồi Ức - Đẳng Thập Ma Quân",
            author: "辞九门回忆",
            image: "https://i1.sndcdn.com/artworks-okGdzJU5zoepc4rV-Wem4BQ-t500x500.jpg",
            path: "id_47"
        },
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
            let getText = repeatBtn.innerText;
            switch(getText){
                case 'repeat':{
                    nextBtn.click();
                    _this.scrollActiveSong();
                    break;
                }
                case 'repeat_one':{
                    audio.play();
                    break;
                }
                case 'shuffle':{
                    _this.getIndexRandom();
                    _this.loadCurrentSong();
                    audio.play();
                    _this.scrollActiveSong();
                    break;
                }
            }
            // if (_this.isRepeat) {
            //     audio.play();
            //     _this.scrollActiveSong();
            // } else {
            //     nextBtn.click();
            //     _this.scrollActiveSong();
            // }
        }
        repeatBtn.onclick = function () {
            let getText = repeatBtn.innerText
            switch (getText) {
                case 'repeat':
                    repeatBtn.innerText = 'repeat_one'
                    repeatBtn.classList.add('active');
                    break
                case 'repeat_one':
                    repeatBtn.innerText = 'shuffle'
                    break
                case 'shuffle':
                    repeatBtn.innerText = 'repeat'
                    repeatBtn.classList.remove('active');
                    break
            }
            // _this.isRepeat = !_this.isRepeat;
            // repeatBtn.classList.toggle('active', _this.isRepeat);
            // repeatBtn.innerText = "repeat_one";
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
    getIndexRandom(){
        if ( this.arrIndex.length == this.songs.length ){
            this.arrIndex.length = 0;
        }
        do{
            this.currentIndex = Math.floor(Math.random() * this.songs.length )
            if ( !this.arrIndex.includes(this.currentIndex)){
                break;
            }
        }
        while(true);
        this.arrIndex.push(this.currentIndex);
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

