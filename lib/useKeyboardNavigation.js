import { useEffect } from "react";

// navigate autocomplete results with the up and down arrow keys
export default function useKeyboardNavigation(
  data,
  selectedItem,
  setSelected,
  clearSelected
) {
  function keyboardNavigation(event) {
    if (!data) {
      return;
    } else if (event.keyCode === 40 || event.keyCode === 38) {
      const lastIndex = data.length - 1;

      if (selectedItem === null) {
        event.keyCode === 40 ? setSelected(0) : setSelected(lastIndex);
      } else {
        // down arrow
        if (event.keyCode === 40) {
          selectedItem < lastIndex
            ? setSelected(selectedItem + 1)
            : setSelected(0);
        }
        // up arrow
        if (event.keyCode === 38) {
          selectedItem > 0
            ? setSelected(selectedItem - 1)
            : setSelected(lastIndex);
        }
      }
      // escape key
    } else if (event.keyCode === 27) {
      clearSelected();
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", keyboardNavigation);
    return () => {
      document.removeEventListener("keydown", keyboardNavigation);
    };
  });
}
