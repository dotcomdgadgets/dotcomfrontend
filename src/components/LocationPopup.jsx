import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../api/axiosInstance";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X, Loader2 } from "lucide-react";

function LocationPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [status, setStatus] = useState("detecting");

  const [location, setLocation] = useState({
    lat: null,
    lon: null,
    address: null,
  });

  const [loading, setLoading] = useState(false);
  const [fetchingAddress, setFetchingAddress] = useState(false);

  /* ===============================
     SHOW ONLY FIRST TIME
  =============================== */
  useEffect(() => {
    const alreadyShown = localStorage.getItem("locationPopupShown");
    if (!alreadyShown) {
      setShowPopup(true);
    }
  }, []);

  /* ===============================
     GET GPS LOCATION (ONLY IF POPUP OPEN)
  =============================== */
  useEffect(() => {
    if (!showPopup) return;
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({ lat: latitude, lon: longitude, address: null });
        fetchAddress(latitude, longitude);
      },
      () => {
        console.warn("Location permission denied");
        setStatus("failed");
      },
      { enableHighAccuracy: true, timeout: 15000 }
    );
  }, [showPopup]);

  /* ===============================
     FETCH ADDRESS (OpenCage)
  =============================== */
  const fetchAddress = async (lat, lon) => {
    try {
      setFetchingAddress(true);

      const key = import.meta.env.VITE_OPENCAGE_KEY;
      if (!key) {
        console.error("OpenCage key missing");
        setStatus("failed");
        return;
      }

      const res = await axios.get(
        "https://api.opencagedata.com/geocode/v1/json",
        { params: { q: `${lat},${lon}`, key } }
      );

      const comp = res.data?.results?.[0]?.components;
      if (!comp) {
        setStatus("failed");
        return;
      }

      const address = {
        city: comp.city || comp.town || comp.village || "",
        district:
          comp.state_district ||
          comp.county ||
          comp.city_district ||
          "",
        pincode: comp.postcode || "",
        country: comp.country || "",
      };

      setLocation((prev) => ({ ...prev, address }));
      setStatus("success");
    } catch (err) {
      console.error("OpenCage error:", err);
      setStatus("failed");
    } finally {
      setFetchingAddress(false);
    }
  };

  /* ===============================
     CLOSE & REMEMBER
  =============================== */
  const closePopup = () => {
    localStorage.setItem("locationPopupShown", "true");
    setShowPopup(false);
  };

  /* ===============================
     SAVE LOCATION
  =============================== */
  const handleSubmit = async () => {
    try {
      setLoading(true);

      await axiosInstance.post("/location", {
        latitude: location.lat,
        longitude: location.lon,
        address: location.address,
      });

      alert("✅ Location saved");
      closePopup();
    } catch {
      alert("❌ Failed to save location");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 90 }}
          className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl z-50 p-5"
        >
          <div className="max-w-md mx-auto text-gray-700">
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <MapPin size={22} />
                <h3 className="font-semibold">Enable Location</h3>
              </div>
              <button onClick={closePopup}>
                <X size={18} />
              </button>
            </div>

            <p className="text-sm text-gray-500 mb-3">
              We use your location to personalize services.
            </p>

            {/* Address Box */}
            <div className="bg-gray-50 border rounded-lg p-3 text-sm mb-4">
              {fetchingAddress ? (
                <p className="flex items-center gap-2 text-gray-500">
                  <Loader2 className="animate-spin" />
                  Detecting your location…
                </p>
              ) : location.address ? (
                <p>
                  {location.address.district || "--"},{" "}
                  {location.address.city || "--"},{" "}
                  {location.address.pincode || "--"},{" "}
                  {location.address.country || "--"}
                </p>
              ) : status === "failed" ? (
                <p className="text-gray-500">
                  Unable to detect address. You can continue.
                </p>
              ) : (
                <p className="text-gray-500">Detecting your location…</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                className="flex-1 bg-gray-100 py-2 rounded"
                onClick={closePopup}
              >
                Later
              </button>

              <button
                disabled={loading || fetchingAddress || !location.address}
                onClick={handleSubmit}
                className="flex-1 bg-black text-white py-2 rounded disabled:opacity-50"
              >
                {loading ? "Saving..." : "Share Location"}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LocationPopup;
