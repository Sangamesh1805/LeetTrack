function AuthLayout({ children }) {
  return (
    <div className="h-screen overflow-hidden bg-gray-950 text-white flex">
      {/* Left section */}
      <div className="hidden lg:flex lg:w-[40%] relative overflow-hidden bg-gradient-to-br from-purple-950 via-gray-950 to-gray-950">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-800 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col justify-between w-full p-10 xl:p-14">
          <div>
            <h1 className="text-5xl font-bold tracking-tight">LeetTrack</h1>
          </div>

          <div className="max-w-lg">
            <div className="mb-8">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm">
                Your DSA journey, organized.
              </span>
            </div>

            <h2 className="text-5xl xl:text-6xl font-bold leading-tight">
              Practice smarter.
              <br />
              <span className="text-purple-400">Track consistently.</span>
              <br />
              Improve continuously.
            </h2>

            <p className="text-gray-400 text-lg mt-6 max-w-md leading-relaxed">
              Keep your LeetCode progress organized, build revision habits, and
              stay consistent with your DSA preparation.
            </p>

            <div className="flex gap-3 mt-10">
              <div className="h-2 w-16 rounded-full bg-purple-500" />
              <div className="h-2 w-8 rounded-full bg-purple-500/40" />
              <div className="h-2 w-4 rounded-full bg-purple-500/20" />
            </div>
          </div>

          <p className="text-sm text-gray-600">
            Built for consistent problem solving.
          </p>
        </div>
      </div>

      {/* Right section */}
      <div className="w-full lg:w-[60%] flex items-center justify-center px-6 py-6 overflow-y-auto">
        <div className="w-full max-w-lg">{children}</div>
      </div>
    </div>
  );
}

export default AuthLayout;
