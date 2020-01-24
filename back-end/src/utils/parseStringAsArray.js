module.exports = arrayAsString =>
  arrayAsString ? arrayAsString.split(",").map(v => v.trim()) : "";
