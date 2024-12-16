import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";

import "../styles/pokedex.scss";

import Pokemon from "./pokemon";

const Pokedex = () => {
  const [pokemonsData, setPokemonsData] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);
  const [carrouselPoke, setCarrouselPoke] = useState();
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
    const mappedPokemon = pokemonsData
      .map((data) => {
        return {
          value: data.pokedex_id,
          label: data.name.fr,
          // iconUrl: data.sprites.regular,
        };
      })
      .slice(1);
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
        setCarrouselPoke(randomNumber);
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
      setCarrouselPoke(data.value);
    } catch (err) {
      console.error(err.message);
    }
  };

  const returnPokemonDataBtnPlus = async () => {
    let PokeNumber = carrouselPoke - 1;
    if (PokeNumber === 0) {
      PokeNumber = 1025;
    }
    try {
      const response = await axios.get(
        `https://tyradex.vercel.app/api/v1/pokemon/${PokeNumber}`
      );
      setPokemonData(response.data);
      setCarrouselPoke(PokeNumber);
    } catch (err) {
      console.error(err.message);
    }
  };

  const returnPokemonDataBtnMoins = async () => {
    let PokeNumber = carrouselPoke + 1;
    if (PokeNumber === 1026) {
      PokeNumber = 1;
    }
    try {
      const response = await axios.get(
        `https://tyradex.vercel.app/api/v1/pokemon/${PokeNumber}`
      );
      setPokemonData(response.data);
      setCarrouselPoke(PokeNumber);
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
      <div className="NavigationPoke">
        <button onClick={() => returnPokemonDataBtnPlus()}>
          <img
            src="https://img.icons8.com/?size=100&id=87017&format=png&color=000000"
            alt=""
          />
        </button>
        <Select
          options={options}
          onChange={(data) => returnPokemonData(data)}
          placeholder="Choisis un pokemon"
          className="selectPoke"
          classNamePrefix="custom-select"
          // components={{ Option: customOption }}
        />
        <button onClick={() => returnPokemonDataBtnMoins()}>
          <img
            src="https://img.icons8.com/?size=100&id=99389&format=png&color=000000"
            alt=""
          />
        </button>
      </div>
      <Pokemon PokeData={pokemonData} setPokeData={setPokemonData} />
    </section>
  );
};

export default Pokedex;
