export default function FoodItem({ item, addToCart }) {
  return (
    <div className="p-4 border rounded shadow-md hover:shadow-lg transition-shadow">
      <img 
        src={item.image} 
        alt={item.name} 
        className="w-full h-32 object-cover rounded"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/150?text=Food+Image";
        }}
      />
      <h2 className="text-lg font-bold mt-2">{item.name}</h2>
      <p className="text-sm text-gray-600">₹{item.price}</p>
      <button 
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 mt-2 rounded w-full transition-colors" 
        onClick={() => addToCart(item)}
      >
        Add to Cart
      </button>
    </div>
  );
}
