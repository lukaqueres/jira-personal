const {ipcRenderer} = require('electron')

/*let backgleft = new Background(document.querySelector("#canleft"));
backgleft.generate([20, 30], 20);
// backgleft.draw();
backgleft.animate();
*/
let backgright = new Background(document.querySelector("#can-background"));
backgright.generate([20, 400], 1);
backgright.animate();