<template>
  <v-container
    grid-list-md
    text-xs-center
    fill-height
  >
    <v-layout
      row
      wrap
      align-center
    >
      <v-flex
        v-if="url"
        xs12
        sm4
      >
        <span
          class="font-weight-bold"
        >
          Client
        </span>
        <v-img
          :src="url"
          contain
        />
      </v-flex>
      <v-flex
        xs12
        sm4
      >
        <v-text-field
          v-model="photoName"
          name="photo"
          outline
          background-color="blue"
          color="blue"
          label="Select image"
          append-icon="attach_file"
          @click="selectImage"
        />
        <input
          ref="image"
          class="hide-input"
          type="file"
          accept="image/*"
          @change="imageSelected"
        >
        <v-btn
          round
          color="indigo"
          @click="uploadPhoto"
        >
          <v-icon
            color="white"
          >
            cloud_upload
          </v-icon>
        </v-btn>
        <v-btn
          v-if="url"
          color="indigo"
          round
          @click="loadPhotoFromServer"
        >
          <v-icon
            color="white"
            class="download"
          >
            cloud_upload
          </v-icon>
        </v-btn>
      </v-flex>
      <v-flex
        v-if="url"
        xs12
        sm4
      >
        <span
          v-if="photoId"
          class="font-weight-bold"
        >
          Server
        </span>
        <v-img
          v-if="photoId"
          :src="`${$axios.defaults.baseURL}/photos/${photoId}`"
          contain
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'PhotoUpload',
  data: () => ({
    url: '',
    photo: '',
    photoName: '',
    photoId: 0
  }),
  methods: {

    selectImage() {
      this.photo = this.$refs.image.click()
    },

    imageSelected(e) {
      this.$emit('input', e.target.files[0])
      this.photo = this.$refs.image.files[0]
      this.photoName = this.photo.name
      this.url = URL.createObjectURL(this.photo)
    },

    async uploadPhoto() {
      const data = new FormData()
      data.append('file', this.photo)
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      await this.$axios.$post('photos', data, config)
    },

    loadPhotoFromServer() {
      this.photoId = 1
    }
  }
}
</script>

 <style scoped>
 .hide-input {
     display: none;
 }
 *{
     text-transform: none !important;
 }
 .download {
     transform: rotate(180deg)
 }
 </style>
