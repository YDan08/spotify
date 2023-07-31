import Image from "next/image"

export const ItemBiblioteca = () => {
	return (
		<div className='flex p-2 gap-x-3 rounded-lg cursor-pointer hover:bg-zinc'>
			<Image src='/album.jpg' alt='album' width={56} height={56} className='rounded-lg' />
			<div className='flex flex-col justify-around'>
				<h1 className='text-white'>Musicas curtidas</h1>
				<p className='text-gray'>playlist</p>
			</div>
		</div>
	)
}
