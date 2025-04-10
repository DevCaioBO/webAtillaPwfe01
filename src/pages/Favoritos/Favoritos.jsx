import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import "./favoritos.css"

export default function Favoritos() {
    const [movie, setMovie] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        try {
            const myList = localStorage.getItem('@primeflix')
            setMovie(JSON.parse(myList))
        } catch (error) {
            console.log('Erro ao carregar filmes salvos', error)
            toast.error("mini nelson")
            setMovie([])
        } finally {
            setLoading(false)
        }
    },[])

    function Remove(id) {
        const confirma = window.confirm('Tem certeza que deseja apagar esse filmeeee?')
        if (!confirma) {
            return
        }
        try {
            const filmesFiltrados = movie.filter((item) => item.id !== id);
            setMovie(filmesFiltrados)
            localStorage.setItem('@primeflix', JSON.stringify(filmesFiltrados))
            toast.success('Filme deletado com sucesso!')

        } catch (error) {
            console.error('Error ao excluir um filme do localstorage')
            toast.error('Falha ao deletar um filme do localstorage')

        }
    }
    return (
        loading ? <div className="loading-container">
            <h2>Carregando seu filme seu lixo!</h2>
        </div> : <div className="container">
            <div className="filmes-container">
                <h2>Filmes favoritos</h2>
                {movie.length === 0 && (
                    <span className="lista-vazia"></span>
                )
                
             }
             <ul>
                {movie.map((item)=>(
                    <li key={item.id}>
                        <span >{item.nome}</span>
                        <div className="acoes">
                            <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                            <button onClick={()=> Remove(item.id)}></button>
                        </div>
                    </li>
                ))}
             </ul>
            </div>
        </div>
    )
}
