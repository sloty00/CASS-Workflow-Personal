function Footer() {
  return ( 
    <div className="row bg-neutral-100 p-4 text-neutral-100 dark:bg-neutral-700 w1-container w1-teal">
      <div className="col-lg">
        <p>© 2024 Copyright. </p><br></br>
        <p>
          <a className="text-neutral-100 dark:text-neutral-100" href="https://varto.cl/">
            Software creado por VARTO Programación
          </a>
        </p>
      </div>
      <div className="col-lg-2">
        <a href="https://jwt.io/introduction/">
          <img src="images/JWT.png" width="90%" alt="Logo de JWT" />
        </a>
      </div>
      <div className="col-lg-2">
        <a href="https://firebase.google.com/docs/auth?hl=es-419">
          <img src="images/badge_firebase.png" width="120%" alt="Logo de Firebase" />
        </a>
      </div>
    </div>
  )
}

export default Footer;