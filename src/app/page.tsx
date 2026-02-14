'use client';

import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  const stats = [
    {
      title: 'Total Properties',
      value: '3',
      icon: '🏠',
      color: 'from-blue-500 to-blue-600',
      textColor: 'text-blue-400',
    },
    {
      title: 'Active Units',
      value: '18',
      icon: '🏢',
      color: 'from-green-500 to-green-600',
      textColor: 'text-green-400',
    },
    {
      title: 'Total Tenants',
      value: '12',
      icon: '👥',
      color: 'from-purple-500 to-purple-600',
      textColor: 'text-purple-400',
    },
    {
      title: 'Monthly Revenue',
      value: 'KES 245K',
      icon: '💰',
      color: 'from-yellow-500 to-yellow-600',
      textColor: 'text-yellow-400',
    },
  ];

  const features = [
    {
      title: 'Properties',
      description: 'Manage all your rental properties',
      icon: '🏠',
      href: '/properties',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Tenants',
      description: 'Track and manage tenant information',
      icon: '👥',
      href: '/tenants',
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Invoices',
      description: 'Generate and track rent invoices',
      icon: '📄',
      href: '/invoices',
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Payments',
      description: 'Track rent payments and receipts',
      icon: '💳',
      href: '/payments',
      color: 'from-yellow-500 to-orange-500',
    },
  ];

  const recentActivities = [
    {
      icon: '📝',
      title: 'Invoice generated for Ongoma Moses',
      time: '2 hours ago',
      type: 'invoice',
    },
    {
      icon: '👤',
      title: 'New tenant assigned to Unit 101',
      time: '1 day ago',
      type: 'tenant',
    },
    {
      icon: '💰',
      title: 'Payment received - KES 15,000',
      time: '3 days ago',
      type: 'payment',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold mb-2">Welcome back! 👋</h1>
        <p className="text-primary-100 text-lg">
          You have 3 properties with 18 units and 12 active tenants
        </p>
      </div>

      {/* Stats Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-dark-100">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:scale-105`}
              onClick={() => {
                if (stat.title === 'Total Properties') router.push('/properties');
                if (stat.title === 'Total Tenants') router.push('/tenants');
                if (stat.title === 'Monthly Revenue') router.push('/invoices');
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-white/80 text-sm font-medium mb-1">
                    {stat.title}
                  </p>
                  <p className="text-4xl font-bold">{stat.value}</p>
                </div>
                <span className="text-4xl">{stat.icon}</span>
              </div>
              <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-dark-100">Main Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              onClick={() => router.push(feature.href)}
              className={`bg-gradient-to-br ${feature.color} rounded-2xl p-6 text-white cursor-pointer hover:shadow-xl transition-all transform hover:scale-105 shadow-lg group`}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-sm opacity-90">{feature.description}</p>
              <div className="mt-4 inline-block text-sm font-medium group-hover:translate-x-1 transition-transform">
                Learn More →
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity List */}
        <div className="lg:col-span-2 bg-dark-800 rounded-2xl p-6 border border-dark-700 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-dark-100">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 bg-dark-700 rounded-xl hover:bg-dark-600 transition-all group cursor-pointer"
              >
                <div className="text-3xl group-hover:scale-110 transition-transform">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <p className="text-dark-100 font-medium">
                    {activity.title}
                  </p>
                  <p className="text-dark-400 text-sm">
                    {activity.time}
                  </p>
                </div>
                <div className="text-dark-400 group-hover:text-primary-400 transition-colors">
                  →
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-dark-800 rounded-2xl p-6 border border-dark-700 shadow-lg">
          <h3 className="text-xl font-bold mb-6 text-dark-100">Quick Stats</h3>
          <div className="space-y-4">
            <div className="p-4 bg-dark-700 rounded-xl">
              <p className="text-dark-400 text-sm mb-1">Occupancy Rate</p>
              <p className="text-3xl font-bold text-green-400">75%</p>
            </div>
            <div className="p-4 bg-dark-700 rounded-xl">
              <p className="text-dark-400 text-sm mb-1">Collection Rate</p>
              <p className="text-3xl font-bold text-blue-400">92%</p>
            </div>
            <div className="p-4 bg-dark-700 rounded-xl">
              <p className="text-dark-400 text-sm mb-1">Pending Payments</p>
              <p className="text-3xl font-bold text-yellow-400">3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}