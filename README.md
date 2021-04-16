# Frontend Starterpark - Short Assignment

Created a simple webpack setup to deploy on Netlify. We started from scratch and went step by step through the process of installing all the libraries and dependencies needed, telling our config file how to handle each file . Through doing this assingment, I learned:
- Webpack bundles up all our dependencies that we listed in package.json. It understands JS but needs plugins to understand other languages like HTML, CSS
- Plugins work at the bundle level and differ from Webpack loaders, which work at the file level to transform data (e.g. sass loader compiles SCSS to CSS)
- Babel is a loader that transforms ES6+ JS to ES5 JS for browser compatibility 
- Npm is node's package manager that helps us download these dependencies
- Linters parse code for syntax and styling
- Windows by default uses CRLF for new lines whereas many other OS's use LF, which is what our linter wants us to use; we can set this in VSCode
- Netlify allows us to host single page apps, whereas GitHub allows us just to host static files

[deployed url](https://optimistic-bhaskara-f3f574.netlify.app/)

## What Worked Well
It's really cool learning about all these tools that I've heard others talk about but never understood. I appreciated the analogies as they help me out a lot (webpack being the grocery cart, package json being the shopping list, etc). The step by step walk through nature of this was really nice and I like how comprehensive the directions were. 

## What Didn't
I somehow missed installing one dependency and spent a lot of time trying to fix a build error the wrong way (I kept trying to rewrite the build command when all I had to do was run an npm install). There was a ton of new terminology that I had to read through multiple times over for it to click; writing the summary bullet point list above helped me sort through it all and see how it ties together; lots of learning!! I'm looking forward to the assignment where we build an SPA where hopefully even more concepts will clear up and make more sense :) 

## Extra Credit

## Screenshots
