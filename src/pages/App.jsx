import { Route, Routes } from "react-router-dom"
import Login from "./Login"
import Inicio from "./Inicio"


function App() {
    return (
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        { /* <Route path="*" element={<Navigate to="/" />} /> */ }
      </Routes>
    )
  }
  
  export default App