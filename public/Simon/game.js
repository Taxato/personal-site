"use strict";

const btnColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let randChosenColor;
let userChosenColor;
let userClickedPattern = [];
let level = 0;
let gameStarted = false;

const playSound = function (name) {
    new Audio(`./sounds/${name}.mp3`).play();
};

const animatePress = function (currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
};

const updateLevel = function () {
    $("h1").text(`Level ${level}`);
};

const failGame = function () {
    console.log("YOU LOST");
    gamePattern = [];
    userClickedPattern = [];
    gameStarted = false;
    $("h1").text("You Lost!");
    setTimeout(() => {
        $("h1").text("Press A Key to Start");
    }, 1000);
};

const nextSequence = function () {
    level++;
    updateLevel();
    const randNum = Math.floor(Math.random() * 4);
    randChosenColor = btnColors[randNum];
    gamePattern.push(randChosenColor);

    $("#" + randChosenColor)
        .fadeOut(100)
        .fadeIn(100);

    playSound(randChosenColor);
    userClickedPattern = [];
};

$(document).keydown(function (e) {
    if (!e.key == "a" || gameStarted) return;

    gameStarted = true;
    level = 0;
    // updateLevel();
    nextSequence();
});

$(".btn").click(function (e) {
    if (!gameStarted) return;

    userChosenColor = e.target.id;
    playSound(userChosenColor);
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);

    checkAnswer();
    // console.log(gamePattern);
    // console.log(userClickedPattern);
});

const checkAnswer = function () {
    const seqIndex = userClickedPattern.length - 1;
    if (userChosenColor !== gamePattern[seqIndex]) {
        failGame();
        return;
    }

    if (userClickedPattern.length == gamePattern.length) {
        setTimeout(() => {
            nextSequence();
        }, 1000);
    }
};
