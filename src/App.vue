<template>
  <div class="container my-5">
    <h1 class="mb-3">Exercises Panel</h1>
    <div class="row">
      <div class="col-md-12">
        <h3>New Exercise</h3>
        <NewExercise />
      </div>
      <div class="col-md-12 mt-5">
        <h3>Exercise Table</h3>
        <ExerciseTable />
      </div>
    </div>
  </div>
</template>

<script>
import NewExercise from "./components/NewExercise.vue";
import ExerciseTable from "./components/ExerciseTable.vue";

export default {
  name: "App",

  components: {
    NewExercise,
    ExerciseTable,
  },

  data: () => ({
    //
  }),
};
</script>
