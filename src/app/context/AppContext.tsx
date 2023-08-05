"use client"
import { Musica } from "@/types/musica"
import { createContext, useCallback, useMemo, useReducer } from "react"

interface Fila {
	musicaAtual: Musica
	musicas: Musica[]
}

type Action =
	| { type: "adicionarLista"; musicas: Musica[] }
	| { type: "proximo" }
	| { type: "anterior" }

interface State {
	fila: Fila
}

interface AppContextProps {
	fila: Fila
	handleProximo: () => void
	handleAnterior: () => void
	setLista: (fila: Musica[]) => void
}

//@ts-ignore
export const AppContext = createContext<AppContextProps>({
	fila: {
		musicaAtual: {
			id: 1,
			nome: "Stressed Out",
			banda: "Twenty One Pilots",
			audio: "stressedout.mp3",
		},
		musicas: [
			{
				id: 1,
				nome: "Stressed Out",
				banda: "Twenty One Pilots",
				audio: "stressedout.mp3",
			},
		],
	},
})

const reducer = (state: State, action: Action) => {
	switch (action.type) {
		case "adicionarLista": {
			return {
				...state,
				fila: { musicas: action.musicas, musicaAtual: action.musicas[0] },
			}
		}
		case "proximo": {
			if (state.fila.musicas.length === 0 || state.fila.musicas.length === 1) return state

			if (
				state.fila.musicas[state.fila.musicas.length - 1].id === state.fila.musicaAtual.id
			)
				return state

			return {
				...state,
				fila: {
					...state.fila,
					musicaAtual:
						state.fila.musicas[state.fila.musicas.indexOf(state.fila.musicaAtual) + 1],
				},
			}
		}

		case "anterior": {
			if (state.fila.musicas.length === 0 || state.fila.musicas.length === 1) return state

			if (state.fila.musicas[0] === state.fila.musicaAtual) return state

			return {
				...state,
				fila: {
					...state.fila,
					musicaAtual:
						state.fila.musicas[state.fila.musicas.indexOf(state.fila.musicaAtual) - 1],
				},
			}
		}
		default:
			return state
	}
}

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, {
		fila: {
			musicaAtual: {
				id: 1,
				nome: "Stressed Out",
				banda: "Twenty One Pilots",
				audio: "stressedout.mp3",
			},
			musicas: [
				{
					id: 1,
					nome: "Stressed Out",
					banda: "Twenty One Pilots",
					audio: "stressedout.mp3",
				},
			],
		},
	})

	const setLista = useCallback((musicas: Musica[]) => {
		dispatch({ type: "adicionarLista", musicas })
	}, [])

	const handleProximo = useCallback(() => {
		dispatch({ type: "proximo" })
	}, [])

	const handleAnterior = useCallback(() => {
		dispatch({ type: "anterior" })
	}, [])

	const context = useMemo(() => {
		return {
			fila: state.fila,
			handleProximo,
			handleAnterior,
			setLista,
		}
	}, [state.fila, handleProximo, handleAnterior, setLista])
	return <AppContext.Provider value={context}>{children}</AppContext.Provider>
}
