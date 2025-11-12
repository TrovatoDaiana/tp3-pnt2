export default {
  name: 'FormularioUsuario',
  data() {
    return {
      form: {
        nombre: '',
        edad: null,
        email: ''
      },
      usuarios: [],
      formDirty: {
        nombre: false,
        edad: false,
        email: false
      },
      // simple dedupe token to avoid pushing the same valid entry several times while typing
      _lastAddedToken: null
    }
  },
  computed: {
    errorNombre() {
      const raw = this.form.nombre == null ? '' : String(this.form.nombre).trim()
      let mensaje = ''
      if (!raw) mensaje = 'El nombre es obligatorio.'
      else if (raw.length < 5) mensaje = 'El nombre debe tener al menos 5 caracteres.'
      else if (raw.length > 15) mensaje = 'El nombre no puede tener más de 15 caracteres.'
      return { mensaje, mostrar: mensaje !== '' && this.formDirty.nombre, ok: mensaje === '' }
    },
    errorEdad() {
      const v = this.form.edad
      let mensaje = ''
      if (v === null || v === '' || isNaN(v)) mensaje = 'La edad es obligatoria y debe ser un número.'
      else if (Number(v) < 18) mensaje = 'La edad mínima es 18.'
      else if (Number(v) > 120) mensaje = 'La edad máxima es 120.'
      return { mensaje, mostrar: mensaje !== '' && this.formDirty.edad, ok: mensaje === '' }
    },
    errorEmail() {
      const raw = this.form.email == null ? '' : String(this.form.email).trim()
      let mensaje = ''
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!raw) mensaje = 'El email es obligatorio.'
      else if (!re.test(raw)) mensaje = 'El email no tiene un formato válido.'
      return { mensaje, mostrar: mensaje !== '' && this.formDirty.email, ok: mensaje === '' }
    },
    formValid() {
      return this.errorNombre.ok && this.errorEdad.ok && this.errorEmail.ok
    }
  },
  watch: {
    // cuando el formulario pasa a ser válido lo agregamos automáticamente (en "el mismo momento del ingreso")
    formValid(newVal) {
      if (newVal) {
        const token = `${this.form.nombre}|${this.form.edad}|${this.form.email}`
        if (token !== this._lastAddedToken) {
          this._lastAddedToken = token
          this.usuarios.unshift({
            nombre: String(this.form.nombre).trim(),
            edad: Number(this.form.edad),
            email: String(this.form.email).trim()
          })
        }
      }
    }
  },
  methods: {
    submitUser() {
      // marcar todos como tocados para mostrar mensajes si hace falta
      Object.keys(this.formDirty).forEach(k => { this.formDirty[k] = true })
      if (!this.formValid) return
      // ya se agregó automáticamente por el watcher; si queremos limpiar el form:
      this.form.nombre = ''
      this.form.edad = null
      this.form.email = ''
      Object.keys(this.formDirty).forEach(k => { this.formDirty[k] = false })
      this._lastAddedToken = null
    }
  }
}