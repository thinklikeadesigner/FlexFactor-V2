<script>
    let name = '';
    let email = '';
    
    const handleSubmit = () => {
      // handle form submission here
      console.log('Name:', name);
      console.log('Email:', email);
    };
  </script>
  
  <style>
    /* import Skeleton CSS styles */
  
    /* customize form styles */
    .form-input {
      margin-bottom: 1rem;
    }
    
    .form-button {
      display: block;
      margin: 2rem auto;
    }
  </style>
  
  <h1>Example Form</h1>
  
  <form on:submit|preventDefault={handleSubmit}>
    <label for="name">Name</label>
    <input type="text" id="name" bind:value={name} class="form-input">
  
    <label for="email">Email</label>
    <input type="email" id="email" bind:value={email} class="form-input">
  
    <button type="submit" class="button-primary form-button">Submit</button>
  </form>