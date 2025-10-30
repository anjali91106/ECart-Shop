
const About = () => {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="text-center py-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Our Story
        </h1>
        <p className="text-xl text-gray-600">
          Bringing the best to your doorstep, seamlessly.
        </p>
      </header>

      <section className="bg-white shadow-xl rounded-xl p-6 md:p-12 mb-12">
        <h2 className="text-3xl font-bold text-indigo-600 mb-6">
          The E-Cart Vision
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          **E-Cart** was founded in 2023 with a simple yet powerful mission: to make high-quality products accessible to everyone, everywhere. We believe that shopping should be an **effortless, enjoyable, and reliable** experience. From our humble beginnings, we've grown into a trusted online marketplace connecting millions of customers with exceptional goods.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          Our platform is built on a foundation of **trust, transparency, and customer-first service**. We meticulously vet all our suppliers and constantly optimize our logistics to ensure your order arrives quickly and in perfect condition.
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-8 text-center">
        {/* Mission Card */}
        
        <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition duration-300">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">Mission</h3>
          <p className="text-gray-600">
            To provide a diverse selection of products with a focus on quality, value, and customer satisfaction.
          </p>
        </div>
        {/* Values Card */}
        <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition duration-300">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">Values</h3>
          <p className="text-gray-600">
            **Integrity, Innovation, and Accessibility**—these principles guide every decision we make.
          </p>
        </div>
        {/* Future Card */}
        <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition duration-300">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">The Future</h3>
          <p className="text-gray-600">
            We aim to expand our product categories and leverage AI to create a truly personalized shopping journey.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;