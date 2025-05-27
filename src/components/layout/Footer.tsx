export function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-400">
          © {new Date().getFullYear()} SpriteGen. All rights reserved.
        </p>
      </div>
    </footer>
  );
} 