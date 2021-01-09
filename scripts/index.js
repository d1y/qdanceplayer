const { remote } = require('electron')
const fetch = require('node-fetch')
const createPlayer = require('web-audio-player')

// Track Details
const currentTrack = document.getElementById('currentTrackTitle')
const currentArtist = document.getElementById('currentTrackArtist')

// Play Button
const playButton = document.getElementById('playButton')
playButton.addEventListener('click', togglePlay)
var audio = null

// Volume
const volumeEnabled = document.getElementById('volumeEnabled')
const volumeMiddle = document.getElementById('volumeMiddle')
const volumeDisabled = document.getElementById('volumeDisabled')

volumeEnabled.addEventListener('click', toggleMute)
volumeMiddle.addEventListener('click', toggleMute)
volumeDisabled.addEventListener('click', toggleMute)

volumeControl = document.getElementById('volumeControl')
volumeControl.addEventListener('mouseover', showSlider)
volumeControl.addEventListener('mouseout', hideSlider)

volumeSlider = document.getElementById('volumeSlider')
volumeSliderData = document.getElementById('volumeData')
volumeSliderData.addEventListener('click', setVolume)
volumeSliderData.addEventListener('click', toggleIcon)

// Close Button
document.getElementById('close').addEventListener('click', closeWindow)

// Local Storage
volumeStorage = window.localStorage;

// Fetch On Air Data and repeat every 2 minutes
function fetchOnAir() {
    fetch('https://feed.q-dance.com/onair')
        .then(response => {
            // Response
            console.log('Response OK.')
            return response.json()
        })
        .then(data => {
            // Work with json here
            // console.log(data.TrackData.NowPlaying)
            return data.TrackData.NowPlaying
        })
        .then(NowPlaying => {
            // Assign data to html
            currentTrack.innerHTML = NowPlaying.Title
            currentArtist.innerHTML = NowPlaying.Artist
            document.getElementById('currentTrackImage').src = NowPlaying.CoverImage
        })
}

fetchOnAir()
setInterval(fetchOnAir, 120000)

// Close app with close button
function closeWindow () {
    var window = remote.BrowserWindow.getFocusedWindow()
    window.close()
}

// Toggle play
function togglePlay() {
    console.log('togglePlay')
    if (audio == null) {
        playButton.src = 'assets/images/pause.svg'
        audio = createAudio(volume = volumeSliderData.value)
    } else {
        playButton.src = 'assets/images/play.svg'
        audio.stop()
        audio = null
    }
}

// Create a player
function createAudio() {
    let audio = createPlayer('https://21233.live.streamtheworld.com/Q_DANCE.mp3')

    audio.on('load', () => {
        audio.play()
        audio.volume = volumeSliderData.value
        audio.node.connect(audio.context.destination)
    })

    return audio
}

// Toggle volume
function toggleMute() {
    console.log('toggleMute')
    if (audio.volume >= 0.1) {
        volumeEnabled.style.display = 'none'
        volumeMiddle.style.display = 'none'
        volumeDisabled.style.display = 'block'
        volumeSliderData.value = 0
        audio.volume = 0
    } else {
        volumeEnabled.style.display = 'block'
        volumeMiddle.style.display = 'none'
        volumeDisabled.style.display = 'none'
        volumeSliderData.value = 0.8
        audio.volume = 0.8
    }
}

// Slider
function setVolume() {
    console.log('toggleVolume')
    audio.volume = volumeSliderData.value
}

function showSlider() {
    volumeSlider.style.display = 'block'
}

function hideSlider() {
    volumeSlider.style.display = 'none'
}

function toggleIcon() {
    console.log('toggleIcon')
    if (volumeSliderData.value <= 0) {
        volumeEnabled.style.display = 'none'
        volumeMiddle.style.display = 'none'
        volumeDisabled.style.display = 'block'
    } else if (volumeSliderData.value <= 0.7) {
        volumeEnabled.style.display = 'none'
        volumeMiddle.style.display = 'block'
        volumeDisabled.style.display = 'none'
    } else {
        volumeEnabled.style.display = 'block'
        volumeMiddle.style.display = 'none'
        volumeDisabled.style.display = 'none'
    }
}