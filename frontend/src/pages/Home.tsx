import { Button } from "@/components/ui/button"
import logo from "../assets/logo.png"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {FcGoogle} from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/utils/firebase";
import api from "@/utils/axios";
const Home = () => {

  const [openMenu, setOpenMenu] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);

  const googleAuth=async()=>{
    try{
      const result=await signInWithPopup(auth,provider);
      const token=await result.user?.getIdToken();
      const response=await api.post("/api/auth/login",{token});

    }catch(error){
     console.log(error)
    }
  }

  return (
    <div className="min-h-screen w-full bg-white text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" className="h-6 w-6 rounded-sm object-contain" />
            <span className="text-lg font-semibold tracking-tigth">
              SelloraAI
            </span>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <Button onClick={() => setModelOpen(true)} className="bg-indigo-600 hover:bg-indigo-700">
              Sign In
            </Button>
          </div>
          <button className="md:hidden" onClick={() => setOpenMenu(!openMenu)}>
            {openMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {openMenu && (
          <div className="flex flex-col gap-4 border-t border-slate-100 px-4 py-4 sm:px-6 md:hidden">
            <Button onClick={() => setModelOpen(!modelOpen)} className="w-full bg-indigo-600 hover:bg-indigo-700">
              Sign In
            </Button>
          </div>
        )}
      </header>

      <Dialog open={modelOpen} onOpenChange={setModelOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader className="items-center text-center">
            <img src={logo} alt="logo" className="h-10 w-10 rounded-md object-contain" />
            <DialogTitle className="mt-2 text-lg font-semibold">
              SelloraAI
            </DialogTitle>
          </DialogHeader>

          <Button onClick={googleAuth} variant="outline" className="mt-2 w-full gap-2">
             <FcGoogle className="w-4 h-4"/>
             Continue with Google
          </Button>
          <p className="mt-4 text-center text-xs text-slate-400">
            Secure authentication by firebase
          </p>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Home