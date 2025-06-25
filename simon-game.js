let level = 1;
let level_list = [];
let user_index = 0;
let game_started = false;

// Animate blinking
function blink(colorClass) {
    return new Promise(resolve => {
        $(colorClass).animate({ opacity: 0.25 }, 200, function () {
            $(this).animate({ opacity: 1 }, 200, function () {
                setTimeout(resolve, 300);
            });
        });
    });
}

// Map number to color
function getColorClass(num) {
    switch (num) {
        case 1: return ".green";
        case 2: return ".red";
        case 3: return ".yellow";
        case 4: return ".blue";
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Start a level
async function startLevel() {
    game_started = true;
    user_index = 0;
    level_list = [];

    $("#start-btn").hide();
    $("h1").text("Level " + level);
    await delay(1000);

    for (let i = 0; i < level; i++) {
        level_list.push(Math.floor(Math.random() * 4) + 1);
    }

    console.log("Level List:", level_list);

    for (let num of level_list) {
        const color = getColorClass(num);
        await blink(color);
    }

    $("h1").text("Your Turn!");
}

// Start button click
$("#start-btn").click(function () {
    if (!game_started) {
        level = 1;
        startLevel();
        $("#start-btn").hide(); // Hide button after game starts
    }
});


// Handle color clicks
$(".green, .red, .yellow, .blue").click(function () {
    if (!game_started) return;

    const clickedColor = $(this).attr("class").split(" ")[0];
    const colorToNum = { green: 1, red: 2, yellow: 3, blue: 4 };
    const clickedNum = colorToNum[clickedColor];

    $(this).fadeOut(100).fadeIn(100);

    if (clickedNum === level_list[user_index]) {
        user_index++;
        if (user_index === level_list.length) {
            level++;
            setTimeout(startLevel, 1500);
        }
    } else {
        $("h1").text("Wrong! Game Over at Level " + level);
        game_started = false;
        level = 1;
        level_list = [];
        user_index = 0;
        $("#start-btn").fadeIn(); // Show button again
    }

});
