import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navigation />
      <main className="pt-[72px]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
