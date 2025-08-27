import React from "react";
import DashboardCom from "../component/DashboardCom";
import DashboardNav from "../component/DashboardNav";

function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <DashboardCom />
      </main>
    </div>
  );
}

export default React.memo(DashboardPage);
