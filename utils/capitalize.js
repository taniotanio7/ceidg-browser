function capitalize(text) {
  if (!text) return "";
  return text.slice(0, 1).toUpperCase() + text.slice(1).toLowerCase();
}

export default capitalize;
