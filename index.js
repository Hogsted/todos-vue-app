// Base URL for the JSONPlaceholder API (free fake API for testing)
const baseUri = 'https://jsonplaceholder.typicode.com/todos';

// Create a Vue 3 application instance
Vue.createApp({ 
    // data() - Returns the reactive state for the component
    data() {
        return {
            todos: [],              // Array to store todo items fetched from API
            error : null,           // Stores error messages if API call fails
            userId : null,          // Stores the user ID to filter todos
        }
    },

    // created() - Vue lifecycle hook that runs when component is initialized
    async created() {
        console.log('created')     // Log to console for debugging
        this.getTodos(baseUri)     // Fetch all todos on app creation
    },

    // methods - Object containing all component methods
    methods: {
        /**
         * getTodos(uri) - Fetches todos from the API
         * @param {string} uri - The API endpoint URL
         */
        async getTodos(uri) {
            try {
                // Make GET request using axios library
                const response = await axios.get(uri)
                this.error = null            // Clear any previous errors
                this.todos = response.data   // Store the fetched data
            } catch (error) {
                // If API call fails
                this.todos = []              // Clear todos array
                this.error = error.message   // Store the error message
            }
        },

        /**
         * cleanList() - Clears all todos and errors
         */
        cleanList() {
            this.todos = []      // Empty the todos array
            this.error = null    // Clear any error message
        },

        /**
         * getByUserId(userId) - Fetches todos for a specific user
         * @param {number} userId - The ID of the user
         */
        async getByUserId(userId) {
            if (userId) {
                // If user ID is provided, filter todos by that user
                const uri = `${baseUri}?userId=${userId}`
                await this.getTodos(uri)
            } else {
                // If no user ID, fetch all todos
                await this.getTodos(baseUri)
            }
        }
    }
}).mount("#app")  // Mount the Vue app to the #app element in HTML