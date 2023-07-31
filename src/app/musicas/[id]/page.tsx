import Image from "next/image"

interface PageProps {
	params: {
		id: string
	}
}

export const Musica = ({ params }: PageProps) => {
	return (
		<div className='flex flex-col gap-y-4'>
			<div className='flex items-center gap-x-10'>
				<Image src='/album.jpg' alt='foto' width={240} height={240} />
				<div>
					<h4>Música {params.id}</h4>
					<h2>Nome musica</h2>
					<h3>nome banda</h3>
				</div>
			</div>
			<div className='flex'>
				<button>play</button>
				<button>favoritar</button>
			</div>
		</div>
	)
}

export default Musica
