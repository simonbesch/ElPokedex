import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";

import Pokemon from "./pokemon";

const Pokedex = () => {
  const [pokemonsData, setPokemonsData] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchTyradex = async () => {
      try {
        const response = await axios.get(
          "https://tyradex.vercel.app/api/v1/pokemon"
        );
        setPokemonsData(response.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchTyradex();
  }, []);

  useEffect(() => {
    const mappedPokemon = pokemonsData.map((data) => {
      return {
        value: data.pokedex_id,
        label: data.name.fr,
        // iconUrl: data.sprites.regular,
      };
    });
    setOptions(mappedPokemon);
  }, [pokemonsData]);

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    const fetchTyradexRandom = async () => {
      try {
        const response = await axios.get(
          `https://tyradex.vercel.app/api/v1/pokemon/${randomNumber}`
        );
        setPokemonData(response.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchTyradexRandom();
  }, []);

  const returnPokemonData = async (data) => {
    try {
      const response = await axios.get(
        `https://tyradex.vercel.app/api/v1/pokemon/${data.value}`
      );
      setPokemonData(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const customOption = (props) => {
    const { data, innerRef, innerProps } = props;
    return (
      <div
        ref={innerRef}
        {...innerProps}
        style={{
          display: "flex",
          alignItems: "center",
          padding: "5px 10px",
          cursor: "pointer",
        }}
      >
        <img
          src={data.iconUrl}
          alt={data.label}
          style={{
            width: "30px",
            height: "30px",
            marginRight: "10px",
            borderRadius: "50%",
          }}
        />
        {data.label}
      </div>
    );
  };

  return (
    <section>
      <Select
        options={options}
        onChange={(data) => returnPokemonData(data)}
        placeholder="Choisie un pokemon"
        // components={{ Option: customOption }}
      />
      <Pokemon PokeData={pokemonData} setPokeData={setPokemonData} />
    </section>
  );
};

export default Pokedex;
