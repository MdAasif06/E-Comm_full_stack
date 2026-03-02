import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        Payment Cancelled 
      </h1>

      <Link
        to="/"
        className="bg-black text-white px-6 py-3 rounded"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default Cancel;