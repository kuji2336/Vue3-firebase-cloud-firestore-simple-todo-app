<template>
    <div class="container">
       <div class="container-inner-cont">
           <slot></slot>
       </div>
    </div>
</template>




<style scoped>
  .container{
      max-width: 900px;
      width: 100%;
      margin: 0 auto;
      margin-top: 120px;
  }

  .container-inner-cont{
      box-shadow: 0 3px 6px rgba(0,0,0,0.16)
  }

  @media(max-width:576px){
      .container{
      max-width: 900px;
      width: 100%;
      margin: 0 auto;
      margin-top: 30px;
  }
}
</style>