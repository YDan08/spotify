import Image from "next/image"

export const ItemPlaylist = () => {
	return (
		<div className='rounded flex bg-zinc items-center cursor-pointer hover:bg-zinc-600'>
			<Image src='/album.jpg' alt='album' width={80} height={80} className='rounded-l' />
			<h3 className='ml-5'>Blurryface</h3>
		</div>
	)
}

export default ItemPlaylist
