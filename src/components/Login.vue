<template>
  <div class="homepage container">
<h1>Welcome to machina web application</h1>

      <div class="columns">
          <div class="column">

          </div>
          <div class="column">
              <div class="field">
                  <label class="label">Name</label>
                  <div class="control">
                      <input class="input" type="text" placeholder="Your name">
                  </div>
              </div>

              <div class="field">
                  <label class="label">Manager email address</label>
                  <div class="control has-icons-left has-icons-right">
                      <input class="input " type="email" placeholder="you@emaill.com" >
                      <span class="icon is-small is-left">
      <i class="fas fa-envelope"></i>
    </span>
                      <span class="icon is-small is-right">
      <i class="fas fa-exclamation-triangle"></i>
    </span>
                  </div>

              </div>


              <div class="field">
                  <label class="label">Type of participant</label>
                  <div class="control">
                      <div class="select">
                          <select>
                              <option>Band</option>
                              <option>Carriage</option>
                          </select>
                      </div>
                  </div>
              </div>

              <div class="field">
                  <label class="label">Foundation Date</label>
                  <div class="control">
                      <input class="input" type="date" >
                  </div>
              </div>

          </div>
          <div class="column">

          </div>

      </div>

  </div>
</template>

<script>
export default {
  name: 'Homepage',

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->


<style scoped lang="scss">
    $color: red;
</style>