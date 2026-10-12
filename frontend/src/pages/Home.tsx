import { Button } from "@/components/ui/button"
import logo from "../assets/logo.png"
import { useState } from "react"
import { BookOpen, Code2, Contact, GraduationCap, LayoutTemplate, LogOut, Menu, MessageSquare, X, type LucideIcon } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/utils/firebase";
import api from "@/utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "@/redux/store";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { logOutUser, setUser } from "@/redux/userSlice";
import { toast } from "sonner";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import img from "../assets/image.png"
const Home = () => {

  interface Categories {
    title: string,
    icon: LucideIcon
  }

  const categories: Categories[] = [
    { title: "Courses", icon: GraduationCap },
    { title: "Source Code", icon: Code2 },
    { title: "Templates", icon: LayoutTemplate },
    { title: "Ebooks", icon: BookOpen },
    { title: "AI Prompts", icon: MessageSquare },
  ]

  interface Step {
    number: number,
    title: string,
    desc: string
  }

  const steps: Step[] = [
    {
      number: 1,
      title: "Explore Products",
      desc: "Browse thousands of high-quality digital assets across multiple categories.",
    },
    {
      number: 2,
      title: "Purchase Instantly",
      desc: "Secure checkout and immediate access to your downloaded files or links.",
    },
    {
      number: 3,
      title: "Sell & Earn",
      desc: "Join as a creator, upload your work, and start generating passive income.",
    },
  ]

  const [openMenu, setOpenMenu] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const navigate = useNavigate();

  const { user,admin } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>()


  const googleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user?.getIdToken();
      const response = await api.post("/api/auth/login", { token });

      dispatch(setUser(response.data.user))
      setModelOpen(false);
      toast.success("Login Successfully")

    } catch (error) {
      console.log(error)
      toast.error("Failed to Login")
    }
  }

  const handleLogout = async () => {
    try {
      const response = await api.get("/api/auth/logout");
      if (response.data.success) {
        dispatch(logOutUser())
      }
      toast.success("Logout Successfully")
    } catch (error) {
      console.log(error)
      toast.error("Logout Failed")
    }
  }

  return (
    <div className="min-h-screen w-full bg-white text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" className="h-6 w-6 rounded-sm object-contain" />
            <span className="text-lg font-semibold tracking-tight">
              SelloraAI
            </span>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            {user ? (<div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-indigo-100 text-xs font-meduim text-indigo-600">
                    {
                      user?.name
                        ?.trim()
                        .split(/\s+/)
                        .map(part => part[0])
                        .join("")
                        .toUpperCase()
                    }
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-slate-700">
                  {user?.name}
                </span>
              </div>
              <Button onClick={handleLogout} variant={"outline"} className="gap-1.5">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>) : (
              <Button onClick={() => setModelOpen(true)} className="bg-indigo-600 hover:bg-indigo-700">
                Sign In
              </Button>
            )}
          </div>
          <button className="md:hidden" onClick={() => setOpenMenu(!openMenu)}>
            {openMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {openMenu && (
          <div className="flex flex-col gap-4 border-t border-slate-100 px-4 py-4 sm:px-6 md:hidden">
            {user ? <>
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-indigo-100 text-xs font-meduim text-indigo-600">
                    {
                      user?.name
                        ?.trim()
                        .split(/\s+/)
                        .map(part => part[0])
                        .join("")
                        .toUpperCase()
                    }
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-slate-700">
                  {user?.name}
                </span>
              </div>
              <Button onClick={handleLogout} variant={"outline"} className="w-full gap-1.5">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </> : <Button onClick={() => setModelOpen(!modelOpen)} className="w-full bg-indigo-600 hover:bg-indigo-700">
              Sign In
            </Button>
            }
            <Button onClick={() => setModelOpen(!modelOpen)} className="w-full bg-indigo-600 hover:bg-indigo-700">
              Sign In
            </Button>
          </div>
        )}
      </header>

      <main className="bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-4 sm:px-6 sm:py-20 md:grid-cols-2 md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 text-center md:text-left">
            <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium tracking-wide text-indigo-600">
              PREMIUM MARKETPALCE
            </span>
            <h1 className="text-2xl font-semibold leading-tight text-slate-900 sm:text-3xl md:text-4xl">
              Discover Premium Digital Products Built By Creators
            </h1>
            <p className="mx-auto max-w-md text-slate-600 md:mx-0">
              Buy courses, source codes, tempaltes, AI prompts, ebooks and digital assets from trusted creators. Elevate your projects with top-tier
            </p>
            <div className="flex justify-center pt-2 md:justify-start">
              {
                user ? (
                  <Button onClick={() => navigate("/partner")} className="bg-indigo-600 px-6 hover:bg-indigo-700">
                    Start selling your digital products
                  </Button>
                ) : (
                  <Button onClick={() => setModelOpen(true)} className="bg-indigo-600 px-6 hover:bg-indigo-700">
                    Become a partner
                  </Button>
                )
              }
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-2xl bg-white p-4 shadow-xl shadow-indigo-100 sm:p-6">
            <img src={img} alt="img" className="w-full rounded-lg object-cover" />
          </motion.div>
        </div>
      </main>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center sm:mb-12">
          <h2 className="text-lg font-semibold text-slate-900">
            Popular Categories
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Explore our curated selection of high-quality digital assets.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat, i) => {
            const Icon = cat.icon
            return (
              <motion.div
              key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex w-28 flex-col items-center gap-2 rounded-xl border bg-slate-50 px-4 py-4 text-center transition-colors sm:w-32 hover:border-indigo-200 border-slate-100"
              >
                <Icon className="h-6 w-6 hover:text-indigo-600 text-slate-700" />
                <span className="font-mono text-xs hover:text-indigo-600 text-slate-700"> {cat.title}</span>
              </motion.div>
            )
          })}
        </div>
      </section>

      <section className="bg-indigo-50/60 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center sm:mb-12">
            <h2 className="text-lg font-semibold text-slate-900">
              How It Works
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              A seamless experinece for both buyers and creators
            </p>
          </motion.div>

          <div className="mt-4 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
            {steps.map((s, i) => (
              <motion.div
              key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative flex flex-col items-center"
              >
                {i !== 0 && <span className="absolute right-1/2 top-5 hidden h-0.5 w-full bg-slate-300 sm:block" />}

                <div className="relative z-10 mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-semibold text-slate-700 shadow-sm hover:bg-indigo-600 hover:text-white">
                  {s.number}
                </div>

                <h2 className="font-meduim text-slate-90">{s.title}</h2>
                <div className="my-3 h-px w-28 bg-slate-200" />
                <p className="max-w-[220px] text-sm text-slate-500">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <footer className="bg-slate-950 py-12 text-slate-300">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center sm:px-6">
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" className="h-6 w-6 rounded-sm object-contain" />
            <span className="text-lg font-semibold tracking-tight">
              SelloraAI
            </span>
          </div>
          <p className="max-w-sm text-sm text-slate-400">
            The premier infrastructure for AI-driven commerce. Empowering creators globally.
          </p>
          <div className="flex text-sm items-center justify-center gap-2 text-slate-400">
            <Contact size={20} /> Email-{admin?.email}
          </div>
          <div className="mt-4 w-full border-t border-slate-800 pt-6 text-xs text-slate-500">
            © {new Date().getFullYear()} SelloraAI. All rights reserved.
          </div>
        </div>
      </footer>


      <Dialog open={modelOpen} onOpenChange={setModelOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader className="items-center text-center">
            <img src={logo} alt="logo" className="h-10 w-10 rounded-md object-contain" />
            <DialogTitle className="mt-2 text-lg font-semibold">
              SelloraAI
            </DialogTitle>
          </DialogHeader>

          <Button onClick={googleAuth} variant="outline" className="mt-2 w-full gap-2">
            <FcGoogle className="w-4 h-4" />
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