import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#0f0d0d] via-[#121212] to-[#1a1414] text-gray-300 border-t border-amber-400/20">
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* ================= TOP GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

          {/* BRAND */}
          <div>
            <h2 className="text-3xl font-serif font-semibold text-amber-300 tracking-wide">
              DOTCOM
            </h2>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              Smart design. Powerful performance.  
              Technology crafted for modern lifestyles.
            </p>

            {/* SOCIAL */}
            <div className="mt-6 flex items-center gap-3">
              <SocialIcon
                href="https://www.instagram.com/dotcomgadgets/reels/"
                label="Instagram"
                icon={<FaInstagram />}
              />
              <SocialIcon
                href="https://www.facebook.com/profile.php?id=61552047514424"
                label="Facebook"
                icon={<FaFacebookF />}
              />
              <SocialIcon
                href="https://www.youtube.com/@dotcomgadgetsphone"
                label="YouTube"
                icon={<FaYoutube />}
              />
              {/* <SocialIcon
                href="https://www.linkedin.com"
                label="LinkedIn"
                icon={<FaLinkedinIn />}
              /> */}
            </div>
          </div>

          {/* SHOP */}
          <FooterColumn title="Shop">
            <FooterLink to="/">Home</FooterLink>
            <FooterText>Mobile</FooterText>
            <FooterText>Laptop</FooterText>
            <FooterText>Desktop</FooterText>
            <FooterText>Accessories & Gadgets</FooterText>
          </FooterColumn>

          {/* SUPPORT */}
          <FooterColumn title="Support">
            <FooterLink to="/contact-us">Contact Us</FooterLink>
            <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
            <FooterLink to="/terms-conditions">Terms & Conditions</FooterLink>
            <FooterLink to="/cancellation-refund-policy">
              Cancellation & Refund
            </FooterLink>
            <FooterLink to="/shipping-delivery-policy">
              Shipping & Delivery
            </FooterLink>
          </FooterColumn>

          {/* CONTACT */}
          <div>
            <h6 className="footer-title">Contact</h6>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MdLocationOn className="text-amber-400 mt-1" />
                <p className="text-gray-400 leading-relaxed">
                  Rohtash Nagar, Shahdara  
                  <br />
                  Delhi – 110032, India
                </p>
              </div>

              <div className="flex items-center gap-3">
                <MdPhone className="text-amber-400" />
                <a
                  href="tel:+919319058138"
                  className="text-gray-400 hover:text-amber-300 transition"
                >
                  +91 93190 58138
                </a>
              </div>

              <div className="flex items-center gap-3">
                <MdEmail className="text-amber-400" />
                <a
                  href="mailto:dotcominfo@gmail.com"
                  className="text-gray-400 hover:text-amber-300 transition"
                >
                  dotcominfo@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ================= DIVIDER ================= */}
        <div className="mt-12 border-t border-amber-400/20 pt-8">

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">

            <p>
              © {new Date().getFullYear()}{" "}
              <span className="font-serif text-amber-300">
                DotCom
              </span>
              . All rights reserved.
            </p>

            <div className="flex gap-4">
              <Link
                to="/terms-conditions"
                className="hover:text-amber-300 transition"
              >
                Terms
              </Link>
              <Link
                to="/privacy-policy"
                className="hover:text-amber-300 transition"
              >
                Privacy
              </Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

/* ================= REUSABLE COMPONENTS ================= */

const FooterColumn = ({ title, children }) => (
  <div>
    <h6 className="footer-title">{title}</h6>
    <ul className="space-y-2 text-sm">{children}</ul>
  </div>
);

const FooterLink = ({ to, children }) => (
  <li>
    <Link
      to={to}
      className="text-gray-400 hover:text-amber-300 transition"
    >
      {children}
    </Link>
  </li>
);

const FooterText = ({ children }) => (
  <li className="text-gray-500 cursor-default">
    {children}
  </li>
);

const SocialIcon = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="h-9 w-9 inline-flex items-center justify-center rounded-full
      bg-amber-400/10 hover:bg-amber-400/20
      text-amber-400 transition"
  >
    {icon}
  </a>
);

export default Footer;
