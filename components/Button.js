import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const Button = ({
  as: Element = "button",
  icon = false,
  secondary = false,
  disabled = false,
  className,
  children,
  ...props
}) => {
  return (
    <Element
      disabled={disabled}
      className={clsx(
        className,
        icon && "flex",
        secondary && "bg-gray-300 hover:bg-gray-200 text-gray-700",
        !secondary && "bg-blue-500 hover:bg-blue-700 disabled:bg-gray-500",
        "cursor-pointer disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded"
      )}
      {...props}
    >
      {children}
    </Element>
  );
};

Button.propTypes = {
  as: PropTypes.node,
  icon: PropTypes.bool,
  secondary: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Button;
