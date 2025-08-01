import { useState, useRef, useEffect } from "react";

export default function Dropdown({
  label,
  icon,
  items = [],
  onSelect,
  buttonClassName = "",
  dropdownClassName = "",
  itemClassName = "",
  renderItem, 
  align = "right"
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleItemClick = (item) => {
    onSelect?.(item);
    setOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className={`inline-flex justify-center items-center gap-2 rounded-md px-4 py-2 text-sm font-medium shadow-sm ${buttonClassName}`}
      >
        {icon && <span className="mt-1">{icon}</span>}
        {label}
        <svg
          className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className={`absolute z-20 mt-2 w-48 origin-top-${align} rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 ${align === "right" ? "right-0" : "left-0"} ${dropdownClassName}`}
        >
          <div className="py-1 text-sm text-gray-700">
            {items.map((item, idx) =>
              renderItem ? (
                <div key={idx} onClick={() => handleItemClick(item)}>
                  {renderItem(item)}
                </div>
              ) : (
                <button
                  key={idx}
                  onClick={() => handleItemClick(item)}
                  className={`flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100 ${itemClassName}`}
                >
                  {item.icon && <span>{item.icon}</span>}
                  {item.label}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}