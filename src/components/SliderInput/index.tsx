import { ChangeEvent, forwardRef } from "react";
import InputError from "../InputError";

interface SliderInputProps {
  elementId: string;
  value: number;
  steps?: number;
  max?: number;
  min?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  error?: string;
}

export default forwardRef<HTMLInputElement, SliderInputProps>(
  function SliderInput(
    { elementId, onChange, value, disabled, error, max = 100, min = 1, steps },
    ref,
  ) {
    const sliderStyles = {
      "--value": `${value}%`,
    } as React.CSSProperties;

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value)
        onChange(newValue)
    }
    
    return (
      <>
        <div className="relative h-7.5">
          <input
            ref={ref}
            id={elementId}
            type="range"
            onChange={handleOnChange}
            style={sliderStyles}
            step={steps}
            max={max}
            min={min}
            disabled={disabled}
            className="absolute z-999 cursor-pointer w-full h-full opacity-0 "
          />

          <div className="bg-background-light p-1 rounded-full">
            <div
              style={{ width: (value / max) * 100 + "%" }}
              className="bg-primary h-7 rounded-full cursor-pointer relative"
            />
          </div>
          <p className="absolute right-1 top-2 font-medium mr-2 text-text-light">
            {value}
          </p>
        </div>
        {error && <InputError message={error} />}
      </>
    );
  },
);

// export default function SliderInput({
//   elementId,
//   value,
//   onChange,
//   steps,
//   max = 100,
//   min = 1,
// }: SliderInputProps) {
//   const sliderStyles = {
//     "--value": `${value}%`,
//   } as React.CSSProperties;

//   return (

//   );
// }
