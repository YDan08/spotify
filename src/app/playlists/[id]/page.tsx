import Image from "next/image"

interface PageProps {
	params: {
		id: string
	}
}

export const Playlist = ({ params }: PageProps) => {
	return (
		<div className='flex flex-col gap-y-4'>
			<div className='flex gap-x-10 items-center'>
				<Image src='/album.jpg' alt='foto' width={240} height={240} />
				<div>
					<h4>Playlist {params.id}</h4>
					<h2>Nome Playlist</h2>
					<h3>dono</h3>
				</div>
			</div>
			<div>
				<button>play</button>
				<button>favoritar</button>
			</div>
		</div>
	)
}
export default Playlist
