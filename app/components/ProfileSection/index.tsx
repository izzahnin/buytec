
import PersonalData from '@/components/PersonalData';
import CardProductOrder from "@/components/CardProductOrder";
import CardTrackOrder from "@/components/CardTrackOrder";
import React, { useState } from "react";
import { useAuth } from '@/firebase/auth/AuthUserProvider';

export default function ProfileSection() {
  const [activeTab, setActiveTab] = useState("PersonalData");
  const auth = useAuth();

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  return (
    <>
                {activeTab === "PersonalData" && <PersonalData />}
            {activeTab === "TrackOrder" && <CardTrackOrder userId={auth.user.id!} />}
    </>
  )
}
