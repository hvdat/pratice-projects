const $ = document.querySelector.bind(document);

const cd = document.querySelector(".cd");
const player = $(".player");
const cdWidth = cd.offsetWidth;
const heading = document.querySelector("header h2");
const cdThumb = document.querySelector(".cd-thumb");
const audio = document.querySelector("#audio");
const btnPlay = $(".btn-toggle-play");
const progress = $("#progress");
const btnPrev = $(".btn-prev");
const btnNext = $(".btn-next");
const btnRandom = $(".btn-random");
const btnRepeat = $(".btn-repeat");
const playlist = $(".playlist");

const app = {
  currentIndex: 0,
  isPlay: false,
  isRandom: false,
  isRepeat: false,
  song: [
    {
      name: "Still Life",
      singer: "BIGBANG",
      path: "./music/BIGBANG-StillLife.mp3",
      thumb: "./img/BIGBANG-StillLife.jpg",
    },
    {
      name: "Monster",
      singer: "YOASOBI",
      path: "./music/YOASOBI-Monster.mp3",
      thumb: "./img/YOASOBI-Monster.jpg",
    },
    {
      name: "Still Life",
      singer: "BIGBANG",
      path: "./music/BIGBANG-StillLife.mp3",
      thumb: "./img/BIGBANG-StillLife.jpg",
    },
    {
      name: "Monster",
      singer: "YOASOBI",
      path: "./music/YOASOBI-Monster.mp3",
      thumb: "./img/YOASOBI-Monster.jpg",
    },
    {
      name: "Still Life",
      singer: "BIGBANG",
      path: "./music/BIGBANG-StillLife.mp3",
      thumb: "./img/BIGBANG-StillLife.jpg",
    },
    {
      name: "Monster",
      singer: "YOASOBI",
      path: "./music/YOASOBI-Monster.mp3",
      thumb: "./img/YOASOBI-Monster.jpg",
    },
    {
      name: "Monster",
      singer: "YOASOBI",
      path: "./music/YOASOBI-Monster.mp3",
      thumb: "./img/YOASOBI-Monster.jpg",
    },
    {
      name: "Still Life",
      singer: "BIGBANG",
      path: "./music/BIGBANG-StillLife.mp3",
      thumb: "./img/BIGBANG-StillLife.jpg",
    },
    {
      name: "Monster",
      singer: "YOASOBI",
      path: "./music/YOASOBI-Monster.mp3",
      thumb: "./img/YOASOBI-Monster.jpg",
    },
    {
      name: "Still Life",
      singer: "BIGBANG",
      path: "./music/BIGBANG-StillLife.mp3",
      thumb: "./img/BIGBANG-StillLife.jpg",
    },
    {
      name: "Monster",
      singer: "YOASOBI",
      path: "./music/YOASOBI-Monster.mp3",
      thumb: "./img/YOASOBI-Monster.jpg",
    },
  ],
  render: function () {
    const htmls = this.song.map((song, idx) => {
      return `
        <div class="song ${
          idx === this.currentIndex ? "active" : ""
        } "data-index="${idx}">
          <div
            class="thumb"
            style="
              background-image: url('${song.thumb}');
            "
          ></div>
          <div class="body">
            <h3 class="title">${song.name}</h3>
            <p class="author">${song.singer}</p>
          </div>
          <div class="option">
            <i class="fas fa-ellipsis-h"></i>
          </div>
        </div>
      `;
    });
    playlist.innerHTML = htmls.join("\n");
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.song.length) {
      this.currentIndex = this.song.length;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex <= 0) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  playRandom: function () {
    let newIdx;
    do {
      newIdx = Math.floor(Math.random() * this.song.length);
    } while (newIdx === this.currentIndex);
    this.currentIndex = newIdx;
    this.loadCurrentSong();
  },
  scrollToActiveSong: function () {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 300);
  },
  defineProperties: function () {
    Object.defineProperties(this, {
      currentSong: {
        get: function () {
          return this.song[this.currentIndex];
        },
      },
    });
  },
  handleEvents: function () {
    _this = this;
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCDWidth = cdWidth - scrollTop;
      cd.style.width = newCDWidth > 0 ? newCDWidth + "px" : 0;
      cd.style.opacity = newCDWidth / cdWidth;
    };

    btnPlay.onclick = function () {
      if (_this.isPlay) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000,
      iterations: Infinity,
    });
    cdThumbAnimate.pause();

    audio.onplay = function () {
      _this.isPlay = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };

    audio.onpause = function () {
      _this.isPlay = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };

    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };

    progress.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };

    btnPrev.onclick = function () {
      if (_this.isRandom) {
        _this.playRandom();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    btnNext.onclick = function () {
      if (_this.isRandom) {
        _this.playRandom();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    btnRandom.onclick = function () {
      _this.isRandom = !_this.isRandom;
      btnRandom.classList.toggle("active", _this.isRandom);
    };

    btnRepeat.onclick = function () {
      _this.isRepeat = !_this.isRepeat;
      btnRepeat.classList.toggle("active", _this.isRepeat);
    };

    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        btnNext.click();
      }
    };

    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");

      if (songNode || e.target.closest(".option")) {
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          _this.render();
          audio.play();
        }
      }
    };
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.thumb}')`;
    audio.src = this.currentSong.path;
  },
  start: function () {
    this.defineProperties();
    this.handleEvents();
    this.loadCurrentSong();
    this.render();
  },
};
app.start();
