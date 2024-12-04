import MainLayout from '@/Layouts/MainLayout';



const Event = () => {

  return (
    <MainLayout title="Event">
        <main className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <section className="py-10 flex items-center justify-center flex-col">
                <img src="./images/under-construction.png" className="h-[300px] lg:h-full" alt="image under construction" />
                <h1 className="text-5xl text-slate-800 font-bold text-center">Dalam Pengembangan</h1>
            </section>
        </main>
    </MainLayout>
  );
};

export default Event;
