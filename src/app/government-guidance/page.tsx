import { DocumentExplorer } from "@/components/document-explorer";
import { research } from "@/lib/research";

export default function Guidance() {
  return <main className="container main"><div className="page-heading"><div className="eyebrow">Historical translation research · separate from legal misrepresentation</div><h1>Government guidance and forms</h1><p>English sources and government-published translations. A link’s presence does not mean its edition matches or its text has been screened.</p></div><DocumentExplorer documents={research.documents} /></main>;
}
