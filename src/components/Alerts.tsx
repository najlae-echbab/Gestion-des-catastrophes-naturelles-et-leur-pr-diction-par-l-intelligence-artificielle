import React from "react";
import { ShieldAlert, AlertTriangle, CheckCircle } from "lucide-react";

interface AlertCardProps {
  title: string;
  description: string;
  location: string;
  date: string;
  level: "low" | "medium" | "high";
}

const levelStyles = {
  low: {
    bg: "bg-green-50",
    text: "text-green-700",
    icon: CheckCircle,
  },
  medium: {
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    icon: AlertTriangle,
  },
  high: {
    bg: "bg-red-50",
    text: "text-red-700",
    icon: ShieldAlert,
  },
} as const;

const Alerts: React.FC<AlertCardProps> = ({ title, description, location, date, level }) => {
  const style = levelStyles[level];
  const Icon = style.icon;

  return (
    <article
      className={
        `relative overflow-hidden rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-transform duration-300 ` +
        `hover:-translate-y-1 ${style.bg}`
      }
    >
      {/* Accent bar */}
      <span
        className={`absolute inset-y-0 left-0 w-1 rounded-l-2xl ${style.text} bg-opacity-80`}
      />

      <div className="p-6 flex flex-col h-full ">
        <header className="flex items-start gap-3 mb-4">
          <Icon className={`w-6 h-6 ${style.text}`} />
          <h3 className="text-lg font-semibold text-gray-900 leading-snug flex-1">
            {title}
          </h3>
        </header>

        <p className="text-gray-700 flex-grow leading-relaxed mb-6">
          {description}
        </p>

        <footer className="text-sm text-gray-600 flex justify-between items-center pt-2 border-t border-gray-200">
          <span className="flex items-center gap-1">
            📍 <span className="font-medium text-gray-800">{location}</span>
          </span>
          <time dateTime={date} className="whitespace-nowrap">
            🗓️ {new Date(date).toLocaleDateString()}
          </time>
        </footer>
      </div>
    </article>
  );
};

export default Alerts;
