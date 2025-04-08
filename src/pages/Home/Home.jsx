import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import './home.css'
export default function Home() {
    const [movies,setMovies] = useState([])
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        const collectMovies=async()=>{
            try{
                const response = await api.get('r-api/?api=filmes')
                setMovies(response.data)

            }catch(e){
                console.error("erro de BIOOOOOS BURROOOO Deu Erro ao ler os filmes "+ e)
            }
            finally{
                setLoading(false)
            }

        }
        collectMovies()
    },[])

    
     
       
    

  return (
    loading?<div className='loading-container'></div>:
    <div className='container'>
        <div className='lista-filmes'>
            {movies.map(oneMovie=>(
                <article key={oneMovie.id}>
                    <strong>{oneMovie.nome}</strong>
                    <img src={oneMovie.foto} alt={"foto do filme "+oneMovie.nome} /> 
                    <Link to={`/filme/${oneMovie.id}`}>Acessar</Link>               
                </article>

            ))}
        </div>
    </div>
 )
}