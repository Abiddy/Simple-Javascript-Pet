$(function() {
  checkAndUpdatePetInfoInHtml();
  // When each button is clicked, call the common 'handleActions()' function
  $(".treat-button").click(() => handleActions(actions.treat));
  $(".play-button").click(() => handleActions(actions.play));
  $(".exercise-button").click(() => handleActions(actions.exercise));
  $(".bath-button").click(() => handleActions(actions.bath));
  $(".dance-button").click(() => handleActions(actions.dance, true)); // adding a second parameter to dance function to enable dance animation property
});

// "actions" object that contains all actions and their corresponding behavior properties
var actions = {
  treat: {
    weight: 5, // increase the weight when actions.treat is called
    happiness: 5, // increase happiness when actions.treat is called
    cleanliness: 0, // cleaninless is not effected when treat button is clicked

    // image , audio and comment when button is clicked
    image:
      "https://cdn.glitch.me/eea012da-4bac-436d-9c77-255ae2d30aee%2FFhappy.png?v=1636672058632",
    audio:
      "https://cdn.glitch.me/eea012da-4bac-436d-9c77-255ae2d30aee%2Fmixkit-fairy-cartoon-success-voice-344.wav?v=1636696357408",
    comment: "Yum!"
  },
  play: {
    weight: -1,
    happiness: 5,
    cleanliness: -20,

    image:
      "https://cdn.glitch.me/eea012da-4bac-436d-9c77-255ae2d30aee%2Ffplay.png?v=1636672058632",
    audio:
      "https://cdn.glitch.me/eea012da-4bac-436d-9c77-255ae2d30aee%2Fmixkit-player-boost-recharging-2040.wav?v=1636696613254",
    comment: "I'll get the ball"
  },
  exercise: {
    weight: -1,
    happiness: -2,
    cleanliness: 0,

    image:
      "https://cdn.glitch.me/eea012da-4bac-436d-9c77-255ae2d30aee%2Ff2.png?v=1636672509796",
    audio:
      "https://cdn.glitch.me/eea012da-4bac-436d-9c77-255ae2d30aee%2F60668__k1m218__sigh1.wav?v=1636787107624",
    comment: "I'm already tired"
  },
  bath: {
    weight: 0,
    happiness: -5,
    cleanliness: 20,

    image:
      "https://cdn.glitch.me/eea012da-4bac-436d-9c77-255ae2d30aee%2Fbubbles.png?v=1636862458040",
    audio:
      "https://cdn.glitch.me/eea012da-4bac-436d-9c77-255ae2d30aee%2Fmixkit-rubber-duck-squeak-1014.wav?v=1636697271056",
    comment: "Me don't like bath time"
  },
  dance: {
    weight: -3,
    happiness: 20,
    cleanliness: 0,

    image:
      "https://cdn.glitch.me/eea012da-4bac-436d-9c77-255ae2d30aee%2Fdance1.png?v=1636784854301",
    audio:
      "https://cdn.glitch.me/eea012da-4bac-436d-9c77-255ae2d30aee%2F45201__flick3r__dance-pt-1.wav?v=1636786542675",
    comment: "Let's party!!!"
  }
};

// Creates an audio element
var sound = document.createElement("audio");
sound.volume = 0.1;
sound.autoPlay = false;
sound.preLoad = true;
sound.controls = true;

// add a variable "pet_info" equal to a object with the name (string), weight (number), happiness (number), and cleanliness (number) of the pet
var pet_info = { name: "Cloudy", weight: 40, happiness: 50, cleanliness: 100 };

/**
 * re-usable function that gets called when the behavior buttons are clicked
 * givenAction (object)
 * shouldShake (boolean)
 */
function handleActions(givenAction, shouldShake) {
  // updates pet happiness
  pet_info.weight += givenAction.weight;
  // updates pet weight
  pet_info.happiness += givenAction.happiness;
  // updates pet cleanliness
  pet_info.cleanliness += givenAction.cleanliness;

  // changes the image link
  $(".pet-image").attr("src", givenAction.image);

  // changes the audio link
  sound.src = givenAction.audio;
  sound.play();

  // adds "show" class to display the notification
  $("#notification").addClass("show");
  // update the text for the notification
  $("#notification #desc").text(givenAction.comment);

  // disables all the buttons
  $(":button").prop("disabled", true);

  // adds "shake" class to pet-image when the shouldShake param is true.
  // (causes the image to shake when "Dance" button is clicked)
  if (shouldShake) {
    $(".pet-image").addClass("shake");
  }

  // setTimeout to reset image, notification, button properties after 2 seconds
  setTimeout(() => {
    // replaces image with base image
    $(".pet-image").attr(
      "src",
      "https://cdn.glitch.me/eea012da-4bac-436d-9c77-255ae2d30aee%2Fbase1.png?v=1636797368925"
    );
    // removes "show" class to hide notification
    $("#notification").removeClass("show");
    // enables all buttons
    $(":button").prop("disabled", false);

    // removes "shake" class when shouldShake is true
    if (shouldShake) {
      $(".pet-image").removeClass("shake");
    }
  }, 2000);

  checkAndUpdatePetInfoInHtml();
}

// This function groups the 2 functions below and calls them when and where it is declared
function checkAndUpdatePetInfoInHtml() {
  checkBehaviorBeforeUpdating();
  updatePetInfoInHtml();
}

// checking whether weight, happiness or cleanliness values are less than zero, if so, set them back to 0
function checkBehaviorBeforeUpdating() {
  if (pet_info.weight < 0) {
    pet_info.weight = 0;
  }
  if (pet_info.happiness < 0) {
    pet_info.happiness = 0;
  }
  if (pet_info.cleanliness < 0) {
    pet_info.cleanliness = 0;
  }
}

// updates HTML with the current values in your pet_info object
function updatePetInfoInHtml() {
  $(".name").text(pet_info["name"]);
  $(".weight").text(pet_info["weight"]);
  $(".happiness").text(pet_info["happiness"]);
  $(".cleanliness").text(pet_info["cleanliness"]);
}
