import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0b0b0b] text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* ===== GRID ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* BRAND */}
          <div>
            <h2 className="text-2xl font-semibold text-amber-400 tracking-wide">
              DOTCOM GADGETS
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-gray-500 max-w-sm">
              Smart design. Powerful performance.  
              Technology crafted for modern lifestyles.
            </p>

            {/* SOCIAL */}
            <div className="flex gap-4 mt-6">
              <SocialIcon
                href="https://www.instagram.com/dotcomgadgets/reels/"
                icon={<FaInstagram />}
              />
              <SocialIcon
                href="https://www.facebook.com/profile.php?id=61552047514424"
                icon={<FaFacebookF />}
              />
              <SocialIcon
                href="https://www.youtube.com/@dotcomgadgetsphone"
                icon={<FaYoutube />}
              />
            </div>
          </div>

          {/* SUPPORT */}
          <div>
            <h6 className="footer-heading">Support</h6>
            <ul className="space-y-3 mt-4 text-sm">
              <FooterLink to="/contact-us">Contact Us</FooterLink>
              <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
              <FooterLink to="/terms-conditions">Terms & Conditions</FooterLink>
              <FooterLink to="/cancellation-refund-policy">
                Cancellation & Refund
              </FooterLink>
              <FooterLink to="/shipping-delivery-policy">
                Shipping & Delivery
              </FooterLink>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h6 className="footer-heading">Contact</h6>

            <div className="space-y-4 mt-4 text-sm">
              <div className="flex gap-3">
                <MdLocationOn className="text-amber-400 text-lg" />
                <p>
                  Rohtash Nagar, Shahdara  
                  <br />
                  Delhi – 110032, India
                </p>
              </div>

              <div className="flex gap-3 items-center">
                <MdPhone className="text-amber-400 text-lg" />
                <a href="tel:+919319058138" className="hover:text-amber-400">
                  +91 93190 58138
                </a>
              </div>

              <div className="flex gap-3 items-center">
                <MdEmail className="text-amber-400 text-lg" />
                <a
                  href="mailto:dotcominfo@gmail.com"
                  className="hover:text-amber-400"
                >
                  dotcominfo@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ===== BOTTOM BAR ===== */}
        <div className="mt-12 border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-center gap-4 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-amber-400">DotCom Gadgets</span>.  
            All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link to="/terms-conditions" className="hover:text-amber-400">
              Terms
            </Link>
            <Link to="/privacy-policy" className="hover:text-amber-400">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ===== REUSABLE ===== */

const FooterLink = ({ to, children }) => (
  <li>
    <Link
      to={to}
      className="hover:text-amber-400 transition"
    >
      {children}
    </Link>
  </li>
);

const SocialIcon = ({ href, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="h-10 w-10 rounded-full flex items-center justify-center
      bg-[#151515] hover:bg-amber-400 hover:text-black
      transition"
  >
    {icon}
  </a>
);

export default Footer;
