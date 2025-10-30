import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="text-center py-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Get in Touch
        </h1>
        <p className="text-xl text-gray-600">
          We're here to help! Reach out to us through any of the methods below.
        </p>
      </header>


      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Form Section */}
        <div className="p-8 bg-white shadow-2xl rounded-xl">
          <h2 className="text-3xl font-bold text-indigo-600 mb-6">
            Send Us a Message
          </h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Your Full Name"
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                id="message"
                rows={4}
                placeholder="How can we help you?"
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
            >
              Submit Inquiry
            </button>
          </form>
        </div>

        {/* Info Cards Section */}
        <div className="space-y-6">
          <div className="flex items-start p-6 bg-indigo-50 rounded-xl shadow-md">
            <Mail className="w-8 h-8 text-indigo-600 mr-4 mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Email Support</h3>
              <p className="text-gray-600">
                For order inquiries and general questions.
              </p>
              <p className="font-bold text-indigo-700 mt-1">support@ecart.com</p>
            </div>
          </div>

          <div className="flex items-start p-6 bg-indigo-50 rounded-xl shadow-md">
            <Phone className="w-8 h-8 text-indigo-600 mr-4 mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Call Us</h3>
              <p className="text-gray-600">
                Monday - Friday, 9:00 AM - 5:00 PM (EST)
              </p>
              <p className="font-bold text-indigo-700 mt-1">+1 (555) 123-4567</p>
            </div>
          </div>

          <div className="flex items-start p-6 bg-indigo-50 rounded-xl shadow-md">
            <MapPin className="w-8 h-8 text-indigo-600 mr-4 mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Our Address</h3>
              <p className="text-gray-600">
                E-Cart Headquarters, 123 Commerce St, Suite 100, City, State 90210
              </p>
              <a href="#" className="text-sm text-indigo-500 hover:text-indigo-700 mt-1 inline-block">View on Map</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;