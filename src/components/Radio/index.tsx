import { forwardRef } from "react";

interface RadioProps {
  selectedValue: string;
  radioTags: string[][];
  disabled?: boolean;
  onChange: (value: string) => void;
  elementId?: string
}

export default forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { selectedValue, radioTags, disabled,elementId, onChange },
  ref,
) {
  return (
    <div ref={ref} className="flex flex-wrap gap-2">
      {radioTags.map((tag) => (
        <label
          key={tag[0]}
          className={`flex-1 min-w-25 text-center p-1 rounded-full cursor-pointer transition-all text-sm ${
            selectedValue === tag[0]
              ? "bg-primary text-white shadow-md"
              : "bg-primary/30 text-text-muted"
          }
            ${disabled && "opacity-70"}
            `}
        >
          <input
            type="radio"
            id={elementId}
            name="level"
            value={tag[0]}
            onChange={() => onChange(tag[0])}
            checked={selectedValue === tag[0]}
            className="sr-only"
          />
          {tag[1]}
        </label>
      ))}
    </div>
  );
});
