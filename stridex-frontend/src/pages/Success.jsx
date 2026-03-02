import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Payment Successful 
      </h1>

      <p className="mb-6">Thank you for your purchase!</p>

      <Link
        to="/"
        className="bg-black text-white px-6 py-3 rounded"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default Success;