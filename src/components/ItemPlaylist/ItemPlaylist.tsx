import Image from "next/image"
import Link from "next/link"

interface ItemPLaylistProps {
	id: number
	nome: string
}

export const ItemPlaylist = ({ nome, id }: ItemPLaylistProps) => {
	return (
		<Link href={`/playlists/${id}`}>
			<div className='rounded flex bg-zinc items-center cursor-pointer hover:bg-zinc-600'>
				<Image src='/album.jpg' alt='album' width={80} height={80} className='rounded-l' />
				<h3 className='ml-5'>{nome}</h3>
			</div>
		</Link>
	)
}

export default ItemPlaylist
