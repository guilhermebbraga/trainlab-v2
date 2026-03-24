interface InputErrorProps {
    message: string | undefined
}

export default function InputError({message}: InputErrorProps) {
  return (
    <span className="text-sm font-light text-orange-600">
      {message}
    </span>
  );
}