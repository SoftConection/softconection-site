import { ChevronDown } from "lucide-react";

interface NavigationButtonsProps {
  sections: {
    id: string;
    label: string;
  }[];
}

export const NavigationButtons = ({ sections }: NavigationButtonsProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 flex-wrap mt-8">
      {sections.map((section, index) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-medium transition-all duration-300 border border-primary/30 hover:border-primary/60 text-sm"
        >
          {section.label}
          {index < sections.length - 1 && (
            <ChevronDown className="w-4 h-4 hidden sm:block" />
          )}
        </a>
      ))}
    </div>
  );
};

export default NavigationButtons;
