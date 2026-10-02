import { Button } from "@/components/ui/button"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import { getCurrentUser } from "./hooks/useGetCurrentUser"

function App() {
  getCurrentUser();
  return (
   <>
   <Routes>
    <Route path="/" element={<Home/>}/>
   </Routes>
   </>
  )
}

export default App