import { useState } from "react";
import styled from "styled-components";

export default function FormReserva({ submit }) {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");

  const escreveInput = (state, valor) => {
    if (state === "name") {
      setName(valor);
    } else {
      setCpf(valor);
    }
  };

  const enviar = () => name && cpf && submit({ name, cpf });

  return (
    <FormContainer>
      Nome do Comprador:
      <input
      data-test="client-name" 
        name="name"
        defaultValue={name}
        onChange={(e) => escreveInput("name", e.target.value)}
        placeholder="Digite seu nome..."
      />
      CPF do Comprador:
      <input
      data-test="client-cpf" 
        name="cpf"
        defaultValue={cpf}
        onChange={(e) => escreveInput("cpf", e.target.value)}
        placeholder="Digite seu CPF..."
      />
      <button  data-test="book-seat-btn" onClick={enviar}>Reservar Assento(s)</button>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  width: calc(100vw - 40px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0;
  font-size: 18px;
  button {
    margin-top: 50 px;
    width: 225px;
    height: 42px;
    align-self: center;
    background-color: #E8833A;
    color: white;
    border: none;
    font-family: "Roboto";
  font-size: 18px;
  border-radius: 3px
  }
  input {
    margin-bottom: 12px;
    height: 51px;
    border: 1px solid #D4D4D4;
    color: #D4D4D4;
    border-radius: 3px;
    width: calc(100vw - 60px);
  }
`;
