<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-body">
        <!-- Display a success or error message -->
        <div v-if="message"
          :class="{ 'alert': true, 'alert-success': isMessageSuccess, 'alert-danger': !isMessageSuccess }">
          {{ message }}
        </div>


        <h2 class="card-title">Contactez-nous</h2>
        <p class="card-text">N'hésitez pas à nous contacter pour toute question ou demande d'information.</p>

        <!-- Contact Form -->
        <form @submit.prevent="submitForm">
          <!-- Name Input -->
          <div class="mb-3">
            <label for="name" class="form-label">Nom :</label>
            <input type="text" class="form-control" id="name" v-model="formData.name" required>
          </div>

          <!-- Email Input -->
          <div class="mb-3">
            <label for="email" class="form-label">Email :</label>
            <input type="email" class="form-control" id="email" v-model="formData.email" required>
          </div>

          <!-- Message Textarea -->
          <div class="mb-3">
            <label for="message" class="form-label">Message :</label>
            <textarea class="form-control" id="message" rows="5" v-model="formData.message" required></textarea>
          </div>

          <!-- Submit Button -->
          <button type="submit" class="btn btn-primary">Envoyer</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        message: '',
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await fetch('http://localhost:3000/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.formData),
        });

        if (response.ok) {
          console.log('Form data sent successfully.');
          // Optionally, reset the form data after successful submission
          this.formData = {
            name: '',
            email: '',
            message: '',
          };
        } else {
          console.error('Failed to send form data.');
        }
      } catch (error) {
        console.error('Error sending form data:', error);
      }
    }
  },
};
</script>

<style scoped>
/* Add custom styles here if needed */
</style>
