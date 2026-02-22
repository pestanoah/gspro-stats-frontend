import { Toggle } from '@/components/ui/toggle';
import { ShotAnalysis } from '@/features/shotAnalysis/components/shot-analysis';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/')({ component: App });

function App() {
  const [comparing, setComparing] = useState(false);

  return (
    <>
      <Toggle
        id="compare-shots"
        variant="outline"
        pressed={comparing}
        onPressedChange={(pressed) => setComparing(pressed)}
      >
        Compare shots
      </Toggle>
      {comparing ? (
        <div className="grid grid-cols-2 gap-4">
          <div className="flex column m-4 overflow-hidden">
            <ShotAnalysis />
          </div>
          <div className="flex column m-4">
            <ShotAnalysis />
          </div>
        </div>
      ) : (
        <ShotAnalysis />
      )}
    </>
  );
}
