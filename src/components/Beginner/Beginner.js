import styles from './Beginner.module.scss';

const Begginer =  () => {
    return (
        <div className={styles.grid} >
          <a href="#" className={styles.card} target="_blank" rel="noopener noreferrer">
            <h2>WordPress <span>-&gt;</span></h2>
            <p>Leading and highly customizable content management system for websites and blogs.</p>
          </a>

          <a href="#" className={styles.card} target="_blank" rel="noopener noreferrer">
            <h2>WooCommerce <span>-&gt;</span></h2>
            <p>WordPress-integrated e-commerce plugin for easy online store&nbsp;setup and management.</p>
          </a>

          <a href="#" className={styles.card} target="_blank" rel="noopener noreferrer">
            <h2>Gutenberg <span>-&gt;</span></h2>
            <p>Explore the transformative world of the WordPress editor that revolutionizes content&nbsp;creation.</p>
          </a>

          <a href="#" className={styles.card} target="_blank" rel="noopener noreferrer">
            <h2>Plugins <span>-&gt;</span></h2>
            <p>Plugins are used to enhance the overall performance and appearance of your&nbsp;website.</p>
          </a>
        </div>
    )
}

export default Begginer;