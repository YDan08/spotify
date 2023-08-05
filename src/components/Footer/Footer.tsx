"use client"
import { Heart, Repeat2, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react"
import Image from "next/image"
import { useContext, useEffect, useReducer, useRef, useState } from "react"
import styles from "../../styles/range.module.css"
import { AppContext } from "@/app/context/AppContext"

interface Tempo {
	tempoAtual: string
	porcentagem: number
	tempoTotal: string
}

interface PLayer {
	play: boolean
	loop: boolean
	mute: boolean
}

interface State {
	player: PLayer
	tempo: Tempo
}

type Action =
	| { type: "play" }
	| { type: "loop" }
	| { type: "mutar" }
	| { type: "setTempo"; porcentagem: number; tempoAtual: string; tempoTotal: string }
	| { type: "mudarPorcentagem"; porcentagem: number }

const reducer = (state: State, action: Action) => {
	switch (action.type) {
		case "play": {
			return {
				...state,
				player: { ...state.player, play: !state.player.play },
			}
		}
		case "loop": {
			return {
				...state,
				player: { ...state.player, loop: !state.player.loop },
			}
		}

		case "mutar": {
			return {
				...state,
				player: { ...state.player, mute: !state.player.mute },
			}
		}

		case "setTempo": {
			return {
				...state,
				tempo: {
					...state.tempo,
					porcentagem: action.porcentagem,
					tempoAtual: action.tempoAtual,
					tempoTotal: action.tempoTotal,
				},
			}
		}

		case "mudarPorcentagem": {
			return {
				...state,
				tempo: { ...state.tempo, porcentagem: action.porcentagem },
			}
		}

		default:
			return state
	}
}

export const Footer = () => {
	const musicRef = useRef<HTMLAudioElement>(null)

	const { fila, handleProximo, handleAnterior } = useContext(AppContext)

	const [state, dispatch] = useReducer(reducer, {
		player: {
			play: false,
			loop: false,
			mute: false,
		},
		tempo: {
			porcentagem: 0,
			tempoAtual: "00:00",
			tempoTotal: "00:00",
		},
	})

	useEffect(() => {
		state.player.play ? musicRef.current?.play() : musicRef.current?.pause()
	}, [state.player.play, musicRef, fila.musicaAtual])

	useEffect(() => {
		if (musicRef.current) musicRef.current.muted = state.player.mute
	}, [state.player.mute])

	const mudarVolume = (volume: number) => {
		if (musicRef.current) {
			if (state.player.mute) {
				dispatch({ type: "mutar" })
			}
			if (volume === 0) {
				dispatch({ type: "mutar" })
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
			dispatch({
				type: "setTempo",
				porcentagem,
				tempoAtual: formatarTempo(musicRef.current.currentTime),
				tempoTotal: formatarTempo(musicRef.current.duration),
			})
		}
	}

	const handleMudarTempo = (valor: number) => {
		if (musicRef.current) {
			musicRef.current.currentTime = (musicRef.current.duration / 100) * valor
			dispatch({ type: "mudarPorcentagem", porcentagem: valor })
		}
	}

	const handleBack = () => {
		handleAnterior()
		if (!state.player.play) {
			dispatch({ type: "play" })
		}
	}

	const handleSkip = () => {
		handleProximo()
		if (!state.player.play) {
			dispatch({ type: "play" })
		}
	}

	useEffect(() => {
		if (state.tempo.porcentagem === 100) {
			if (!state.player.loop) {
				handleSkip()
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.tempo.porcentagem])

	return (
		<footer className='flex justify-between items-center p-6 h-footer w-full bg-black text-white'>
			<div className='flex items-center'>
				<Image src='/album.jpg' alt='album' width={48} height={48} className='rounded-lg' />
				<div className='flex flex-col mx-5 text-sm justify-center'>
					<h2>{fila.musicaAtual.nome}</h2>
					<p className='text-gray '>{fila.musicaAtual.banda}</p>
				</div>
				<Heart className='text-green-200' />
			</div>
			<div className='flex flex-col justify-center items-center gap-y-4'>
				<div className='flex justify-around items-center gap-x-4'>
					<button onClick={() => handleBack()}>
						<SkipBack />
					</button>
					<button
						className='bg-white rounded-full w-7 h-7 flex justify-center items-center'
						onClick={() => dispatch({ type: "play" })}
					>
						{!state.player.play ? (
							<Image width={12} height={12} alt='play' src='/play.svg' />
						) : (
							<Image width={12} height={12} alt='pause' src='/pause.svg' />
						)}
					</button>
					<button onClick={() => handleSkip()}>
						<SkipForward />
					</button>
					<button onClick={() => dispatch({ type: "loop" })}>
						<Repeat2 className={state.player.loop ? "text-green-200" : ""} />
					</button>
				</div>
				<div className='flex gap-x-4 justify-between items-center'>
					<h2>{state.tempo.tempoAtual}</h2>
					<input
						type='range'
						min={0}
						max={100}
						value={state.tempo.porcentagem}
						onChange={e => handleMudarTempo(Number(e.target.value))}
						className={`${styles.range} ${styles.rangePlayer}`}
					/>
					<h2>{state.tempo.tempoTotal}</h2>
				</div>

				<audio
					ref={musicRef}
					src={`/${fila.musicaAtual.audio}`}
					onTimeUpdate={handleTempo}
					autoPlay={true}
					loop={state.player.loop}
				/>
			</div>
			<div className='flex items-center gap-x-2'>
				<button onClick={() => dispatch({ type: "mutar" })}>
					{!state.player.mute ? <Volume2 /> : <VolumeX />}
				</button>
				<input
					type='range'
					min={0}
					max={20}
					step={1}
					onChange={e => mudarVolume(Number(e.target.value))}
					className={`${styles.range} ${styles.rangeMusica}`}
				/>
			</div>
		</footer>
	)
}

export default Footer
