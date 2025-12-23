const UserFooter = () => {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">

        {/* Brand */}
        <div>
          <h3 className="text-lg font-extrabold text-orange-500">
            FoodApp
          </h3>
          <p className="mt-2 text-gray-500">
            Order food from your favorite restaurants nearby.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Quick Links</h4>
          <ul className="space-y-1">
            <li className="hover:text-orange-500 cursor-pointer">About</li>
            <li className="hover:text-orange-500 cursor-pointer">Help</li>
            <li className="hover:text-orange-500 cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Legal</h4>
          <ul className="space-y-1">
            <li className="hover:text-orange-500 cursor-pointer">
              Terms & Conditions
            </li>
            <li className="hover:text-orange-500 cursor-pointer">
              Privacy Policy
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t text-center py-4 text-xs text-gray-400">
        © {new Date().getFullYear()} FoodApp. All rights reserved.
      </div>
    </footer>
  )
}

export default UserFooter
