export function VisionMission() {
    return (
        <div className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        Vision & Mission
                    </h2>
                </div>

                <div className="mt-10">
                    <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                        <div className="relative">
                            <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
                            <p className="mt-3 text-lg text-gray-500">
                                To be the leading platform for developing future Indonesian leaders 
                                who are innovative, socially responsible, and globally competitive.
                            </p>
                        </div>

                        <div className="relative">
                            <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
                            <ul className="mt-3 text-lg text-gray-500 space-y-2">
                                <li>• Foster leadership and professional development</li>
                                <li>• Promote academic excellence and innovation</li>
                                <li>• Encourage social responsibility and community service</li>
                                <li>• Build a strong network of future leaders</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}