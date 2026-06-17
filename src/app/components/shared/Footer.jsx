import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Logo & Description */}
          <div>
            <Link
              href="/"
              className="text-3xl font-bold text-orange-500"
            >
              🍽️ RecipeHub
            </Link>

            <p className="mt-4 text-sm leading-6 text-slate-400">
              Discover, share and save delicious recipes from
              food lovers around the world. Join our growing
              cooking community today.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="hover:text-orange-500 transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/recipes"
                  className="hover:text-orange-500 transition"
                >
                  Browse Recipes
                </Link>
              </li>

              <li>
                <Link
                  href="/login"
                  className="hover:text-orange-500 transition"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  href="/register"
                  className="hover:text-orange-500 transition"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact
            </h3>

            <div className="space-y-3 text-sm">
              <p>Email: support@recipehub.com</p>
              <p>Phone: +880 1234-567890</p>
              <p>Address: Dhaka, Bangladesh</p>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Follow Us
            </h3>

            <div className="flex gap-4">
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-500 transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-500 transition"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-500 transition"
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-orange-500 transition"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Area */}
        <div className="border-t border-slate-800 mt-12 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} RecipeHub. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}