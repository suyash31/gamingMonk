export default (state = 1, action) => {
  switch (action.type) {
    case 'LOAD_MORE':
      return action.payload;
    default: 
      return state;
  }
}