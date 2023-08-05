"use client"
import { AppContext } from "@/app/context/AppContext"
import { Musica } from "@/types/musica"
import Image from "next/image"
import { useContext } from "react"

interface BotaoPlayFila {
	musicas: Musica[]
}
export const BotaoPlayFila = ({ musicas }: BotaoPlayFila) => {
	const { setLista } = useContext(AppContext)
	return (
		<button
			className='bg-green-500 rounded-full w-10 h-10 flex justify-center items-center'
			onClick={() => setLista(musicas)}
		>
			<Image width={28} height={28} alt='play' src='/play.svg' />
		</button>
	)
}

export default BotaoPlayFila
