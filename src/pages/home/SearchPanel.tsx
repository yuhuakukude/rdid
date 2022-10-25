import Input from 'components/Input'
import { styled, Box, Typography, useTheme, Stack } from '@mui/material'
import { useState } from 'react'
//import { useHomeOverview } from 'hooks/useBackedDaoServer'
//import { formatMillion } from 'utils/dao'

const StyledSearchPanel = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  height: 200,
  padding: '32px 52px',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  '& .search': {
    path: {
      fill: '#200E32'
    }
  },
  [theme.breakpoints.down('lg')]: {
    gap: '20px',
    gridTemplateColumns: '1fr',
    height: 'auto'
  }
}))

export default function SearchPanel({
  searchValue,
  onSearchValue
}: {
  searchValue: string
  onSearchValue: (val: string) => void
}) {
  const [searchStr, setSearchStr] = useState(searchValue)

  const theme = useTheme()
  return (
    <StyledSearchPanel>
      <Box>
        <Typography variant="h4" mb={24} color={theme.palette.common.white}>
          Decentralized Name Service
        </Typography>
        <Input
          value={searchStr}
          onChange={val => setSearchStr(val.target.value)}
          maxWidth="432px"
          onBlur={() => setSearchStr(searchValue)}
          placeholder="example:vitalik"
        />
        {/*<SearchIcon className="search" />*/}
      </Box>
      <Stack
        direction={'row'}
        sx={{
          justifyContent: { md: 'start', lg: 'center' },
          '&>:last-child': { border: 'none', paddingRight: 0 },
          '&>:first-child': { paddingLeft: 0 }
        }}
        alignItems="center"
      ></Stack>
    </StyledSearchPanel>
  )
}
