import { MusicasPlaylist, Playlist } from "@/types/playlist"
import axios from "axios"

const baseUrl = "http://localhost:3001/playlists"

export const getPlaylists = async (): Promise<Playlist[]> => {
	try {
		const response = await axios.get<Playlist[]>(baseUrl)
		return response.data
	} catch {
		return []
	}
}

export const getPlaylistById = async (id: number): Promise<Playlist | null> => {
	try {
		const response = await axios.get<Playlist>(`${baseUrl}/${id}`)
		return response.data
	} catch {
		return null
	}
}

export const getMusicasPlaylist = async (id: number): Promise<MusicasPlaylist | null> => {
	try {
		const response = await axios.get<MusicasPlaylist[]>(
			`http://localhost:3001/playlistmusicas?playlistId=${id}`
		)
		return response.data[0]
	} catch {
		return null
	}
}
