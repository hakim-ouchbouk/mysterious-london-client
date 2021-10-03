import React, { useEffect, useState, useRef } from "react";

const FlashComponent = (props) => {
  const ref = useRef();

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      if (ref.current) setVisible(false);
    }, props.delay);
  }, [props.delay]);

  return visible ? <div ref={ref}>{props.children}</div> : <div />;
};

export default FlashComponent;
