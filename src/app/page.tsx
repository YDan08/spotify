import { ItemPlaylist } from "@/components/ItemPlaylist"

export default function Home() {
	return (
		<div>
			<h1 className='text-3xl'>Boa Noite</h1>
			<div className='mt-10 grid grid-cols-3 gap-8'>
				<ItemPlaylist />
				<ItemPlaylist />
				<ItemPlaylist />
				<ItemPlaylist />
				<ItemPlaylist />
				<ItemPlaylist />
			</div>
		</div>
	)
}
