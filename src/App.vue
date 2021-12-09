<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>
<script>
  export default{
    created(){
        //check console
        // setInterval(() => {
        //     debugger;
        // }, 100);












































        // //prohitbit f12 keyEvent
        // document.addEventListener('keydown', function(event){
        //     return 123 != event.keyCode || (event.returnValue = false)
        // });
        // //prohitbit right mouse click
        // document.addEventListener('contextmenu', function(event){
        //     return event.returnValue = false
        // })

        this.$nextTick(() => {
          // prohitbit right mouse click
          document.oncontextmenu = new Function('event.returnValue=false')
          // prohitbit choose
          //document.onselectstart = new Function('event.returnValue=false')
          // prohitbit console
          // document.onkeydown = new Function('event.returnValue=false')
          document.addEventListener('keydown', function(event){
            if(event.keyCode==123||(event.ctrlKey&&event.shiftKey&&event.keyCode==73)){
              return event.returnValue = false;
            }
          });
        })
    }
  }
</script>
<style lang="scss">
  /*@import "./assets/css/main.css";*/
    *{
        padding: 0;
        margin: 0;
        text-decoration: none;
        /*用于px转rem*/
        font-size: 100%;
    }
</style>
