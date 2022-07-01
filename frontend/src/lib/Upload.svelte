<script>
  let avatar, fileinput;
  let files;
  let status = false;
  let message = "";
  let urlimg = "";
  const onFileSelected = (e) => {
    let image = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e) => {
      avatar = e.target.result;
    };
  };

  function submitForm() {
    const dataArray = new FormData();
    dataArray.append("file", files[0]);
    fetch("http://localhost:5002/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: dataArray,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        status = responseJson.status;
        message = responseJson.message;
        urlimg = responseJson.online_path.url;
      })
      .catch((error) => {
        // Upload failed
      });
  }
</script>

<div id="app">
  {#if status}
    <h1>{message}</h1>
    <img class="avatar" src={urlimg} alt="" />
  {:else}
    <h1>Upload Image</h1>

    {#if avatar}
      <img class="avatar" src={avatar} alt="d" />
    {:else}
      <img
        class="avatar"
        src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png"
        alt=""
      />
    {/if}
  {/if}
  <img
    class="upload"
    src="https://static.thenounproject.com/png/625182-200.png"
    alt=""
    on:click={() => {
      fileinput.click();
    }}
  />
  <div
    class="chan"
    on:click={() => {
      fileinput.click();
    }}
  >
    Pilih Gambar
  </div>
  <br />
  <form on:submit|preventDefault={submitForm}>
    <input
      style="display:none"
      type="file"
      accept=".jpg, .jpeg, .png"
      on:change={(e) => onFileSelected(e)}
      bind:this={fileinput}
      bind:files
    />
    <button type="submit" class="gradient-button">Upload</button>
    <!-- <input type="submit" /> -->
  </form>
</div>

<style>
  #app {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
  }

  .upload {
    display: flex;
    height: 50px;
    width: 50px;
    cursor: pointer;
  }
  .avatar {
    display: flex;
    height: 200px;
    width: 200px;
  }

  .gradient-button {
    position: absolute;
    z-index: 1;
    display: block;
    /* top: calc(50% - 2.5rem - 5px); */
    left: calc(50% - 6rem - 5px);
    height: 5rem;
    width: 12rem;
    margin: auto;
    background: transparent
      linear-gradient(
        to top left,
        rgba(249, 208, 129, 0.2) 0%,
        rgba(227, 2, 62, 0.2) 40%,
        rgba(49, 128, 135, 0.2) 100%
      );
    border: 5px solid transparent;
    border-image-source: linear-gradient(
      to top left,
      #f9d081 0%,
      #e3023e 40%,
      #318087 100%
    );
    border-image-slice: 1;
    transition: transform 0.25s;
    letter-spacing: 0.2rem;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 1.25rem;
    font-weight: 300;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    color: #333;
  }
  .gradient-button::after {
    content: "";
    position: absolute;
    top: -5px;
    left: -5px;
    width: 100%;
    height: 100%;
    margin: auto;
    border: 5px solid transparent;
    opacity: 0;
    pointer-events: none;
    border-image-slice: 1;
    z-index: -1;
    background: transparent
      linear-gradient(
        to bottom left,
        rgba(249, 208, 129, 0.25) 10%,
        rgba(227, 2, 62, 0.25) 30%,
        rgba(49, 128, 135, 0.25) 90%
      );
    border-image-source: linear-gradient(
      to bottom left,
      #f9d081 10%,
      #e3023e 30%,
      #318087 90%
    );
    transition: opacity 1s;
  }
  .gradient-button:active {
    transform: scale(0.96);
  }
  .gradient-button:active::before {
    opacity: 1;
  }
  .gradient-button::before {
    content: "";
    position: absolute;
    top: -5px;
    left: -5px;
    width: 100%;
    height: 100%;
    margin: auto;
    border: 5px solid transparent;
    opacity: 0;
    pointer-events: none;
    border-image-slice: 1;
    z-index: 0;
    border-image-source: linear-gradient(
      to bottom left,
      #f9d081 20%,
      #e3023e 40%,
      #318087 70%
    );
    transition: opacity 0.5s;
  }
  .gradient-button:hover::after {
    opacity: 1;
  }
</style>
