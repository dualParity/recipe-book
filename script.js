// Recipe Book Application
class RecipeBook {
    constructor() {
        this.recipes = this.loadRecipes();
        this.form = document.getElementById('recipeForm');
        this.recipesList = document.getElementById('recipesList');
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.addRecipe(e));
        this.render();
    }

    loadRecipes() {
        const stored = localStorage.getItem('recipes');
        return stored ? JSON.parse(stored) : this.getDefaultRecipes();
    }

    getDefaultRecipes() {
        return [
            {
                id: 1,
                name: 'Spaghetti Carbonara',
                ingredients: 'Spaghetti\nEggs\nBacon\nParmesan cheese\nBlack pepper\nSalt',
                instructions: '1. Cook spaghetti in boiling salted water\n2. Fry bacon until crispy\n3. Mix eggs with grated cheese\n4. Combine pasta with bacon fat, then add egg mixture\n5. Season with black pepper and serve',
                prepTime: 20
            },
            {
                id: 2,
                name: 'Chocolate Chip Cookies',
                ingredients: 'Flour\nButter\nBrown sugar\nEggs\nVanilla extract\nChocolate chips\nBaking soda\nSalt',
                instructions: '1. Preheat oven to 375°F\n2. Mix butter and sugar\n3. Add eggs and vanilla\n4. Stir in flour, baking soda, and salt\n5. Fold in chocolate chips\n6. Bake for 9-11 minutes',
                prepTime: 30
            }
        ];
    }

    saveRecipes() {
        localStorage.setItem('recipes', JSON.stringify(this.recipes));
    }

    addRecipe(e) {
        e.preventDefault();

        const recipe = {
            id: Date.now(),
            name: document.getElementById('recipeName').value,
            ingredients: document.getElementById('recipeIngredients').value,
            instructions: document.getElementById('recipeInstructions').value,
            prepTime: document.getElementById('recipePrepTime').value || 0
        };

        this.recipes.push(recipe);
        this.saveRecipes();
        this.form.reset();
        this.render();
    }

    deleteRecipe(id) {
        this.recipes = this.recipes.filter(r => r.id !== id);
        this.saveRecipes();
        this.render();
    }

    render() {
        if (this.recipes.length === 0) {
            this.recipesList.innerHTML = '<div class="empty-message">No recipes yet. Add one to get started!</div>';
            return;
        }

        this.recipesList.innerHTML = this.recipes.map(recipe => `
            <div class="recipe-card">
                <h3>${recipe.name}</h3>
                ${recipe.prepTime ? `<div class="prep-time">⏱️ Prep time: ${recipe.prepTime} minutes</div>` : ''}
                
                <h4>Ingredients:</h4>
                <ul>
                    ${recipe.ingredients.split('\n').map(ing => `<li>${ing}</li>`).join('')}
                </ul>
                
                <h4>Instructions:</h4>
                <div class="instructions">${recipe.instructions}</div>
                
                <button class="delete-btn" onclick="app.deleteRecipe(${recipe.id})">Delete Recipe</button>
            </div>
        `).join('');
    }
}

// Initialize the app
const app = new RecipeBook();
