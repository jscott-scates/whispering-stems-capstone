import unsplashHomePage from "../../images/homepage/unsplashHomePage.jpg"

export const Welcome = () => {
    return <>
    {/* cover image for home page */}
        <img 
            alt="A picture of a pale pink and white bouquet against a dark background"
            src={unsplashHomePage}
            className="object-cover md:object-cover h-100 w-full"
        />
    {/* homepage content */}
        <div className="container mx-auto mt-8 p6">
            <h2 className="text-5xl font-bold text-center text-stone-500">Recent Community Creations</h2>
            <hr className="w-200 mx-auto mt-4 border-2 border-green-800"/>
        </div>
    </>
}