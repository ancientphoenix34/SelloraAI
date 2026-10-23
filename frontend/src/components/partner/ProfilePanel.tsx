import type { IUser } from "@/App"
import { useState } from "react";
import { Button } from "../ui/button";
import { ExternalLink, Globe } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { FaGithub, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Badge } from "../ui/badge";

interface profilePanelProps {
  partner: IUser;
  onSave: (data: IUser) => void;
  onCancel?: () => void;
  saving: boolean;
}

const BIO_MAX_LENGTH = 500;

const ProfilePanel = ({
  partner,
  onSave,
  onCancel,
  saving = false
}: profilePanelProps) => {

  const [form, setForm] = useState<IUser>(partner);

  const updateUser = (key: "name",
    value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value
    }))
  }

  const updateProfile = (
    key: "slug" | "bio" | "website",
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      partnerProfile: {
        ...prev.partnerProfile,
        [key]: value
      }
    }))
  }

  const updateSocialLinks = (
    key: "youtube" | "instagram" | "linkedin" | "github",
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      partnerProfile: {
        ...prev.partnerProfile,
        socialLinks: {
          ...prev.partnerProfile.socialLinks,
          [key]: value
        }
      }
    }))
  }

  const updatePayment = (key: "method" | "upiId" | "accountHolderName" | "accountNumber" | "ifscCode",
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      paymentDetails: {
        ...prev.paymentDetails,
        [key]: key === "method" ? (value as "upi" | "bank") : value
      }
    }))
  }

  return (
    <div className='mx-auto max-w-3xl px-8 py-10'>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Complete Your Partner Profile
          </h1>
          <p className="mt-1 text-slate-500">
            Set up your profile and payment details to start selling digital products on SelloraAI
          </p>
        </div>
        {partner?.partnerProfile?.slug &&
          <Button variant={"outline"} className="shrink-0">
            <ExternalLink className="mr-2 w-4 h-4" />
            View Public Profile
          </Button>}
      </div>

      <Card>
        <CardContent className="space-y-10 py-8">
          <section className="space-y-5">
            <h2 className="border-b pb-3 text-lg font-semibold">Basic Information</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="name">
                  Full Name {" "}
                  <span className="text-red-500">*</span>
                </Label>

                <Input id="name" value={form.name} onChange={(e) => updateUser("name", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">
                  Email
                </Label>
                <Input id="email" value={form.email} type="email" disabled />
              </div>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="border-b pb-3 text-lg font-semibold">
              Partner Profile
            </h2>

            <div className="space-y-1.5">
              <Label htmlFor="profile-slug">
                Profile Slug {" "}
                <span className="text-red-500">*</span>
              </Label>
              <div className="flex items-center rounded-md border bg-white overflow-hidden focus-within:ring-1 focus-within:ring-indigo-500">
                <span className="pl-3 text-sm text-slate-400 whitespace-nowrap">
                  sellora.ai/profile/
                </span>
                <Input id="profile-slug"
                  placeholder="your-profile-name"
                  value={form.partnerProfile?.slug ?? ""}
                  onChange={(e) => updateProfile("slug", e.target.value)}
                  className="border-0 focus-visible:ring-0 shadow-none"
                />
              </div>
              <p className="text-xs text-slate-400">
                This will be used as your public partner profile URL.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between">
                <Label htmlFor="bio">
                  Bio {" "}
                  <span className="text-red-500">*</span>
                </Label>
                <span className=" text-xs text-slate-400">
                  {
                    (form.partnerProfile.bio ?? "").length
                  }/{BIO_MAX_LENGTH}
                </span>
              </div>
              <Textarea id="bio" rows={6} maxLength={BIO_MAX_LENGTH}
                value={form.partnerProfile.bio ?? ""}
                onChange={(e) => updateProfile("bio", e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="website">
                Website {" "}
              </Label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input id="website" value={form.partnerProfile?.website ?? ""} onChange={(e) => updateProfile("website", e.target.value)}
                  className="pl-9" />
              </div>
            </div>

          </section>

          <section className="space-y-5">
            <h2 className="border-b pb-3 text-lg font-semibold">
              Social Links
            </h2>
            <div className="grid grid-col-1 gap-5 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="youtube">
                  YouTube
                </Label>
                <div className="relative">
                  < FaYoutube className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input id="youtube" value={form.partnerProfile?.socialLinks?.youtube ?? ""} onChange={(e) => updateSocialLinks("youtube", e.target.value)}
                    className="pl-9" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="instagram">
                  Instagram
                </Label>
                <div className="relative">
                  < FaInstagram className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input id="instagram" value={form.partnerProfile?.socialLinks?.instagram ?? ""} onChange={(e) => updateSocialLinks("instagram", e.target.value)}
                    className="pl-9" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="linkedin">
                  LinkedIn
                </Label>
                <div className="relative">
                  < FaLinkedin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input id="linkedin" value={form.partnerProfile?.socialLinks?.linkedin ?? ""} onChange={(e) => updateSocialLinks("linkedin", e.target.value)}
                    className="pl-9" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="github">
                  GitHub
                </Label>
                <div className="relative">
                  < FaGithub className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input id="github" value={form.partnerProfile?.socialLinks?.github ?? ""} onChange={(e) => updateSocialLinks("github", e.target.value)}
                    className="pl-9" />
                </div>
              </div>

            </div>
          </section>

          <section className="space-y-5">
            <h2 className="border-b pb-3 text-lg font-semibold">
              Payment Details
            </h2>
            <RadioGroup value={form.paymentDetails.method} onValueChange={(value) => updatePayment("method", value)} className="flex gap-6">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="upi" id="upi" />
                <label htmlFor="upi">UPI</label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="bank" id="bank" />
                <label htmlFor="bank">Bank</label>
              </div>
            </RadioGroup>

            {
              form.paymentDetails?.method === "upi" ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="upiid">
                      UPI ID {" "}
                      <span className="text-red-500">*</span>
                    </Label>

                    <Input id="upiid" value={form.paymentDetails?.upiId ?? ""} onChange={(e) => updatePayment("upiId", e.target.value)} />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="accountHolderName">
                      Account Holder Name {" "}
                      <span className="text-red-500">*</span>
                    </Label>

                    <Input id="accountHolderName" value={form.paymentDetails?.accountHolderName ?? ""} onChange={(e) => updatePayment("accountHolderName", e.target.value)} />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="accountHolderName">
                      Account Holder Name {" "}
                      <span className="text-red-500">*</span>
                    </Label>

                    <Input id="accountHolderName" value={form.paymentDetails?.accountHolderName ?? ""} onChange={(e) => updatePayment("accountHolderName", e.target.value)} />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="accountNumber">
                      Account Number {" "}
                      <span className="text-red-500">*</span>
                    </Label>

                    <Input id="accountNumber" value={form.paymentDetails?.accountNumber ?? ""} onChange={(e) => updatePayment("accountNumber", e.target.value)} />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="ifscCode">
                      IFSC Code {" "}
                      <span className="text-red-500">*</span>
                    </Label>

                    <Input id="ifscCode" value={form.paymentDetails?.ifscCode ?? ""} onChange={(e) => updatePayment("ifscCode", e.target.value)} />
                  </div>
                </div>
              )
            }
          </section>

          <div className="flex rounded-lg bg-indigo-50 px-4 py-4">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="font-medium">Status:</span>
              <Badge className="bg-indigo-100 text-indigo-700">
                {
                  form.isActive ? "ACTIVE" : "INACTIVE"
                }
              </Badge>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t pt-6">
            <Button variant={"outline"} onClick={onCancel} disabled={saving}>
              Cancel
            </Button>

            <Button disabled={saving}
              className="bg-indigo-600 hover:bg-indigo-700"
              onClick={() => onSave?.(form)}
            >
              {saving ? "Saving..." : "Save & Continue"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProfilePanel
