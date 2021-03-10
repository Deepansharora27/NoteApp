//This basically makes sure that we are not running certain eventListeners() more than once.
window.firstOpen = false;

const fetchNotes = () => {
  //Fetching our Notes from the Database.
  //Making API calls to our FireBase Database :
  //First Of all removing the Overall content from the Page at Line Number 8:
  document.querySelector(".holder").innerHTML = "";
  //Now,here at Line No.6 we are sending a request to our background page:
  chrome.runtime.sendMessage(
    //Sending this as a command to our Background Page :
    { command: "fetchNotes", data: { notes: "" } },
    (response) => {
      //Response with the Notes will be received here from the database :
      //Essentially,listen for the response here :
      var notes = response.data; //Getting the Data Object inside of our response variable(Showing an Error Here.)
      var nav = "<ul>";
      //Window Object where all of our notes will be stored temporarily:
      window.notes = [];
      //Iterating through our Response Notes Object :
      for (const noteId in notes) {
        //Appending each of the Individual List Items to the Nav for Displaying the Notes:
        //Firstly,encapsulated under a string
        //Then,inside of this ListItem we will be going to add the Information for this Note:
        nav +=
          '<li data-noteId="' +
          noteId +
          '">' +
          notes[noteId].icon +
          "" +
          notes[noteId].title +
          "</li>";
        //We are storing inside of this window object because,we want to access this variable even outside the scope of this function.
        window.notes[noteId] = notes[noteId];
      }
      nav += "</ul>";
      document.querySelector(".holder").innerHTML = nav;

      //Why is this function being called ? What is it's requirement?
      //It is a Event Listener
      //So,any click to each of these items,will be heard by the background page.
      ListenForClicks();
    }
  );
};

//Invoking the Function here Now :
fetchNotes();

const clearNote = () => {
  //Clearing the Note Variables and Action
};

const changePage = (noteID) => {
  //Traversing to a New page within the Application
};

function ListenForClicks() {
  //Listening for any type of click events:
  //This is basically a snippet for all types of event listeners :

  //Array of all the ListItems that we are having on the Page :
  //Based on the Concept of Descendant Selectors:
  var lis = document.querySelectorAll(".holder ul li ");
  for (var i = 0; i < lis.length; ++i) {
    lis[i].addEventListener("click", () => {
      //Anytime the List/Note item is clicked , the Code Flow will be forwarded here :
      changePage(this.dataset.noteid);
    });
  }

  if (window.firstOpen == false) {
    window.firstOpen = true;
    try {
      //Know what the Line Of Code is doing at Line Number 63(TODO):
      //It is essentially retaining the current note that we have selected:
      var openNote = localStorage.getItem("_notes_lastOpenPage");
      if (openNote != "") {
        //Implement this Line Of Code (Still Understand,what all is going inside of here:)
        document.querySelector('ul li[data-noteId="' + openNote + '"]').click();
      }
    } catch (err) {
      console.log(err);
    }
  }
}

const savePage = (id, title, icon, body) => {
  //Saving the NotePage to our Database:
};
