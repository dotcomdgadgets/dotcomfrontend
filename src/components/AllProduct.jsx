import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProductsThunk } from "../redux/thunks/productThunk";

export default function AllProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProductsThunk());
  }, [dispatch]);

  if (loading) return <div className="text-center pt-20">Loading...</div>;

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 pb-20">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Mobile Products</h2>
        <button className="text-sm text-gray-500 hover:underline">
          See All →
        </button>
      </div>

      {/* PRODUCT GRID */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((p) => (
          <div
            key={p._id}
            className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition cursor-pointer"
            onClick={() => navigate(`/ProductDetail/${p._id}`)}
          >
            {/* Product Image */}
            <div className="aspect-square overflow-hidden bg-gray-50 rounded-t-2xl">
              <img
                src={p.image?.[0]}
                alt={p.name}
                className="w-full h-full object-cover group-hover:scale-105 transition"
              />
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h5 className="text-gray-600 font-semibold text-sm mb-1">
                {p.name}
              </h5>

              <span className="text-indigo-600 font-bold text-base">
                ₹{p.price}
              </span>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
