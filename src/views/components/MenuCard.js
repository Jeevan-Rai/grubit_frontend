import { Box, Button, Container, Typography } from '@mui/material'

export default function MenuCard({ day, options, color }) {
  return (
    <>
      <Box
        sx={{
          backgroundColor: color.bg,
          display: 'flex',
          justifyContent: 'start',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: '30px',
          padding: '2em 1em',
          // margin:"0px 0.5em 0px 0.5em",
          gap: '1em'
        }}
        className='keen-slider__slide'
      >
        <Typography
          component={'span'}
          sx={{
            backgroundColor: 'White',
            color: '#000000',
            fontFamily: 'Dm sans',
            fontWeight: '700',
            borderRadius: '20px 0px 20px 0px',
            padding: '10px 20px',
            marginBottom: '1.5em'
          }}
        >
          {day}
        </Typography>

        {options.map(option => {
          return (
            <Typography
              component={'span'}
              key={'option-' + option.id}
              sx={{
                backgroundColor: 'White',
                color: '#000000',
                fontFamily: 'Dm sans',
                fontWeight: '700',
                borderRadius: '50px',
                fontSize: '15px',
                padding: '5px 10px',
                width: '100%',
                textAlign: 'center',
                display: 'block'
              }}
            >
              {option}
            </Typography>
          )
        })}
      </Box>
    </>
  )
}
