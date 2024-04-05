class Publicacion {
    constructor(descripcion, categoria) {
      this.descripcion = descripcion;
      this.categoria = categoria;
      this.meGusta = 0;
      this.comentarios = [];
    }
  
    getDescripcion() {
      return this.descripcion;
    }
  
    getCategoria() {
      return this.categoria;
    }
  
    getMeGusta() {
      return this.meGusta;
    }
  
    getComentarios() {
      return this.comentarios;
    }
  
    aumentarMeGusta() {
      this.meGusta++;
    }
  
    agregarComentario(comentario) {
      this.comentarios.push(comentario);
    }
  }
  
  module.exports = Publicacion