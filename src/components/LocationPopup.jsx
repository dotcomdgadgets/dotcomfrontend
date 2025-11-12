import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X, Loader2 } from "lucide-react";

function LocationPopup() {
  const [showPopup, setShowPopup] = useState(true);
  const [location, setLocation] = useState({ lat: "", lon: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [fetchingAddress, setFetchingAddress] = useState(false);

  // ✅ Get user location with high accuracy
  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          console.log("✅ Exact GPS:", latitude, longitude, "Accuracy:", accuracy, "m");

          setLocation({ lat: latitude, lon: longitude });
          // Fetch address from OpenCage
          fetchAddress(latitude, longitude);
        },
        (error) => {
          console.error("❌ Location error:", error);
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert("Location permission denied. Please allow it to continue.");
              break;
            case error.POSITION_UNAVAILABLE:
              alert("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              alert("Location request timed out. Try again.");
              break;
            default:
              alert("An unknown error occurred.");
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  // ✅ Fetch readable address from OpenCage API
  const fetchAddress = async (lat, lon) => {
    try {
      setFetchingAddress(true);
      const apiKey = "fcddeadd5fd540a393c340a620158e7e"; // your OpenCage key
      const res = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`
      );
      const address = res.data.results[0]?.formatted || "Address not found";
      setLocation((prev) => ({ ...prev, address }));
      setFetchingAddress(false);
    } catch (error) {
      console.error("Failed to fetch address:", error);
      setFetchingAddress(false);
    }
  };

  // ✅ Submit location to backend
  const handleSubmit = async () => {
    try {
      setLoading(true);
      await axios.post("https://dotcombackend.onrender.com/api/location", {
        lat: location.lat,
        lon: location.lon,
      });
      setLoading(false);
      alert("✅ Location saved successfully!");
      setShowPopup(false);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save location.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
          style={popupContainer}
        >
          <div style={popupContent}>
            {/* Header */}
            <div style={headerRow}>
              <div style={headerLeft}>
                <MapPin size={24} color="#78350f" />
                <h2 style={title}>Enable Your Location</h2>
              </div>
              <button style={closeBtn} onClick={() => setShowPopup(false)}>
                <X size={20} color="#475569" />
              </button>
            </div>

            {/* Info */}
            <p style={subtitle}>
              We use your location to show nearby stores and personalized offers.
            </p>

            {/* Address box */}
            <div style={coordsBox}>
              {fetchingAddress ? (
                <div style={{ textAlign: "center", color: "#6b7280" }}>
                  <Loader2 size={20} className="animate-spin inline-block" /> Fetching address...
                </div>
              ) : (
                <>
                  <p><b>Latitude:</b> {location.lat || "--"}</p>
                  <p><b>Longitude:</b> {location.lon || "--"}</p>
                  <p>
                    <b>Address:</b>{" "}
                    {location.address ? (
                      <span style={{ color: "#374151" }}>{location.address}</span>
                    ) : (
                      "Fetching..."
                    )}
                  </p>
                </>
              )}
            </div>

            {/* Buttons */}
            <div style={btnRow}>
              <button style={cancelBtn} onClick={() => setShowPopup(false)}>
                Maybe Later
              </button>
              <button
                style={submitBtn}
                onClick={handleSubmit}
                disabled={loading || fetchingAddress}
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

/* 🎨 Inline Styles (modern & responsive) */
const popupContainer = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  background: "#fff",
  borderTopLeftRadius: "20px",
  borderTopRightRadius: "20px",
  boxShadow: "0 -4px 20px rgba(0,0,0,0.15)",
  padding: "20px 20px 25px",
  zIndex: 1000,
};

const popupContent = {
  maxWidth: "500px",
  margin: "0 auto",
  color: "#1f2937",
  fontFamily: "Poppins, sans-serif",
};

const headerRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const headerLeft = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const title = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#0f172a",
};

const subtitle = {
  fontSize: "14px",
  color: "#475569",
  marginTop: "6px",
  marginBottom: "15px",
};

const coordsBox = {
  background: "#f8fafc",
  border: "1px solid #e2e8f0",
  borderRadius: "10px",
  padding: "10px 12px",
  fontSize: "13px",
  color: "#334155",
  marginBottom: "20px",
  minHeight: "70px",
};

const btnRow = {
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",
};

const cancelBtn = {
  flex: 1,
  padding: "10px 0",
  background: "#f1f5f9",
  color: "#475569",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontWeight: "500",
  transition: "0.2s",
};

const submitBtn = {
  flex: 1,
  padding: "10px 0",
  background: "#92400e",
  color: "white",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontWeight: "600",
  transition: "0.2s",
};

const closeBtn = {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  padding: "5px",
};

export default LocationPopup;
