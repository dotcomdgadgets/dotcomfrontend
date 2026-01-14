import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductThunk } from "../../redux/thunks/productThunk";
import { resetStatus } from "../../redux/slices/productSlice";

export default function AddProduct() {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.product);

  const [form, setForm] = useState({
    name: "",
    mrp: "",
    price: "",
    stock: "",
    category: "",
    hsnCode: "",
    gst: "",
    description: "",
  });

  const [image, setImage] = useState([]);
  const [preview, setPreview] = useState([]);

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    const fd = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      fd.append(key, value);
    });
    image.forEach((img) => fd.append("image", img));

    dispatch(addProductThunk(fd));
  };

  /* ================= STATUS HANDLING ================= */
  useEffect(() => {
    if (success) {
      alert("✅ Product listed successfully");
      setForm({
        name: "",
        mrp: "",
        price: "",
        stock: "",
        category: "",
        hsnCode: "",
        gst: "",
        description: "",
      });
      setImage([]);
      setPreview([]);
      dispatch(resetStatus());
    }

    if (error) {
      alert("❌ " + error);
      dispatch(resetStatus());
    }
  }, [success, error, dispatch]);

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-emerald-300 bg-emerald-50 " +
    "text-gray-700 placeholder-gray-500 " +
    "focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white";

  return (
    <div className="min-h-screen bg-emerald-50 py-20 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        {/* ================= HEADER ================= */}
        <h2 className="text-2xl font-semibold text-emerald-800">
          Add New Product
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Fill in accurate product details to list it on your store
        </p>

        {/* INFO BAR */}
        <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-600">
          <span>🧾 GST Invoice Supported</span>
          <span>📦 Stock Managed Automatically</span>
          <span>🖼 Max 5 Images Allowed</span>
        </div>

        <hr className="my-6" />

        {/* ================= FORM ================= */}
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* ================= PRODUCT INFO ================= */}
          <Section title="Product Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Product Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />

              <select
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
                className={inputClass}
                required
              >
                <option value="">Select Category</option>
                <option value="mobiles">Mobile</option>
                <option value="head-phones">Headphone</option>
                <option value="phone-covers">Phone Cover</option>
                <option value="sound-boxes">Sound Box</option>
                <option value="watches">Watches</option>
                <option value="earbuds">Earbuds</option>
                <option value="charger-cable">Charger / Cable</option>
                <option value="laptop">Laptop</option>
                <option value="keypad-phones">Keypad Phones</option>
                <option value="tablets">Tablets</option>
                <option value="gadgets">Gadgets</option>
              </select>
            </div>
          </Section>

          {/* ================= PRICING ================= */}
          <Section title="Pricing & Stock">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                type="number"
                placeholder="MRP (₹)"
                value={form.mrp}
                onChange={(e) => setForm({ ...form, mrp: e.target.value })}
                onWheel={(e) => e.target.blur()}
                required
              />

              <Input
                type="number"
                placeholder="Selling Price (₹)"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                onWheel={(e) => e.target.blur()}
                required
              />

              <Input
                type="number"
                placeholder="Stock Quantity"
                value={form.stock}
                min={0}
                max={99}
                onChange={(e) => {
                  const v = Math.max(0, Math.min(99, Number(e.target.value)));
                  setForm({ ...form, stock: v });
                }}
                onWheel={(e) => e.target.blur()}
                required
              />
            </div>

            <p className="text-xs text-gray-500 mt-2">
              ℹ Stock automatically reduces after each successful order
            </p>
          </Section>

          {/* ================= TAX ================= */}
          <Section title="Tax Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="HSN Code"
                value={form.hsnCode}
                onChange={(e) =>
                  setForm({ ...form, hsnCode: e.target.value })
                }
                onWheel={(e) => e.target.blur()}
                required
              />

              <Input
                type="number"
                placeholder="GST %"
                value={form.gst}
                onChange={(e) => setForm({ ...form, gst: e.target.value })}
                onWheel={(e) => e.target.blur()}
                required
              />
            </div>
          </Section>

          {/* ================= DESCRIPTION ================= */}
          <Section title="Product Description">
            <textarea
              placeholder="Write a clear product description (features, usage, warranty, etc.)"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className={`${inputClass} h-32 resize-none`}
              required
            />
          </Section>

          {/* ================= IMAGES ================= */}
          <Section title="Product Images">
            <input
              type="file"
              multiple
              accept="image/*"
              className={`${inputClass} bg-white`}
              onChange={(e) => {
                const files = Array.from(e.target.files);
                setImage(files);
                setPreview(files.map((f) => URL.createObjectURL(f)));
              }}
              required
            />

            <p className="text-xs text-gray-500 mt-2">
              Upload clear images (JPG/PNG). First image will be the main display.
            </p>

            <div className="flex gap-3 flex-wrap mt-3">
              {preview.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="preview"
                  className="w-20 h-20 object-cover rounded-lg border"
                />
              ))}
            </div>
          </Section>

          {/* ================= SUBMIT ================= */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-white transition ${
              loading
                ? "bg-emerald-300"
                : "bg-emerald-700 hover:bg-emerald-800"
            }`}
          >
            {loading ? "Listing Product..." : "Publish Product"}
          </button>

          <p className="text-xs text-center text-gray-500">
            By publishing, you confirm that the product details are accurate.
          </p>
        </form>
      </div>
    </div>
  );
}

/* ================= REUSABLE UI ================= */

const Section = ({ title, children }) => (
  <div>
    <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase">
      {title}
    </h3>
    {children}
  </div>
);

const Input = (props) => (
  <input
    {...props}
    className="w-full px-4 py-3 rounded-lg border border-emerald-300 bg-emerald-50 
      text-gray-700 placeholder-gray-500 
      focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
  />
);
