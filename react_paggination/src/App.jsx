import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const productAPI = "https://dummyjson.com/products";

  const getAllProduct = async () => {
    try {
      const response = await fetch(productAPI);
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const totalPages = Math.ceil(products.length / 9);
  const pagesArray = new Array(totalPages).fill(null);

  const nextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <section className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-center text-4xl font-bold text-yellow-500 mb-10">
        Learn Pagination
      </h1>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1200px] mx-auto px-4">
        {products.slice(page * 9 - 9, page * 9).map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-4"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="h-56 w-full object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>

            <p className="text-gray-600 text-sm line-clamp-3">
              {item.description}
            </p>

            <div className="mt-4 flex justify-between items-center">
              <span className="text-green-600 font-bold">₹ {item.price}</span>
              <button className="bg-yellow-400 px-4 py-1 rounded-lg text-sm font-semibold hover:bg-yellow-500">
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-10">
        <button
          onClick={prevPage}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
        >
          ⬅ Prev
        </button>

        {pagesArray.map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 rounded-lg font-semibold ${
              page === i + 1 ? "bg-yellow-400 text-black" : "bg-white border"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={nextPage}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
        >
          Next ➡
        </button>
      </div>
    </section>
  );
}

export default App;
