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
  player = new window.YT.Player(
    'iframe',
    {
      videoId,
      height: '100%',
      width: '100%',
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange
      }
    }
  );

  return player;
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

//start muted to get around autoplay restrictions
function onPlayerReady(event) {
  event.target.mute();
  event.target.playVideo();
}

function onPlayerStateChange(event) {
  if (event.data === window.YT.PlayerState.PLAYING) {
    checkTimeAndLoop();
  }
}

function playerIsPlaying() {
  return player && player.getPlayerState() === window.YT.PlayerState.PLAYING;
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
      player.seekTo(startTime);
    }
    setTimeout(checkTimeAndLoop, CHECK_INTERVAL);
  } 
}





