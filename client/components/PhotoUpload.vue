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
        xs6
        offset-xs3
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
          class="upload-button"
          color="indigo"
          @click="upload_photo"
        >
          Upload
          <v-icon
            right
            color="white"
          >
            cloud_upload
          </v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'PhotoUpload',
  data: () => ({
    photo: '',
    photoName: ''
  }),
  methods: {
    selectImage() {
      this.photo = this.$refs.image.click()
    },
    imageSelected(e) {
      this.$emit('input', e.target.files[0])
      this.photo = this.$refs.image.files[0]
      this.photoName = this.photo.name
    },
    async upload_photo() {
      const formData = new FormData()
      formData.append('file', this.photo)
      const url = 'http://127.0.0.1:3333/upload'
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      await this.$axios({
        method: 'post',
        url: url,
        data: formData,
        config: config
      })
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
 .upload-button {
     border-radius: 50px;
     color: white;
 }
 </style>
