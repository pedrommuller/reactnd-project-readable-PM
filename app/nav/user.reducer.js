const list = {
  '1':{
    name:'James Herfield',
    initials:'JH',
    color:'#'+Math.floor(Math.random()*16777215).toString(16)
  },
  '2':{
    name:'Lars Urlich',
    initials:'LU',
    color:'#'+Math.floor(Math.random()*16777215).toString(16)
  },
  '3':{
    name:'Kirck Hammet',
    initials:'KH',
    color:'#'+Math.floor(Math.random()*16777215).toString(16)
  },
  '4':{
    name:'Robert Trujillo',
    initials:'RT',
    color:'#'+Math.floor(Math.random()*16777215).toString(16)
  }
}


const initialState ={
  list:list,
  current:'2',
}

export default function users(state=initialState, action){
  return state
}
