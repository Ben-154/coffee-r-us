import './HomePage.css';

function HomePage() {
  return (
    <main className="home-page">
      <section className="home-page__hero" aria-labelledby="home-title">
        <h1 id="home-title" className="home-page__title">
          Coffee R Us
        </h1>
        <p className="home-page__tagline">
          The go to store for your coffee needs
        </p>
      </section>
    </main>
  );
}

export default HomePage;
