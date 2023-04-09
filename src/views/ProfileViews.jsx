import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProfileViews() {
  const { user } = useAuth();

  // useEffect llamando a getdressesofuserinsession, guardado en el estado 's'

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Account Information</h2>
            <div className="flex flex-col space-y-4">
              <p className="text-gray-500">Username: {user.username}</p>
              <p className="text-gray-500">Email: {user.email}</p>
              {/* <button className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-400">
                Edit Profile
              </button> */}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Create a New Dress</h2>
            <div className="flex flex-col space-y-4">
              <p className="text-gray-500">
                Are you ready to sell? It will only take a few minutes.
              </p>
              <Link
                to={`/dress/newdress`}
                className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-400"
              >
                Create a new dress
              </Link>
            </div>
          </div>
          {user && user.role === 'admin' && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Create a new Post</h2>
              <div className="flex flex-col space-y-4">
                <p className="text-gray-500">
                Here you can create a new post to keep the brides informed.             </p>
                <button className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-400">
                  Create a new post
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
