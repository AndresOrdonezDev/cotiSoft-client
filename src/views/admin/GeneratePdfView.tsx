import { useQuery } from "@tanstack/react-query"
import { generateQuotePdf } from "../../api/QuoteAPI"

export default function GeneratePdfView() {
    const { data, isError } = useQuery({
        queryKey: ['quotePDF'],
        queryFn: ()=>generateQuotePdf(1)
    })
    if (isError) return <p>error al traer los datos</p>
    if (data) return (
        <div>descargar</div>
    )
}