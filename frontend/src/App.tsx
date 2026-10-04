import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import { useGetCurrentUser } from "./hooks/useGetCurrentUser"
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";
import Admin from "./pages/Admin";
import Partner from "./pages/Partner";

interface ISocialLinks {
  youtube?: string;
  instagram?: string;
  linkedin?: string;
  github?: string;
}

interface IPartnerProfile {
  slug?: string;
  bio?: string;
  website?: string;
  socialLinks?: ISocialLinks;

}

interface IPaymentdetails {
  method: "upi" | "bank";
  upiId?: string;
  accountHolderName?: string;
  accountNumber?: string;
  ifscCode?: string;
}

export interface IUser {
  _id?: string,
  firebaseUid: string,
  name: string,
  email: string,
  role: "partner" | "admin",
  partnerProfile: IPartnerProfile
  paymentDetails: IPaymentdetails,
  totalSales: number,
  totalRevenue: number,
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

function App() {
  const { currentUser, userLoading } = useGetCurrentUser();
  const { user, loading } = useSelector((state: RootState) => state.user)
  console.log(currentUser)
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
    )
  }
  return (
    <>
      <Routes>
        <Route path="/" element={user?.role === "admin" ? (
          <Navigate to="/admin" replace />
        ) : (<Home />)} />

        <Route path="/admin" element={user?.role === "admin" ?
           (<Admin />) : (<Navigate to="/" replace />)} />

        <Route path="/partner" element={user?.role === "partner" ? 
          (<Partner />) : user?.role === "admin" ? (<Navigate to="/admin" replace />) : (<Navigate to="/" replace />)} />

      </Routes>
    </>
  )
}

export default App