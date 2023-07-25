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
        name="name"
        defaultValue={name}
        onChange={(e) => escreveInput("name", e.target.value)}
        placeholder="Digite seu nome..."
      />
      CPF do Comprador:
      <input
        name="cpf"
        defaultValue={cpf}
        onChange={(e) => escreveInput("cpf", e.target.value)}
        placeholder="Digite seu CPF..."
      />
      <button onClick={enviar}>Reservar Assento(s)</button>
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
    align-self: center;
    padding: 4px;
  }
  input {
    margin-bottom: 12px;
    width: calc(100vw - 60px);
  }
`;
