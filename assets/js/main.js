
/* javascript */
import {faker} from '@faker-js/faker';
//var faker = require('node_modules/faker/lib');

var randomName = faker.person.firstName(); // Generates a random name
var randomEmail = faker.internet.email(); // Generates a random email
var randomProduct = faker.commerce.productName(); // Generates a random product name
var randomCompany = faker.company.name(); // Will give back a random company name
var randomCard = faker.helpers.mustache() // It's output is a random contact card containing many properties

// // Iteration
// // This code runs twenty times
// // It produces each time different data
console.log(randomName); // Outputs a random name
console.log(randomEmail); // Outputs a random email
console.log(randomProduct); // Outputs the random product name generated
console.log(randomCompany); // Produces a random company name
console.log(randomCard); // Gives back a random card
console.log(faker.date.past()); // Generates a random past date
var userInteractions = [];
var categoryInteractionCounts = {};
var postDict = {};
const fakeName = faker.person.fullName();
function handleInteraction(postId, action, category) {
    const interaction = {
        postId,
        action,
        category,
        timestamp: new Date().toLocaleString()
    };

    // Log the interaction to the console (you can modify this to store interactions)
    console.log(`User performed ${action} on post ${postId} at ${interaction.timestamp}`);

    // Store the interaction in the userInteractions array
    userInteractions.push(interaction);

    if (category in categoryInteractionCounts) {
        categoryInteractionCounts[category]++;
    } else {
        categoryInteractionCounts[category] = 1;
    }

    // Update UI or perform other actions as needed
    
}

function updateInteractionUI(topCategory) {
    const interactionsContainer = document.getElementById('recommended-info-container');
    interactionsContainer.innerHTML = '<h2>User Info</h2>';

    // Display each interaction in the UI
    const interactionElement = document.createElement('div');
    interactionElement.textContent = `Your most recommended category is ${topCategory}`;
    interactionsContainer.appendChild(interactionElement);
}

// Example JavaScript functions to handle button clicks
function likePost(postId) {
    const likeCountElement = document.querySelector(`#app .post:nth-child(${postId}) .like-count`);
    let likeCount = parseInt(likeCountElement.textContent) || 0;
    likeCount++;
    likeCountElement.textContent = likeCount;

    // Log the like interaction
    handleInteraction(postId, 'like', postDict[postId]);
}

function commentPost(postId) {
    // Add your logic for handling comments
    console.log(`Commenting on post ${postId}`);

    // Log the comment interaction
    handleInteraction(postId, 'comment', postDict[postId]);
}

function sharePost(postId) {
    // Add your logic for handling shares
    console.log(`Sharing post ${postId}`);

    // Log the share interaction
    handleInteraction(postId, 'share', postDict[postId]);
}

// function showInteractions(){
//     for (let i = 0; i < userInteractions.length; i++){
//         console.log("si", userInteractions[i]);
//         updateInteractionUI();
//     }
// }

function createPosts(n, category) {
    const postsContainer = document.getElementById('app');

    console.log(createPosts.arguments.length);

    postCategory = category || faker.animal.type();

    for (let i = 0; i < n; i++) {
        let userName = faker.name.findName();

        const postElement = document.createElement('div');
        postElement.classList.add('post');
        let postCategory = category || faker.animal.type();
        const userHeader = document.createElement('div');
        userHeader.classList.add('post-header');
        userHeader.innerHTML = 
        // <img src="assets/img/9131529.png" class="user-avatar">
        `
            <div class="user-info">
                <div class="user-name">${userName}</div>
                <div class="post-time">Just now</div>
            </div>
        `;

        const postContent = document.createElement('div');
        postContent.classList.add('post-content');
        postContent.innerHTML = `
        <img src='http://loremflickr.com/570/521/${postCategory}'>
        <p>${faker.lorem.sentences(2)}</p>`;

        //faker.image.urlLoremFlickr({ category: 'animals' })

        const postButtons = document.createElement('div');
        postButtons.classList.add('post-buttons');
        postButtons.innerHTML = `
            <div class="button" onclick="likePost(${i + 1})">
                <span class="icon">👍</span>
                <span class="like-count">0</span>
            </div>
            <div class="button" onclick="commentPost(${i + 1})">
                <span class="icon">💬</span> Comment
            </div>
            <div class="button" onclick="sharePost(${i + 1})">
                <span class="icon">🔄</span> Share
            </div>
        `;

        postElement.appendChild(userHeader);
        postElement.appendChild(postContent);
        postElement.appendChild(postButtons);
        postsContainer.appendChild(postElement);
        postDict[i+1] = postCategory;
    }
}


// Function to calculate category interaction counts
function calculateCategoryCounts() {
    return categoryInteractionCounts;
}
        // Function to recommend new posts based on category interaction counts
function recommendPosts() {
    if(userInteractions.length == 0){
        createPosts(10);
    }
    
    else{
        const postsContainer = document.getElementById('app');
        postsContainer.innerHTML = '';
        const categoryCounts = calculateCategoryCounts();

        console.log(categoryCounts);

        // Sort categories by interaction count in descending order
        const sortedCategories = Object.keys(categoryCounts).sort((a, b) => categoryCounts[b] - categoryCounts[a]);

        // Select the top category
        const topCategory = sortedCategories[0];
        console.log(`Recommended posts based on top category '${topCategory}':`);
        if (sortedCategories.length > 1){

            const secondCategory = sortedCategories[1];
            console.log(`Recommended posts based on second category '${secondCategory}':`);

        } 

        console.log(sortedCategories);

        // Use the top category to recommend new posts (you can customize this part)
        console.log(`Recommended posts based on top category '${topCategory}':`);
        // for (let i = 0; i < recommendedPosts.length; i++) {
        //     const postCategory = postDict[i + 1];
        //     if (postCategory === topCategory) {
        //         console.log(`- Post ${i + 1}: ${postCategory}`);
        //     }
        // }

        let numRecommended = Math.floor((categoryCounts[topCategory] / userInteractions.length) * 10);
        console.log(numRecommended, 'numRecommended');
        console.log(userInteractions.length, 'userintlen');
        console.log(categoryCounts[topCategory], 'count');
        

        if(numRecommended < 7){
            createPosts(numRecommended, topCategory);
            createPosts(10 - numRecommended);
        }
        else{
            createPosts(7, topCategory);
            createPosts(3);
        }

        updateInteractionUI(topCategory);
    }
    
}