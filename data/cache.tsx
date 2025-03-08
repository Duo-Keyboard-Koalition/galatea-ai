// Match notification component
const MatchNotification = ({ name }: { name: string }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
    <div className="bg-white p-8 rounded-lg text-center animate-bounce">
      <h2 className="text-3xl font-bold text-rose-600 mb-2">
        It&apos;s a Match!
      </h2>
      <p className="text-earth-700">You matched with {name}</p>
    </div>
  </div>
);