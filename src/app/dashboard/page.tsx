"use client";

import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import SkeletonDashboard from "./_components/loading";

const Dashboard = () => {
  const session = useSession();
  const user = session.data?.user;

  if (session.status === "loading") {
    return <SkeletonDashboard />
  }

  return (
    <div className="flex h-full w-full items-center justify-center mt-12 px-4 font-prompt">
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
      </Card>
    </div>
  );
};

export default Dashboard;
