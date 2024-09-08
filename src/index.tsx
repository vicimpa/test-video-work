import { App } from "$App";
import { createRoot } from "react-dom/client";

const root = document.createElement('div');
root.style.display = 'contents';
document.body.appendChild(root);

createRoot(root)
  .render(<App />);