interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  variant?: "yellow" | "icon";
  disabled?: boolean;
}

export const Button = ({
  children,
  onClick,
  className = "",
  variant = "yellow",
  disabled = false,
}: ButtonProps) => {
  const variantStyles = {
    icon: "text-gray-400 hover:text-gray-600 transition-colors",
    yellow:
      "mt-4 w-full font-thin font-pokemon-solid py-2 px-4 rounded-3xl flex items-center justify-center gap-2 transition-colors bg-yellow-400 hover:bg-yellow-500 text-black disabled:bg-yellow-300",
  };

  const finalClasses = `${variantStyles[variant]} disabled:cursor-not-allowed ${className}`;

  return (
    <button className={finalClasses} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
