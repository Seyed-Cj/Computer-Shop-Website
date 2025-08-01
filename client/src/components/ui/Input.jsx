export default function Input({ className, ...props }) {
  return (
    <input
      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${className}`}
      {...props}
    />
  );
}