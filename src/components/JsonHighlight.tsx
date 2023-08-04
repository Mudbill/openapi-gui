import ReactSyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNight } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface Props {
  json: any;
}

export default function JsonHighlight(props: Props) {
  return (
    <pre>
      <ReactSyntaxHighlighter
        language="json"
        style={{
          ...tomorrowNight,
          hljs: { ...tomorrowNight.hljs, background: "none" },
        }}
      >
        {JSON.stringify(props.json, null, 2)}
      </ReactSyntaxHighlighter>
    </pre>
  );
}
