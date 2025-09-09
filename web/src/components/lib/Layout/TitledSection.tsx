import clsx from "clsx";

const TitledSection: React.FC<{ title: React.ReactNode; children: React.ReactNode; className?: string }>
  = ({ title, children, className }) => (
  <section className={clsx("space-y-4", className)}>
    <h2 className="text-xl md:text-2xl font-semibold text-text-primary">{title}</h2>
    {children}
  </section>
);

export default TitledSection;