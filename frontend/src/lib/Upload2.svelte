<script>
  let files;
  let statusCode = "";

  async function handleSubmit() {
    if (files.length > 0) {
      const formData = new FormData();
      formData.append("file", files[0]);
      const response = await fetch("http://localhost:5002/upload", {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });
      statusCode = response.status;
      console.log(statusCode);
    }
  }
</script>

{statusCode}
<form on:submit|preventDefault={handleSubmit}>
  <label for="file">File</label>
  <input required id="file" type="file" bind:files />
  <input type="submit" value="Upload file" />
</form>
