module.exports = async function($) {
  $.page.title = 'Javascript web app development framework'

  return /* html */`
    <style>
      main {
        padding: 2rem 0;
        text-align: center;
        max-width: 100%;
      }
      .intro {
        margin-bottom: 3rem;
        max-width: 600px;
        margin: 0 auto;
        padding: 0 0.5rem 2rem;
      }
      .github {
        padding-top: 1.5rem;
      }
      .why {
        margin-bottom: 4rem;
        background: #115277;
        color: white;
        padding: 2rem 0 3rem;
      }
      .action {
        margin-bottom: 4rem;
      }
      h3 {
        margin-top: 2rem;
      }
    </style>
    <div class="intro">
      <img src="/img/waveorb-new.svg" alt="waveorb-logo" height="223" width="584">
      <h1>Create incredible applications</h1>
      <p>
        Javascript Web App Development Framework.
      </p>
      <div class="github">
        <img src="/img/github-badge.svg" alt="Github badge" width="32" height="32">
      </div>
      <div class="github-links">
        <a href="https://github.com/eldoy/waveorb" title="Source Code">Source Code</a>
        &nbsp; | &nbsp;
        <a href="https://github.com/eldoy/waveorb/issues" title="Report Issue">Report Issue</a>
      </div>
    </div>
    <div class="why">
      <h2>Why use Waveorb?</h2>
      <h3>Speed and availability</h3>
      <p>
        Go serverless with pre-built static HTML pages, fully Jamstack compliant.
      </p>
      <h3>Flexibility</h3>
      <p>
        Build web apps using HTML, Javascript and CSS, or just create a backend service.
      </p>
      <h3>Standard technologies</h3>
      <p>
        The simplicity of our technology stack makes sure your app never expires.
      </p>
      <h3>Ease of use</h3>
      <p>
        Integrate waveorb into your existing web site or build one from scratch.
      </p>
    </div>
    <div class="action">
      <h3>Ready to give it a try?</h3>
      <p>The platform is open source and totally free.</p>
      <p>
        <a class="button" href="/docs.html">Check out the docs</a>
      </p>
      <p class="learn-more">
        or learn more on <a href="/about.html">the about page</a>
      </p>
    </div>
    <div class="signature">
      Made in Oslo, Norway with passion by <a href="https://eldoy.com" title="Eldøy Projects home page">Eldøy Projects</a>
    </div>
  `
}
