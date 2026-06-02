const rows = [
  ['S', '36-38', '26-28'],
  ['M', '38-40', '28-31'],
  ['L', '40-42', '31-34'],
  ['XL', '42-44', '34-37'],
  ['XXL', '44-46', '37-40'],
];

const SizeGuide = () => (
  <div className="overflow-hidden rounded-xl border border-god-border">
    <table className="w-full text-left text-sm">
      <thead className="bg-black/30 text-god-gold">
        <tr><th className="p-3">Size</th><th className="p-3">Chest</th><th className="p-3">Waist</th></tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row[0]} className="border-t border-god-border">
            {row.map((cell) => <td key={cell} className="p-3 text-god-muted">{cell}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default SizeGuide;
