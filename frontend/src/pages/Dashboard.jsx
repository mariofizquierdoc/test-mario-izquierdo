import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MyProjects from '../components/MyProjects/MyProjects';
import MyTasks from '../components/MyTasks/MyTasks';
import { api } from '../services/api';

function Dashboard() {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await api.getUserStats();
      setStats(data.stats || data);
    } catch (err) {
      setError(err.message || 'Failed to load statistics');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Welcome, {user?.firstName || user?.name || 'User'}!
          </h2>
          <p className="text-gray-600">
            You have successfully logged in. This is a protected route.
          </p>
          <div className="mt-4 p-4 bg-gray-50 rounded">
            <h3 className="font-semibold text-gray-700 mb-2">User Info:</h3>
            <p className="text-gray-600">Email: {user?.email}</p>
            <p className="text-gray-600">
              Name: {user?.firstName} {user?.lastName}
            </p>
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded">
            <h3 className="font-semibold text-gray-700 mb-2">Your projects:</h3>
            <MyProjects user={user} />
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded">
            <h3 className="font-semibold text-gray-700 mb-2">Your assigned tasks:</h3>
            <MyTasks user={user} />
          </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="text-xl text-gray-600">Loading statistics...</div>
          </div>
        ) : stats ? (
          <>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Your Statistics</h3>
            
            {/* Projects Card */}
            <div className="mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium uppercase tracking-wide">
                      Total Projects
                    </p>
                    <p className="text-4xl font-bold mt-2">
                      {stats.projectsCollab.length || 0}
                    </p>
                    <p className="text-blue-100 text-sm mt-2">
                      Projects you're collaborating on
                    </p>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-full p-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Tasks Cards Grid */}
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Tasks Assigned to You</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Pending Tasks */}
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-yellow-100 rounded-full p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-yellow-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <h5 className="text-gray-600 text-sm font-medium mb-1">Pending</h5>
                <p className="text-3xl font-bold text-gray-800">
                  {stats.pendingTasks.length || 0}
                </p>
                <p className="text-gray-500 text-sm mt-2">Tasks waiting to start</p>
              </div>

              {/* In Progress Tasks */}
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-100 rounded-full p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                </div>
                <h5 className="text-gray-600 text-sm font-medium mb-1">In Progress</h5>
                <p className="text-3xl font-bold text-gray-800">
                  {stats.inProgressTasks.length || 0}
                </p>
                <p className="text-gray-500 text-sm mt-2">Currently working on</p>
              </div>

              {/* Completed Tasks */}
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-green-100 rounded-full p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <h5 className="text-gray-600 text-sm font-medium mb-1">Completed</h5>
                <p className="text-3xl font-bold text-gray-800">
                  {stats.completedTasks.length || 0}
                </p>
                <p className="text-gray-500 text-sm mt-2">Tasks finished</p>
              </div>
            </div>

            {/* Total Tasks Summary */}
            <div className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium uppercase tracking-wide">
                    Total Tasks Assigned
                  </p>
                  <p className="text-4xl font-bold mt-2">
                    {(stats.totalTasks.length || 0)}
                  </p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-full p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </>
        ) : null}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;