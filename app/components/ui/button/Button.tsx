interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  variant?: "yellow" | "red" | "icon" | "type";
  disabled?: boolean;
  selected?: boolean;
  color?: string;
}

export const Button = ({
  children,
  onClick,
  className = "",
  variant = "yellow",
  disabled = false,
  selected = false,
  color = "",
}: ButtonProps) => {
  const variantStyles = {
    icon: "text-gray-400 hover:text-gray-600 transition-colors",
    yellow:
      "mt-4 w-full font-thin font-pokemon-solid py-2 px-4 rounded-3xl flex items-center justify-center gap-2 transition-colors bg-yellow-400 hover:bg-yellow-500 text-black disabled:bg-yellow-300",
    red: "mt-4 w-full font-thin font-pokemon-solid py-2 px-4 rounded-3xl flex items-center justify-center gap-2 transition-colors bg-red-500 hover:bg-red-600 text-white disabled:bg-red-300",
    type: `
      relative w-16 h-16 rounded-full transform transition-all duration-200
      flex items-center justify-center
      ${
        selected
          ? `${color} ring-4 ring-white ring-offset-2 scale-110`
          : `${color} scale-100 hover:scale-110`
      }
    `,
  };

  const finalClasses = `${variantStyles[variant]} disabled:cursor-not-allowed ${className}`;

  return (
    <button className={finalClasses} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
