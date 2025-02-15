import { marked } from "marked"
import parse from 'html-react-parser'

function MarkedParser(props) {

    const raw = props.raw
    const data = parse(marked.parse(raw))
    return data
}
  
export default MarkedParser