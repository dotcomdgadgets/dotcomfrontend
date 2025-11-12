import React, { useState, useEffect } from "react";

const UnderDevelopmentPopup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show popup instantly on first visit
    setShow(true);
  }, []);

  if (!show) return null;

  return (
    <>
      {/* Dimmed Background Overlay (keeps website visible) */}
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"></div>

      {/* Popup Box */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white w-11/12 sm:w-[400px] rounded-2xl shadow-2xl p-6 text-center relative animate-popIn border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            🚧 Website Under Development
          </h2>
          <p className="text-gray-700 text-sm mb-5 leading-relaxed">
            We’re currently working to improve this website experience.  
            Some pages or features may not function as expected yet.
          </p>
          <button
            onClick={() => setShow(false)}
            className="px-5 py-2 bg-black text-white rounded-md font-semibold hover:bg-gray-900 transition"
          >
            Okay, Got it!
          </button>
        </div>
      </div>
    </>
  );
};

export default UnderDevelopmentPopup;
