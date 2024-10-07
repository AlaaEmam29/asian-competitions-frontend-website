import * as React from 'react'
import { styled } from '@mui/material/styles'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { useSearchStore } from '@/stores/search'
import { debounce } from '@/utils/helpers'

const CustomOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  flexGrow: 1,
  borderRadius: '2rem',
  height: '4.5rem',
  fontSize: '1.6rem',
  border: `1px solid ${theme.palette.grey[500]}`,
  outline: 'none',
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
  '&.Mui-focused': {
    borderColor: theme.palette.grey[800],
    outline: 'none',
  },
}))

export default function Search() {
  const { search, setSearch } = useSearchStore()
  const [searchTerm, setSearchTerm] = React.useState('')
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleSearch = React.useMemo(
    () =>
      debounce((val: string) => {
        setSearch(val)
      }, 600),
    [setSearch],
  )

  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(event.target.value)
    setSearchTerm(event.target.value)
  }

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [search])
  React.useEffect(() => {
    setSearchTerm(search)
  }, [search])

  return (
    <FormControl sx={{ flexGrow: 1 }} variant='outlined'>
      <CustomOutlinedInput
        id='search'
        placeholder='Search for league or competition'
        // inputRef={inputRef}
        // value={searchTerm}
        // onChange={onHandleChange}
        type='search'
        startAdornment={
          <InputAdornment position='end'>
            <SearchRoundedIcon fontSize='medium' sx={{ color: 'grey.600' }} />
          </InputAdornment>
        }
        inputProps={{
          'aria-label': 'search',
        }}
      />
    </FormControl>
  )
}
