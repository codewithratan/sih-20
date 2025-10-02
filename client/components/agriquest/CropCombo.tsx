import { useMemo, useState } from "react";

type Cell = "" | "L" | "G"; // Legume / Grain

export default function CropCombo({ onComplete }: { onComplete: () => void }) {
  const size = 5;
  const [active, setActive] = useState<Cell>("L");
  const [grid, setGrid] = useState<Cell[][]>(
    Array.from({ length: size }, () => Array.from({ length: size }, () => "")),
  );

  const place = (r: number, c: number) => {
    setGrid((g) => {
      const copy = g.map((row) => row.slice());
      copy[r][c] = active;
      return copy;
    });
  };

  const reset = () =>
    setGrid(
      Array.from({ length: size }, () =>
        Array.from({ length: size }, () => ""),
      ),
    );

  const stats = useMemo(() => {
    let L = 0,
      G = 0,
      total = 0;
    for (let r = 0; r < size; r++)
      for (let c = 0; c < size; c++) {
        if (grid[r][c] === "L") L++;
        if (grid[r][c] === "G") G++;
        if (grid[r][c] !== "") total++;
      }
    return { L, G, total };
  }, [grid]);

  const validate = () => {
    // Criteria: At least 40% legumes among placed; no 2x2 same crop block
    const { L, total } = stats;
    if (total === 0) return false;
    const legumeRatio = L / total;
    if (legumeRatio < 0.4) return false;
    for (let r = 0; r < size - 1; r++) {
      for (let c = 0; c < size - 1; c++) {
        const a = grid[r][c];
        const b = grid[r + 1][c];
        const d = grid[r][c + 1];
        const e = grid[r + 1][c + 1];
        if (a && a === b && a === d && a === e) return false;
      }
    }
    return true;
  };

  const ok = validate();

  return (
    <div className="rounded-lg border p-3 space-y-3">
      <p className="text-sm">
        Place legumes (L) and grains (G) on the 5×5 field. Aim for alternating
        patches with ≥40% legumes and avoid 2×2 blocks of the same crop.
      </p>

      <div className="flex items-center gap-2">
        <span className="text-sm">Palette:</span>
        <button
          onClick={() => setActive("L")}
          className={`px-2 py-1 rounded border ${active === "L" ? "bg-green-600 text-white" : "hover:bg-muted"}`}
        >
          Legume (L)
        </button>
        <button
          onClick={() => setActive("G")}
          className={`px-2 py-1 rounded border ${active === "G" ? "bg-yellow-600 text-white" : "hover:bg-muted"}`}
        >
          Grain (G)
        </button>
        <button
          onClick={reset}
          className="ml-auto px-2 py-1 rounded border hover:bg-muted"
        >
          Reset
        </button>
      </div>

      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
          gap: 4,
        }}
      >
        {grid.map((row, r) =>
          row.map((cell, c) => (
            <button
              key={`${r}-${c}`}
              className={`aspect-square rounded border text-sm font-semibold ${
                cell === "L"
                  ? "bg-green-100 text-green-900 border-green-300"
                  : cell === "G"
                    ? "bg-amber-100 text-amber-900 border-amber-300"
                    : "hover:bg-muted"
              }`}
              onClick={() => place(r, c)}
            >
              {cell}
            </button>
          )),
        )}
      </div>

      <div className="flex items-center justify-between text-sm">
        <div>
          <span className="mr-3">Placed: {stats.total}</span>
          <span className="mr-3">L: {stats.L}</span>
          <span>G: {stats.G}</span>
        </div>
        {ok ? (
          <button
            onClick={onComplete}
            className="rounded bg-primary text-primary-foreground px-3 py-1"
          >
            Validate ✓
          </button>
        ) : (
          <span className="text-muted-foreground">
            Place more legumes and avoid 2×2 blocks.
          </span>
        )}
      </div>
    </div>
  );
}
