import { ListItem, TextField } from '@mui/material'

function CartQuantityBox({setQuantity,quantity}) {

  const handleKeyDown = (event) => { 
    event.preventDefault();
  };
  return (
    <ListItem>
      Qty :
      <TextField 
            variant="outlined" 
            margin="normal" 
            size='small'
            style={{width:'80px'}}
            type="number"
            value={quantity>1?quantity:1}
            onKeyDown={handleKeyDown}
            onInput={(e) => e.preventDefault()}
            onChange={(e)=>setQuantity(e.target.value)}
          />
    </ListItem>
  )
}

export default CartQuantityBox