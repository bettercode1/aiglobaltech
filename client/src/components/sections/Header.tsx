import { useState, useEffect } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import BettercodeLogotype from "../BettercodeLogotype";

export default function Header({
  isCoursePage = false,
  isFaqPage = false,
}: {
  isCoursePage?: boolean;
  isFaqPage?: boolean;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollToSection = (id: string) => {
    if (isCoursePage) return;
    const el = document.getElementById(id);
    if (!el) return;
    const offset = el.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top: offset, behavior: "smooth" });
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (mobileMenuOpen) setMobileMenuOpen(false);
    } else {
      window.location.href = "/";
    }
  };

  let headerClass = "fixed w-full z-50 transition-all duration-300 ";
  if (isFaqPage || isCoursePage) {
    headerClass +=
      "bg-gray-900/90 backdrop-blur-md text-white shadow-lg border-b border-red-500/20";
  } else {
    headerClass += scrolled
      ? "bg-gray-900/90 backdrop-blur-md text-white shadow-lg border-b border-red-500/20"
      : "bg-transparent text-white";
  }

  return (
    <header className={headerClass} style={{ top: 0, left: 0 }}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="flex items-center">
          <a
            href="#"
            className="flex items-center"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("hero");
            }}
          >
            <BettercodeLogotype
              showText={false}
              className="mr-6"
              style={{ height: 80 }}
            />
          </a>
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex space-x-8 items-center">
          <a
            href="/"
            className={`font-medium ${
              scrolled
                ? "text-gray-200 hover:text-red-400"
                : "text-white/90 hover:text-white"
            } transition-colors duration-200`}
            onClick={handleHomeClick}
          >
            Home
          </a>
          <a
            href="/courses"
            className={`font-medium ${
              scrolled
                ? "text-gray-200 hover:text-red-400"
                : "text-white/90 hover:text-white"
            } transition-colors duration-200`}
          >
            All Courses
          </a>
          <a
            href="/faq"
            className={`font-medium ${
              scrolled
                ? "text-gray-200 hover:text-red-400"
                : "text-white/90 hover:text-white"
            } transition-colors duration-200`}
          >
            FAQ
          </a>
        </div>

        {/* Desktop Right Side: Button + Logo only on Home */}
        <div className="hidden md:flex items-center gap-4">
        {(isCoursePage || isFaqPage) && (
            <img
              src="/src/assets/bettercode.jpg"
              alt="BetterCode Logo"
              className="h-12 w-auto object-contain"
              style={{width: 170 }}
            />
          )}

          {/* Show button only on homepage */}
          {!isCoursePage && !isFaqPage && (
            <a
              href="#apply"
              className="bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-700 hover:to-red-600 font-medium py-2.5 px-6 rounded shadow-lg hover:shadow-red-900/20 text-center transition-all duration-300 flex items-center justify-center group"
              style={{ minWidth: 170 }}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("apply");
              }}
            >
              APPLY NOW
              <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className={scrolled ? "text-gray-800" : "text-white"}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-md border-b border-red-500/20 shadow-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col space-y-4">
              <a
                href="/"
                className="text-white/90 hover:text-white font-medium py-2 transition-colors duration-200"
                onClick={handleHomeClick}
              >
                Home
              </a>
              <a
                href="/courses"
                className="text-white/90 hover:text-white font-medium py-2 transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                All Courses
              </a>
              <a
                href="/faq"
                className="text-white/90 hover:text-white font-medium py-2 transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </a>

              {/* Show CTA only on Home (not FAQ or Courses) */}
              {!isCoursePage && !isFaqPage && (
                <a
                  href="#apply"
                  className="bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-700 hover:to-red-600 font-medium py-3 px-6 rounded shadow-lg hover:shadow-red-900/20 text-center transition-all duration-300 flex items-center justify-center group mt-4"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("apply");
                    setMobileMenuOpen(false);
                  }}
                >
                  APPLY NOW
                  <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
