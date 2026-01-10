"use client";
import Tile from "./Tile";

type TileInfo = {
  value: number;
  index: number;
};

type GridProps = {
  tiles: TileInfo[];
  onTileClick: (tileValue: number) => void;
  gridSize: number;
  imageSrc: string;
};

const Grid = ({ tiles, onTileClick, gridSize, imageSrc }: GridProps) => {
  return (
    <div className="relative w-full h-full bg-card rounded-lg shadow-inner p-2">
      {tiles.map((tile) => (
        <Tile
          key={tile.value}
          value={tile.value}
          currentIndex={tile.index}
          gridSize={gridSize}
          imageSrc={imageSrc}
          onClick={onTileClick}
        />
      ))}
    </div>
  );
};

export default Grid;
