import { useEffect } from "react"
import { useState } from "react"
import styled from "styled-components"
import { listarFilmes } from "../../components/api"
import { useNavigate } from "react-router-dom"

export default function HomePage() {
    const [movies, setMovies] = useState([])
    const navigate = useNavigate();
    const atualizarFilmes = async () => {
        const filmes  = await listarFilmes();
        setMovies(filmes)
    }
    useEffect(() => {
        atualizarFilmes()
     }, [])

     const selecionarFilme = (filmeId) => {
        navigate(`/sessoes/${filmeId}`)
     }
    
    return (
        <PageContainer>
            Selecione o filme

            <ListContainer>
                {movies.map(movie => {
                    return (
                        <MovieContainer data-test="movie" onClick={() => selecionarFilme(movie.id)}> 
                            <img src={movie.posterURL} alt={movie.title} />
                        </MovieContainer>
                    )
                })}
            </ListContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-top: 70px;
`
const ListContainer = styled.div`
    width: 330px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`
const MovieContainer = styled.div`
    width: 145px;
    height: 210px;
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    cursor: pointer;
    img {
        width: 130px;
        height: 190px;
    }
`