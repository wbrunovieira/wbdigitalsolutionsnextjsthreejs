export const ToolBoxSkeleton = () => (
  <div className="w-full py-20 animate-pulse">
    <div className="max-w-7xl mx-auto px-6">
      <div className="h-12 bg-gray-700/30 rounded-lg w-48 mx-auto mb-8"></div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className="w-24 h-24 bg-gray-700/30 rounded-full"></div>
            <div className="h-4 bg-gray-700/30 rounded w-20"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const CarouselSkeleton = () => (
  <div className="w-full py-20 animate-pulse">
    <div className="max-w-7xl mx-auto px-6">
      <div className="h-12 bg-gray-700/30 rounded-lg w-64 mx-auto mb-8"></div>
      <div className="flex gap-6 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex-shrink-0 w-96">
            <div className="bg-gray-700/30 rounded-xl h-64"></div>
            <div className="mt-4 space-y-2">
              <div className="h-6 bg-gray-700/30 rounded w-3/4"></div>
              <div className="h-4 bg-gray-700/30 rounded"></div>
              <div className="h-4 bg-gray-700/30 rounded w-5/6"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);