import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  let navigate = useNavigate();
  const signOutUser = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <header class="shadow mb-2">
        <div class="relative flex max-w-screen-xl flex-col overflow-hidden px-4 py-4 md:mx-auto md:flex-row md:items-center">
          <Link
            to="/dashboard"
            class="flex items-center whitespace-nowrap text-2xl font-black"
          >
            <span class="text-black">Store and Revamp</span>
          </Link>
          <input type="checkbox" class="peer hidden" id="navbar-open" />
          <label
            class="absolute top-5 right-7 cursor-pointer md:hidden"
            for="navbar-open"
          >
            <span class="sr-only">Toggle Navigation</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <nav
            aria-label="Header Navigation"
            class="peer-checked:mt-8 peer-checked:max-h-56 flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all md:ml-24 md:max-h-full md:flex-row md:items-start"
          >
            <ul class="flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0">
              <li class="text-gray-600 md:mr-12 hover:text-blue-600">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li class="text-gray-600 md:mr-12 hover:text-blue-600">
                <Link to="/topics">Topics</Link>
              </li>
              <li class="text-gray-600 md:mr-12 hover:text-blue-600">
                <Link to="/profile">Profile</Link>
              </li>
              <li class="text-gray-600 md:mr-12 hover:text-blue-600">
                <Link to="/resource">Resource</Link>
              </li>
              <li class="text-gray-600 md:mr-12 hover:text-blue-600">
                <button
                  onClick={signOutUser}
                  class="rounded-md border-2 border-blue-600 px-6 py-1 font-medium text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
                >
                  Log Out
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
