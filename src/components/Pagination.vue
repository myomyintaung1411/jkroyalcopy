<template>
<div @click="go">
  <!-- previous page-->
  <button class= "prev"
          go= "-1"
          :disabled= "currentNo === 1"
          :class= "{disabled: currentNo === 1}">Previous </button>
  <!-- first page-->
  <button  v-show= "startEnd.start >= 2" :go="1">1  </button>
  <!-- ellipsis-->
  <span  class= "elli"
        v-show= "startEnd.start >= 3" > ... </span>
  <!-- Intermediate consecutive page numbers-->
  <button v-for= "(item,index) in startEnd.end"
          :key= "index"
          :go= "item"
          v-show= "item >= startEnd.start"
          :class= " {checked: item === currentNo}"> {{ item }} </button>
  <!-- ellipsis-->
  <span  class= "elli"
        v-show= "startEnd.end <=  totalPages  -  2" > ... </span>
  <!-- last page-->
  <button  v-show= "startEnd.end <  totalPages "
          :go= "totalPages" > {{ totalPages }} </button>
  <!-- next page-->
  <button  class= "next"
          :disabled = "currentNo === totalPages"
          :class= " {disabled: currentNo === totalPages}"
          go="+1">Next </button>
  <span> Current page number: {{ currentNo }} </span>
</div>
</template >

<script setup>
import  { computed ,onMounted ,ref  }  from 'vue'

const  props  =  defineProps({
  // The total number
  totalItems :  Number ,
  // number of pages per page
  pageItems :  Number ,
  // intermediate consecutive page numbers
  continues :  {
    type :  Number ,
    default :  5
  }
})

// total pages
const  totalPages  =  computed (()  =>  Math.ceil (props.totalItems / props.pageItems ))

// current page number
let  currentNo  =  ref (( totalPages.value  >  0 )  ?  1  :  0 )

// Calculate the start and end positions of the middle consecutive page numbers
let  startEnd  =  computed (()  =>  {
  let  start  =  0 ,  end  =  0
  // The total number of pages is not enough, then there is no problem of continuous page numbers in the middle
  if ( totalPages.value  <  props.continues )  {
    start  =  1
    end  =  totalPages.value
  }  else  {
    // half the number of consecutive pages
    const  dx  =  Math . floor ( props.continues  /  2 )
    start  =  currentNo.value  -  dx
    end  =  currentNo.value  +  dx
    // Determine the boundary (if there are 20 pages)
    if ( start  <  1 )  {
      start  =  1
      // 1 2 3 4 5 ... 20
      end  =  props.continues
    }
    if ( end  >  totalPages.value )  {
      end  =  totalPages.value
      // 1 ... 16 17 18 19 20
      start  =  totalPages.value  -  props.continues  +  1
    }
  }
  return  { start ,  end }
})

onMounted (()  =>  {
  console.log ( totalPages.value )
  // console.log(startEnd.value.start)
  // console.log(currentNo.value)
})

/**
* Jump page
*/
function  go ( e )  {
  const  target  =  e.target  ||  e.srcElement
  if ( target.nodeName.toLowerCase ()  ===  'button ' )  {
    const  goIndex  =  target.getAttribute ( 'go' ) 
    // Previous Next
    if ([ ' -1 ' ,  ' +1 ' ].includes( goIndex )) { 
      currentNo.value  =  goIndex  -  0  +  currentNo.value
      if ( currentNo.value  <  1 )  currentNo.value =  1
      if ( currentNo.value  >  totalPages.value )  currentNo.value  =  totalPages.value
    }  else  {
      currentNo.value  =  goIndex  -  ' 0 '
    }
  }
}


</script>

<style scoped >

button {
	 width: 30px;
	 height: 30px;
	 margin-right: 10px;
	 border: none;
	 cursor: pointer;
	 border-radius: 5px;
	 background-color: #fff;
	 font-size: 14px;
}
 button:hover {
	 border: 1px solid #ddd;
}
 .prev, .next {
	 width: 60px;
	 height: 30px;
	 font-size: 16px;
	 color: royalblue;
}
 .checked {
	 background-color: royalblue;
	 color: #fff;
}
 .checked:hover {
	 border: none;
}
 .disabled {
	 color: #aaa;
	 cursor: default;
}
 .disabled:hover {
	 border: none;
}
 .elli {
	 margin-right: 10px;
	 color: #aaa;
	 cursor: default;
}
</style>