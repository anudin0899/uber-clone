import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <>
            <section className="bg-white">
                <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                    <section className="relative flex h-52 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
                        <img
                            alt="cover image"
                            src="/banner-6.png"
                            className="absolute inset-0 h-full w-full object-cover opacity-80"
                        />

                        <div className="hidden lg:relative lg:block lg:p-12">

                            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                                Welcome to Uber
                            </h2>

                            <p className="mt-4 leading-relaxed text-white/90">
                                Enjoy your Travel with us!
                            </p>
                        </div>
                    </section>

                    <main
                        className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
                    >
                        <div className="max-w-xl lg:max-w-3xl">
                            <div className="relative -mt-16 block lg:hidden">
                                <h1 className="mt-12 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                                    Welcome to Uber
                                </h1>

                                <p className="mt-2 mb-2 leading-relaxed text-gray-500">
                                    Enjoy your Travel with us!
                                </p>
                            </div>
                            <div className=" flex items-center justify-center">
                                <SignIn />
                            </div>

                        </div>
                    </main>
                </div>
            </section>

            {/* <div>
                <Image src='/banner-3.jpg' width={900} height={1000} className="object-contain h-full w-full" />
                <div className="absolute top-10 right-5">
                    <SignIn />
                </div>

            </div> */}
        </>
    );
}