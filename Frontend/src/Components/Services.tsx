import { Truck, Lock, Zap, RefreshCw } from 'lucide-react'; // Example icons from lucide-react

const Services = () => {
  const serviceFeatures = [
    {
      icon: Truck,
      title: "Fast & Reliable Shipping",
      description: "We partner with top logistics providers to ensure your package arrives quickly and safely at your door.",
      color: "text-blue-500"
    },
    {
      icon: Lock,
      title: "Secure Payment Methods",
      description: "Your financial security is our priority. We use industry-leading encryption for all transactions.",
      color: "text-green-500"
    },
    
    {
      icon: RefreshCw,
      title: "Easy 30-Day Returns",
      description: "Not satisfied? No problem. Our hassle-free return policy makes exchanges and refunds simple.",
      color: "text-yellow-500"
    },
    {
      icon: Zap,
      title: "24/7 Customer Support",
      description: "Our dedicated support team is always available to answer your queries and resolve any issues.",
      color: "text-red-500"
    },
  ];

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="text-center py-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Our Core Services
        </h1>
        <p className="text-xl text-gray-600">
          Experience the difference of a truly customer-focused E-commerce platform.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {serviceFeatures.map((feature, index) => (
          <div
            key={index}
            className="p-6 bg-white border-t-4 border-indigo-500 rounded-lg shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-3xl"
          >
            <feature.icon className={`w-12 h-12 mb-4 ${feature.color}`} />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-600">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      <section className="mt-12 text-center bg-indigo-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">
          Need a Custom Solution?
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          For large orders, bulk purchases, or partnership inquiries, please reach out to our corporate sales team.
        </p>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-full font-medium hover:bg-indigo-700 transition duration-300">
          Contact Sales
        </button>
      </section>
    </div>
  );
};

export default Services;