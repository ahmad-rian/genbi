export function AboutHeader() {
    return (
        <div className="relative bg-indigo-800 h-96">
            <div className="absolute inset-0">
                <img
                    className="w-full h-full object-cover"
                    src="/images/about-header.jpg"
                    alt="About GenBI"
                />
                <div className="absolute inset -0 bg-indigo-800 mix-blend-multiply" />
            </div>
            <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                    About GenBI
                </h1>
                <p className="mt-6 max-w-3xl text-xl text-gray-300">
                    Generasi Baru Indonesia (GenBI) represents the future leaders of Indonesia, 
                    supported by Bank Indonesia through its scholarship program.
                </p>
            </div>
        </div>
    );
}
