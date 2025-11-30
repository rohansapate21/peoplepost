export default function StatusBadgeForGov({ status }) {
  const getStatusConfig = () => {
    switch (status) {
      case "NEW":
        return {
          bg: "bg-blue-100",
          text: "text-blue-700",
          border: "border-blue-300",
          icon: "🆕",
          label: "New",
          pulse: true,
        };
      case "IN_PROCESS":
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-700",
          border: "border-yellow-300",
          icon: "⏳",
          label: "In Process",
          pulse: false,
        };
      case "RESOLVED":
        return {
          bg: "bg-green-100",
          text: "text-green-700",
          border: "border-green-300",
          icon: "✅",
          label: "Resolved",
          pulse: false,
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-700",
          border: "border-gray-300",
          icon: "❓",
          label: status,
          pulse: false,
        };
    }
  };

  const config = getStatusConfig();

  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${config.bg} ${config.text} ${config.border} ${config.pulse ? "pulse-ring" : ""
        } shadow-sm`}
    >
      <span className="text-sm">{config.icon}</span>
      {config.label}
    </span>
  );
}
