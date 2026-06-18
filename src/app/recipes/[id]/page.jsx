import { fetchRecipeDetails } from "@/lib/action/recipe";


const DetelsPage = async ({params}) => {
    const {id} = await params;
    const recipe = await fetchRecipeDetails(id);
    
    
  return (
     <section className="max-w-5xl mx-auto px-5 py-12">
      
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-[500px] object-cover rounded-3xl"
      />

      <div className="mt-8">
        <h1 className="text-5xl font-bold">
          {recipe.title}
        </h1>

        <div className="flex gap-4 mt-4">
          <span className="px-4 py-2 bg-orange-100 text-orange-600 rounded-full">
            {recipe.cuisine}
          </span>

          <span className="px-4 py-2 bg-green-100 text-green-600 rounded-full">
            {recipe.difficulty}
          </span>
        </div>

        <p className="mt-6 text-lg">
          ❤️ {recipe.likes} People Interested
        </p>

        <h2 className="text-2xl font-bold mt-8">
          Ingredients
        </h2>

        <p className="mt-3">
          {recipe.ingredients}
        </p>

        <h2 className="text-2xl font-bold mt-8">
          Instructions
        </h2>

        <p className="mt-3 whitespace-pre-line">
          {recipe.instructions}
        </p>

        <h2 className="text-2xl font-bold mt-8">
          Preparation Time
        </h2>

        <p className="mt-2">
          {recipe.prepTime} Minutes
        </p>
      </div>
    </section>
  )
}

export default DetelsPage