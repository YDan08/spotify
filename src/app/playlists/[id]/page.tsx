import { BotaoPlayFila } from "@/components/BotaoPlayFila"
import { ItemMusica } from "@/components/ItemMusica"
import { getMusicasPlaylist, getPlaylistById } from "@/utils/playlist.server"
import Image from "next/image"

interface PageProps {
	params: {
		id: string
	}
}

export const Playlist = async ({ params }: PageProps) => {
	const playlist = await getPlaylistById(Number(params.id))
	const data = await getMusicasPlaylist(Number(params.id))

	return (
		<div className='flex flex-col gap-y-10'>
			<div className='flex gap-x-7 items-end'>
				<Image src='/album.jpg' alt='foto' width={240} height={240} />
				<div className='flex flex-col'>
					<h4>Playlist</h4>
					<h2 className='text-6xl mt-1 mb-8'>{playlist?.nome}</h2>
					<h3>dono</h3>
				</div>
			</div>
			<div className='flex gap-x-6'>
				{data?.musicas && data.musicas.length !== 0 && (
					<BotaoPlayFila musicas={data?.musicas} />
				)}
				<button>favoritar</button>
			</div>
			<div className='flex flex-col gap-y-8 px-6'>
				{data?.musicas &&
					data.musicas.length !== 0 &&
					data.musicas.map((musica, posicao) => (
						<ItemMusica key={posicao} posicao={posicao} musica={musica} />
					))}
			</div>
		</div>
	)
}
export default Playlist
