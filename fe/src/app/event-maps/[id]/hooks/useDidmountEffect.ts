import { useEffect, useRef } from "react";

/**
 * Custom hook to execute a function only when the dependencies change after the first render.
 *
 * @param func - Function to execute on dependency change
 * @param deps - Dependency array
 */
const useDidMountEffect = (
  func: () => void,
  deps: React.DependencyList
): void => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      func();
    } else {
      didMount.current = true;
    }
    // Ensure 'func' is included in the dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useDidMountEffect;
