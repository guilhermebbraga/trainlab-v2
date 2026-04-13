interface ChipProps {
  text: string;
  style?: "solid" | "bordered" | "default";
}

export default function Chip({ text, style = "default" }: ChipProps) {
  const stylesMap = {
    solid: "bg-primary",
    bordered: "border border-primary text-primary bg-primary/10",
    default: " bg-neutral-200 text-neutral-800",
  };

  return (
    <span className={`${stylesMap[style]} px-2.5 rounded-full lowercase`}>
      {text}
    </span>
  );
}
