const NotFound = () => {
    const link = import.meta.env.VITE_APP_URL
  return (
    <main className="container mx-auto flex items-center justify-center h-screen">
        <section className="py-10 flex items-center justify-center flex-col">
            <img src={`${link}/images/error-404.png`} className="h-[250px] lg:h-full" alt="image 404" />
            <h1 className="text-5xl mt-10 text-slate-800 font-bold text-center">Halaman Yang Dituju Tidak Ada</h1>
        </section>
    </main>
  );
};



export default NotFound;
