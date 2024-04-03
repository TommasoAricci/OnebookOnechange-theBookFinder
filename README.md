
[VISIT THE WEBPAGE](https://tommasoaricci-bookfinder.netlify.app/)

***

# OnebookOnechange

OnebookOnechange is a **bookfinder** that allows people to discover titles by genre using the OpenLibrary API. <br>
The goal of this initiative is to cultivate a passion for reading among individuals, spreading culture and new perspectives.

## The design

The design I strcutured defines my **minimal** way to create webpages.

- I chose to use a library background image to create the **intimate feeling** that a library can provide.<br>
- In the middle of the webpage there is a **textbox** (Google style) where a user can type a genre (such as *horror*, *fantasy*, *fiction*, etc.) <br>
- The message I wrote is a sort of **slogan** that encourage people to start reading.
- Finally, the logo is right at the top as a header and the copyright text at the bottom.

<img src="https://i.postimg.cc/PJVmvT7j/Screenshot-2024-04-01-182246.png" width="500">

## How it works

Its operation is very easy.

Clicking on the submit button the browser send the infos to the server. When all the data files have been reached, the user can see the **list of books** of the genre chosen previously. <br>

<img src="https://i.postimg.cc/KjCgTgwD/Screenshot-2024-04-01-184857.png" width="500">

Through the button at the right of the titles the user can read the full **description** of that book.

<img src="https://i.postimg.cc/8PmBfZwy/Screenshot-2024-04-01-184926.png" width="500">

There are two main API requests:

- https://openlibrary.org/subjects/${choiceValue}.json
- https://openlibrary.org${key}.json

The first one tries to contact the API getting the infos about the genre that the user typed before (choiceValue).
The second call tries to reach another API trying to get the key of the single book selected, where there is the description text.

***

## License

[MIT](https://choosealicense.com/licenses/mit/)

