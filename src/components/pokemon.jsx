import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/pokemon.scss";

const Pokemon = ({ PokeData, setPokeData }) => {
  const [preEvol0, setPreEvol0] = useState();
  const [preEvol1, setPreEvol1] = useState();
  const [nextEvol0, setNextEvol0] = useState();
  const [nextEvol1, setNextEvol1] = useState();

  const getEvol = async () => {
    setPreEvol0(null);
    setPreEvol1(null);
    setNextEvol0(null);
    setNextEvol1(null);

    if (PokeData?.evolution?.pre && PokeData.evolution.pre.length > 0) {
      if (PokeData.evolution.pre[0]) {
        try {
          const response = await axios.get(
            `https://tyradex.vercel.app/api/v1/pokemon/${PokeData.evolution.pre[0].pokedex_id}`
          );
          setPreEvol0(response.data);
        } catch (err) {
          console.log("Erreur pour pre[0] :", err.message);
        }
      } else {
        setPreEvol0(null);
      }

      if (PokeData.evolution.pre.length > 1 && PokeData.evolution.pre[1]) {
        try {
          const response = await axios.get(
            `https://tyradex.vercel.app/api/v1/pokemon/${PokeData.evolution.pre[1].pokedex_id}`
          );
          setPreEvol1(response.data);
        } catch (err) {
          console.log("Erreur pour pre[1] :", err.message);
        }
      } else {
        setPreEvol1(null);
      }
    }

    if (PokeData?.evolution?.next && PokeData.evolution.next.length > 0) {
      if (PokeData.evolution.next[0]) {
        try {
          const response = await axios.get(
            `https://tyradex.vercel.app/api/v1/pokemon/${PokeData.evolution.next[0].pokedex_id}`
          );
          setNextEvol0(response.data);
        } catch (err) {
          console.log("Erreur pour next[0] :", err.message);
        }
      } else {
        setNextEvol0(null);
      }

      if (PokeData.evolution.next.length > 1 && PokeData.evolution.next[1]) {
        try {
          const response = await axios.get(
            `https://tyradex.vercel.app/api/v1/pokemon/${PokeData.evolution.next[1].pokedex_id}`
          );
          setNextEvol1(response.data);
        } catch (err) {
          console.log("Erreur pour next[1] :", err.message);
        }
      } else {
        setNextEvol1(null);
      }
    }
  };

  useEffect(() => {
    getEvol();
  }, [PokeData]);

  return (
    <section>
      {!PokeData.name ? null : (
        <div className="Container">
          <div className={`${PokeData.types[0].name} Card`}>
            <div className="InfosCard">
              <p>{PokeData.name.fr}</p>
              <div className="InfosCardHp">
                <p>{PokeData.stats.hp} PV</p>
                <img src={PokeData.types[0].image} alt="" />
              </div>
            </div>
            <img src={PokeData.sprites.regular} className="PokeImg" alt="" />
            <div className="TalentsCard">
              <p>{PokeData.talents[0].name}</p>
              {!PokeData.talents[1] ? null : <p>{PokeData.talents[1].name}</p>}
            </div>
          </div>
          <div className="Evolution">
            {preEvol0 ? (
              <div
                className={`${PokeData.types[0].name} MiniCard`}
                onClick={() => setPokeData(preEvol0)}
              >
                <p>
                  {PokeData.evolution?.pre?.[0]?.name ||
                    "Évolution précédente inconnue"}
                </p>
                <img src={preEvol0.sprites.regular} alt="Pré-évolution 0" />
              </div>
            ) : null}

            {preEvol1 ? (
              <div
                className={`${PokeData.types[0].name} MiniCard`}
                onClick={() => setPokeData(preEvol1)}
              >
                <p>
                  {PokeData.evolution?.pre?.[1]?.name ||
                    "Évolution précédente inconnue"}
                </p>
                <img src={preEvol1.sprites.regular} alt="Pré-évolution 1" />
              </div>
            ) : null}

            {nextEvol0 ? (
              <div
                className={`${PokeData.types[0].name} MiniCard`}
                onClick={() => setPokeData(nextEvol0)}
              >
                <p>
                  {PokeData.evolution?.next?.[0]?.name ||
                    "Évolution suivante inconnue"}
                </p>
                <img
                  src={nextEvol0.sprites.regular}
                  alt="Prochaine évolution 0"
                />
              </div>
            ) : null}

            {nextEvol1 ? (
              <div
                className={`${PokeData.types[0].name} MiniCard`}
                onClick={() => setPokeData(nextEvol1)}
              >
                <p>
                  {PokeData.evolution?.next?.[1]?.name ||
                    "Évolution suivante inconnue"}
                </p>
                <img
                  src={nextEvol1.sprites.regular}
                  alt="Prochaine évolution 1"
                />
              </div>
            ) : null}
          </div>
          <div className="AllInfos">
            <h1>Informations :</h1>
            <p>
              <span>Nom: </span>
              {PokeData?.name?.fr} ({PokeData?.name?.en} / {PokeData?.name?.jp})
            </p>
            <p>
              <span>Categorie: </span>
              {PokeData?.category}
            </p>
            <p>
              <span>Génération </span>
              {PokeData?.generation}
            </p>

            <p>
              <span>Type(s): </span>
            </p>
            <div className="InfoMap">
              {PokeData?.types.map((data) => (
                <div className="InfoMap2" key={data.name}>
                  <p>{data.name}</p>
                  <img src={data.image} alt="" />
                </div>
              ))}
            </div>

            <p>
              <span>Capacitées: </span>
            </p>
            <div className="InfoMap">
              {PokeData?.talents.map((data) => (
                <div className="InfoMap2" key={data.name}>
                  <p>{data.name}</p>
                </div>
              ))}
            </div>

            <div className="InfoStats">
              <h4>
                <span>Stats: </span>
              </h4>
              <p>
                <span>PV: </span> {PokeData?.stats?.hp}
              </p>
              <p>
                <span>Attaque: </span> {PokeData?.stats?.atk}
              </p>
              <p>
                <span>Attaque Spécial: </span> {PokeData?.stats?.spe_atk}
              </p>
              <p>
                <span>Défence Spécial: </span> {PokeData?.stats?.def}
              </p>
              <p>
                <span>Défence: </span> {PokeData?.stats?.spe_def}
              </p>
              <p>
                <span>vitesse: </span> {PokeData?.stats?.vit}
              </p>
            </div>
            <p>
              <span>Taille: </span> {PokeData?.height}
            </p>
            <p>
              <span>Poid: </span> {PokeData?.weight}
            </p>

            {PokeData?.evolution?.pre?.length > 0 ? (
              <div>
                <p>
                  <span>Evolution(s) précédente(s):</span>
                </p>
                {PokeData.evolution.pre.map((data) => (
                  <p key={data.name}>
                    {data.name} ({data.condition})
                  </p>
                ))}
              </div>
            ) : null}

            {PokeData?.evolution?.next?.length > 0 ? (
              <div>
                <p>
                  <span>Evolution(s) suivante(s):</span>
                </p>
                {PokeData.evolution.next.map((data) => (
                  <p key={data.name}>
                    {data.name} ({data.condition})
                  </p>
                ))}
              </div>
            ) : null}

            <h4>
              <span>Autres Evolutions:</span>
            </h4>
            <div className="Evolution EvolutionPlus">
              {PokeData?.sprites?.shiny ? (
                <div className={`${PokeData.types[0].name} MiniCard`}>
                  <p>Shiny:</p>
                  <img src={PokeData?.sprites?.shiny} alt="" />
                </div>
              ) : null}

              {PokeData?.sprites?.gmax?.regular ? (
                <div className={`${PokeData.types[0].name} MiniCard`}>
                  <p>Gigamax:</p>
                  <img src={PokeData?.sprites?.gmax?.regular} alt="" />
                </div>
              ) : null}

              {PokeData?.sprites?.gmax?.shiny ? (
                <div className={`${PokeData.types[0].name} MiniCard`}>
                  <p>Gigamax shiny:</p>
                  <img src={PokeData?.sprites?.gmax?.shiny} alt="" />
                </div>
              ) : null}

              {PokeData?.evolution?.mega
                ? PokeData?.evolution?.mega?.map((data) => (
                    <div className={`${PokeData.types[0].name} MiniCard`}>
                      <p>{data.orbe} (Mega)</p>
                      <img src={data?.sprites?.regular} alt="" />
                    </div>
                  ))
                : null}

              {PokeData?.evolution?.mega
                ? PokeData?.evolution?.mega?.map((data) => (
                    <div className={`${PokeData.types[0].name} MiniCard`}>
                      <p>{data.orbe} (Mega Shiny)</p>
                      <img src={data?.sprites?.shiny} alt="" />
                    </div>
                  ))
                : null}
            </div>

            <p>
              <span>Résistances: </span>
            </p>
            <div className="InfoMap">
              {PokeData?.resistances.map((data) => (
                <div className="InfoMap2" key={data.name}>
                  <p>
                    {data.name} ({data.multiplier})
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Pokemon;
