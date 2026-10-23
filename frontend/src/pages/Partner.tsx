import PartnerNav, { type PartnerTab } from '@/components/partner/PartnerNav'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { type AppDispatch, type RootState } from '@/redux/store'
import DeactivateNote from '@/components/partner/DeactivateNote'
import DashboardPanel from '@/components/partner/DashboardPanel'
import ProfilePanel from '@/components/partner/ProfilePanel'
import ProductPanel from '@/components/partner/ProductPanel'
import type { IUser } from '@/App'
import api from '@/utils/axios'
import { setPartner } from '@/redux/userSlice'
import { toast } from 'sonner'

const Partner = () => {

  const [activeTab, setActiveTab] = useState<PartnerTab>("dashboard");
  const [saving, setSaving] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const { partner } = useSelector((state: RootState) => state.user);

  if (!partner) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
    )
  }

  if (partner.isActive === false) {
    <DeactivateNote />
  }

  const handleUpdatePartner = async (data: IUser) => {
    try {
      setSaving(true);
      const response = await api.patch("/api/auth/partner/update", {

        name: data.name,

        newPartnerProfile: {
          slug: data.partnerProfile?.slug ?? "",
          bio: data.partnerProfile?.bio ?? "",
          website: data.partnerProfile?.website ?? "",

          socialLinks: {
            youtube: data.partnerProfile?.socialLinks?.youtube ?? "",
            instagram: data.partnerProfile?.socialLinks?.instagram ?? "",
            linkedin: data.partnerProfile?.socialLinks?.linkedin ?? "",
            github: data.partnerProfile?.socialLinks?.github ?? "",
          },
        },

        newPaymentDetails: {
          method: data.paymentDetails?.method ?? "upi",
          upiId: data.paymentDetails?.upiId ?? "",
          accountHolderName: data.paymentDetails?.accountHolderName ?? "",
          accountNumber: data.paymentDetails?.accountNumber ?? "",
          ifscCode: data.paymentDetails?.ifscCode ?? "",
        },

      })

      console.log(response.data)
      if (response.data.success) {
        const updatedPartner = response.data.partner;
        dispatch(setPartner(updatedPartner))
        setActiveTab("dashboard")
      }
      setSaving(false);
      toast.success("Profile Updated.")
    } catch (error: any) {
      console.error("Update partner profile error:", error);

      setSaving(false);

      // ========================================
      // SLUG ALREADY EXISTS
      // ========================================

      if (
        error?.response?.status === 409 &&
        error?.response?.data?.field === "slug"
      ) {
        toast.error(
          error.response.data.message ||
          "This profile slug is already taken."
        );

        return;
      }

      // ========================================
      // OTHER API ERROR
      // ========================================

      toast.error(
        error?.response?.data?.message ||
        "Failed to update partner profile."
      );
    };
  }
  return (
    <div className='min-h-screen bg-slate-50'>
      <PartnerNav
        activeTab={activeTab}
        onTabChange={setActiveTab} />
      {activeTab === "dashboard" ? (<DashboardPanel />) :
        activeTab === "profile" ? (<ProfilePanel partner={partner} onSave={handleUpdatePartner} onCancel={() => setActiveTab("dashboard")} saving={saving} />) :
          <ProductPanel />
      }
    </div>
  )
}

export default Partner