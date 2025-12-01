import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProductsThunk } from "../redux/thunks/productThunk";

const AllProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProductsThunk());
  }, [dispatch]);

  if (loading) return <div className="text-center pt-20">Loading...</div>;

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
      <h2 className="text-xl sm:text-2xl pt-8 font-semibold text-gray-900">
        Top selling Product
      </h2>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div
            key={p._id}
            className="group rounded-2xl bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate(`/ProductDetail/${p._id}`)}
          >
            <div className="aspect-square w-full overflow-hidden bg-gray-50">
              <img
                src={p.image?.[0]}
                alt={p.name}
                className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform"
              />
            </div>

            <div className="p-4">
              <p className="text-gray-900 font-semibold tracking-tight">
                {p.name}
              </p>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-indigo-700 font-bold">₹{p.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllProduct;
