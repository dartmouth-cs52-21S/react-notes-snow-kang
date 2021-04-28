# React-Notes

*Snow's Notes*: a cute way to take notes with animal toppers and lots and lots of pink :)

[deployed url](https://jovial-jennings-2f0b27.netlify.app/)

## What Worked Well
- The animal headers went a lot more smoothly than I had anticipated. After I drew the first animal header, the other ones were really easy to make by just slightly redrawing the facial expression and changing the ears, while keeping the body dimensions the same so that they fit on the note. 
- The user authentication went well too as Firebase's documentation was really clear.

## What Didn't
- I'm still working on getting better at design, and it took me a loooong time to find a layout that I liked. Because I used animal toppers, each note takes up a lot of space which may not be desirable. 
- I also noticed that when you click on the body to edit a note, it slightly expands in width. I spent hours trying to correct this before realizing I could make it a feature not a bug! Lol jk but now the editing window has a little more room for the scroll bar and it resizing also makes it more clear that it is being edited and not displayed
- Making the page responsive didn't make a lot of sense for this page as each note has a fixed x,y position and the animal toppers take a lot of space. Dragging would also be strange on mobile since the screen is so small already. I thought about making a completely separate mobile version but then chose not to as there is another short assignment due soon LOL

## Extra Credit
- To personalize the site, I drew animal toppers which users can select from when creating a note
- Added a sidebar to each note so that users can change a note's animal topper after it has been created. This changes the animal topper, the body color, the scarf color, and the title&text colors
- Each animal also has a crown that serves as a toggle button to collapse the text and just see the title and author
- Text body autoresizes to fit to text on display. While editing, text body expands and is resizable via the bottom right corner. Markdown is supported
- Google authentication with "created by" portion in each note. When you are not logged in, your posts are signed as anonymous
- Animations on sidebar icons and animal topper images
- When interacting with any note, it is assigned the highest z-index
- When all notes have been deleted, the z-index counter is reset and the first new note will have z-index 0 again

## Screenshots
![screen](https://user-images.githubusercontent.com/38738497/116329251-f0b20c00-a798-11eb-8fa6-02c9fcd415cf.PNG)

