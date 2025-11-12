<template>
  <div class="card p-3">
    <h5 class="card-title">Usuarios (mockapi.io)</h5>
    <div v-if="loading" class="my-3">Cargando usuarios...</div>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <div v-if="!loading && !error" class="table-responsive">
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in usuarios" :key="u.id">
            <td>{{ u.nombre || u.name || '-' }}</td>
            <td>{{ u.email || '-' }}</td>
            <td>{{ u.telefono || u.phone || '-' }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mt-2">
      <small class="text-muted">Nota: reemplace <code>API_URL</code> en este componente por su endpoint de mockapi.io (recurso "usuarios").</small>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'UsuariosView',
  data() {
    return {
      usuarios: [],
      loading: false,
      error: null,
  // Cambie esto por el URL real de su recurso en mockapi.io
  API_URL: 'https://69151a9d84e8bd126af89e10.mockapi.io/api/v1/usuarios'
    }
  },
  mounted() {
    this.fetchUsuarios()
  },
  methods: {
    async fetchUsuarios() {
      this.loading = true
      this.error = null
      try {
        const resp = await axios.get(this.API_URL)
        // esperar un array
        if (Array.isArray(resp.data)) this.usuarios = resp.data
        else this.usuarios = []
      } catch (err) {
        this.error = 'No se pudo obtener usuarios. Verifique la URL de mockapi y la conexión.'
        console.error(err)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.card { max-width: 900px; margin: 0 auto; }
</style>
