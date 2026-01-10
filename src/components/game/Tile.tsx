
"use client";

type TileProps = {
  value: number;
  currentIndex: number;
  gridSize: number;
  imageSrc: string;
  onClick: (tileValue: number) => void;
};

const Tile = ({ value, currentIndex, gridSize, imageSrc, onClick }: TileProps) => {
  const tileDimension = 100 / gridSize;
  const top = Math.floor(currentIndex / gridSize) * tileDimension;
  const left = (currentIndex % gridSize) * tileDimension;
  
  const correctIndex = value === 0 ? gridSize * gridSize - 1 : value - 1;
  const bgLeft = (correctIndex % gridSize) * (100 / (gridSize - 1));
  const bgTop = Math.floor(correctIndex / gridSize) * (100 / (gridSize - 1));
  
  const isEmpty = value === 0;

  return (
    <button
      className="absolute flex items-center justify-center font-bold text-2xl text-white rounded-md cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-primary focus:z-10 transition-all duration-300 ease-in-out"
      style={{
        width: `calc(${tileDimension}% - 4px)`,
        height: `calc(${tileDimension}% - 4px)`,
        margin: '2px',
        top: `${top}%`,
        left: `${left}%`,
        opacity: isEmpty ? 0 : 1,
        pointerEvents: isEmpty ? 'none' : 'auto',
      }}
      onClick={() => onClick(value)}
      aria-hidden={isEmpty}
    >
      <div
        className="w-full h-full rounded-md bg-cover bg-no-repeat shadow-md overflow-hidden relative group"
        style={{
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
          backgroundPosition: `${bgLeft}% ${bgTop}%`,
        }}
      >
        <div className="absolute inset-0 bg-black/10 group-hover:bg-white/10 transition-colors duration-200"></div>
        <span className="absolute top-1 left-2 text-lg font-bold text-white opacity-70" style={{ textShadow: '1px 1px 2px black' }}>
            {value}
        </span>
      </div>
    </button>
  );
};

export default Tile;
