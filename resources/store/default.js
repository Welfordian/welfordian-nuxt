export const state = () => ({
    theme: 'light'
})

export const mutations = {
    initialTheme(state) {
        state.theme = localStorage.hasOwnProperty('jw-theme') ? localStorage.getItem('jw-theme') : 'light';
    },

    toggleTheme(state) {
        if (state.theme === 'light') {
            state.theme = 'dark';
            localStorage.setItem('jw-theme', 'dark');
        } else {
            state.theme = 'light';
            localStorage.removeItem('jw-theme');
        }
    }
}

export const getters = {
    theme(state) {
        return state.theme;
    }
}
