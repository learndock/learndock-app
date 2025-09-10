import clsx from "clsx";
import { IconType } from "react-icons";

type ActionButtonProps = React.ComponentProps<"button"> & {
  variant?: "primary" | "ghost";
  icon?: IconType;
};

const ActionButton: React.FC<ActionButtonProps> = ({ 
  className, 
  variant = "primary", 
  icon: Icon, 
  children, 
  ...props 
}) => (
  <button
    {...props}
    className={clsx(
      "flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium shadow-sm transition-transform active:scale-[0.98]",
      variant === "primary"
        ? "bg-accent text-background hover:opacity-90"
        : "border border-borders bg-cards text-text-primary hover:bg-background",
      className
    )}
  >
    {Icon && <Icon className="text-lg" />}
    {children}
  </button>
);

export default ActionButton;
