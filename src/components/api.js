import axios from "axios";

const baseURL = "https://mock-api.driven.com.br/api/v8/cineflex";

const config = {
  headers: {
    common: {
      Authorization: "RemO3eOh1dT1W5imRPVKUR8m",
    },
  },
};

export const listarFilmes = async () => {
  const { data } = await axios.get(`${baseURL}/movies`, config);
  return data;
};

export const listarSessoes = async (filmeId) => {
  const { data } = await axios.get(
    `${baseURL}/movies/${filmeId}/showtimes`,
    config
  );
  return data;
};

export const listarCadeiras = async (sessaoId) => {
  const { data } = await axios.get(
    `${baseURL}/showtimes/${sessaoId}/seats`,
    config
  );
  return data;
};

/**
 * {
	ids: [10015, 10016, 10017],
	name: "Fulano",
	cpf: "12345678900"
}
 */
export const reservarCadeiras = async (body) => {
  console.log(body)
  const { data } = await axios.post(`${baseURL}/seats/book-many`, body, config);
  return data;
};
