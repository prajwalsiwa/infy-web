import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer md:px-24 sm:px-10 px-6  w-full ">
      <div className="w-full ">
        <div className="grid grid-cols-1 gap-12 py-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Company Info */}
          <div className="inline-flex flex-col text-white space-y-3">
            <Link to={"/"}>
              <img
                src={"/infytrip_logo.png"}
                width={200}
                height={80}
                alt="infytrip logo"
                className="h-[36px] w-auto object-cover object-center"
              />
            </Link>

            <p>
              Phone: <a href="tel:9868625225">9868625225</a>
            </p>

            <p>
              Email: <a href="mailto:mymslxs@gmail.com">mymslxs@gmail.com</a>
            </p>

            <div className="flex items-center gap-3">
              <Link to={"/"}>
                <FaFacebook className="size-5" />
              </Link>
              <Link to={"/"}>
                <FaInstagram className="size-5" />
              </Link>
              <Link to={"/"}>
                <FaTwitter className="size-5" />
              </Link>
              <Link to={"/"}>
                <FaLinkedin className="size-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-white text-lg font-medium">Quick Links</h4>

            <Link to={"/"} className="text-xs text-white">
              About Us
            </Link>
            <Link to={"/"} className="text-xs text-white">
              Careers
            </Link>
            <Link to={"/"} className="text-xs text-white">
              Blog
            </Link>
            <Link to={"/"} className="text-xs text-white">
              Contact Us
            </Link>
          </div>

          {/* Support Link */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-white text-lg font-medium">Support</h4>

            <Link to={"/"} className="text-xs text-white">
              Help Center
            </Link>
            <Link to={"/"} className="text-xs text-white">
              FAQs
            </Link>
            <Link to={"/"} className="text-xs text-white">
              Press/News
            </Link>
            <Link to={"/"} className="text-xs text-white">
              Refund Policy
            </Link>
            <Link to={"/"} className="text-xs text-white">
              Travel Guides
            </Link>
            <Link to={"/"} className="text-xs text-white">
              Partnership
            </Link>
          </div>

          {/* Subscription */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-white text-lg font-medium">Subscribe</h4>
            <p className="text-white text-sm max-w-sm">
              Subscribe for the latest updates and deals straight to your email.
            </p>

            {/* Email Subscription Input */}
            <div className="flex items-stretch">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-[260px] px-4 text-primary-dark rounded-l-sm outline-none border-none"
              />
              <button className="py-2 px-4 bg-primary text-white rounded-r-sm hover:brightness-90 duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
