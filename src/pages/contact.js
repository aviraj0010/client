import Header from '../components/Header'
import Footer from '../components/Footer'

const Contact = () => {
  return (
    <div>
      <Header />
      <main className="main-content">
        <h1>Contact Us</h1>
        <div className="contact-info">
          <div className="contact-item">
            <p><strong>Avirajsinh:</strong> avirajsinh0010@gmail.com</p>
          </div>
          <div className="contact-item">
            <p><strong>Priyanshu:</strong> priyanshubhavsar94@gmail.com</p>
          </div>
        </div>
      </main>
      <Footer />
      <style jsx>{`
        .main-content {
          padding: 2rem;
          text-align: center;
        }
        .contact-info {
          display: inline-block;
          text-align: left;
          margin-top: 1rem;
          color: #333;
        }
        .contact-item {
          margin-bottom: 1rem;
          color: '#000'
        }
        .contact-item p {
          background-color: #f9f9f9;
          padding: 1rem;
          border-radius: 5px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  )
}

export default Contact
