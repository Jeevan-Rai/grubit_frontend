// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'

import Button from '@mui/material/Button'

import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import List from '@mui/material/List'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import { MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
import { getStationsList } from 'src/helpers/stationHelper'
import { useOrder } from 'src/context/OrderContext'

export default function CartStationCard() {
  const breakpointMD = useMediaQuery(theme => theme.breakpoints.between('sm', 'lg'))

  const [stations, setStations] = useState([])
  const [selectedStation, setSelectedStation] = useState(null)
  const { setPickupLocation, orders } = useOrder()

  const handleChange = e => {
    let value = e.target.value
    let result = stations.find(item => item.id === value)

    if (result == undefined) setSelectedStation('')
    setSelectedStation(result)
    setPickupLocation(result)
  }

  let fetchStations = async () => {
    try {
      let response = await getStationsList()
      setStations(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchStations()
  }, [])

  useEffect(() => {
    if (orders?.pickupLocation) setSelectedStation(orders?.pickupLocation)
  }, [orders])

  return (
    <>
      <Box sx={{ mb: 4, borderRadius: 1, border: theme => `1px solid ${theme.palette.divider}` }}>
        <CardContent>
          <Typography sx={{ mb: 4 }} variant='h6'>
            Pickup Location
          </Typography>
          <CustomTextField
            onChange={e => handleChange(e)}
            select
            fullWidth
            label={'Train Station'}
            value={orders?.pickupLocation?.id}
            defaultValue={orders?.pickupLocation?.id}
          >
            <MenuItem value={''}>Select Station</MenuItem>
            {stations?.map((row, index) => {
              return (
                <MenuItem key={index} value={row.id}>
                  {row.name}
                </MenuItem>
              )
            })}
          </CustomTextField>
          <Box sx={{ my: '1em !important' }} />

          <CustomTextField
            multiline
            rows={10}
            fullWidth
            label={'Address'}
            disabled
            defaultValue={selectedStation?.details || ''}
          />
          <Divider sx={{ my: '2em !important' }} />
        </CardContent>
      </Box>
    </>
  )
}
