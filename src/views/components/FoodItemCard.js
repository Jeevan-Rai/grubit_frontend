import { Box, Button, ButtonGroup, Card, CardContent, Grid, Typography } from '@mui/material'
import DialogsScroll from './dialogs/DialogsScroll'
import FoodCardModal from './dialogs/FoodCardModal'
import { useEffect, useState } from 'react'
import MakeYourOwnForm from './dialogs/MakeYourOwnForm'
import { useOrder } from 'src/context/OrderContext'

export default function FoodItemCard({ type = 'weekly', week, date, item }) {
  const [open, setOpen] = useState(false)
  const [openMakeYourOwnForm, setOpenMakeYourOwnForm] = useState(false)
  const { orders, addItemToOrder, updateItemQuantity, findItemQuantity } = useOrder()
  let productQuantity = findItemQuantity(type, week, date, item.id)
  const [quantity, setQuantity] = useState(productQuantity)

  const handleIncrease = (category, week, date, item) => {
    let productQuantity = findItemQuantity(category, week, date, item.id)
    addItemToOrder(category, week, date, item, productQuantity + 1)
    setQuantity(productQuantity + 1)
  }

  const handleDecrease = (category, week, date, itemId) => {
    if (quantity > 0) {
      let productQuantity = findItemQuantity(category, week, date, itemId)
      updateItemQuantity(category, week, date, itemId, productQuantity - 1)
      setQuantity(productQuantity - 1)
    }
  }

  // const quantity = getItemQuantity(item.id)
  // const handleIncreaseItem = item => {
  //   addItem(week, date, item, 1) // Increase quantity by 1
  // }

  // const handleDecreaseItem = item => {
  //   addItem(week, date, item, -1) // Decrease quantity by 1
  // }

  useEffect(() => {}, [orders])
  return (
    <>
      <CardContent sx={{ padding: '0.5em' }}>
        <Card sx={{ padding: '1em 0.5em', borderRadius: '30px' }}>
          <Typography
            sx={{
              fontFamily: 'DM Sans',
              fontWeight: '500',
              color: '#4B465C',
              fontSize: '15px',
              textAlign: 'center'
            }}
          >
            {item.name}
          </Typography>
          <Typography
            sx={{
              fontFamily: 'DM Sans',
              fontWeight: '400',
              color: '#4B465C',
              fontSize: '14px',
              textAlign: 'center',
              marginTop: '5px'
            }}
          >
            {item.calories} calories
          </Typography>
          <Typography
            sx={{
              fontFamily: 'DM Sans',
              fontWeight: '700',
              color: '#036648',
              fontSize: '14px',
              textAlign: 'center',
              marginTop: '10px'
            }}
          >
            £ {item.price}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '1.5em',
              gap: quantity > 0 ? '0.5em' : '0'
            }}
          >
            {(productQuantity === 0 || productQuantity === null) && (
              <Button
                sx={{
                  fontFamily: 'DM Sans',
                  fontWeight: '500',
                  color: '#5D586C',
                  fontSize: '18px',
                  border: '1px solid #FD5B2980',

                  color: '#FFFFFF',
                  background: '#FD5B29',
                  margin: '0.25em',
                  '&:hover': {
                    color: '#FFFFFF',
                    backgroundColor: '#FD5B29'
                  }
                }}
                onClick={() => {
                  type !== 'weekly' ? setOpenMakeYourOwnForm(true) : handleIncrease(type, week, date, item)
                }}
              >
                Add Item
              </Button>
            )}

            {productQuantity > 0 && (
              <>
                <Box
                  sx={{
                    fontFamily: 'DM Sans',
                    fontWeight: '500',
                    color: '#5D586C',
                    fontSize: '13px',
                    border: '1px solid #FD5B2980',
                    borderRadius: '10px',
                    padding: '5px 10px',
                    color: '#FFFFFF',
                    background: '#FD5B29',
                    margin: '0.25em',
                    '&:hover': {
                      color: '#FFFFFF',
                      backgroundColor: '#FD5B29'
                    }
                  }}
                  onClick={() => {
                    type !== 'weekly'
                      ? productQuantity > 0
                        ? handleDecrease(type, week, date, item.id)
                        : setOpenMakeYourOwnForm(true)
                      : handleDecrease(type, week, date, item.id)
                  }}
                >
                  -
                </Box>
                <Typography>{productQuantity}</Typography>
                <Box
                  sx={{
                    fontFamily: 'DM Sans',
                    fontWeight: '500',
                    color: '#5D586C',
                    fontSize: '13px',
                    border: '1px solid #FD5B2980',
                    borderRadius: '10px',
                    padding: '5px 10px',
                    color: '#FFFFFF',
                    background: '#FD5B29',
                    margin: '0.25em',
                    '&:hover': {
                      color: '#FFFFFF',
                      backgroundColor: '#FD5B29'
                    }
                  }}
                  onClick={() => {
                    type !== 'weekly'
                      ? productQuantity > 0
                        ? handleIncrease(type, week, date, item)
                        : setOpenMakeYourOwnForm(true)
                      : handleIncrease(type, week, date, item)
                  }}
                >
                  +
                </Box>
              </>
            )}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography
              sx={{
                fontFamily: 'DM Sans',
                fontWeight: '700',
                color: '#FD5B29',
                borderBottom: '2px solid #FD5B29',
                width: 'max-content',
                fontSize: '14px',
                textAlign: 'center'
              }}
              onClick={() => setOpen(true)}
            >
              More Info
            </Typography>
          </Box>
        </Card>
      </CardContent>
      <FoodCardModal open={open} setOpen={setOpen} />
      <MakeYourOwnForm
        open={openMakeYourOwnForm}
        setOpen={setOpenMakeYourOwnForm}
        week={week}
        type={type}
        date={date}
        item={item}
      />
    </>
  )
}
