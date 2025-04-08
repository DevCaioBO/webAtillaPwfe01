import { useState,useEffect } from "react"
import { Link,useParams,useNavigate } from "react-router-dom"
import {toast} from 'react-toastify'
import api from "../../services/api"
import './filme.css'
export default function Filme() {
    //caio<- pegando vamos pegar o id diretamente da url
    const {id} = useParams()

    //caio<- declarando a navegação
    const navigate = useNavigate()

    const [movie,setMovie] = useState(null)
    const [loading,setLoading] = useState(true)

   useEffect(()=>{
       const readMovie = async()=>{
        setLoading(true)
        try{
            const response = await api.get(`r-api/?api=filmes/${id}`)
            setMovie(response.data)

        }catch(e){
            console.error("Filme não encontrado redirecionado para a home page")
            navigate("/", {replace:true})
        }
        finally{
            setLoading(false)
        }
       }                    
       readMovie()
   },[id,navigate])

   const saveMovie = ()=>{
    if(!movie)return
    const myList = localStorage.getItem('@primeflix');
    let filmSave = JSON.parse(myList) ||[]
    const haveMovie = filmSave.some((filmSave)=> filmSave.id === movie.id)
    if(haveMovie){
        toast.warn('Este filme ja se encontra nos favoritos!!!!!!!!!')
        return
    }
    filmSave.push(movie)
    localStorage.setItem('@primeflix',JSON.stringify(filmSave))
    toast.success('Filme salvo com sucesso!')
   }
   if(loading){
    return(
        <div className="loading-container">
            <h1>Carregando detalhes...</h1>
        </div>
    )
   }
   //vamos ver se o filme foi encontrado
  return (
    <div className="container">
        <div className="filme-info">
            <article>
                <h1>{movie.nome}</h1>
                <img src={movie.foto} alt={movie.nome} />
                <h3>Sinopse</h3>
                <p>{movie.sinopse}</p>
                <div className="botoes">
                    <button onClick={saveMovie}>Salvar</button>
                    <a href={`https://www.youtube.com/results?search_query=${encodeURIComponentm(movie.nome + " Trailer")}`}  target="blank" rel="noopener noreferrer ">Trailer</a>
                </div>    
            </article>
            </div>
    </div>
  )
}

