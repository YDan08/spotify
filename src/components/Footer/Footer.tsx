"use client"
import { Heart, Repeat2, Volume2, VolumeX } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import styles from "../../styles/range.module.css"

interface player {
	play: boolean
	mute: boolean
	tempo: {
		tempoAtual: string
		porcentagem: number
		tempoTotal: string
	}
	loop: boolean
}

export const Footer = () => {
	const [player, setPlayer] = useState<player>({
		play: false,
		mute: false,
		tempo: {
			porcentagem: 0,
			tempoAtual: "00:00",
			tempoTotal: "00:00",
		},
		loop: false,
	})
	const musicRef = useRef<HTMLAudioElement>(null)
	const tocar = () => {
		setPlayer({ ...player, play: !player.play })
	}

	useEffect(() => {
		player.play ? musicRef.current?.play() : musicRef.current?.pause()
	}, [player.play])

	useEffect(() => {
		if (musicRef.current) musicRef.current.muted = player.mute
	}, [player.mute])

	useEffect(() => {
		if (!player.loop) {
			if (player.tempo.porcentagem === 100) {
				if (musicRef.current) {
					musicRef.current.currentTime = 0
				}
				setPlayer({
					...player,
					play: false,
					tempo: {
						...player.tempo,
						porcentagem: 0,
					},
				})
			}
		}
	}, [player, player.tempo.porcentagem])

	const mudarVolume = (volume: number) => {
		if (musicRef.current) {
			if (player.mute) {
				setPlayer({ ...player, mute: !player.mute })
			}
			if (volume === 0) {
				setPlayer({ ...player, mute: !player.mute })
			}
			musicRef.current.volume = volume / 20
		}
	}

	const formatarTempo = (tempo: number) => {
		const minutos = Math.floor(tempo / 60)
		const segundos = Math.floor(tempo % 60)
		return `${("0" + minutos).slice(-2)}:${("0" + segundos).slice(-2)}`
	}

	const handleTempo = () => {
		if (musicRef.current) {
			const porcentagem = (musicRef.current?.currentTime / musicRef.current.duration) * 100
			setPlayer({
				...player,
				tempo: {
					porcentagem,
					tempoAtual: formatarTempo(musicRef.current.currentTime),
					tempoTotal: formatarTempo(musicRef.current.duration),
				},
			})
		}
	}

	const handleMudarTempo = (valor: number) => {
		if (musicRef.current) {
			musicRef.current.currentTime = (musicRef.current.duration / 100) * valor
			setPlayer({
				...player,
				tempo: {
					...player.tempo,
					porcentagem: valor,
				},
			})
		}
	}

	const handleMutar = () => {
		setPlayer({ ...player, mute: !player.mute })
	}

	const handleLoop = () => {
		setPlayer({ ...player, loop: !player.loop })
	}

	return (
		<footer className='flex justify-between items-center p-6 h-footer w-full bg-black text-white'>
			<div className='flex items-center'>
				<Image src='/album.jpg' alt='album' width={48} height={48} className='rounded-lg' />
				<div className='flex flex-col mx-5 text-sm justify-center'>
					<h2>Stressed Out</h2>
					<p className='text-gray '>Twenty One Pilots</p>
				</div>
				<Heart className='text-green-200' />
			</div>
			<div className='flex flex-col justify-center items-center gap-y-4'>
				<div className='flex justify-around items-center gap-x-4'>
					<button
						className='bg-white rounded-full w-7 h-7 flex justify-center items-center'
						onClick={() => tocar()}
					>
						{!player.play ? (
							<Image width={12} height={12} alt='play' src='/play.svg' />
						) : (
							<Image width={12} height={12} alt='pause' src='/pause.svg' />
						)}
					</button>
					<button onClick={() => handleLoop()}>
						<Repeat2 className={player.loop ? "text-green-200" : ""} />
					</button>
				</div>
				<div className='flex gap-x-4 justify-between items-center'>
					<h2>{player.tempo.tempoAtual}</h2>
					<input
						type='range'
						min={0}
						max={100}
						value={player.tempo.porcentagem}
						onChange={e => handleMudarTempo(Number(e.target.value))}
						className={styles.range}
					/>
					<h2>{player.tempo.tempoTotal}</h2>
				</div>
				<audio
					ref={musicRef}
					src='/stressedout.mp3'
					onTimeUpdate={handleTempo}
					loop={player.loop}
				/>
			</div>
			<div className='flex items-center gap-x-2'>
				<button onClick={() => handleMutar()}>
					{!player.mute ? <Volume2 /> : <VolumeX />}
				</button>
				<input
					type='range'
					min={0}
					max={20}
					step={1}
					onChange={e => mudarVolume(Number(e.target.value))}
					className={styles.range}
				/>
			</div>
		</footer>
	)
}

export default Footer
