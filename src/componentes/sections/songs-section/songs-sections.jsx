//  CREACION DE CANCIONES

function CreationSong({ index, title, artist, time, onSelect, isActive }) {
    return (
        <>
            <li
                onClick={() => onSelect(index)}
                className={`flex items-center justify-between p-2 w-full bg-[#253141] my-[10px] rounded-lg cursor-pointer ${isActive ? 'opacity-90' : ''}`}>

                <div className="grid grid-cols-[auto_1fr] grid-rows-1 text-sm gap-4">
                    <div className="flex flex-col px-2">
                        <h1 className="TITLE-SONG text-lg">{title}</h1>
                        <p className="SONG-ARTIST">{artist}</p>
                    </div>
                </div>
                <h1>{time}</h1>
            </li>
        </>
    )
}

export default CreationSong;
