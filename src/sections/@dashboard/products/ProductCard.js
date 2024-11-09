import PropTypes from 'prop-types';
// @mui
import axios from 'axios';
import { useEffect, useState } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';


import { Box, Card, Link, Typography, Stack,Button } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'image',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
 


  
  const successPaymentHandler = (paymentResult) => {
    axios.post('http://localhost:3001/send-email', { "to": user.email, "subject": 'Payement confirmation ', "text": `mr/mrs ${user.firstname } ${user.lastname } , your purchase has been confirmed successfuly `  })
  }

  const [user, setUser] = useState(null);
  const [sdkReady, setSdkReady] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const addPayPalScript = async () => {
      const { data: clientId } = "AcD0anAWCq8tWRWBsz7Mc2wjQP_niHNFxIdYpHVbgVLFgIiPSxurpiRZ4xCODL0qWFDhj1Y87dyIxjMC"
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }
    addPayPalScript()
  }, [sdkReady]);
  const { name, image, price, colors, status, priceSale } = product;
 


  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )}
        <StyledProductImg alt={name} src={image} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction={'row'} alignItems="center" justifyContent="space-between">
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
         

        </Link>
       
          </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ColorPreview colors={colors} />
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >
              {priceSale && fCurrency(priceSale)}
            </Typography>
            &nbsp;
            {fCurrency(price)}
          </Typography>
        </Stack>
        <PayPalButton
                      amount={price}
                      onSuccess={successPaymentHandler}
                    />
      </Stack>
    </Card>
  );
}
