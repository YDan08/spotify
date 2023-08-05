import { Musica } from "./musica"

export interface Playlist {
	id: number
	nome: string
}

export interface MusicasPlaylist {
	playlistId: number
	musicas: Musica[]
}
