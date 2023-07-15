<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="firstname">Firstname</label>
      <input
        type="text"
        id="firstname"
        v-model.trim="firstName.value"
        @blur="clearValidity(firstName)"
      />
      <p v-if="!firstName.isValid">Firstname must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !lastName.isValid }">
      <label for="lastname">Lastname</label>
      <input
        type="text"
        id="lastname"
        v-model.trim="lastName.value"
        @blur="clearValidity(lastName)"
      />
      <p v-if="!lastName.isValid">Lastname must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">Description</label>
      <textarea
        id="description"
        rows="5"
        v-model.trim="description.value"
        @blur="clearValidity(description)"
      ></textarea>
      <p v-if="!description.isValid">Description must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !rate.isValid }">
      <label for="rate">Hourly Rate</label>
      <input type="number" id="rate" v-model.number="rate.value" @blur="clearValidity(rate)" />
      <p v-if="!rate.isValid">Hourly rate must be greater than $0/hr.</p>
    </div>
    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <h3>Areas of expertise</h3>
      <div>
        <input
          type="checkbox"
          value="frontend"
          id="frontend"
          v-model="areas.value"
          @blur="clearValidity(areas)"
        />
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          value="backend"
          id="backend"
          v-model="areas.value"
          @blur="clearValidity(areas)"
        />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          value="career"
          id="career"
          v-model="areas.value"
          @blur="clearValidity(areas)"
        />
        <label for="career">Career Advisory</label>
      </div>
      <p v-if="!areas.isValid">At least one expertise must be selected.</p>
    </div>
    <p v-if="!formIsValid">Please fix the above errors and submit again.</p>
    <BaseButton>Register</BaseButton>
  </form>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['save-data']);

const firstName = ref({
  value: '',
  isValid: true,
});
const lastName = ref({
  value: '',
  isValid: true,
});
const description = ref({
  value: '',
  isValid: true,
});
const rate = ref({
  value: null,
  isValid: true,
});
const areas = ref({
  value: [],
  isValid: true,
});

const formIsValid = ref(true);

function clearValidity(inputRef) {
  if (inputRef.value) {
    inputRef.isValid = true;
  } else {
    inputRef.isValid = false;
  }
}

function validateForm() {
  formIsValid.value = true;
  if (firstName.value.value === '') {
    firstName.value.isValid = false;
    formIsValid.value = false;
  } else {
    firstName.value.isValid = true;
  }
  if (lastName.value.value === '') {
    lastName.value.isValid = false;
    formIsValid.value = false;
  } else {
    lastName.value.isValid = true;
  }
  if (description.value.value === '') {
    description.value.isValid = false;
    formIsValid.value = false;
  } else {
    description.value.isValid = true;
  }
  if (!rate.value.value || rate.value.value < 0) {
    rate.value.isValid = false;
    formIsValid.value = false;
  } else {
    rate.value.isValid = true;
  }
  if (areas.value.value.length === 0) {
    areas.value.isValid = false;
    formIsValid.value = false;
  } else {
    areas.value.isValid = true;
  }
}

function submitForm() {
  validateForm();
  if (!formIsValid.value) {
    return;
  }
  const formData = {
    first: firstName.value.value,
    last: lastName.value.value,
    desc: description.value.value,
    rate: rate.value.value,
    areas: areas.value.value,
  };
  console.log(formData);
  emit('save-data', formData);
}
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
