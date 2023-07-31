import { Playlist } from "@/types/playlist"
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
