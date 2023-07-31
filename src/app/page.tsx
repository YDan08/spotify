import { ItemPlaylist } from "@/components/ItemPlaylist"
import { getPlaylists } from "@/utils/playlist.server"

export const Home = async () => {
	const playlists = await getPlaylists()

	return (
		<div>
			<h1 className='text-3xl'>Boa Noite</h1>
			<div className='mt-10 grid grid-cols-3 gap-8'>
				{playlists.length !== 0 &&
					playlists.map(playlist => (
						<ItemPlaylist key={playlist.id} id={playlist.id} nome={playlist.nome} />
					))}
			</div>
		</div>
	)
}

export default Home
