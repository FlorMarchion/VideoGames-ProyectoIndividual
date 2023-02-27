import React from 'react'
import { Link } from 'react-router-dom';
import styles from './styles/SearchBar.module.css'


const SearchBar = () => {

    //styles

    const { searchBar } = styles;
    return (
        <div className={searchBar}>
            <select>
                <option>--Order Alphabetically--</option>
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
            </select>

            <select>
                {/* desde más reciente o desde el mas antiguo */}
            </select>

            <select>
                <option>--Rating--</option>
                <option>Más populares</option>
                <option>Menos populares</option>
            </select>

            <select>
                <option>--Generos--</option>
                {/* {genres.map(el => {
                    return (
                        <option key={el.id}>{el.name}</option>
                    )
                })} */}
            </select>

            <select>
                <option>--Filter Games--</option>
                <option>All Games</option>
                <option>My Games</option>
                <option>Api Games</option>
            </select>

            <Link to="/createGame">
                <button>Create VideoGame</button>
            </Link>


            <div>
                <input type="text" placeholder='Search Game' />
                <button></button>
            </div>
        </div>
    )
}

export default SearchBar
