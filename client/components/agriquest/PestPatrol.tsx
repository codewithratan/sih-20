import { useEffect, useRef, useState } from "react";

export default function PestPatrol({ onComplete }: { onComplete: () => void }) {
  const [beforeImg, setBeforeImg] = useState<string | null>(null);
  const [afterImg, setAfterImg] = useState<string | null>(null);
  const [identified, setIdentified] = useState<string | null>(null);
  const [bioApplied, setBioApplied] = useState(false);
  const [tipUnlocked, setTipUnlocked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scanning, setScanning] = useState(false);

  const loadImage = (file: File, setter: (url: string) => void) => {
    const reader = new FileReader();
    reader.onload = () => setter(reader.result as string);
    reader.readAsDataURL(file);
  };

  const identify = () => {
    // Simple heuristic demo based on filename
    if (beforeImg && /aphid|aphids/i.test(beforeImg))
      setIdentified("Aphids suspected");
    else if (beforeImg && /caterpillar|bollworm/i.test(beforeImg))
      setIdentified("Caterpillar damage suspected");
    else setIdentified("General sucking pest suspected");
  };

  const startScan = async () => {
    try {
      setScanning(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream as any;
        await videoRef.current.play();
      }
      // Unlock a contextual tip after 3 seconds of scanning
      setTimeout(() => setTipUnlocked(true), 3000);
    } catch (e) {
      setScanning(false);
    }
  };

  const stopScan = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
    setScanning(false);
  };

  useEffect(() => {
    if (bioApplied && afterImg) onComplete();
  }, [bioApplied, afterImg, onComplete]);

  return (
    <div className="rounded-lg border p-3 space-y-3">
      <p className="text-sm">
        Upload a pest photo, identify, then apply a bio-spray and upload an
        after photo.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-2">
          <label className="text-sm font-medium">Before (pest)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              e.target.files &&
              loadImage(e.target.files[0], (u) => setBeforeImg(u))
            }
          />
          {beforeImg && (
            <img src={beforeImg} alt="before" className="rounded-md border" />
          )}
          <button
            onClick={identify}
            className="rounded-md bg-muted px-3 py-1 text-sm hover:bg-muted/70"
          >
            Identify
          </button>
          {identified && <p className="text-xs">{identified}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">After (post bio-spray)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              e.target.files &&
              loadImage(e.target.files[0], (u) => setAfterImg(u))
            }
          />
          {afterImg && (
            <img src={afterImg} alt="after" className="rounded-md border" />
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setBioApplied(true)}
          className="rounded-md bg-green-600 text-white px-3 py-1 text-sm hover:bg-green-700"
        >
          Apply Bio-spray
        </button>
        {bioApplied && (
          <span className="text-xs text-green-700">Logged application</span>
        )}
      </div>

      <div className="rounded-md border p-2">
        <p className="text-sm font-medium">
          Optional: Scan soil to unlock a tip (simulated AR)
        </p>
        {!scanning ? (
          <button
            onClick={startScan}
            className="mt-2 rounded-md bg-blue-600 text-white px-3 py-1 text-sm hover:bg-blue-700"
          >
            Start Camera
          </button>
        ) : (
          <button
            onClick={stopScan}
            className="mt-2 rounded-md bg-gray-700 text-white px-3 py-1 text-sm hover:bg-gray-800"
          >
            Stop Camera
          </button>
        )}
        {scanning && (
          <video
            ref={videoRef}
            className="mt-2 w-full rounded-md border"
            muted
            playsInline
          />
        )}
        {tipUnlocked && (
          <div className="mt-2 text-xs bg-amber-100 text-amber-900 rounded p-2">
            Tip unlocked: Maintain natural enemy habitat; avoid broad-spectrum
            sprays.
          </div>
        )}
      </div>
    </div>
  );
}
