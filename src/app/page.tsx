
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";

import Grid from "@/components/game/Grid";
import VictoryScreen from "@/components/game/VictoryScreen";
import Header from "@/components/game/Header";
import Stats from "@/components/game/Stats";
import GameControls from "@/components/game/GameControls";
import Hint from "@/components/game/Hint";
import PuzzleSelector from "@/components/game/PuzzleSelector";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { ImagePlaceholder } from "@/lib/placeholder-images";
import { formatTime } from "@/lib/utils";

const GRID_SIZE = 3;
const TILE_COUNT = GRID_SIZE * GRID_SIZE;

const solvedState = Array.from({ length: TILE_COUNT - 1 }, (_, i) => i + 1).concat(0);

type Tile = {
  value: number;
  index: number;
};

export default function Home() {
  const [tiles, setTiles] = useState<Tile[]>(
    solvedState.map((val, idx) => ({ value: val, index: idx }))
  );
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [bestMoves, setBestMoves] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [selectedPuzzleId, setSelectedPuzzleId] = useState<string>(PlaceHolderImages[0].id);
  
  const puzzleImage = useMemo(() => 
    PlaceHolderImages.find(img => img.id === selectedPuzzleId) as ImagePlaceholder, 
    [selectedPuzzleId]
  );

  const resetGame = useCallback(() => {
    const getNeighbors = (index: number) => {
      const neighbors = [];
      const row = Math.floor(index / GRID_SIZE);
      const col = index % GRID_SIZE;
      if (row > 0) neighbors.push(index - GRID_SIZE); // up
      if (row < GRID_SIZE - 1) neighbors.push(index + GRID_SIZE); // down
      if (col > 0) neighbors.push(index - 1); // left
      if (col < GRID_SIZE - 1) neighbors.push(index + 1); // right
      return neighbors;
    };

    let shuffled = [...solvedState];
    let emptyIndex = shuffled.indexOf(0);
    // Perform a random walk from the solved state to ensure solvability
    for (let i = 0; i < 200; i++) {
      const neighbors = getNeighbors(emptyIndex);
      const randomNeighborIndex = neighbors[Math.floor(Math.random() * neighbors.length)];
      [shuffled[emptyIndex], shuffled[randomNeighborIndex]] = [shuffled[randomNeighborIndex], shuffled[emptyIndex]];
      emptyIndex = randomNeighborIndex;
    }
    
    setTiles(shuffled.map((val, idx) => ({ value: val, index: idx })));
    setMoves(0);
    setTime(0);
    setIsGameStarted(false);
    setIsSolved(false);
  }, []);

  useEffect(() => {
    resetGame();
  }, [resetGame, selectedPuzzleId]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isGameStarted && !isSolved) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isGameStarted, isSolved]);

  const checkWinCondition = useCallback((currentTiles: Tile[]) => {
    const sortedTiles = [...currentTiles].sort((a, b) => a.index - b.index);
    const isSolved = sortedTiles.every((tile, i) => tile.value === solvedState[i]);
    
    if (isSolved) {
      setIsSolved(true);
      setIsGameStarted(false);
      if (bestTime === null || time < bestTime) {
        setBestTime(time);
      }
      if (bestMoves === null || moves < bestMoves) {
        setBestMoves(moves);
      }
    }
  }, [time, moves, bestTime, bestMoves]);

  const handleTileClick = (clickedTileValue: number) => {
    if (isSolved || clickedTileValue === 0) return;
    
    if (!isGameStarted) {
      setIsGameStarted(true);
    }

    const clickedTile = tiles.find(t => t.value === clickedTileValue)!;
    const emptyTile = tiles.find(t => t.value === 0)!;
    
    const clickedIndex = clickedTile.index;
    const emptyIndex = emptyTile.index;

    const isAdjacent = 
      (Math.abs(Math.floor(clickedIndex / GRID_SIZE) - Math.floor(emptyIndex / GRID_SIZE)) === 1 && clickedIndex % GRID_SIZE === emptyIndex % GRID_SIZE) ||
      (Math.abs(clickedIndex % GRID_SIZE - emptyIndex % GRID_SIZE) === 1 && Math.floor(clickedIndex / GRID_SIZE) === Math.floor(emptyIndex / GRID_SIZE));

    if (isAdjacent) {
      const newTiles = tiles.map(t => {
        if (t.value === clickedTileValue) return { ...t, index: emptyIndex };
        if (t.value === 0) return { ...t, index: clickedIndex };
        return t;
      });

      setTiles(newTiles);
      setMoves(moves + 1);

      if (typeof window.navigator.vibrate === 'function') {
        window.navigator.vibrate(10);
      }
      checkWinCondition(newTiles);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background p-4 font-body">
      <div className="w-full max-w-md mx-auto">
        <Header />

        <Stats moves={moves} time={time} bestMoves={bestMoves} bestTime={bestTime} />
        
        <PuzzleSelector 
          puzzles={PlaceHolderImages}
          selectedPuzzleId={selectedPuzzleId}
          onPuzzleChange={setSelectedPuzzleId}
        />

        <div className="relative w-full aspect-square mb-4">
           <Grid tiles={tiles} onTileClick={handleTileClick} gridSize={GRID_SIZE} imageSrc={puzzleImage.imageUrl} />
        </div>
        
        <Hint showHint={showHint} imageSrc={puzzleImage.imageUrl} imageHint={puzzleImage.imageHint} />

        <GameControls 
          onReset={resetGame}
          showHint={showHint}
          onHintToggle={setShowHint}
        />
      </div>
      
      <VictoryScreen 
        isOpen={isSolved}
        onPlayAgain={resetGame}
        moves={moves}
        time={formatTime(time)}
        bestMoves={bestMoves}
        bestTime={bestTime !== null ? formatTime(bestTime) : null}
        imageSrc={puzzleImage.imageUrl}
      />
    </main>
  );
}
