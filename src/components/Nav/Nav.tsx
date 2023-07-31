import { Home, Search, Library } from "lucide-react"
import { ItemBiblioteca } from "../ItemBiblioteca"
import styles from "../../styles/scrollbar.module.css"
import Link from "next/link"

export const Nav = () => {
	return (
		<nav className='flex flex-col w-1/4 text-gray mr-2 gap-y-2'>
			<div className='flex flex-col gap-y-6 bg-gray rounded-lg p-4'>
				<Link href={"/"}>
					<button className='flex w-full hover:text-white'>
						<Home />
						<span className='ml-6'>Início</span>
					</button>
				</Link>
				<Link href={"/busca"}>
					<button className='flex w-full hover:text-white'>
						<Search />
						<span className='ml-6'>Buscar</span>
					</button>
				</Link>
			</div>
			<div className='flex flex-col flex-1 bg-gray rounded-lg pt-4'>
				<h2 className='flex ml-4 mb-5'>
					<Library />
					<span className='ml-2'>Sua Biblioteca</span>
				</h2>

				<div className={styles.scrollbar}>
					<div className='flex flex-col w-full gap-y-2 pt-1 px-4'>
						<div className='relative w-full display text-gray'>
							<input
								className='bg-zinc py-2 pl-9 rounded w-full placeholder:text-gray focus:border-none'
								placeholder='Buscar em sua biblioteca'
							/>
							<Search className='absolute top-2 left-2 w-5' />
						</div>
						<ItemBiblioteca />
						<ItemBiblioteca />
						<ItemBiblioteca />
						<ItemBiblioteca />
						<ItemBiblioteca />
						<ItemBiblioteca />
						<ItemBiblioteca />
						<ItemBiblioteca />
						<ItemBiblioteca />
						<ItemBiblioteca />
						<ItemBiblioteca />
						<ItemBiblioteca />
					</div>
				</div>
			</div>
		</nav>
	)
}
