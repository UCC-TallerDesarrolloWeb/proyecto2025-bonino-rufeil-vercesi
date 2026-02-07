import { Outlet } from "react-router-dom";
import "@styles/styles2.scss";
import Navbar from "@components/navbar.jsx";
import TermsAndConditions from "@components/TermsAndConditions.jsx"

export default function RootLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <TermsAndConditions />
    </>
  );
}
