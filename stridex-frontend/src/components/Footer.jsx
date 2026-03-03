const Footer = () => {
  return (
    <footer className="bg-[#444] text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">

        <div>
          <h2 className="text-lg font-semibold mb-3">StrideX</h2>
          <p className="text-sm opacity-70">
            Premium footwear collection with secure payments and fast delivery.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm opacity-80">
            <li>Home</li>
            <li>Products</li>
            <li>Cart</li>
            <li>Orders</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Contact</h2>
          <p className="text-sm opacity-80">
            Email: support@stridex.com
          </p>
        </div>

      </div>

      <div className="text-center py-4 border-t border-white/20 text-sm opacity-70">
        © {new Date().getFullYear()} StrideX. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;