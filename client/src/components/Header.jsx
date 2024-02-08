import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, MenuItem, Menu, IconButton, Badge } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PersonIcon from '@mui/icons-material/Person';
import { setUserInfo } from '../redux/userSlice';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LoginIcon from '@mui/icons-material/Login';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import toast from 'react-hot-toast';
import SearchBox from './SearchBox';
import { resetUserFullData } from '../redux/userFullDet';
import axiosInstance from '../axios/axiosInstance'
import { getCartItems } from '../redux/getCartSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [attach, setAttach] = useState(null);
  const [categories,setCategories]=useState([])
  const cart=useSelector(state=>state.getCart)
  const totalCount=cart?.cartItems.length !==0 ?cart?.cartItems?.reduce((acc,val)=>acc+=val.count,0): 0

  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('userAddress')
    dispatch(setUserInfo());
    dispatch(resetUserFullData())
    navigate('/login');
    setTimeout(() => {
      toast.success('logout successfull');
    }, 500);
  };
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const userInfo = useSelector((state) => state.user);

  useEffect(()=>{
    dispatch(getCartItems())
  },[dispatch])

  useEffect(() => {
    dispatch(setUserInfo());
  }, [dispatch]);



  //get catregories
  const getCategories=async()=>{
    try {
      const {data}=await axiosInstance.get('/category/get-all')
      setCategories(data?.category)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getCategories()
  },[])


  return (
    <AppBar position="sticky" sx={{ width: '100%', background: 'black' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Button variant="h6"
        component={Link} to="/"
        style={{fontFamily:'unset'}}
        >
          EcoHome Devices 
        </Button>
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <SearchBox/>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit"
            onClick={(e)=>setAttach(e.currentTarget)}
          >
            Categories
          </Button>

{/* ---------- category list starts-------------- */}

          <Menu
            anchorEl={attach}
            open={Boolean(attach)}
            onClose={()=>setAttach(null)}
          >
            {
              categories.map((c)=>(
                <MenuItem
                  key={c._id}
                  className="menuItemStyle"
                  onClick={()=>{navigate(`/category-products/${c._id}`);setAttach(null)}}
                >
                  {c.name}
                </MenuItem>
              ))
            }
            
          </Menu>
              
        {/* ---------- category list ends-------------- */}

        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
        {userInfo !== null ? (
            <>
            
              <Button color="inherit" onClick={handleMenuClick} endIcon={<ArrowDropDownIcon />}>
                <PersonIcon/>
              </Button>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem 
                  onClick={()=>navigate(`/dashboard/${userInfo.role !== 1 ? 'user':'admin'}`)}
                >Dashboard</MenuItem>
                <MenuItem value="option2">
                  <Button color="inherit" onClick={handleLogout}>
                    Logout
                  </Button>
                </MenuItem>
              </Menu>
          </>
           )
           :
           (
            <IconButton color="inherit" onClick={()=>navigate('/login')} >
              <LoginIcon/>
            </IconButton>
           )
          }
          <Button color="inherit" component={Link} to="/cart">
            <Badge badgeContent={totalCount?totalCount:0} color="error" showZero>
              <IconButton color="inherit">
                <ShoppingCartIcon />
              </IconButton>
            </Badge>
          </Button>
           
           </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
