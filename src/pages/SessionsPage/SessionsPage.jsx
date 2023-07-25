import { useEffect, useState } from "react";
import styled from "styled-components";
import { listarSessoes } from "../../components/api";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/Footer";

export default function SessionsPage() {
  const { idFilme } = useParams();
  const [sessoes, setSessoes] = useState([]);
  const [filme, setFilme] = useState(null);
  const navigate = useNavigate()


  const pegarSessoes = async (idFIlme) => {
    const filme = await listarSessoes(idFilme);
    setFilme(filme)
    setSessoes(filme.days);
  };

  useEffect(() => {
    pegarSessoes(idFilme);
  }, [idFilme]);

  console.log(sessoes);

  return (
    <PageContainer>
      Selecione o horário
      <div>
        {sessoes.map((sessao) => {
          return (
            <SessionContainer>
              {`${sessao.weekday} - ${sessao.date}`}
              <ButtonsContainer>
                {sessao.showtimes.map(showtime =>  <button onClick={() => navigate(`/assentos/${showtime.id}`)}>{showtime.name}</button>)}
              </ButtonsContainer>
            </SessionContainer>
          );
        })}
      </div>
      {filme &&  <Footer
            poster={filme.posterURL}
            titulo={filme.title}
        />
      }
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Roboto";
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-bottom: 120px;
  padding-top: 70px;
  div {
    margin-top: 20px;
  }
`;
const SessionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: "Roboto";
  font-size: 20px;
  color: #293845;
  padding: 0 20px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0;
  button {
    margin-right: 20px;
  }
  a {
    text-decoration: none;
  }
`;