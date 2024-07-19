import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <nav className="bg-gray-800 border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 relative">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="logo_symfony_api.svg"
              className="h-12"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-dark">
              Symfony Api
            </span>
          </Link>
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-dark rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-dark dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={isOpen ? "true" : "false"}
          >
            <img
              src="burger_menu.svg"
              className="h-16 w-16"
              alt="Burger menu"
            />
          </button>
          <div className={`${isOpen ? "h-max fixed inset-0 top-20 mx-auto" : "hidden"} w-full md:block md:w-auto`} id="navbar-default">
            <ul className="font-medium text-dark flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-bg-light-3 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-bg-light-3 dark:bg-bg-light-3 md:dark:bg-bg-light-3 dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-dark rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-dark md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/blogs"
                  className="block py-2 px-3 text-dark rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-dark md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Blogs</Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block py-2 px-3 text-dark rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-dark md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
