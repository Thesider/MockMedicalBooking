import React from 'react';
import { Users, Calendar, Clock, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import AdminLayout from '../../layouts/AdminLayout';
import styles from '../../styles/Components.module.css';

const DashboardPage: React.FC = () => {
  const kpiData = [
    {
      label: 'Total Patients Today',
      value: '24',
      change: '+12%',
      positive: true,
      icon: Users
    },
    {
      label: 'Doctors On Duty',
      value: '8',
      change: '+2',
      positive: true,
      icon: Users
    },
    {
      label: 'Pending Appointments',
      value: '15',
      change: '-3',
      positive: true,
      icon: Calendar
    },
    {
      label: 'Average Wait Time',
      value: '12 min',
      change: '-5 min',
      positive: true,
      icon: Clock
    }
  ];

  const appointmentTrends = [
    { name: 'Mon', appointments: 45 },
    { name: 'Tue', appointments: 52 },
    { name: 'Wed', appointments: 48 },
    { name: 'Thu', appointments: 61 },
    { name: 'Fri', appointments: 55 },
    { name: 'Sat', appointments: 32 },
    { name: 'Sun', appointments: 28 }
  ];

  const doctorLoad = [
    { name: 'Dr. Johnson', patients: 8 },
    { name: 'Dr. Chen', patients: 12 },
    { name: 'Dr. Davis', patients: 6 },
    { name: 'Dr. Wilson', patients: 9 },
    { name: 'Dr. Thompson', patients: 7 }
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening today.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <div key={index} className={`${styles.kpiCard} ${styles.fadeIn}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <TrendingUp className={`w-4 h-4 ${kpi.positive ? 'text-green-500' : 'text-red-500'}`} />
                </div>
                <div className={styles.kpiValue}>{kpi.value}</div>
                <div className={styles.kpiLabel}>{kpi.label}</div>
                <div className={`${styles.kpiChange} ${kpi.positive ? styles.kpiChangePositive : styles.kpiChangeNegative}`}>
                  {kpi.change} from yesterday
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Appointment Trends */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Appointment Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={appointmentTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="appointments" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Doctor Load */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Doctor Patient Load</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={doctorLoad}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="patients" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { time: '10:30 AM', action: 'New appointment booked', patient: 'John Smith', doctor: 'Dr. Johnson' },
              { time: '10:15 AM', action: 'Patient checked in', patient: 'Sarah Wilson', doctor: 'Dr. Chen' },
              { time: '09:45 AM', action: 'Appointment completed', patient: 'Mike Davis', doctor: 'Dr. Thompson' },
              { time: '09:30 AM', action: 'New patient registered', patient: 'Emily Brown', doctor: 'N/A' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">
                    Patient: {activity.patient} {activity.doctor !== 'N/A' && `• Doctor: ${activity.doctor}`}
                  </p>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;