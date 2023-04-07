<template>
  <div>
    <b-table
      striped
      hover
      :items="exercises"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
    >
      <template #cell(tags)="row">
        {{ row.value.join(", ") }}
      </template>
      <template #cell(actions)="row">
        <b-button size="sm" variant="danger" @click="deleteExercise(row.item)"
          >Delete</b-button
        >
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // exercises: [],
      fields: [
        { key: "subject", label: "Subject", sortable: true },
        { key: "tags", label: "Tags", sortable: true },
        { key: "actions", label: "Actions" },
      ],
      sortBy: "subject",
      sortDesc: false,
    };
  },
  computed: {
    exercises() {
      return this.$store.getters.getExercises;
    },
  },
  mounted() {
    this.$store.commit(
      "setExercises",
      JSON.parse(localStorage.getItem("exercises") || "[]")
    );
  },
  methods: {
    deleteExercise(exercise) {
      // Remove exercise from local storage
      let exercises = JSON.parse(localStorage.getItem("exercises") || "[]");
      exercises = exercises.filter((e) => e.id !== exercise.id);
      localStorage.setItem("exercises", JSON.stringify(exercises));

      console.log("exercise", exercise);

      // Update table
      this.$store.commit("setExercises", exercises);
    },
  },
};
</script>
