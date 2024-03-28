let player;
let startTime = 0;
let endTime = -1;

//this should disable controls if video is a clip
let isClip = false;

let loopClip = false;
let clipTimesChanged = false;

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
  clipTimesChanged = true;
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
  clipTimesChanged = false;
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
  return (currentTime >= endTime || currentTime < startTime || clipTimesChanged);
}


//check if the player is playing and if the current time is outside the loop
//only continue looping if the player is playing
//if the player is paused, the loop will stop
//the loop should restart when the player is played again (in onPlayerStateChange)
function checkTimeAndLoop() {
  if(playerIsPlaying()) {
    if(shouldRestartLoop()) {
      clipTimesChanged = false;
      restartPlayer();
    }
    setTimeout(checkTimeAndLoop, CHECK_INTERVAL);
  } 
}





