import {} from "@mui/material";

export default function EditMessage({ textRef, nodeName, setNodeName }: any) {
  return (
    <div className="updatenode__controls">
      <label>Text</label>
      <textarea
        ref={textRef}
        value={nodeName}
        onChange={(evt) => setNodeName(evt.target.value)}
      />
    </div>
  );
}
