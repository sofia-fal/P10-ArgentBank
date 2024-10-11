import React from 'react';
import Banner from '../components/banner';
import Feature from '../components/feature';
import FeatureData from '../datas/features.json';
import '../style/home.css';
import '../style/sr.css';

function Home() {
  return (
    <main>
      <Banner />
      <section className="features">
        <h2 className="sr-only">Features</h2>
        {FeatureData.map((data) => (
          <Feature
            key={data.id}
            icon={data.icon}
            altText={data.altText}
            title={data.title}
            content={data.content}
          />
        ))}
      </section>
    </main>
  );
}

export default Home;
