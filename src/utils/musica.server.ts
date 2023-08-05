import { Musica } from "@/types/musica"
import axios from "axios"

const baseUrl = "http://localhost:3001/musicas"

export const getMusicaById = async (id: number): Promise<Musica | null> => {
	try {
		const response = await axios.get<Musica>(`${baseUrl}/${id}`)
		return response.data
	} catch {
		return null
	}
}
