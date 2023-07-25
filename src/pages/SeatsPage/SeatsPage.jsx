import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { listarCadeiras, reservarCadeiras } from "../../components/api";
import { useState } from "react";
import Footer from "../../components/Footer";
import FormReserva from "../../components/FormReserva";

export default function SeatsPage({ salvarReserva }) {
  const { idSessao } = useParams();
  const [cadeiras, setCadeiras] = useState([]);
  const [filme, setFilme] = useState(null);
  const navigate = useNavigate();

  const pegarAssetos = async () => {
    const filme = await listarCadeiras(idSessao);
    console.log(filme);
    setFilme(filme);
    setCadeiras(filme.seats);
  };

  const selecionarAssentos = (assendoId) => {
    let assento = cadeiras.find((_, index) => index === assendoId);
    if (assento.isAvailable) {
      assento.isSelected = !assento.isSelected;
      const assentos = [...cadeiras];
      assentos[assendoId] = assento;
      setCadeiras(assentos);
    }
  };

  const reservar = async (data) => {
    console.log(data);
    const cadeirasSelecionadas = cadeiras.filter(
      (cadeira) => cadeira.isSelected
    );
    if (cadeirasSelecionadas.length > 0) {
      const dados = {
        ids: cadeirasSelecionadas.map((selecionadas) => selecionadas.id),
        ...data,
      };
      const reserva = await reservarCadeiras(dados);
      salvarReserva({
        reserva: dados,
        assentos: cadeirasSelecionadas,
        sessao: filme,
      });
      navigate("/sucesso");
    }
  };

  useEffect(() => {
    pegarAssetos();
  }, [idSessao]);

  return (
    <PageContainer>
      Selecione o(s) assento(s)
      <SeatsContainer>
        {cadeiras.map((cadeira, index) => (
          <SeatItem
            isAvailable={cadeira.isAvailable}
            isSelected={cadeira.isSelected}
            onClick={() => selecionarAssentos(index)}
          >
            {cadeira.name}
          </SeatItem>
        ))}
      </SeatsContainer>
      <CaptionContainer>
        <CaptionItem>
          <CaptionCircle border={"#0E7D71"} background={"#1AAE9E"} />
          Selecionado
        </CaptionItem>
        <CaptionItem>
          <CaptionCircle border={"#7B8B99"} background={"#C3CFD9"} />
          Disponível
        </CaptionItem>
        <CaptionItem>
          <CaptionCircle border={"#F7C52B"} background={"#FBE192"} />
          Indisponível
        </CaptionItem>
      </CaptionContainer>
      <FormReserva submit={reservar} />
      {filme && (
        <Footer
          poster={filme.movie.posterURL}
          titulo={filme.movie.title}
          sessao={`${filme.day.weekday} - ${filme.name}`}
        />
      )}
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto";
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-bottom: 120px;
  padding-top: 70px;
`;
const SeatsContainer = styled.div`
  width: 330px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const CaptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  justify-content: space-between;
  margin: 20px;
`;
const CaptionCircle = styled.div`
  border: 1px solid ${(props) => props.border}; // Essa cor deve mudar
  background-color: ${(props) => props.background}; // Essa cor deve mudar
  height: 25px;
  width: 25px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
`;
const CaptionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
`;
const SeatItem = styled.div`
  border: 1px solid ${({ isSelected }) => (isSelected ? "#0E7D71" : "#7B8B99")}; // Essa cor deve mudar
  background-color: ${({ isSelected }) =>
    isSelected ? "#1AAE9E" : "#C3CFD9"}; // Essa cor deve mudar
  height: 25px;
  width: 25px;
  border-radius: 25px;
  font-family: "Roboto";
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
  cursor: pointer;

  ${({ isAvailable }) =>
    !isAvailable &&
    `
     border: 1px solid #F7C52B; // Essa cor deve mudar
     background-color: #FBE192; // Essa cor deve mudar;
  `}
`;
const FooterContainer = styled.div`
  width: 100%;
  height: 120px;
  background-color: #c3cfd9;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
  position: fixed;
  bottom: 0;

  div:nth-child(1) {
    box-shadow: 0px 2px 4px 2px #0000001a;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    margin: 12px;
    img {
      width: 50px;
      height: 70px;
      padding: 8px;
    }
  }

  div:nth-child(2) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    p {
      text-align: left;
      &:nth-child(2) {
        margin-top: 10px;
      }
    }
  }
`;
