const sidebarItems = [
  {
    tooltip: "View Demo",
    href: "#",
    label: "View Demo",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 4H18C19.1046 4 20 4.89543 20 6V16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="4"
          y="8"
          width="12"
          height="12"
          rx="1"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    tooltip: "Purchase Nerio",
    href: "https://1.envato.market/E0b9zW",
    external: true,
    label: "Purchase Nerio",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 2H3V6H5L7.5 16.5C7.68943 17.2777 8.37541 17.8286 9.17222 17.8286H17.881C18.6778 17.8286 19.3638 17.2777 19.5532 16.5L22 7H7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9" cy="20.5" r="1.5" fill="currentColor" />
        <circle cx="18" cy="20.5" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    tooltip: "Read Documentation",
    href: "https://rstheme.com/docs/nerio-wordpress-theme/",
    external: true,
    label: "Read Documentation",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 2V8H20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 13H8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 17H8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 9H8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    tooltip: "Customer Support",
    href: "https://rstheme.com/support",
    external: true,
    label: "Customer Support",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle
          cx="12"
          cy="12"
          r="3"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M12 2V5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M12 19V22"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M2 12H5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M19 12H22"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function StickySidebar() {
  return (
    <div className="sticky-sidebar">
      <ul className="sticky-sidebar-inner">
        {sidebarItems.map((item, i) => (
          <li key={i} className="sticky-sidebar-item">
            <a
              href={item.href}
              className="sticky-sidebar-link"
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              aria-label={item.label}
            >
              {item.icon}
              <span className="sidebar-tooltip">{item.tooltip}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}