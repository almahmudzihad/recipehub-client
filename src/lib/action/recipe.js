"use server";

// Fallback to localhost if the env variable isn't picking up on the server side
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const createRecipe = async (newRecipeData) => {
    try {
        const res = await fetch(`${baseUrl}/api/recipes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newRecipeData),
        });

        // 1. Catch if the API route itself returns a 500 or 404 error
        if (!res.ok) {
            const errorHtml = await res.text();
            console.error("API Route crashed! Server returned HTML:", errorHtml.slice(0, 300));
            return { success: false, error: `API responded with status: ${res.status}` };
        }

        return await res.json();
    } catch (error) {
        // 2. Catch if the fetch network request itself failed
        console.error("Fetch request failed completely:", error);
        return { success: false, error: "Network or server configuration error." };
    }
};