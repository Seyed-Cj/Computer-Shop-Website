import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

export default function RevenueChart({ data }) {
  const chartData = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: 'درآمد روزانه',
        data: data.map((d) => d.income),
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(16, 185, 129, 0.25)'); // Softer emerald gradient
          gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');
          return gradient;
        },
        borderColor: '#10b981', // Keep the vibrant emerald
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#10b981',
        pointHoverBackgroundColor: '#10b981',
        pointHoverBorderColor: '#ffffff',
        pointHoverRadius: 10,
        pointBorderWidth: 3,
        pointRadius: 5,
        borderWidth: 3,
        tension: 0.4, // Smoother curve
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }, // Keep legend hidden as per your preference
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(17, 24, 39, 0.95)', // Darker, premium tooltip
        titleColor: '#f9fafb',
        bodyColor: '#d1d5db',
        titleFont: { size: 14, weight: 'bold', family: 'Vazirmatn, sans-serif' },
        bodyFont: { size: 12, family: 'Vazirmatn, sans-serif' },
        padding: 14,
        cornerRadius: 10,
        boxPadding: 6,
        displayColors: false,
        borderColor: '#10b981',
        borderWidth: 1,
        callbacks: {
          label: (ctx) => `${ctx.parsed.y.toLocaleString('fa-IR')} تومان`,
          title: (items) => `روز ${items[0].label}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false, drawBorder: false },
        ticks: {
          color: '#6b7280',
          font: { size: 13, family: 'Vazirmatn, sans-serif' },
          maxRotation: 45,
          minRotation: 45, // Rotate for better readability
        },
      },
      y: {
        grid: {
          color: 'rgba(229, 231, 235, 0.3)', // Softer grid lines
          drawBorder: false,
        },
        ticks: {
          color: '#6b7280',
          font: { size: 13, family: 'Vazirmatn, sans-serif' },
          padding: 12,
          callback: (v) => `${(v / 1_000_000).toLocaleString('fa-IR')} میلیون`,
        },
        beginAtZero: true,
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart', // Smooth animation
    },
  };

  return (
    <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-xl">
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="inline-block p-2 bg-emerald-100 dark:bg-emerald-900 rounded-full">
              <svg
                className="w-5 h-5 text-emerald-600 dark:text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </span>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                نمودار درآمد
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                هفت روز اخیر
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300 text-sm px-4 py-2 rounded-full font-medium transition-colors duration-200 hover:bg-emerald-200 dark:hover:bg-emerald-800">
            <span className="font-bold">+۱۲.۵٪</span>
            <span>نسبت به هفته قبل</span>
          </div>
        </div>
        
        <div className="relative h-72 md:h-96 bg-white dark:bg-gray-850 rounded-lg p-4 shadow-inner">
          <Line data={chartData} options={options} />
        </div>
        
        <div className="flex justify-center mt-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 font-medium">
            <span className="w-3 h-3 bg-emerald-500 rounded-full" />
            <span>درآمد روزانه</span>
          </div>
        </div>
      </div>
    </div>
  );
}