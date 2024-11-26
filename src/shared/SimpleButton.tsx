import { ClassValue } from "clsx";
import { forwardRef } from "react";
import { cn } from "~/shared/classname.utils";

type SimpleButtonProps = {
  onClickCallback: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any;
  children: React.ReactNode;
  isDisabled?: boolean;
  className?: ClassValue;
  ariaLabel?: string;
};

const SimpleButton = forwardRef<HTMLButtonElement, SimpleButtonProps>((props, ref) => {
  const { onClickCallback, children, isDisabled = false, className, ariaLabel, ...rest } = props;

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onClickCallback(e);
  };

  return (
    <button
      ref={ref}
      {...rest}
      {...(ariaLabel && { "aria-label": ariaLabel })}
      disabled={isDisabled}
      onClick={(e) => handleOnClick(e)}
      className={cn(
        "w-16 select-none rounded-md border border-solid border-stone-300 bg-stone-100 px-1 text-xs text-black transition-all duration-200 hover:bg-stone-300",
        className,
      )}
    >
      {children}
    </button>
  );
});

export default SimpleButton;
