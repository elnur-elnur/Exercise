export default {
  state: () => ({
    exercises: [],
  }),
  mutations: {
    setExercises(state, payload) {
      state.exercises = payload;
    },
  },
  getters: {
    getExercises: (state) => state.exercises,
  },
};
