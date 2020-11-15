import React, { useEffect, useState } from "react";
import { Copy, Check } from "react-feather";
import clsx from "clsx";

const CopyButton = ({ text, className, children }) => {
  const [clicked, setClicked] = useState(false);

  const hasText = !React.Children.count;

  useEffect(() => {
    if (clicked) {
      navigator.clipboard.writeText(text).then(() => {
        setTimeout(() => setClicked(false), 2000);
      });
    }
  }, [clicked]);

  const Icon = clicked ? Check : Copy;

  return (
    <button
      className={clsx(
        "bg-gray-200 hover:bg-gray-200 text-gray-700 cursor-pointer font-bold py-1 rounded",
        hasText ? "px-2" : "px-1",
        className
      )}
      onClick={() => setClicked(true)}
    >
      {children}
      <Icon className={clsx(hasText && "mr-2")} />
    </button>
  );
};

export default CopyButton;
