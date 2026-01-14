import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Minus, Plus, Star } from "lucide-react";
import { motion } from "framer-motion";
import { fetchSingleProductThunk } from "../redux/thunks/productThunk";
import { addToCartThunk } from "../redux/thunks/cartThunk";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleProduct: product, loading } = useSelector(
    (state) => state.product
  );

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    dispatch(fetchSingleProductThunk(id));
  }, [dispatch, id]);

  /* ================= IMAGE ================= */
  useEffect(() => {
    if (product?.image?.length) {
      setSelectedImage(product.image[0]);
    }
  }, [product]);

  /* ================= SAFETY: NEVER ALLOW INVALID QUANTITY ================= */
  useEffect(() => {
    if (product?.stock > 0 && quantity > product.stock) {
      setQuantity(product.stock);
    }
  }, [product, quantity]);

  if (loading) {
    return <p className="pt-32 text-center text-gray-600">Loading...</p>;
  }

  if (!product) {
    return <p className="pt-32 text-center text-gray-600">Product not found</p>;
  }

  const addToCart = () => {
    if (product.stock === 0) return;

    dispatch(
      addToCartThunk({
        productId: product._id,
        quantity,
        size: "M",
      })
    );
    navigate("/addtocart");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-14">

        {/* ================= IMAGE SECTION ================= */}
        <div>
          <motion.div
            initial={{ opacity: 0.9 }}
            animate={{ opacity: 1 }}
            className="border rounded-xl bg-white p-4"
          >
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-[420px] object-contain rounded-lg"
            />
          </motion.div>

          <div className="flex gap-3 mt-4">
            {product.image.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 object-cover rounded-lg border cursor-pointer ${
                  selectedImage === img
                    ? "border-amber-600"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ================= DETAILS SECTION ================= */}
        <div className="flex flex-col gap-5">

          {/* TITLE */}
          <h2 className="text-2xl font-semibold text-gray-900">
            {product.name}
          </h2>

          {/* RATING */}
          <div className="flex items-center gap-1 text-amber-500">
            {Array(5).fill(0).map((_, i) => (
              <Star key={i} size={18} fill="currentColor" />
            ))}
            <span className="text-sm text-gray-500 ml-2">
              (4.8 rating)
            </span>
          </div>

          {/* PRICE */}
          <div>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-gray-900">
                ₹{product.price}
              </span>

              {product.mrp && (
                <>
                  <span className="text-sm text-gray-400 line-through">
                    ₹{product.mrp}
                  </span>
                  <span className="text-sm text-green-600 font-medium">
                    {Math.round(
                      ((product.mrp - product.price) / product.mrp) * 100
                    )}% off
                  </span>
                </>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Inclusive of all taxes
            </p>
          </div>

          {/* STOCK */}
          <div>
            {product.stock > 0 ? (
              <span className="inline-block text-sm font-medium text-green-700 bg-green-50 px-3 py-1 rounded-full">
                ✔ In Stock — {product.stock} left
              </span>
            ) : (
              <span className="inline-block text-sm font-semibold text-red-700 bg-red-50 px-3 py-1 rounded-full">
                ❌ Out of Stock
              </span>
            )}
          </div>

          {/* DESCRIPTION */}
          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-1">
              About this product
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* HIGHLIGHTS */}
          <div className="bg-gray-50 border rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-800 mb-2">
              Product Highlights
            </h4>
            <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
              <li>100% Original Product</li>
              <li>GST Invoice Included</li>
              <li>7-Day Easy Returns</li>
              <li>Secure Packaging</li>
            </ul>
          </div>

          {/* QUANTITY */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              Select Quantity
            </p>

            <div className="inline-flex items-center border rounded-lg overflow-hidden text-gray-700">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={product.stock === 0 || quantity <= 1}
                className="px-4 py-2 hover:bg-gray-100 disabled:opacity-50"
              >
                <Minus size={16} />
              </button>

              <span className="px-6 text-sm font-semibold">
                {quantity}
              </span>

              <button
                onClick={() =>
                  setQuantity((q) => Math.min(product.stock, q + 1))
                }
                disabled={product.stock === 0 || quantity >= product.stock}
                className="px-4 py-2 hover:bg-gray-100 disabled:opacity-50"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* ACTION BUTTON */}
          <button
            onClick={addToCart}
            disabled={product.stock === 0}
            className={`w-full py-4 rounded-lg text-base font-semibold transition
              ${
                product.stock === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-amber-500 text-white hover:bg-amber-600 shadow-md"
              }
            `}
          >
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>

        </div>
      </div>
    </div>
  );
}
