import { ErrorFAQ } from "../../../config/Errors.config";
import { Accordion, AccordionItem } from "./API/NoConnectionAccordion";

interface FAQSectionProps {
  config: ErrorFAQ;
  showSpecial: boolean;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ config, showSpecial }) => (
  <section className="pt-16 px-4 text-black dark:text-white">
    <h2 className="text-3xl font-bold text-center mb-8">If you're curious...</h2>
    <Accordion>
      {config
        .filter((item) => !item.special || showSpecial)
        .map((item, idx) => (
          <AccordionItem key={idx} title={item.title} className="bg-zinc-800">
            {item.description}
          </AccordionItem>
        ))}
    </Accordion>
  </section>
);