import classes from "./Button.module.css";

export default function Button({
  className,
  children,
  onClick,
  disabled = false,
  textOnly = false,
}) {
  //   console.log(props);
  return (
    <button
      className={`${classes.button} ${className} ${
        textOnly ? classes["text-only"] : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
