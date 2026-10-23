import { LayoutDashboard, Package, UserRound, type LucideIcon } from "lucide-react"
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Button } from "../ui/button";
export type PartnerTab = "dashboard" | "profile" | "product";

interface PartnerNavProps {
  activeTab: PartnerTab,
  onTabChange: (tab: PartnerTab) => void
}

const Tabs: {
  key: PartnerTab,
  label: string,
  icon: LucideIcon
}[] = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      key: "profile",
      label: "Profile",
      icon: UserRound,
    },
    {
      key: "product",
      label: "Product",
      icon: Package,
    },
  ]

const PartnerNav = ({
  activeTab,
  onTabChange
}: PartnerNavProps) => {

  const navigate = useNavigate();
  return (
    <div className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-2 flex items-center justify-between flex-wrap gap-3 h-16">
          <div onClick={() => navigate("/")} className="flex items-center gap-2 cursor-pointer">
            <img src={logo} alt="logo" className="h-7 w-7 rounded-sm object-contain" />
            <span>Sellora AI</span>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            {
              Tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <Button key={tab.key}
                    onClick={() => onTabChange(tab.key)}
                    size="sm"
                    variant={activeTab === tab.key ? "default" : "ghost"}
                    className={`gap-2${activeTab === tab.key && "shadow:sm"}`}
                  >
                    <Icon className="w-4 h-4"/>
                    {tab.label}
                  </Button>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default PartnerNav
