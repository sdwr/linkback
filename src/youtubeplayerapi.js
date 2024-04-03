import store from "@/store";


let player;
let startTime = 0;
let endTime = -1;

let progress = 0;

//this should disable controls if video is a clip
let isClip = false;

let loopClip = false;
let startTimeChanged = false;
let endTimeChanged = false;

let isCheckingLoop = false;

//time in milliseconds to check for loop
const CHECK_INTERVAL = 250;

//external functions
export async function createPlayer(videoId, playerOptions) {
  resetPlayerVars();
  return new Promise((resolve, reject) => {
    try {
      player = new window.YT.Player(
        'iframe',
        {
          videoId,
          height: '100%',
          width: '100%',
          events: {
            onReady: (event) => {
              onPlayerReady(event);
              resolve(player);
            },
            onStateChange: onPlayerStateChange
          }
        }
      );
    } catch (error) {
      reject(error);
    }
  });
}

//the player starts at the beginning, then jumps to clip start time
//so mute it to avoid sound at the beginning
// temporary fix??
export function playPlayer() {
  player.mute();
  player.playVideo();
  setTimeout(() => {
    player.unMute();
  }, 500)
}

export function scrubPlayerTo(time) {
  player.seekTo(time);
  player.mute();
  player.playVideo();
  setTimeout(() => {
    player.unMute();
  }, 500)
}

//do the same thing to avoid audio hiccup
//in the future, respect the user's volume settings?
export function restartPlayer() {
  player.seekTo(startTime);
  player.mute();
  player.playVideo();
  setTimeout(() => {
    player.unMute();
  }, 500)
}

export function setIsLoop(loop) {
  loopClip = loop;
}

export function setLoopTimes(start, end) {
  startTime = start;
  endTime = end;
  startTimeChanged = true;
  endTimeChanged = true;
}

export function setStartTime(time) {
  startTime = time;
  startTimeChanged = true;
}

export function setEndTime(time) {
  endTime = time;
  endTimeChanged = true;
}

export function endPlayerLoop() {
  startTime = 0;
  endTime = -1;
}

//internal functions

function resetPlayerVars() {
  startTime = 0;
  endTime = -1;
  loopClip = false;
  startTimeChanged = false;
  endTimeChanged = false;
}

function onPlayerReady(event) {
  //empty function for now, onReady is handled in promise return right now
}

function onPlayerStateChange(event) {
  if (event.data === window.YT.PlayerState.PLAYING) {
    checkTimeAndLoop();
  }
}

function playerIsPlaying() {
  return player && (player.getPlayerState() === window.YT.PlayerState.PLAYING);
}

//restart loop if clip times have changed
function shouldRestartLoop() {
  if (!playerIsPlaying()) return false;
  if (!loopClip) return false;

  let currentTime = player.getCurrentTime();
  
  return (currentTime >= endTime || currentTime < startTime || startTimeChanged);
}

//extra functionality for making clips
// if the end time has changed, go to 5 seconds before the end time
//or the start time if that is closer
function shouldScrubPlayer() {
  if (!playerIsPlaying()) return false;
  if (!loopClip) return false;

  let newTime = endTime - 5;
  if (startTime > newTime) {
    newTime = startTime;
  }
  return newTime;
}

function calculateProgress() {
  let currentTime = player.getCurrentTime();
  let duration = endTime - startTime;
  let progress = (currentTime - startTime) / duration;
  progress = progress * 100;
  store.dispatch('saveClipProgress', progress);
}


//check if the player is playing and if the current time is outside the loop
//only continue looping if the player is playing
//if the player is paused, the loop will stop
//the loop should restart when the player is played again (in onPlayerStateChange)
function checkTimeAndLoop() {
  if(playerIsPlaying()) {
    calculateProgress();
    if(shouldRestartLoop()) {
      startTimeChanged = false;
      endTimeChanged = false;
      restartPlayer();
    } else if(endTimeChanged) {
      endTimeChanged = false;
      let scrubTime = shouldScrubPlayer();
      if(scrubTime) {
        scrubPlayerTo(scrubTime);
      }
    }
    setTimeout(checkTimeAndLoop, CHECK_INTERVAL);
  } 
}





