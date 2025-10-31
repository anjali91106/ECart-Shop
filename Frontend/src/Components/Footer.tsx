
const Footer = () => {
    return (
        <div className="w-full bg-white/80 backdrop-blur-md border-t border-gray-200 mt-16">

            <div className="max-w-6xl mx-auto px-6 py-10">
                {/* <!-- Top Section --> */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700">
                    {/* <!-- Brand --> */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">MyBrand</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Crafting elegant web experiences with simplicity and clarity.
                        </p>
                    </div>

                    {/* <!-- Quick Links --> */}
                    <div>
                        <h3 className="text-gray-800 font-medium mb-3">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>Home</li>
                            <li>About</li>
                            <li>Services</li>
                            <li>Contact</li>
                        </ul>
                    </div>

                    {/* <!-- Socials --> */}
                    <div>
                        <h3 className="text-gray-800 font-medium mb-3">Follow Us</h3>
                        <div className="flex space-x-4 text-gray-600">
                            <a href="#" className="hover:text-gray-900 transition">Instagram</a>
                            <a href="#" className="hover:text-gray-900 transition">Twitter</a>
                            <a href="#" className="hover:text-gray-900 transition">LinkedIn</a>
                        </div>
                    </div>
                </div>

                {/* <!-- Bottom Section --> */}
                <div className="mt-10 border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
                    <p>© 2025 MyBrand. All rights reserved.</p>
                    <p className="mt-2 md:mt-0">Designed with ❤️</p>
                </div>
            </div>


        </div>
    )
}

export default Footer
