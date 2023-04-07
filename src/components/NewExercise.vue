<template>
  <div>
    <b-form @submit.prevent="createExercise">
      <b-form-group label="Subject">
        <b-form-input v-model="subject" required></b-form-input>
      </b-form-group>
      <b-form-group label="Tags">
        <b-form-input
          v-model="tags"
          placeholder="Separate tags with semicolon (;)"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary" class="mt-3"
        >Create Exercise</b-button
      >
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: null,
      subject: "",
      tags: "",
    };
  },
  methods: {
    createExercise() {
      const tags = this.tags.split(";").map((tag) => tag.trim());

      const exercise = {
        id: Date.now(),
        subject: this.subject,
        tags: tags,
      };

      let exercises = JSON.parse(localStorage.getItem("exercises") || "[]");
      exercises.push(exercise);
      localStorage.setItem("exercises", JSON.stringify(exercises));

      this.$store.commit("setExercises", exercises);

      // Clear form
      this.subject = "";
      this.tags = "";
    },
  },
};
</script>
