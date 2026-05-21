export function startScam() {
  const root = document.getElementById('scam-root')

  if (!root) return

  root.innerHTML = `
    <div class="windows-frame">

      <div class="titlebar">
        <div class="title-left">
          <div class="defender-icon"></div>
          <span>Windows Security</span>
        </div>

        <div class="window-buttons">
          <div>─</div>
          <div>□</div>
          <div>✕</div>
        </div>
      </div>

      <div class="main-area">

        <div class="sidebar">
          <div class="sidebar-item active">
            Virus & threat protection
          </div>

          <div class="sidebar-item">
            Account protection
          </div>

          <div class="sidebar-item">
            Firewall & network
          </div>

          <div class="sidebar-item">
            App & browser control
          </div>

          <div class="sidebar-item">
            Device security
          </div>
        </div>

        <div class="content">

          <div class="header">
            <div class="alert-circle">!</div>

            <div>
              <div class="headline">
                Threats found
              </div>

              <div class="subheadline">
                Microsoft Defender Antivirus found threats.
              </div>
            </div>
          </div>

          <div class="threat-box">

            <div class="threat-title">
              Trojan:Win32/CredentialStealer
            </div>

            <div class="threat-level">
              Severe
            </div>

            <div class="threat-description">
              This program is dangerous and executes commands from an attacker.
            </div>

          </div>

          <div class="scan-section">

            <div class="scan-header">
              Quick scan in progress...
            </div>

            <div class="progress-wrapper">
              <div id="progress-bar"></div>
            </div>

            <div id="scan-status">
              Scanning Downloads...
            </div>

          </div>

          <div class="cmd-box" id="cmd-box"></div>

          <div class="warning-banner">
            Your passwords and banking information may be at risk.
          </div>

          <button class="action-button" id="support-btn">
            Contact Microsoft Support
          </button>

          <div class="footer-note">
            Cybersecurity awareness simulation
          </div>

        </div>

      </div>

    </div>
  `

  startProgress()
  spawnPopups()
  startCmd()
  setupButton()
  playSound()
  fullscreen()
}

function startProgress() {
  const bar = document.getElementById('progress-bar')
  const status = document.getElementById('scan-status')

  if (!bar || !status) return

  const messages = [
    'Scanning Downloads...',
    'Checking Browser Cache...',
    'Analyzing Password Database...',
    'Inspecting Startup Programs...',
    'Threat detected...',
    'Registry access detected...',
  ]

  let progress = 0

  const interval = setInterval(() => {
    progress += Math.random() * 5

    if (progress >= 100) {
      progress = 100
      clearInterval(interval)
    }

    bar.style.width = progress + '%'

    status.textContent =
      messages[Math.floor(Math.random() * messages.length)]
  }, 500)
}

function spawnPopups() {
  const messages = [
    'Unauthorized access detected',
    'Banking credentials may be compromised',
    'Suspicious network activity found',
    'Windows Firewall disabled',
    'Remote connection attempt detected',
    'Your files may be at risk',
    'Browser passwords exposed',
    'Trojan spreading detected',
  ]

  setInterval(() => {
    createPopup(
      messages[Math.floor(Math.random() * messages.length)]
    )
  }, 1800)
}

function createPopup(message: string) {
  const popup = document.createElement('div')

  popup.className = 'fake-popup'

  popup.style.left =
    Math.random() * (window.innerWidth - 320) + 'px'

  popup.style.top =
    Math.random() * (window.innerHeight - 220) + 'px'

  popup.innerHTML = `
    <div class="popup-header">
      Windows Security Alert
    </div>

    <div class="popup-body">

      <div class="popup-icon">
        ⚠
      </div>

      <div class="popup-message">
        ${message}
      </div>

      <button class="popup-button">
        Scan Now
      </button>

    </div>
  `

  document.body.appendChild(popup)

  setTimeout(() => {
    popup.remove()
  }, 7000)
}

function startCmd() {
  const cmd = document.getElementById('cmd-box')

  if (!cmd) return

  const lines = [
    'Initializing Defender Engine...',
    'Checking System32...',
    'Trojan detected...',
    'Browser passwords accessed...',
    'Credential leak suspected...',
    'Security breach confirmed...',
    'Remote access attempt detected...',
  ]

  let index = 0

  const interval = setInterval(() => {
    if (index >= lines.length) {
      clearInterval(interval)
      return
    }

    const line = document.createElement('div')

    line.textContent = '> ' + lines[index]

    cmd.appendChild(line)

    cmd.scrollTop = cmd.scrollHeight

    index++
  }, 900)
}

function setupButton() {
  const button = document.getElementById('support-btn')

  if (!button) return

  button.addEventListener('click', () => {
    alert(
      'This is a cybersecurity awareness simulation.'
    )
  })
}

function playSound() {
  const audio = new Audio(
    'https://actions.google.com/sounds/v1/alarms/beep_short.ogg'
  )

  audio.loop = true

  audio.play().catch(() => { })
}

function fullscreen() {
  const enterFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen()
      }
    } catch (e) {
      console.log(e)
    }
  }

  enterFullscreen()

  document.addEventListener('click', enterFullscreen)

  document.addEventListener('keydown', enterFullscreen)

  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
      enterFullscreen()
    }
  })
}