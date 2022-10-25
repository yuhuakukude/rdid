import { Box } from '@mui/material'
import SearchPanel from './SearchPanel'

export default function Home() {
  return (
    <Box>
      <SearchPanel searchValue={''} onSearchValue={val => {}} />
    </Box>
  )
}
