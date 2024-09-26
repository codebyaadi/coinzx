"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import SkeletonDashboard from "./loading";
import { useSession } from "next-auth/react";

const Profile = ({ publicKey }: { publicKey: string }) => {
  const session = useSession();
  const user = session.data?.user;

  if (session.status === "loading") {
    return <SkeletonDashboard />;
  }
  return (
    <Card className="max-w-3xl rounded-md p-6">
      <CardHeader className="flex flex-row items-start justify-center space-x-4 lg:items-center">
        <Avatar>
          <AvatarImage
            src={user?.image || "/default-avatar.png"}
            alt={user?.name || "User Avatar"}
          />
          <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
        <div className="!mt-0">
          <CardTitle className="text-lg">Welcome back, {user?.name || "Guest"}!</CardTitle>
          <CardDescription>
            We're glad to see you. Explore your dashboard and manage your account easily.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>{publicKey}</CardContent>
    </Card>
  );
};

export default Profile;
