import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyDJhb1-nfQbRodkuhZpgDjSXN4yQVA7tLM",
    authDomain: "cards-project-20328.firebaseapp.com",
    projectId: "cards-project-20328",
    storageBucket: "cards-project-20328.appspot.com",
    messagingSenderId: "897567306120",
    appId: "1:897567306120:web:03dffd8bb7246541b24a3d",
    measurementId: "G-52L6ZHNZR2"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// get ref to db
const db = getDatabase(app);

const currentCard = {};
const listOfCards = [];
export{listOfCards};


const newCardBtn = document.getElementById('newCardBtn');

const yourCards = document.getElementById('youCardsBtn');

const container = document.querySelector(".container");

const new_task_body = document.querySelector(".newtask");


alert("hi");

newCardBtn.addEventListener('click', () =>{
    new_task_body.classList.remove('body2');
    new_task_body.classList.add('newtask');
});


 function attachEventListeners() {
  const submitButton = document.getElementById('submit');
  if (submitButton) {
      submitButton.addEventListener('click',async (e) => {
        e.preventDefault();

        const titleElement = document.getElementById('title');
        const descriptionElement = document.getElementById('description');
        const title = titleElement.value;
        const description = descriptionElement.value;
        const card = { title, description };
    
    
        try {
            await set(ref(db, 'user/' + title), card);
            
            // Provide feedback and update UI after successful operation
            alert("Data successfully saved to Firebase!");
    
            // Reset input fields
            titleElement.value = '';
            descriptionElement.value = '';
    
            listOfCards.push(card);
            // body_to_display_all_cards();
        } catch (error) {
            console.error("Failed to save data:", error);
            alert("Failed to save data. Please try again.");
        }  




          console.log('Submit button clicked');
      });
  }
}
export {attachEventListeners};



// Function to fetch data
async function fetchData() {
    const dbRef = ref(getDatabase());
    try {
      const snapshot = await get(child(dbRef, 'user/'));
      if (snapshot.exists()) {
        console.log(snapshot.val());
        let cards = snapshot.val();
        Object.keys(cards).forEach((key)=>{
          const card = {
              title: cards[key].title, 
              description: cards[key].description
          }
          listOfCards.push(card);
        });
  
        
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error("Failed to retrieve data", error);
    }
  }
  
  // Fetch data when the webpage is loaded
  document.addEventListener('DOMContentLoaded', fetchData);