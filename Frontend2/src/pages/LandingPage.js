import React from "react";
import HomeComponent from "../component/HomeComponent";
import Navbar from "../component/Navbar";

function LandingPage() {
  return (
    <div className="bg-gradient-to-br from-blue-100 via-white to-purple-100 min-h-screen">
      <Navbar />
      <section className="max-w-4xl mx-auto py-16 px-6">
        <HomeComponent />
      </section>
    </div>
  );
}

export default React.memo(LandingPage);
