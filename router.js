const urlPageTitle = "JS Single Page Application Router";
import { listOfCards } from "./index.js";
import {attachEventListeners} from "./index.js"
const yourCards = document.getElementById('youCardsBtn');

const new_task_body = document.querySelector(".newtask");

const saveBtn = document.getElementById("submit");

const routes = {
    "/": {
        template: "./home.html",
        title: "Home | " + urlPageTitle,
        description: "This is the home page",
    },
    "/home": {
        template: "./home.html",
        title: "Home | " + urlPageTitle,
        description: "This is the home page",
    },
    "/allcards": {
        template: "./allcards.html",
        title: "All Cards | " + urlPageTitle,
        description: "This is the all cards page",
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('new_task_body');

    const onNavigate = (pathname) => {
        const route = routes[pathname];
        if (route) {
            window.history.pushState({}, pathname, window.location.origin + pathname);
            fetch(route.template)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then(html => {
                    app.innerHTML = html;
                    // Check if the pathname is '/allcards' and trigger dynamic content generation
                    if (pathname === '/allcards') {
                        generateDynamicContent(); // This function will handle dynamic content generation
                    }
                    attachEventListeners(); // Reattach event listeners after loading content
                })
                .catch(error => {
                    console.error('Error loading the page: ', error);
                    app.innerHTML = 'Page not found.';
                });
        } else {
            app.innerHTML = 'Page not found.';
        }
    };

    document.body.addEventListener('click', e => {
        if (e.target.matches('.route')) {
            e.preventDefault();
            const path = e.target.getAttribute('href');
            onNavigate(path);
        }
    });

    window.onpopstate = () => {
        const path = window.location.pathname;
        onNavigate(path in routes ? path : "/");
    };

    const currentPath = window.location.pathname;
    onNavigate(currentPath in routes ? currentPath : "/");
});

const urlLocationHandler = async () => {
    let location = window.location.pathname; // Correctly use let for mutable variable
    if (location.length === 0) {
        location = "/";
    }
    const route = routes[location];
    if (route) {
        const html = await fetch(route.template).then((response) => response.text());
        document.getElementById("container").innerHTML = html; // Update the correct element ID based on your layout
    } else {
        document.getElementById("new_task_body").innerHTML = 'Page not found.';
    }
};

const urlRoute = (event) => {
    event = event || window.event; // get window.event if event argument not provided
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    urlLocationHandler();
};

// add an event listener to the window that watches for url changes
window.onpopstate = urlLocationHandler;
// call the urlLocationHandler function to handle the initial url
window.route = urlRoute;
// call the urlLocationHandler function to handle the initial url
urlLocationHandler();




function generateDynamicContent() {
    new_task_body.innerHTML = ''; // Clear existing content
    new_task_body.classList.remove('newtask');
    new_task_body.classList.add('body2');
 
        listOfCards.forEach((task) => {
          
                const task_div = document.createElement('div');
                task_div.classList.add("card-div");
    
                const header = document.createElement('h2');
                header.classList.add("headline");
                header.textContent = task.title;
    
                const bodyP = document.createElement('p');
                bodyP.textContent = task.description;
                bodyP.classList.add("card-p");
    
                // Append the elements properly
                task_div.appendChild(header);
                task_div.appendChild(document.createElement('hr')); // Add the horizontal line
                task_div.appendChild(bodyP);
    
                new_task_body.appendChild(task_div);
              
        });

}
