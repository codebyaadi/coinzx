import React from "react";
import Profile from "./_components/profile";
import { getUserWallet } from "@/lib/actions/get-user-wallet";

const Dashboard = async () => {
  const publicKey = await getUserWallet();
  return (
    <div className="mt-12 flex h-full w-full items-center justify-center px-4 font-prompt">
      <Profile publicKey={publicKey.data ?? ""} />
    </div>
  );
};

export default Dashboard;
