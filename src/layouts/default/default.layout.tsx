import { Outlet } from "react-router-dom";
import Header from "../../components/header/header.component.tsx";
import Footer from "../../components/footer/footer.component.tsx";

function DefaultLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default DefaultLayout;
