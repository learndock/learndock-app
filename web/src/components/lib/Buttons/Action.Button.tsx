import clsx from "clsx";

const ActionButton: React.FC<React.ComponentProps<"button"> & { variant?: "primary" | "ghost" }>
  = ({ className, variant = "primary", ...props }) => (
  <button
    {...props}
    className={clsx(
      "rounded-2xl px-4 py-2 text-sm font-medium shadow-sm transition-transform active:scale-[0.98]",
      variant === "primary"
        ? "bg-accent text-background hover:opacity-90"
        : "border border-borders bg-cards text-text-primary hover:bg-background",
      className
    )}
  />
);

export default ActionButton;