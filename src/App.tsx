import ContentPanel from "@components/ContentPanel/ContentPanel";
import Header from "@components/Layout/Header"
import Map from "@components/Map/Map"
import { type CompareMode, type AllProperties, type HealthPropertyKeys } from "@types";
import { useState } from "react";

function App() {
  const [selectedProperties, setSelectedProperties] = useState<AllProperties>({} as AllProperties);
  const [selectedIndicator, setSelectedIndicator] = useState<HealthPropertyKeys>('access2');
  const [compareMode,] = useState<CompareMode>('Region')

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex flex-1 flex-col min-h-0 overflow-hidden">
        <div className="flex flex-1 min-h-0">
          <div className="w-3/5 h-full min-h-0">
            <Map
              setSelectedProperties={setSelectedProperties}
              selectedIndicator={selectedIndicator}
              compareMode={compareMode}
            />
          </div>
          <div className="w-2/5 flex flex-col h-full z-10 border-t border-l border-dvrpc-gray-5 min-h-0 ">
            <ContentPanel
              selectedProperties={selectedProperties}
              selectedIndicator={selectedIndicator}
              setSelectedIndicator={setSelectedIndicator}
              compareMode={compareMode}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
