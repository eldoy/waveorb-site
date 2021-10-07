## SEO and marketing

To get as many users for your app as possible, it is important to consider search engine optimization and digital marketing.

### Get your site known

When your app is ready it's time to let people know about it. The first step is to register it with search engines:
* [Google search console](https://search.google.com/search-console/about)
* [Bing web master tools](https://www.bing.com/toolbox/webmaster)

It'll take a few days for your site to turn up in search results. Make sure your web site's titles and meta descriptions makes people click your link!

Here are some other tips:

* Write relevant content, don't draw people in just to disappoint them.
* Have other sites with authority link to your content.
* Use proper and valid markup with good internal linking, help search engines understand your site.
* Look into [structured content](https://developers.google.com/search/docs/guides/intro-structured-data) to expand your reach
* Social media and ads might serve you well if you produce content for it. Dead social media makes people think your site is dead.
* Don't change URLs that receives traffic without doing a redirect 301, or you will lose that traffic.
* Search the Internet for things like [SEO checklist](https://www.google.com/search?q=seo+checklist) for more tips.
* Add analytics to your site to know what's going.

### Speed and response times

Waveorb serves blazing fast pre-rendered HTML and assets with HTML caching (max-age, etags, 304), HTTP2, gzip compression served from NGINX, which is really fast. Web pages served this way appears almost instantly and won't let your users wait.

Pure speed isn't everything though, there are other things to consider as well.

### Markup, titles and meta

Proper HTML markup is important to tell search engines about the structure of your site. Titles and description should optimally be unique for each page of your app. In your page you can assign to the `$.page` object:

```js
module.exports = async function($) {
  $.page.title = 'Waveorb Title'
  $.page.description = 'The page meta description'
  return `Hello`
}
```

In your layout use the $.page object values:
```js
`<title>${$.page.title || 'Fallback if no title set'}</title>`
`<meta name="description" content="${$.page.description || 'Fallback description'}">`
```

The title and meta descripton are what users see when they do an organic search so it's very important that they are relevant so the user clicks your link. Organic search clicks are free and high quality.

### Sitemap

To add a sitemap to your site, add your URLs to `app/config/sitemap.yml`. To generate the sitemap, run the `waveorb sitemap` command, which will create a `sitemap.xml` file in your `app/assets` folder.

If the file exists, the `sitemap.xml` file will be copied to the `dist` folder every time you run `waveorb build`. It will be available in your browser at `/sitemap.xml` for your domain.
```yml
hostname: http://example.com
urls:
  - url: /
    changefreq: monthly
    priority: 0.9
  - url: /about
    changefreq: weekly
    priority: 0.5
```

Here is an example taken from a web site running Waveorb with translations:
```yml
hostname: https://speria.no
urls:
  - url: /
    lastmodfile: dist/index.html
    changefreq: always
    priority: 1.0
    links:
      - url: /en/
        lang: en
```
Adding a sitemap for all your translations as well as a modification date ensures that search engines will crawl your site effectively.

Waveorb is using the [sitemap library](https://github.com/ekalinin/sitemap.js) to generate the sitemap so all options from there can be used.

You could also just add a `sitemap.xml` to `app/assets` and it will be served upon deploy.

If you've added or changed some of your URLs, you can let search engines know about it, just add the URL of your sitemap at the end:

* [Google sitemap ping](https://www.google.com/webmasters/tools/ping?sitemap=https://example.com/sitemap.xml)
* [Bing sitemap ping](https://www.bing.com/ping?sitemap=http://www.example.com/sitemap.xml)

### Robots.txt

To help search engines navigate your site and find your sitemap, add a `robots.txt` file in assets root `app/assets`:
```md
Sitemap: https://www.domain.com/sitemap.xml
```

Read more about [robots.txt options here.](https://www.robotstxt.org/robotstxt.html)

<div class="nav">
  <div><a href="/doc/command-line">&larr; Command line</a></div>
  <div><a href="/doc/environment">Environment &rarr;</a></div>
</div>