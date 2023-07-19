if ( document.getElementById('toggle-dark-mode') ) {
  document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
    const isDarkMode = await window.darkMode.toggle()
    document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light'
  })
}

if ( document.getElementById('reset-to-system') ) {
  document.getElementById('reset-to-system').addEventListener('click', async () => {
    await window.darkMode.system()
    document.getElementById('theme-source').innerHTML = 'System'
  })
}

const d = new Date();
let hour = d.getHours();
if ( document.querySelector("#say-hello") ) {
  document.querySelector("#say-hello").textContent = ( ( hour < 6 || hour > 18 ) ? "Good Night" : (( hour < 12 )? "Good Morning" : "Good day"))
}