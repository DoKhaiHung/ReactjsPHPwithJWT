import { useEffect, useState } from 'react';
// material
import { Menu, Button, MenuItem, Typography } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';
import { useGetProducts } from 'src/hooks';
// ----------------------------------------------------------------------

const SORT_BY_OPTIONS = [
  { value: 'default', label: 'Featured' },
  { value: 'NEW', label: 'Newest' },
  { value: 'DESC', label: 'Price: High-Low' },
  { value: 'ASC', label: 'Price: Low-High' }
];

export default function ShopProductSort(props) {
  console.log('sort:',props.setSort)
  const [open, setOpen] = useState(null);
  const [sortOption,setOption]=useState(SORT_BY_OPTIONS[0])
  const sortedProducts=useGetProducts(sortOption.value)
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };
  const handleClose = (value) => {
    setOpen(null);    
    setOption(value)
  };

  useEffect(()=>{
   if(sortedProducts!=null) {
     props.setSort(sortedProducts);
    console.log('sort ne',sortedProducts)

   }
  },[sortedProducts]);
  return (
    <>
      <Button
        color="inherit"
        disableRipple
        onClick={handleOpen}
        endIcon={<Iconify icon={open ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
      >
        Sort By:&nbsp;
        <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
         {sortOption.label}
        </Typography>
      </Button>
      <Menu
        keepMounted
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {SORT_BY_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === sortOption.value}
            onClick={()=>{handleClose(option)}}
            sx={{ typography: 'body2' }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
