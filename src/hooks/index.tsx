import React from "react";

/**
const [count, setCount] = useStateWithCallback(0);
setCount(1, ()=>{
  console.log(count) // ===> 1
})
 */

export const useStateWithCallback = (initState: any) => {
  const [state, setState] = React.useState(initState);
  const cbRef = React.useRef(() => {});
  React.useEffect(() => {
    typeof cbRef.current === "function" && cbRef.current();
  }, [state]);

  const setStateWithCB: (nextState: any, callback: () => void) => void = (
    nextState,
    callback
  ) => {
    setState(nextState);
    cbRef.current = callback;
  };

  return [state, setStateWithCB];
};
