interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  variant?: "icon";
}

export const Button = ({
  children,
  onClick,
  className = "",
  variant = "icon",
}: ButtonProps) => {
  const variantStyles = {
    icon: "text-gray-400 hover:text-gray-600 transition-colors",
  };

  const finalClasses = `${variantStyles[variant]}  ${className}`;

  return (
    <button className={finalClasses} onClick={onClick}>
      {children}
    </button>
  );
};
