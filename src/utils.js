export function selection(id) {
    try {
      for (let [key, value] of Object.entries(document.getElementsByClassName("menu-button"))) {
        value.className = "menu-button";
        console.log(value);
      }
      if (!document.getElementById(id).classList.contains("active"))
        document.getElementById(id).className += " active";
    } catch {
  
    }
  }

