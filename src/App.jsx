import { useState, useRef, useEffect } from 'react'
import './App.css'
import CreationSong from './componentes/sections/songs-section/songs-sections'
import GenresSection from './componentes/sections/gerder-section/gerder-section.jsx'
import ArtistSection from './componentes/sections/artist-section/artist-section.jsx'

function App() {
  const [activeSection, setActiveSection] = useState('music'); // 'music', 'genre' o 'artist'

  //  LISTA DE AUDIOS
  const audios = [
    { link: "audio/backwards-morphing-tesseract-30sec-challenge-7430.mp3", title: "backwards-morphing", gerder: "Electronica", artist: "MateuszPixabay", time: "0:35" },
    { link: "audio//hopeful-acoustic-travel-30-seconds-368800.mp3", title: "hopeful-acoustic", gerder: "Gente", artist: "Sonican", time: "0:30" },
    { link: "audio/energetic-dance-groove-30s-301802.mp3", title: "energetic-dance-groove", gerder: "Musica pop", artist: "Universfield", time: "0:30" },
    { link: "audio/reflection_30sec-8472.mp3", title: "reflection", gerder: "Jazz", artist: "ykaiavu", time: "0:35" },
    { link: "audio/bouncing-joy-126495.mp3", title: "bouncing-joy", gerder: "intro outro", artist: "BlenderTimer", time: "0:34" },
    { link: "audio/emotional-orchestra-short-145091.mp3", title: "emotional-orchestra-short", gerder: "Gente", artist: "Kaden_Cook", time: "0:30" },
    { link: "audio/futuristic-mystery-30-seconds-cinematic-tension-378407.mp3", title: "futuristic-mystery-30-seconds-cinematic-tension", gerder: "Late", artist: "Sonican", time: "0:30" },
    { link: "audio/magical-dramedy-orchestral-sneaky-spell-30-sec-375796.mp3", title: "magical-dramedy-orchestral-sneaky-spell", gerder: "Fantasia", artist: "Sonican", time: "0:32" }
  ]

  // CUENTA LA CANTIDAD DE CANCIONES
  function numberOfSongs() {
    const number_of_elements = Object.keys(audios).length;
    return number_of_elements.toString();
  }

  // cuenta la cantidad de canciones por genero:
  function totalSongsByGerder() {
    const counts = {};
    Object.values(audios).forEach(audio => {
      const genre = audio.gerder;
      if (!counts[genre]) counts[genre] = 0;
      counts[genre]++;
    });
    return counts;
  }

  // cuenta la cantidad de canciones por artista
  function totalSongsByArtist() {
    const counts = {};
    Object.values(audios).forEach(audio => {
      const artist = audio.artist;
      if (!counts[artist]) counts[artist] = 0;
      counts[artist]++;
    });
    return counts;
  }

  const songsByGenre = totalSongsByGerder();
  const songsByArtist = totalSongsByArtist();

  // ---------- Player state & refs ----------
  const audioRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0); // índice de canción seleccionada
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 - 100 (%)
  const [duration, setDuration] = useState(0);

  // Cuando cambie currentIndex, el <audio> actualizará su src automáticamente (lo vinculamos en el JSX).
  useEffect(() => {
    if (!audioRef.current) return;
    // si está en modo play, reproducir la nueva pista
    if (isPlaying) {
      const p = audioRef.current.play();
      // manejo de la promesa por si bloquea autoplay
      if (p && p.catch) p.catch(() => setIsPlaying(false));
    } else {
      audioRef.current.pause();
    }
    // actualiza el progreso y duración al cambiar track
    setProgress(0);
  }, [currentIndex]);

  // cuando cambie isPlaying -> reproducir o pausar
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.play().catch(() => setIsPlaying(false));
    else audioRef.current.pause();
  }, [isPlaying]);

  // Handlers de controles
  function togglePlayPause() {
    setIsPlaying(prev => !prev);
  }

  function prevTrack() {
    setCurrentIndex(i => ( (i - 1 + audios.length) % audios.length ));
    setIsPlaying(true);
  }

  function nextTrack() {
    setCurrentIndex(i => ( (i + 1) % audios.length ));
    setIsPlaying(true);
  }

  // seleccionar canción desde la lista
  function selectTrack(index) {
    setCurrentIndex(index);
    setIsPlaying(true);
  }

  // evento del audio: actualización de tiempo
  function handleTimeUpdate(e) {
    const current = e.target.currentTime;
    const dur = e.target.duration || 0;
    setDuration(dur);
    const percent = dur ? (current / dur) * 100 : 0;
    setProgress(percent);
  }

  function handleLoadedMetadata(e) {
    setDuration(e.target.duration || 0);
  }

  // click en barra de progreso (seek)
  function handleProgressChange(e) {
    const value = Number(e.target.value); // 0-100
    if (!audioRef.current || !duration) {
      setProgress(value);
      return;
    }
    const time = (value / 100) * duration;
    audioRef.current.currentTime = time;
    setProgress(value);
  }

  // cuando termina la canción -> siguiente
  function handleEnded() {
    nextTrack();
  }

  // class para el ícono play/pause (mantenemos id y clases tal cual para que no rompa tus estilos)
  const iconClass = isPlaying ? "bi bi-pause-btn-fill" : "bi bi-play-btn-fill";

  return (
    <>
      <main className="w-screen h-screen sm:w-[700px] sm:h-[600px] sm:rounded-xl p-4 grid grid-cols-1 grid-rows-8 sm:block">

        <header>
          <h1>Mi Web App</h1>
          <br className="hidden sm:block" />
          <hr />
          <nav className="flex gap-4 items-center justify-center py-[10px]">
            <button
              onClick={() => setActiveSection('music')}
              className={`BUTTOM-NAV py-2 px-3 rounded-xl text-sm ${activeSection === 'music' ? 'bg-blue-500 text-white' : ''}`}
            > Musicas</button>

            <button
              onClick={() => setActiveSection('genre')}
              className={`BUTTOM-NAV py-2 px-3 rounded-xl text-sm ${activeSection === 'genre' ? 'bg-blue-500 text-white' : ''}`}
            >Genero</button>

            <button
              onClick={() => setActiveSection('artist')}
              className={`BUTTOM-NAV py-2 px-3 rounded-xl text-sm ${activeSection === 'artist' ? 'bg-blue-500 text-white' : ''}`}
            >Artistas</button>
          </nav>
          <hr />
        </header>

        <br className="hidden sm:block" />

        {/* SECTION-CONTAINERS */}
        <section className="row-span-5 row-start-2 sm:w-full sm:h-[300px] overflow-hidden">

          {/* SONGS SECTION */}
          {activeSection === 'music' && (
            <div className="w-full h-full overflow-hidden">
              <ul id='MUSIC_CONTAINER' className="scrollBar overflow-y-scroll h-full p-4">
                {audios.map((audio, index) => (
                  <CreationSong
                    key={index}
                    index={index}
                    title={audio.title}
                    artist={audio.artist}
                    time={audio.time}
                    onSelect={selectTrack}
                    isActive={index === currentIndex}
                  />
                ))}
              </ul>
            </div>
          )}

          {/* GERDER SECTION */}
          {activeSection === 'genre' && (
            <div className="scrollBar w-full h-full overflow-hidden p-2">
              <ul className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                {Object.entries(songsByGenre).map(([genre, count]) => (
                  <GenresSection key={genre} gerder={genre} count={count} />
                ))}
              </ul>
            </div>
          )}

          {/* ARTIST SECTION */}
          {activeSection === 'artist' && (
            <div className="scrollBar w-full h-full overflow-hidden p-2">
              <ul className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                {Object.entries(songsByArtist).map(([artist, count]) => (
                  <ArtistSection key={artist} artist={artist} count={count} />
                ))}
              </ul>
            </div>
          )}

        </section>

        <br className="hidden sm:block" />

        {/* MUSIC PLAYER */}
        <section className="MUSIC-PLAYER
        row-span-2 row-start-7
        sm:w-full sm:h-[100px]
        flex items-center justify-center">

          <div className="player-container
            w-full
            p-2 flex flex-col items-center gap-4">
            {/* vinculamos el src al audios[currentIndex].link */}
            <audio
              id="audio"
              ref={audioRef}
              src={audios[currentIndex]?.link}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleEnded}
            ></audio>

            <div className="controls
                flex gap-4
                text-5xl sm:text-4xl">
              <button id="prev" onClick={prevTrack} className="cursor-pointer"><i className="bi bi-rewind-btn-fill"></i></button>
              <button id="playPause" onClick={togglePlayPause} className="cursor-pointer">
                <i id="iconPlayPause" className={iconClass}></i>
              </button>
              <button id="next" onClick={nextTrack} className="cursor-pointer"><i className="bi bi-fast-forward-btn-fill"></i></button>
            </div>

            <input
              type="range"
              id="progress"
              className="progress w-full sm:w-[300px] h-2 rounded-full overflow-hidden  bg-white/20 appearance-none "
              value={progress}
              min="0"
              max="100"
              onChange={handleProgressChange}
            />

            <p id="audio_selected" className="text-sm">
              {audios[currentIndex]?.title ?? '_'}
            </p>
          </div>
        </section>
      </main>
    </>
  )
}

export default App

