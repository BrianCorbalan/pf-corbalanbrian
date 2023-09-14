const btnRegister = document.getElementById("btn__register")
const formRegister = document.getElementById("user__register")
const formLogin = document.getElementById("user__login")
const btnLogin = document.getElementById("btn__logearse")

let usuarios = JSON.parse(localStorage.getItem("usuarios"))


class newUser{
    constructor(user, pass){
        this.id = usuarios.length + 1
        this.user = user
        this.pass = pass
        this.admin = false
    }
}

btnLogin.addEventListener("click", (e) => {
    e.preventDefault()

    const user = formLogin.children[0].children[1].value
    const pass = formLogin.children[1].children[1].value

    validarYlogear(user, pass)
})

const validarYlogear = (user, pass) => {
    const userExiste = usuarios.find((usuario) => usuario?.user === user);
  
    if (userExiste === undefined || userExiste.pass !== pass) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error en el usuario o contraseña',
        confirmButtonColor: '#bb0000',
      });
    } else {
      Swal.fire({        
        
        text: `Bienvenido ${user}`,
        confirmButtonColor: '#bb0000',
      });
  
      let usuario = {
        user: userExiste.user,
        pass: userExiste.pass,
        admin: userExiste.admin,
      };
  
      sessionStorage.setItem('usuario', JSON.stringify(usuario));
  
      
      setTimeout(() => {
        location.href = '../index.html';
      }, 2000);
    }
  };
  


btnRegister.addEventListener("click", (e) => {
    e.preventDefault()

    const user = formRegister.children[0].children[1].value
    const pass = formRegister.children[1].children[1].value

    const nuevoUsuario = new newUser(user, pass)

    validarYRegistrar(nuevoUsuario)
})


const validarYRegistrar = (nuevoUsuario) => {

    const userNuevo = usuarios.find((usuario) => usuario?.user === nuevoUsuario.user)
    if(userNuevo === undefined){

        usuarios.push(nuevoUsuario)
        localStorage.setItem("usuarios", JSON.stringify(usuarios))
        sessionStorage.setItem("usuario", JSON.stringify(nuevoUsuario))
        Swal.fire({        
        
            text: `Gracias por registrarte ${nuevoUsuario.user}.
            Redirigiendo al Home`,
            confirmButtonColor: '#bb0000',
          });

        console.log(usuarios)
        setTimeout(() => {
            location.href = '../index.html';
        }, 2000);      
    }else{
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'El usuario ya existe',
            footer: '<a href="../pages/usuarios.html">Loguearse</a>'
          });


        sessionStorage.setItem("usuario", JSON.stringify(usuario))
        setTimeout(() => {
            location.href = '../index.html';
        }, 2000);
    }

}