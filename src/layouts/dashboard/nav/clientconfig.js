// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navClientConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },

  {
    title: 'view fourtnitures',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'add fourtnitures',
    path: '/dashboard/product/add',
    icon: icon('ic_cart'),
  },
  
 
];

export default navClientConfig;
