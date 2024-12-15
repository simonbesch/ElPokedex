import "../styles/footer.scss";

const Footer = () => {
  return (
    <section className="footer" id="credits">
      <div className="ElPokedex">
        <h1>"El Pokedex"</h1>
        <a href="https://github.com/simonbesch/ElPokedex" target="_blanck">
          <img
            src="https://img.icons8.com/?size=100&id=52539&format=png&color=000000"
            alt=""
          />
        </a>
      </div>
      <p>By Symon 😎</p>
      <div className="MesInsfos">
        <a href="https://symon.xyz/" target="_blanck">
          <img
            src="https://img.icons8.com/?size=100&id=57067&format=png&color=000000"
            alt=""
          />
        </a>
        <a href="https://github.com/simonbesch/" target="_blanck">
          <img
            src="https://img.icons8.com/?size=100&id=52539&format=png&color=000000"
            alt=""
          />
        </a>
        <a href="https://www.linkedin.com/in/simon-bescheron/" target="_blanck">
          <img
            src="https://img.icons8.com/?size=100&id=8808&format=png&color=000000"
            alt=""
          />
        </a>
        <a href="https://dicenjdr.com/" target="_blanck">
          <img
            src="https://img.icons8.com/?size=100&id=52520&format=png&color=000000"
            alt=""
          />
        </a>
        <a href="https://putyourping.com/" target="_blanck">
          <img
            src="https://img.icons8.com/?size=100&id=7880&format=png&color=000000"
            alt=""
          />
        </a>
      </div>
      <p>
        Merci à <a href="https://tyradex.vercel.app/">Tyradex</a> pour leur
        incroyable API ❤️
      </p>
    </section>
  );
};

export default Footer;
