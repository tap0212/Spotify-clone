import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
export default function SideBar({toggleSearch, isSearchActive}: {toggleSearch: () => void; isSearchActive: boolean}) {
	console.log({isSearchActive});
	
  return (
    <div className='w-full bg-grey-dark min-h-screen'>
			<div className='bg-secondary rounded-md m-2 px-2 py-4'>
				<div className='p-2 rounded-md flex gap-4 my-2 cursor-pointer hover:bg-grey-dark'>
					<HomeIcon />
					<p className='font-semibold'>Home</p>
				</div>
				<div onClick={toggleSearch} className={`p-2 rounded-md flex gap-4 my-2 cursor-pointer hover:bg-grey-dark ${isSearchActive && '!bg-grey-dark'}`}>
					<SearchIcon />
					<p className='font-semibold'>Search</p>
				</div>
			</div>
    </div>
  )
}
