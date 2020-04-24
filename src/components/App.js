import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import CharacterList from './CharacterList';
import Filter from './Filter';
import getDataFromApi from '../services/getDataFromApi';
import CharacterDetail from './CharacterDetail';

import '../stylesheets/App.scss';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [nameFilter, setNameFilter] = useState('');

  useEffect(() => {
    console.log('me estoy montando');
    getDataFromApi().then((data) => setCharacters(data));
  }, []);
  // console.log(characters);

  const handleFilter = (data) => {
    console.log('manejando los filtros', data);
    if (data.key === 'name') {
      setNameFilter(data.value);
    }
  };
  // console.log('Name:', nameFilter);

  const filteredCharacters = characters.filter((character) => {
    return character.name.toUpperCase().includes(nameFilter.toUpperCase());
  });

  const renderCharacterDetail = (props) => {
    const characterId = props.match.params.id;

    const foundCharacter = characters.find((character) => {
      // console.log(`characterId=${characterId}  characted.id=${character.id} son iguales?-> ${parseInt(characterId) === parseInt(character.id)}`);
      return parseInt(characterId) === character.id;
    });
    // console.log(foundCharacter);
    if (foundCharacter !== undefined) {
      return <CharacterDetail character={foundCharacter} />;
    }
  };

  return (
    <div className='App'>
      <Switch>
        <Route exact path='/'>
          <Filter handleFilter={handleFilter} />
          <CharacterList characters={filteredCharacters} />
        </Route>
        <Route path='/character/:id' render={renderCharacterDetail}></Route>
      </Switch>
    </div>
  );
};

export default App;
