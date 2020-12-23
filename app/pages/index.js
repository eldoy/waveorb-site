module.exports = async function($) {
  $.page.title = 'Javascript Jamstack web app development framework'
  return /* html */`
    <script>document.body.classList.add('home')</script>
    <style>
      div.intro,
      div.action,
      div.why {
        padding: 4rem 10px;
        text-align: center;
      }
      img.waveorb-logo {
        width: 341px;
        height: 174px;
      }
      h1.tagline {
        text-shadow: 2px 1px rgba(0, 0, 0, 0.2);
      }
      div.github {
        padding: 2rem 0 1.5rem;
      }
      div.github-links a {
        margin: 0 0.5rem;
      }
      div.why {
        background-color: rgb(17, 128, 128);
        color: white;
      }
      div.action {
        padding-bottom: 3rem;
      }
      div.signature {
        padding: 2rem 0;
        font-size: 80%;
        text-align: center;
        color: #666;
      }
      a.cta {
        margin-top: 0.8rem;
        display: inline-block;
        width: 90%;
        max-width: 200px;
        padding: 15px 5px;
        background-color: rgb(17, 128, 128);
        color: white;
        text-decoration: none;
      }
      a.cta:hover,
      a.cta:active {
        background-color: rgb(22, 153, 150);
      }
      .learn-more {
        padding-top: 2rem;
        font-size: 95%;
      }
    </style>
    <div class="intro">
      <img class="waveorb-logo" src="/img/waveorb-logo-full.svg" alt="waveorb-logo">
      <h1 class="tagline">Create incredible applications</h1>
      <p>
        Javascript Jamstack web app development framework.
      </p>
      <div class="github">
        <img src="/img/github-badge.svg" alt="Github badge">
      </div>
      <div class="github-links">
        <a href="https://github.com/eldoy/waveorb" title="Source Code">Source Code</a>
        <a href="https://github.com/eldoy/waveorb/issues" title="Report Issue">Report Issue</a>
      </div>
      </p>
    </div>
    <div class="why">
      <h1>Why use Waveorb?</h1>
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
      <h2>Ready to give it a try?</h2>
      <p>The platform is open source and totally free.</p>
      <div>
        <a class="cta" href="/docs.html">Check out the docs</a>
      </div>
      <div class="learn-more">
        or learn more on <a href="/about.html">the about page</a>
      </div>
    </div>
    <div class="signature">
      Made in Norway with passion by <a href="https://eldoy.com" title="Eldøy Projects home page">Eldøy Projects</a>
    </div>
  `
}
