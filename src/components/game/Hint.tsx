
import Image from "next/image";

type HintProps = {
  showHint: boolean;
  imageSrc: string;
  imageHint: string;
};

const Hint = ({ showHint, imageSrc, imageHint }: HintProps) => {
  if (!showHint) {
    return null;
  }

  return (
    <div className="mb-4 flex justify-center">
      <Image
        src={imageSrc}
        alt="Puzzle Hint"
        width={150}
        height={150}
        className="rounded-lg border-4 border-accent shadow-md"
        data-ai-hint={imageHint}
      />
    </div>
  );
};

export default Hint;
