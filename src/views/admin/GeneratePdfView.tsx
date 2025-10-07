import { useQuery } from "@tanstack/react-query";
import { generateQuotePdf } from "../../api/QuoteAPI";


export default function GeneratePdfView() {
    const id = 1
  const {data} = useQuery({
    queryKey:["quote",id],
    queryFn:()=>generateQuotePdf(id),
  })
  const url = window.URL.createObjectURL(new Blob([data]));
  return (
    <div>
      <p>Descargar cotización</p>
      <a href={url} download={`cotización-${id}.pdf`} className="bg-teal-600 text-white px-4 py-2 rounded">descargar </a>
    </div>
  );
}
