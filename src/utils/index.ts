export function formatDate(stringValue:string) {
  const date = new Date(stringValue);
  return new Intl.DateTimeFormat("es-ES", {
    dateStyle: "medium" //choose more options
    //timeStyle: "short",  // to show time
  }).format(date);
}

export function formatCurrency(value:number ) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    //minimumFractionDigits: 0, // not float
  }).format(value);
}