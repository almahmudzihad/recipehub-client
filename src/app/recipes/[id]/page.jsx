import RecipeDetailsPage from "@/components/RecipeDetailsPage";
import { fetchRecipeDetails } from "@/lib/action/recipe";


const DetelsPage = async ({params}) => {
    const {id} = await params;
    const recipe = await fetchRecipeDetails(id);
    
    
  return (
    <>
    

    <RecipeDetailsPage recipe={recipe} />

    </>
  )
}

export default DetelsPage