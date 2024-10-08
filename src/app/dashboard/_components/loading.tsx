import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SkeletonDashboard = () => {
  return (
    <div className="mt-12 flex h-full w-full items-center justify-center px-4 font-prompt">
      <Card className="max-w-3xl rounded-md p-6">
        <CardHeader className="flex flex-row items-start justify-center space-x-4 lg:items-center">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="!mt-0 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-96" />
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default SkeletonDashboard;
