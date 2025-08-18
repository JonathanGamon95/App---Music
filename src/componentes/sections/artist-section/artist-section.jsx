// CREACION DE ARTISTAS
import imageArtist from "../../../assets/imagen/4a.jpg"

function ArtistSection({artist, count}) {

    return (
        <li className="aspect-square bg-[green] relative rounded-xl select-none overflow-hidden text-sm">
            <img src={imageArtist} alt="imaegn-album"></img>
            <div className="absolute bottom-2 left-2 flex flex-col gap-1">
                <h1>{artist}</h1>
                <div className="flex gap-2">
                    <i className="bi bi-apple-music"></i>
                    <p>{count}</p>
                </div>
            </div>
        </li>
    )
}

export default ArtistSection;