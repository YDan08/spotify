import { Musica } from "@/types/musica"
import { getMusicaById } from "@/utils/musica.server"

interface ItemMusicaProps {
	musica: Musica
	posicao: number
}

export const ItemMusica = async ({ musica, posicao }: ItemMusicaProps) => {
	return (
		<div className='flex items-center gap-x-10'>
			<h4 className='text-gray'>{posicao}</h4>
			<div className='flex flex-col justify-center'>
				<h3>{musica?.nome}</h3>
				<h3 className='text-gray'>{musica?.banda}</h3>
			</div>
		</div>
	)
}

export default ItemMusica
