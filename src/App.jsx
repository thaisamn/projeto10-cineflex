import styled from "styled-components";
import HomePage from "./pages/HomePage/HomePage";
import SeatsPage from "./pages/SeatsPage/SeatsPage";
import SessionsPage from "./pages/SessionsPage/SessionsPage";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
  },
  {
    path: "/sessoes/:idFilme",
    element: <SessionsPage/>,
  },
  {
    path: "/assentos/:idSessao",
    element: <SeatsPage/>,
  },
  {
    path: "/sucesso",
    element: <SuccessPage/>,
  },
]);

export default function App() {
  return (
    <>
      <NavContainer>CINEFLEX</NavContainer>
      <RouterProvider router={routes} />
    </>
  );
}

const NavContainer = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #c3cfd9;
  color: #e8833a;
  font-family: "Roboto", sans-serif;
  font-size: 34px;
  position: fixed;
  top: 0;
  a {
    text-decoration: none;
    color: #e8833a;
  }
`;
