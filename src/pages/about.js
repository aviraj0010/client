import Header from '../components/Header'
import Footer from '../components/Footer'

const About = () => {
  return (
    <div>
      <Header />
      <main className="main-content">
        <h1>About Us</h1>
        <div className="about-text">
          <p>PneumoSeekers is a web application built with machine learning to detect pneumonia in patients.</p>
          <ul>
            <li>Provides a quick diagnosis of pneumonia.</li>
            <li>Offers a faster way to know about the disease within seconds.</li>
            <li>Saves time and helps in starting treatment immediately for severe diseases like pneumonia.</li>
            <li>Easy to use by anyone.</li>
          </ul>
          <p>The purpose of this application is to:</p>
          <ul>
            <li>Detect pneumonia disease easily using lung X-ray images.</li>
            <li>Save time and streamline the diagnosis process.</li>
          </ul>
        </div>
      </main>
      <Footer />
      <style jsx>{`
        .main-content {
          padding: 2rem;
          text-align: center;
        }
        .about-text {
          text-align: left;
          margin: 0 auto;
          max-width: 800px;
        }
        .about-text p {
          margin: 1rem 0;
        }
        .about-text ul {
          list-style-type: disc;
          padding-left: 1.5rem;
        }
        .about-text li {
          margin: 0.5rem 0;
        }
      `}</style>
    </div>
  )
}

export default About
