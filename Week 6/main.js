//this is the function that retrieves the posts with the help of a fetch api
const getPosts = async () => {
  const data = await fetch("https://course-api.com/react-tours-project");
  const response = data.json();
  return response;
};

/* this function is creating the Tours element which is displayed as the header of the website 
when the user visits the website and the data is fetched */

const ourToursElement = () => {
  //creating a div where i will put the text "Our Tours" and the hr tag
  const headerDiv = document.createElement("div");
  //adding the class our-tours in order to reference the css styling for the header
  headerDiv.classList.add("our-tours");
  //creating the h1 tag for the actual text to be displayed in the header
  const innerHeaderText = document.createElement("h1");
  //creating a hr tag to underline the text
  const hrTag = document.createElement("hr");
  //setting the inner text content for the header
  innerHeaderText.innerText = "Our Tours";

  //finally appending both elements in the headerDiv
  headerDiv.append(innerHeaderText);
  headerDiv.append(hrTag);

  //returning the entire element
  return headerDiv;
};

//this function returns the element which will be displayed when there are no more posts available
const refreshElement = () => {
  //once again the same process, creating the div element to put all the other elements
  const refreshDiv = document.createElement("div");
  //referencing the css styling once again
  refreshDiv.classList.add("no-more-left");
  //the same goes here for the h1 tag
  const refreshNoToursLeft = document.createElement("h1");
  //setting the text
  refreshNoToursLeft.innerText = "No Tours Left";
  //creating the button to let the user to refresh
  const refreshButton = document.createElement("button");
  refreshButton.innerText = "Refresh";
  refreshButton.className = "refresh-tours";

  //appending the children in the parent div
  refreshDiv.appendChild(refreshNoToursLeft);
  refreshDiv.appendChild(refreshButton);

  //also adding the event listener to do the thing that it has to do on click
  refreshButton.addEventListener("click", () => {
    window.location.reload();
  });

  //returning the element
  return refreshDiv;
};
//this is root where i will put the other cards of the tours

const root = document.querySelector(".posts-area");
//calling the function to save the header of the page
const ourToursDiv = ourToursElement();
//counter to keep track of the number of card elements
let globalPostCounter = 0;

//this is the most important function of all, because it creates the card divs from the fetched data
const createPostCard = (id, name, info, image, price) => {
  /* getting the several parameters which are necessary to construct the whole tour card, because
  that's the data which was provided in the each object of the tour */

  /*exactly the same process as I've described above but a bit more complex, because there's 
  a lot more to do here */
  const cardDiv = document.createElement("div");
  cardDiv.id = id;
  cardDiv.className = "card";
  const postImgDiv = document.createElement("div");
  postImgDiv.className = "post-img";
  const imageEl = document.createElement("img");
  imageEl.setAttribute("draggable", false);
  imageEl.src = image;

  //appending the image element in the parent div, which means that the first child of the card is done
  postImgDiv.appendChild(imageEl);

  const titlePriceDiv = document.createElement("div");
  titlePriceDiv.className = "title-price";
  const innerDivTitle = document.createElement("div");
  const innerDivTitleH4 = document.createElement("h4");

  innerDivTitleH4.innerText = name;
  innerDivTitle.appendChild(innerDivTitleH4);

  const innerDivPrice = document.createElement("div");
  const innerDivPriceP = document.createElement("p");
  innerDivPriceP.innerText = `$${price}`;
  innerDivPrice.appendChild(innerDivPriceP);

  /* appending the two elements in the parent div (title of the tour and the price),
   which means that the second child of the card is done */
  titlePriceDiv.appendChild(innerDivTitle);
  titlePriceDiv.appendChild(innerDivPrice);

  const infoDiv = document.createElement("div");
  infoDiv.className = "info";
  const innerInfoP = document.createElement("p");
  innerInfoP.className = "info-txt";
  innerInfoP.innerText = info;
  const innerReadMoreP = document.createElement("p");
  innerReadMoreP.className = "read-more";
  innerReadMoreP.innerText = "...Read More";

  /* appending the two elements of the middle part of the tours card in order to display
  the info of of the given card and also give the user ability to read more of the text and also collapse
  it once again to shorten the length of the text.
  with this the third child of the card element is done.
  */
  infoDiv.appendChild(innerInfoP);
  infoDiv.appendChild(innerReadMoreP);

  /* 
  adding the onclick functionality to the "Read More" element 
  to let the user to expand and the collapse the text */
  innerReadMoreP.onclick = () => {
    innerInfoP.style.height = "fit-content";
    if (innerReadMoreP.innerText === "Collapse") {
      innerInfoP.style.height = "73px";
      innerReadMoreP.innerText = "...Read More";

    } else {
      innerReadMoreP.innerText = "Collapse";
    }
  };

  //I think the naming also explains what it is, basically the button to remove the post
  const notInterestedDiv = document.createElement("div");
  notInterestedDiv.className = "not-interested";
  const nIButton = document.createElement("button");
  nIButton.innerText = "Not interested";
  notInterestedDiv.appendChild(nIButton); //fourth child

  /* once the user clicks on the button, im decrementing the counter which was set to the number of posts
  that were fetched from the given link */

  nIButton.onclick = () => {
    cardDiv.remove();
    globalPostCounter--;
    /* im also checking if there are no more posts available, i shall display the refresh component and 
     let the user refresh the page */
    if (globalPostCounter === 0) {
      const ourToursDiv = document.querySelector(".our-tours");
      ourToursDiv.remove();
      const refreshEl = refreshElement();
      root.appendChild(refreshEl);
    }
  };

  //finally appending the finalized div elements to the card(parent) div
  cardDiv.appendChild(postImgDiv);
  cardDiv.appendChild(titlePriceDiv);
  cardDiv.appendChild(infoDiv);
  cardDiv.appendChild(notInterestedDiv);

  //returning the card
  return cardDiv;
};

//this function asynchronous to fetch the data straight away with the await keyword
//also it is supposed to handle the creation of the card elements and displaying it to the user
const loadContent = async () => {
  /* if the data is a bit late, i display the "Loading..." message and then when everything is loaded
  i just remove that text */

  const loadingText = document.createElement("h1");
  loadingText.innerText = "Loading...";
  root.appendChild(loadingText);

  //calling the getPosts function to retrieve the data
  const data = await getPosts();
  //when the data is there, I'm appending the header of the page for the tours component
  root.appendChild(ourToursDiv);
  /* assigning the length of the data array to the globalCounter that will keep track of the 
  number of posts in the user's view
  */
  globalPostCounter = data.length;
  /* for each post, im creating a new card element and saving it in the variable in order to then 
  append it into the root */

  data.forEach((post) => {
    const card = createPostCard(
      post.id,
      post.name,
      post.info,
      post.image,
      post.price
    );

    root.appendChild(card);
  });

  //removing the "Loading..." text from the view
  root.removeChild(loadingText);
};

//finally executing everything with the function "loadContent"
loadContent();
