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
        <div>
          <b-button
            size="sm"
            variant="primary"
            class="mr-2"
            @click="editExercise(row.item)"
          >
            <b-icon icon="pencil"></b-icon>
          </b-button>
          <b-button
            size="sm"
            variant="danger"
            @click="deleteExercise(row.item)"
          >
            <b-icon icon="trash"></b-icon>
          </b-button>
        </div>
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

      // Update table
      this.$store.commit("setExercises", exercises);
    },
    editExercise(exercise) {
      // Clone the exercise object to avoid modifying the original object
      const editedExercise = { ...exercise };

      // Prompt the user to edit the subject and tags fields
      const subject = prompt("Enter new subject", editedExercise.subject);
      const tags = prompt(
        "Enter new tags (separated by semicolons)",
        editedExercise.tags.join(";")
      );

      // Update the subject and tags fields of the edited exercise
      editedExercise.subject = subject;
      editedExercise.tags = tags.split(";").map((tag) => tag.trim());

      // Update the exercise in local storage
      let exercises = JSON.parse(localStorage.getItem("exercises") || "[]");
      exercises = exercises.map((e) =>
        e.id === editedExercise.id ? editedExercise : e
      );
      localStorage.setItem("exercises", JSON.stringify(exercises));

      // Update the table
      this.$store.commit("setExercises", exercises);
    },
  },
};
</script>
